// Christmas Collection page (christmas.html). Also loaded by Node for tests
// (test/christmas.test.js), so the pure parts are exported at the bottom.
//
// Prices and dates here are display only: the server (heartpost server.js,
// CHRISTMAS COLLECTION) computes every charge, enforces the dates and refuses
// an order whose total disagrees. Change both together.
(function (root) {
  'use strict';

  const XMAS = {
    orderBy: '2026-12-15', // New York dates, as the server's CHRISTMAS_SEASON
    lastDay: '2026-12-31',
    prices: { santa: 19.99, santa_bundle_2: 36.99, santa_bundle_3: 49.99, christmas: 12.99, rush: 5, tracking: 12, extraPage: 1.5 },
    includedPages: 2,
    santaMaxPages: 2,
    waxes: ['Scarlet', 'Gold', 'Midnight'],
    signOff: 'With love and a sleigh full of joy, Santa',
  };

  // "2026-12-15" in New York for a timestamp
  function nyDate(ms) {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' })
      .format(new Date(ms));
  }

  // 'open', 'late' (needs the "may arrive after Christmas" checkbox) or 'closed'
  function seasonPhase(ms = Date.now()) {
    const today = nyDate(ms);
    if (today <= XMAS.orderBy) return 'open';
    return today <= XMAS.lastDay ? 'late' : 'closed';
  }

  // "a", "a and b", "a, b and c"
  function joinList(items) {
    return items.length > 1 ? `${items.slice(0, -1).join(', ')} and ${items[items.length - 1]}` : items[0] || '';
  }

  // The Santa letter the parent starts from and then edits. A fixed template:
  // the parent's words go in as written, tidied only at the edges.
  // things: endings of "This year you …"; wish: optional.
  function santaLetter({ childName, things = [], wish = '', signOff = XMAS.signOff }) {
    const name  = String(childName || '').trim() || 'friend';
    const did   = things.map(t => String(t || '').trim().replace(/[.!\s]+$/, '')).filter(Boolean);
    const want  = String(wish || '').trim().replace(/[.!\s]+$/, '');
    // "…of joy, Santa" signs off on its own line
    const close = String(signOff || XMAS.signOff).trim().replace(/,\s*(Santa\S*)$/, ',\n$1');
    return [
      `Dear ${name},`,
      'Ho ho ho! The elves have been keeping me up to date all year, and I have to tell you: I am very proud of you.',
      did.length ? `They told me that this year you ${joinList(did)}. That made the whole workshop smile!` : '',
      want ? `I also heard you are wishing for ${want}. Mrs. Claus and I will see what we can do. Whatever is under the tree, remember that being kind is the best gift of all.` : '',
      `Keep being the wonderful ${name} you are. I'll be watching for your house on Christmas Eve!`,
      close,
    ].filter(Boolean).join('\n\n');
  }

  // What the page shows as the total; the server's quote has the final word
  function displayTotal({ product, kids = 1, pages = 1, rush = false, tracking = false }) {
    const p = XMAS.prices;
    let total = product === 'santa' ? p.santa
      : product === 'santa_bundle' ? (kids === 3 ? p.santa_bundle_3 : p.santa_bundle_2)
      : p.christmas + Math.max(0, pages - XMAS.includedPages) * p.extraPage;
    if (rush) total += p.rush;
    if (tracking) total += p.tracking;
    return Math.round(total * 100) / 100;
  }

  const api = { XMAS, nyDate, seasonPhase, santaLetter, displayTotal, joinList };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;

  // ───────────────────────────── Browser ─────────────────────────────
  const STRIPE_KEY = 'pk_live_51TNcEAKGuVFefNHRosQm9plrItBCkRRhcTgr5WnASYC8x2Zb74e0Y5ByVhKDuuJxapkr72gF5tztjnMRY8TaZICU00IcasxkS1';
  const BACKEND    = 'https://heartpost-production.up.railway.app';
  const $   = id => document.getElementById(id);
  const fmt = n => `$${n.toFixed(2)}`;

  const S = {
    product: null,   // 'santa' | 'santa_bundle' | 'christmas'
    kids: 1,         // Santa letters in the order
    edited: [false, false, false], // the parent changed letter i by hand
    letterPages: [], // from the server's quote
    quote: null,     // { price, error, field }
    phase: seasonPhase(),
  };

  // ── Season: closed after the last day, late after the order-by date ──
  function applySeason() {
    if (S.phase === 'closed') { location.replace('/'); return false; }
    $('xmas').hidden = false;
    if (S.phase === 'late') {
      $('banner').textContent = 'The December 15 order date for Christmas delivery (US) has passed. Orders may arrive after Christmas.';
      $('late-row').hidden = false;
    }
    return true;
  }

  // ── Product ──
  function pickProduct(product, kids) {
    S.product = product;
    S.kids = product === 'santa_bundle' ? kids || 3 : 1;
    document.querySelectorAll('.product').forEach(el => el.classList.toggle('sel', el.dataset.product === product));
    $('order').hidden = false;
    $('santa-form').hidden = product === 'christmas';
    $('christmas-form').hidden = product !== 'christmas';
    $('kids-row').hidden = product !== 'santa_bundle';
    if (product === 'santa_bundle') $('kids-' + S.kids).checked = true;
    renderKids();
    refreshQuote();
    $('order').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function setKids(n) { S.kids = n; renderKids(); refreshQuote(); }

  function renderKids() {
    document.querySelectorAll('.kid').forEach((el, i) => { el.hidden = !(S.product !== 'christmas' && i < S.kids); });
  }

  // ── Santa letter preview: the template, then the parent's edits ──
  function kidFields(i) {
    return {
      childName: $(`child-${i}`).value,
      things:    [0, 1, 2].map(n => $(`thing-${i}-${n}`).value),
      wish:      $(`wish-${i}`).value,
      signOff:   $('signoff').value,
    };
  }

  function preview(i) {
    const f = kidFields(i);
    if (!f.childName.trim()) return fieldError(`child-${i}`, "Please enter the child's first name");
    if (f.things.filter(t => t.trim()).length < 2) return fieldError(`thing-${i}-0`, 'Please add at least 2 things they did great this year');
    // Never throw away the parent's own edits without asking
    if (S.edited[i] && !confirm('Replace your edited letter with a fresh preview? Your changes will be lost.')) return;
    $(`letter-${i}`).value = santaLetter(f);
    S.edited[i] = false;
    $(`paper-${i}`).hidden = false;
    fitHeight($(`letter-${i}`));
    clearError(`child-${i}`); clearError(`thing-${i}-0`);
    refreshQuote();
  }

  function onLetterEdit(i) { S.edited[i] = true; fitHeight($(`letter-${i}`)); refreshQuoteSoon(); }

  // The preview shows the whole letter, never a scrolled part of it
  function fitHeight(ta) {
    if (!ta.style) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight + 4}px`;
  }

  // ── Quote: the server lays the letters out and prices them ──
  let quoteTimer = null;
  function refreshQuoteSoon() { clearTimeout(quoteTimer); quoteTimer = setTimeout(refreshQuote, 500); }

  function orderBody() {
    const body = { product: S.product, rush: $('rush').checked, tracking: $('tracking').checked };
    if (S.product === 'christmas') body.letterBody = $('xmas-letter').value;
    else body.letters = Array.from({ length: S.kids }, (_, i) => ({ childName: $(`child-${i}`).value.trim(), letterBody: $(`letter-${i}`).value }));
    return body;
  }

  async function refreshQuote() {
    if (!S.product) return;
    renderSummary(); // the page's own total right away; the server's replaces it
    try {
      const body = orderBody();
      if (body.letters) body.letters = body.letters.map(l => ({ letterBody: l.letterBody })); // the quote needs no names
      const res = await fetch(BACKEND + '/api/quote', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      S.quote = await res.json();
      S.letterPages = S.quote.letterPages || [];
    } catch { S.quote = null; }
    renderPages();
    renderSummary();
  }

  function renderPages() {
    const pagesText = n => `${n} page${n === 1 ? '' : 's'}`;
    if (S.product === 'christmas') {
      const n = S.letterPages[0];
      const extra = n > XMAS.includedPages ? ` · ${n - XMAS.includedPages} extra × ${fmt(XMAS.prices.extraPage)}` : '';
      $('xmas-pages').textContent = n ? `Prints on ${pagesText(n)}${extra}` : '';
      $('xmas-pages').classList.toggle('bad', S.quote?.field === 'letter');
      return;
    }
    for (let i = 0; i < 3; i++) {
      const n = S.letterPages[i];
      const bad = S.quote?.field === `letter-${i}`;
      $(`pages-${i}`).textContent = !n ? '' : bad ? `${pagesText(n)} — Santa letters fit on ${XMAS.santaMaxPages}; please shorten it` : `Prints on ${pagesText(n)}`;
      $(`pages-${i}`).classList.toggle('bad', bad);
    }
  }

  function currentTotal() {
    const pages = S.product === 'christmas' ? S.letterPages[0] || 1 : 1;
    return displayTotal({ product: S.product, kids: S.kids, pages, rush: $('rush').checked, tracking: $('tracking').checked });
  }

  function renderSummary() {
    if (!S.product) return;
    const p = XMAS.prices;
    const lines = [];
    if (S.product === 'santa') lines.push(['Letter from Santa', p.santa]);
    if (S.product === 'santa_bundle') lines.push([`Santa Sibling Bundle (${S.kids} letters)`, S.kids === 3 ? p.santa_bundle_3 : p.santa_bundle_2]);
    if (S.product === 'christmas') {
      lines.push(['Christmas Letter', p.christmas]);
      const extra = Math.max(0, (S.letterPages[0] || 1) - XMAS.includedPages);
      if (extra) lines.push([`Extra pages (${extra} × ${fmt(p.extraPage)})`, extra * p.extraPage]);
    }
    if ($('rush').checked) lines.push(['Holiday rush', p.rush]);
    if ($('tracking').checked) lines.push(['USPS tracking', p.tracking]);
    $('sum-lines').innerHTML = lines.map(([k, v]) => `<div class="sline"><span>${k}</span><span>${fmt(v)}</span></div>`).join('');
    const total = S.quote && S.quote.price != null ? S.quote.price : currentTotal();
    $('sum-total').textContent = fmt(total);
    $('pay-err').textContent = S.quote?.error || '';
  }

  // ── Errors ──
  function fieldError(id, msg) {
    const el = $(id);
    if (el) { el.classList.add('err'); el.focus(); }
    const box = $('e-' + id);
    if (box) { box.textContent = msg; box.hidden = false; }
    return false;
  }
  function clearError(id) {
    const el = $(id); if (el) el.classList.remove('err');
    const box = $('e-' + id); if (box) box.hidden = true;
  }

  // Checks the form before paying; returns false at the first problem
  function validate() {
    if (S.product === 'christmas') {
      if (!$('xmas-to').value.trim()) return fieldError('xmas-to', "Please enter the recipient's name");
      if (!$('xmas-letter').value.trim()) return fieldError('xmas-letter', 'Please write your letter');
    } else {
      for (let i = 0; i < S.kids; i++) {
        if (!$(`child-${i}`).value.trim()) return fieldError(`child-${i}`, "Please enter the child's first name");
        if (!$(`letter-${i}`).value.trim()) return fieldError(`thing-${i}-0`, 'Please preview the letter first');
      }
    }
    for (const id of ['addr', 'city', 'state', 'zip', 'email']) {
      if (!$(id).value.trim()) return fieldError(id, 'Required');
    }
    if (!/^\d{5}(-\d{4})?$/.test($('zip').value.trim())) return fieldError('zip', 'Please enter a 5-digit ZIP code');
    if (S.phase === 'late' && !$('late-ok').checked) return fieldError('late-ok', 'Please tick the box to order');
    return true;
  }

  // ── Pay ──
  // The server's error fields that are named differently on this page
  // (child-N, letter-N, city, state and zip are the same)
  const SERVER_FIELDS = { lateAck: 'late-ok', wax: 'xmas-wax', rname: 'xmas-to', letter: 'xmas-letter' };
  let stripe, card;
  function mountCard() {
    if (!root.Stripe) return;
    stripe = root.Stripe(STRIPE_KEY);
    card = stripe.elements().create('card', { style: { base: { fontFamily: 'Arimo, Arial, sans-serif', fontSize: '16px', color: '#1a1208' } } });
    card.mount('#card-element');
    card.on('change', e => { $('pay-err').textContent = e.error ? e.error.message : ''; });
  }

  async function pay() {
    if (!S.product || !validate()) return;
    const btn = $('pay');
    btn.disabled = true;
    $('pay-err').textContent = '';
    try {
      await refreshQuote();
      if (S.quote?.error) throw Object.assign(new Error(S.quote.error), { field: S.quote.field });
      const body = {
        ...orderBody(),
        amount:        S.quote?.price ?? currentTotal(), // checked by the server, not trusted
        address:       [$('addr').value.trim(), $('addr2').value.trim()].filter(Boolean).join(', '),
        city:          [$('city').value.trim(), $('state').value, $('zip').value.trim()].join(', '),
        country:       'US',
        customerEmail: $('email').value.trim(),
        lateAck:       S.phase === 'late' && $('late-ok').checked,
      };
      if (S.product === 'christmas') {
        Object.assign(body, { recipientName: $('xmas-to').value.trim(), senderName: $('xmas-from').value.trim(), wax: $('xmas-wax').value });
      }
      const res  = await fetch(BACKEND + '/api/create-payment-intent', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) throw Object.assign(new Error(data.error || 'Something went wrong — please try again'), { field: data.field });

      const { paymentIntent, error } = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: { card, billing_details: { email: body.customerEmail } },
      });
      if (error) throw new Error(error.message);
      if (paymentIntent.status === 'succeeded') {
        $('order').hidden = true;
        $('products').hidden = true;
        $('done-id').textContent = `Order HPT-${data.orderId}`;
        $('done').hidden = false;
        $('done').scrollIntoView({ behavior: 'smooth' });
      }
    } catch (e) {
      $('pay-err').textContent = e.message;
      if (e.field) fieldError(SERVER_FIELDS[e.field] || e.field, e.message);
    } finally {
      btn.disabled = false;
    }
  }

  // ── Wiring ──
  function init() {
    if (!applySeason()) return;
    document.querySelectorAll('.product').forEach(el => el.addEventListener('click', () => pickProduct(el.dataset.product, Number(el.dataset.kids) || 0)));
    for (const n of [2, 3]) $(`kids-${n}`).addEventListener('change', () => setKids(n));
    for (let i = 0; i < 3; i++) {
      $(`preview-${i}`).addEventListener('click', () => preview(i));
      $(`letter-${i}`).addEventListener('input', () => onLetterEdit(i));
      $(`child-${i}`).addEventListener('input', () => clearError(`child-${i}`));
    }
    $('signoff').value = XMAS.signOff;
    $('xmas-letter').addEventListener('input', () => { fitHeight($('xmas-letter')); refreshQuoteSoon(); });
    for (const id of ['rush', 'tracking']) $(id).addEventListener('change', refreshQuote);
    for (const id of ['addr', 'city', 'state', 'zip', 'email', 'xmas-to', 'late-ok']) $(id).addEventListener('input', () => clearError(id));
    $('pay').addEventListener('click', pay);
    mountCard();
  }

  // Every page: [data-xmas] links and banners (homepage nav and callout) show
  // only during the season. The Christmas page itself has id="xmas".
  root.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-xmas]').forEach(el => { el.hidden = S.phase === 'closed'; });
    if ($('xmas')) init();
  });
})(typeof window !== 'undefined' ? window : globalThis);
