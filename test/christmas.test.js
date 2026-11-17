'use strict';
// The Christmas Collection page: season dates, the Santa template, prices
// shown and honest wording. The server (heartpost) has its own tests for the
// prices it charges and the dates it enforces.
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const xmas = require('../christmas.js');
const read = file => fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
const NY   = (date, time) => Date.parse(`${date}T${time}:00-05:00`); // December: UTC−5

// Runs christmas.js as the browser would, against a small fake DOM, at a
// fixed time. Elements are made on first use; their listeners can be fired.
function loadPage(nowMs, { ids = ['xmas'], dataXmas = 0, confirmAnswer = true } = {}) {
  const els = new Map();
  const el  = id => {
    if (!els.has(id)) {
      const listeners = {};
      els.set(id, {
        id, hidden: true, value: '', checked: false, textContent: '', innerHTML: '', dataset: {},
        classList: { add() {}, remove() {}, toggle() {} },
        addEventListener: (type, fn) => { (listeners[type] ||= []).push(fn); },
        fire: type => (listeners[type] || []).forEach(fn => fn({})),
        focus() {}, scrollIntoView() {}, mount() {}, on() {},
      });
    }
    return els.get(id);
  };
  ids.forEach(el);
  const xmasLinks = Array.from({ length: dataXmas }, (_, i) => el(`link-${i}`));
  const products  = ids.includes('xmas') ? ['santa', 'santa_bundle', 'christmas'].map(p => Object.assign(el(`product-${p}`), { dataset: { product: p } })) : [];
  const fetched = [];
  const redirects = [];
  const windowListeners = {};
  const RealDate = Date;
  class FixedDate extends RealDate {
    constructor(...a) { super(...(a.length ? a : [nowMs])); }
    static now() { return nowMs; }
  }
  const sandbox = {
    Date: FixedDate, Intl, Math, JSON, Array, Number, String, Object, Promise, setTimeout, clearTimeout,
    document: {
      getElementById: id => (ids.includes(id) || els.has(id) || id !== 'xmas' ? el(id) : null),
      querySelectorAll: sel => (sel === '[data-xmas]' ? xmasLinks : sel === '.product' ? products : []),
    },
    location: { replace: url => redirects.push(url) },
    confirm: () => confirmAnswer,
    fetch: async (url, opts) => {
      fetched.push({ url, body: JSON.parse(opts.body) });
      return { ok: true, json: async () => ({ price: 19.99, letterPages: [1], clientSecret: 'cs_test', orderId: 'ABC123' }) };
    },
  };
  sandbox.addEventListener = (type, fn) => { (windowListeners[type] ||= []).push(fn); };
  sandbox.Stripe = () => ({
    elements: () => ({ create: () => el('card') }),
    confirmCardPayment: async () => ({ paymentIntent: { status: 'succeeded' } }),
  });
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(read('christmas.js'), sandbox);
  (windowListeners.DOMContentLoaded || []).forEach(fn => fn());
  return { el, els, xmasLinks, redirects, fetched };
}

test('season: open through Dec 15, then the checkbox, closed after Dec 31 (New York time)', () => {
  assert.equal(xmas.seasonPhase(NY('2026-11-17', '09:00')), 'open');
  assert.equal(xmas.seasonPhase(NY('2026-12-15', '23:59')), 'open');
  assert.equal(xmas.seasonPhase(NY('2026-12-16', '00:01')), 'late');
  assert.equal(xmas.seasonPhase(NY('2026-12-31', '23:59')), 'late');
  assert.equal(xmas.seasonPhase(NY('2027-01-01', '00:01')), 'closed');
  // 11pm on Dec 15 in New York is already Dec 16 in UTC: still on time
  assert.equal(xmas.seasonPhase(Date.parse('2026-12-16T04:30:00Z')), 'open');
});

test('the page is hidden until the season is checked, and after Dec 31 sends visitors home', () => {
  // The page starts hidden; christmas.js shows it
  assert.match(read('christmas.html'), /<div id="xmas" hidden>/);
  assert.match(read('christmas.html'), /<script src="\/christmas\.js"><\/script>/);

  let page = loadPage(NY('2026-12-31', '23:59'));
  assert.equal(page.el('xmas').hidden, false);
  assert.deepEqual(page.redirects, []);

  page = loadPage(NY('2027-01-01', '00:01'));
  assert.equal(page.el('xmas').hidden, true);
  assert.deepEqual(page.redirects, ['/']);
});

test('homepage: the Christmas nav link and callout show only in season', () => {
  const home = read('index.html');
  const links = [...home.matchAll(/<a href="\/christmas"[^>]*>/g)].map(m => m[0]);
  assert.equal(links.length, 2); // nav link + callout
  for (const a of links) assert.match(a, /data-xmas hidden/);
  assert.match(home, />Christmas<\/a>/);
  assert.match(home, /<script src="\/christmas\.js" defer><\/script>/);

  let home1 = loadPage(NY('2026-12-20', '12:00'), { ids: [], dataXmas: 2 });
  assert.deepEqual(home1.xmasLinks.map(l => l.hidden), [false, false]);
  assert.deepEqual(home1.redirects, []); // the homepage is never redirected
  home1 = loadPage(NY('2027-01-02', '12:00'), { ids: [], dataXmas: 2 });
  assert.deepEqual(home1.xmasLinks.map(l => l.hidden), [true, true]);
  assert.deepEqual(home1.redirects, []);
});

test('after Dec 15 the "may arrive after Christmas" checkbox is shown; before, it is not', () => {
  assert.equal(loadPage(NY('2026-12-15', '22:00')).el('late-row').hidden, true);
  const late = loadPage(NY('2026-12-16', '08:00'));
  assert.equal(late.el('late-row').hidden, false);
  assert.match(late.el('banner').textContent, /may arrive after Christmas/);
});

test('banner, headline and Dec 15 checkbox wording', () => {
  const html = read('christmas.html');
  assert.ok(html.includes('Order by December 15 for Christmas delivery (US).'));
  assert.ok(html.includes('Some things deserve more than a text.'));
  assert.ok(html.includes('I understand it may arrive after Christmas.'));
  assert.match(html, /<div class="late" id="late-row" hidden>/);
});

test('honest wording: printed, real wax, mailed by hand; never handwritten, no pen or ink choices', () => {
  for (const file of ['christmas.html', 'christmas.js']) {
    const text = read(file);
    assert.doesNotMatch(text, /hand-?written|handwriting/i, file);
    assert.doesNotMatch(text, /\b(pen|ink)\s+(colou?r|choice|style)s?\b|fountain pen|choose (your|a) (pen|ink)/i, file);
  }
  const html = read('christmas.html');
  assert.match(html, /printed on cotton paper, sealed with real wax and mailed by hand/i);
  // No script fonts: the letter preview is set in Tinos, the print font
  assert.doesNotMatch(html, /Dancing Script|Great Vibes|Pacifico|Caveat|cursive/i);
  assert.match(html, /\.paper textarea\{font-family:Tinos,serif;font-style:italic/);
});

test('prices shown match the server: $19.99, $36.99 / $49.99, $12.99; rush $5, tracking $12', () => {
  assert.deepEqual(xmas.XMAS.prices, { santa: 19.99, santa_bundle_2: 36.99, santa_bundle_3: 49.99, christmas: 12.99, rush: 5, tracking: 12, extraPage: 1.5 });
  const total = xmas.displayTotal;
  assert.equal(total({ product: 'santa' }), 19.99);
  assert.equal(total({ product: 'santa', rush: true, tracking: true }), 36.99);
  assert.equal(total({ product: 'santa_bundle', kids: 2 }), 36.99);
  assert.equal(total({ product: 'santa_bundle', kids: 3, rush: true }), 54.99);
  assert.equal(total({ product: 'christmas', pages: 4, tracking: true }), 27.99);
  const html = read('christmas.html');
  for (const p of ['$19<small>.99</small>', '$49<small>.99 for 3 · $36.99 for 2</small>', '$12<small>.99</small>', 'Holiday rush +$5', 'USPS tracking +$12']) {
    assert.ok(html.includes(p), p);
  }
});

test('Santa template: fixed, warm, uses only what the parent typed', () => {
  const letter = xmas.santaLetter({ childName: ' Emma ', things: ['learned to ride your bike.', 'helped Grandma bake cookies', ''], wish: 'a puppy!' });
  assert.equal(letter, `Dear Emma,

Ho ho ho! The elves have been keeping me up to date all year, and I have to tell you: I am very proud of you.

They told me that this year you learned to ride your bike and helped Grandma bake cookies. That made the whole workshop smile!

I also heard you are wishing for a puppy. Mrs. Claus and I will see what we can do. Whatever is under the tree, remember that being kind is the best gift of all.

Keep being the wonderful Emma you are. I'll be watching for your house on Christmas Eve!

With love and a sleigh full of joy,
Santa`);
  // No wish: that paragraph is left out; three things read as a list
  const noWish = xmas.santaLetter({ childName: 'Liam', things: ['read a chapter book', 'shared your toys', 'tried broccoli'], signOff: 'Love, Santa and the elves' });
  assert.match(noWish, /you read a chapter book, shared your toys and tried broccoli\./);
  assert.doesNotMatch(noWish, /wishing/);
  assert.ok(noWish.endsWith('Love, Santa and the elves'));
});

test('Santa edits are kept: a new preview never silently replaces an edited letter', async () => {
  const page = loadPage(NY('2026-12-01', '12:00'), { confirmAnswer: false });
  const { el } = page;
  el('santa-card').dataset.product = 'santa';
  el('child-0').value = 'Emma';
  el('thing-0-0').value = 'learned to ride your bike';
  el('thing-0-1').value = 'helped Grandma bake cookies';
  el('wish-0').value = 'a puppy';
  el('preview-0').fire('click');
  assert.match(el('letter-0').value, /^Dear Emma,/);
  assert.equal(el('paper-0').hidden, false);

  // The parent edits; a second preview asks first, and "Cancel" keeps the edit
  const edited = el('letter-0').value + '\n\nP.S. Rudolph says hi!';
  el('letter-0').value = edited;
  el('letter-0').fire('input');
  el('thing-0-0').value = 'learned to swim';
  el('preview-0').fire('click');
  assert.equal(el('letter-0').value, edited);

  // Agreeing replaces it with a fresh preview
  const page2 = loadPage(NY('2026-12-01', '12:00'), { confirmAnswer: true });
  Object.assign(page2.el('child-0'), { value: 'Liam' });
  page2.el('thing-0-0').value = 'read a book'; page2.el('thing-0-1').value = 'tried broccoli';
  page2.el('preview-0').fire('click');
  page2.el('letter-0').value += ' (edited)';
  page2.el('letter-0').fire('input');
  page2.el('preview-0').fire('click');
  assert.doesNotMatch(page2.el('letter-0').value, /\(edited\)/);
});

test('only the first name and the approved letter are sent for each child', async () => {
  const page = loadPage(NY('2026-12-01', '12:00'));
  const { el } = page;
  el('product-santa').fire('click');
  el('child-0').value = ' Emma ';
  el('thing-0-0').value = 'learned to ride your bike';
  el('thing-0-1').value = 'helped Grandma bake cookies';
  el('wish-0').value = 'a puppy';
  el('preview-0').fire('click');
  el('letter-0').value = 'Dear Emma,\n\nMy own words.\n\nSanta';
  el('letter-0').fire('input');
  Object.assign(el('addr'), { value: '12 Holly Lane' });
  Object.assign(el('city'), { value: 'Burlington' });
  Object.assign(el('state'), { value: 'VT' });
  Object.assign(el('zip'), { value: '05401' });
  Object.assign(el('email'), { value: 'parent@example.com' });

  el('pay').fire('click');
  for (let i = 0; i < 50 && !page.fetched.some(f => f.url.endsWith('/api/create-payment-intent')); i++) await new Promise(r => setTimeout(r, 5));
  const order = page.fetched.find(f => f.url.endsWith('/api/create-payment-intent')).body;
  assert.equal(order.product, 'santa');
  assert.deepEqual(order.letters, [{ childName: 'Emma', letterBody: 'Dear Emma,\n\nMy own words.\n\nSanta' }]);
  assert.doesNotMatch(JSON.stringify(order), /bike|Grandma|puppy/);
  assert.equal(order.city, 'Burlington, VT, 05401');
  assert.equal(order.country, 'US');
  // The quote gets the letters without names
  for (const q of page.fetched.filter(f => f.url.endsWith('/api/quote'))) assert.doesNotMatch(JSON.stringify(q.body), /Emma"/);
  await new Promise(r => setTimeout(r, 20));
  assert.equal(el('done-id').textContent, 'Order HPT-ABC123');
});
