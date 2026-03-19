<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sendfro — Send Groceries Home</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --earth:    #2C1A0E;
      --clay:     #8B4A2B;
      --amber:    #D4832A;
      --grain:    #F5EDD8;
      --cream:    #FAF6EE;
      --moss:     #3D5A3E;
      --white:    #FFFFFF;
      --text:     #1E120A;
      --muted:    #7A6150;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--cream);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-weight: 400;
      overflow-x: hidden;
    }

    /* ── NAV ── */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 20px 40px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(250,246,238,0.88);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(44,26,14,0.08);
    }
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem;
      font-weight: 900;
      color: var(--earth);
      letter-spacing: -0.5px;
    }
    .logo span { color: var(--amber); }
    .nav-cta {
      background: var(--earth);
      color: var(--grain);
      padding: 10px 22px;
      border-radius: 100px;
      font-size: 0.85rem;
      font-weight: 500;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
    }
    .nav-cta:hover { background: var(--clay); transform: translateY(-1px); }

    /* ── HERO ── */
    .hero {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 120px 40px 80px;
      max-width: 1200px;
      margin: 0 auto;
      gap: 60px;
    }

    .hero-left { animation: fadeUp 0.8s ease both; }
    .hero-right { animation: fadeUp 0.8s 0.2s ease both; }

    .eyebrow {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--amber);
      color: var(--white);
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 6px 14px;
      border-radius: 100px;
      margin-bottom: 28px;
    }
    .eyebrow::before {
      content: '';
      width: 6px; height: 6px;
      background: var(--white);
      border-radius: 50%;
    }

    h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.8rem, 5vw, 4.4rem);
      font-weight: 900;
      line-height: 1.08;
      color: var(--earth);
      margin-bottom: 24px;
      letter-spacing: -1px;
    }
    h1 em {
      font-style: italic;
      color: var(--clay);
    }

    .hero-body {
      font-size: 1.1rem;
      line-height: 1.7;
      color: var(--muted);
      max-width: 440px;
      margin-bottom: 40px;
    }

    /* ── FORM ── */
    .hero-form {
      display: flex; gap: 10px;
      flex-wrap: wrap;
    }
    .hero-form input[type="email"] {
      flex: 1;
      min-width: 200px;
      padding: 14px 18px;
      border: 1.5px solid rgba(44,26,14,0.2);
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      background: var(--white);
      color: var(--text);
      outline: none;
      transition: border-color 0.2s;
    }
    .hero-form input[type="email"]::placeholder { color: #B0A090; }
    .hero-form input[type="email"]:focus { border-color: var(--amber); }

    .btn-primary {
      background: var(--amber);
      color: var(--white);
      border: none;
      padding: 14px 26px;
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      white-space: nowrap;
    }
    .btn-primary:hover { background: var(--clay); transform: translateY(-1px); }

    .form-sub {
      margin-top: 14px;
      font-size: 0.8rem;
      color: var(--muted);
    }
    .form-sub a {
      color: var(--clay);
      text-decoration: none;
      font-weight: 500;
    }
    .form-sub a:hover { text-decoration: underline; }

    .success-msg {
      display: none;
      margin-top: 14px;
      font-size: 0.9rem;
      color: var(--moss);
      font-weight: 500;
    }

    /* ── HERO CARD ── */
    .hero-card {
      background: var(--earth);
      border-radius: 24px;
      padding: 36px;
      position: relative;
      overflow: hidden;
    }
    .hero-card::before {
      content: '';
      position: absolute; inset: 0;
      background: radial-gradient(circle at 80% 20%, rgba(212,131,42,0.25), transparent 60%);
      pointer-events: none;
    }

    .card-label {
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--amber);
      margin-bottom: 20px;
    }

    .order-items {
      list-style: none;
      margin-bottom: 28px;
    }
    .order-items li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      font-size: 0.9rem;
    }
    .order-items li:last-child { border-bottom: none; }
    .item-name { color: var(--grain); display: flex; align-items: center; gap: 10px; }
    .item-emoji { font-size: 1.1rem; }
    .item-price { color: rgba(245,237,216,0.55); font-size: 0.82rem; }

    .card-total {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(255,255,255,0.06);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 20px;
    }
    .total-label { color: var(--grain); font-size: 0.85rem; }
    .total-amount { color: var(--amber); font-family: 'Playfair Display', serif; font-size: 1.3rem; font-weight: 700; }

    .card-delivery {
      display: flex;
      align-items: center;
      gap: 10px;
      background: rgba(61,90,62,0.35);
      border-radius: 12px;
      padding: 12px 16px;
    }
    .delivery-dot { width: 8px; height: 8px; background: #6FCF7F; border-radius: 50%; flex-shrink: 0; animation: pulse 2s infinite; }
    .delivery-text { color: var(--grain); font-size: 0.82rem; line-height: 1.4; }
    .delivery-text strong { display: block; font-weight: 500; color: #A8EBB0; font-size: 0.78rem; letter-spacing: 0.05em; text-transform: uppercase; }

    /* ── HOW IT WORKS ── */
    .section {
      padding: 100px 40px;
      max-width: 1100px;
      margin: 0 auto;
    }

    .section-label {
      font-size: 0.75rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--amber);
      margin-bottom: 16px;
    }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2rem, 3.5vw, 3rem);
      font-weight: 700;
      color: var(--earth);
      line-height: 1.15;
      margin-bottom: 60px;
      letter-spacing: -0.5px;
    }

    .steps {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
    }
    .step {
      padding: 28px 24px;
      border-radius: 16px;
      background: var(--white);
      border: 1px solid rgba(44,26,14,0.07);
      position: relative;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .step:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(44,26,14,0.08); }
    .step-num {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      font-weight: 900;
      color: rgba(44,26,14,0.08);
      line-height: 1;
      margin-bottom: 16px;
    }
    .step-icon { font-size: 1.6rem; margin-bottom: 12px; }
    .step h3 { font-size: 1rem; font-weight: 500; color: var(--earth); margin-bottom: 8px; }
    .step p { font-size: 0.85rem; line-height: 1.6; color: var(--muted); }

    /* ── WHY SENDFRO ── */
    .why-section {
      background: var(--earth);
      padding: 100px 40px;
    }
    .why-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 80px;
      align-items: center;
    }
    .why-label { color: var(--amber); font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 16px; }
    .why-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.8rem, 3vw, 2.8rem);
      color: var(--grain);
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.5px;
    }
    .why-title em { color: var(--amber); font-style: italic; }

    .pain-points { list-style: none; display: flex; flex-direction: column; gap: 20px; }
    .pain-point {
      display: flex; gap: 16px; align-items: flex-start;
      padding: 20px;
      background: rgba(255,255,255,0.04);
      border-radius: 14px;
      border: 1px solid rgba(255,255,255,0.06);
    }
    .pain-icon { font-size: 1.3rem; flex-shrink: 0; margin-top: 2px; }
    .pain-text h4 { font-size: 0.92rem; font-weight: 500; color: var(--grain); margin-bottom: 4px; }
    .pain-text p { font-size: 0.82rem; line-height: 1.55; color: rgba(245,237,216,0.5); }

    /* ── PROOF ── */
    .proof-section {
      padding: 100px 40px;
      max-width: 1100px;
      margin: 0 auto;
      text-align: center;
    }
    .proof-section .section-title { margin-bottom: 16px; }
    .proof-sub { color: var(--muted); font-size: 1rem; margin-bottom: 56px; }

    .proof-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      text-align: left;
    }
    .proof-card {
      padding: 28px;
      border-radius: 16px;
      border: 1px solid rgba(44,26,14,0.1);
      background: var(--white);
      transition: transform 0.2s;
    }
    .proof-card:hover { transform: translateY(-3px); }
    .proof-quote {
      font-size: 0.92rem;
      line-height: 1.7;
      color: var(--text);
      margin-bottom: 20px;
      font-style: italic;
    }
    .proof-author { display: flex; align-items: center; gap: 12px; }
    .proof-avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: var(--grain);
      display: flex; align-items: center; justify-content: center;
      font-size: 1.1rem;
    }
    .proof-name { font-size: 0.85rem; font-weight: 500; color: var(--earth); }
    .proof-location { font-size: 0.75rem; color: var(--muted); }

    /* ── CATALOG TEASER ── */
    .catalog-section {
      background: var(--grain);
      padding: 80px 40px;
    }
    .catalog-inner { max-width: 1100px; margin: 0 auto; }
    .catalog-inner .section-title { margin-bottom: 40px; }
    .catalog-chips {
      display: flex; flex-wrap: wrap; gap: 10px;
      margin-bottom: 32px;
    }
    .chip {
      background: var(--white);
      border: 1px solid rgba(44,26,14,0.12);
      border-radius: 100px;
      padding: 8px 16px;
      font-size: 0.85rem;
      color: var(--earth);
      display: flex; align-items: center; gap: 6px;
    }
    .catalog-note {
      font-size: 0.85rem;
      color: var(--muted);
    }
    .catalog-note strong { color: var(--clay); }

    /* ── FINAL CTA ── */
    .final-cta {
      padding: 120px 40px;
      text-align: center;
      max-width: 700px;
      margin: 0 auto;
    }
    .final-cta h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(2.2rem, 4vw, 3.4rem);
      font-weight: 900;
      color: var(--earth);
      line-height: 1.1;
      margin-bottom: 20px;
      letter-spacing: -0.5px;
    }
    .final-cta h2 em { color: var(--clay); font-style: italic; }
    .final-cta p { color: var(--muted); font-size: 1rem; margin-bottom: 40px; line-height: 1.65; }
    .cta-row { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; align-items: center; }
    .btn-secondary {
      background: transparent;
      border: 1.5px solid var(--earth);
      color: var(--earth);
      padding: 14px 26px;
      border-radius: 100px;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      cursor: pointer;
      text-decoration: none;
      display: inline-flex; align-items: center; gap: 8px;
      transition: background 0.2s, color 0.2s;
    }
    .btn-secondary:hover { background: var(--earth); color: var(--grain); }

    /* ── FOOTER ── */
    footer {
      border-top: 1px solid rgba(44,26,14,0.1);
      padding: 32px 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      flex-wrap: wrap;
      gap: 12px;
    }
    .footer-logo { font-family: 'Playfair Display', serif; font-weight: 900; font-size: 1.1rem; color: var(--earth); }
    .footer-logo span { color: var(--amber); }
    footer p { font-size: 0.78rem; color: var(--muted); }

    /* ── ANIMATIONS ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(0.85); }
    }

    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; padding-top: 100px; gap: 40px; }
      .steps { grid-template-columns: 1fr 1fr; }
      .why-inner { grid-template-columns: 1fr; gap: 40px; }
      .proof-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      nav { padding: 16px 20px; }
      .hero { padding: 90px 20px 60px; }
      .section, .proof-section, .final-cta { padding: 70px 20px; }
      .why-section, .catalog-section { padding: 70px 20px; }
      footer { padding: 24px 20px; }
      .steps { grid-template-columns: 1fr; }
      h1 { font-size: 2.6rem; }
    }
  </style>
</head>
<body>

  <!-- NAV -->
  <nav>
    <div class="logo">Send<span>fro</span></div>
    <a href="#waitlist" class="nav-cta">Join the waitlist</a>
  </nav>

  <!-- HERO -->
  <section style="background: var(--cream);">
    <div class="hero">
      <div class="hero-left">
        <div class="eyebrow">Launching in Nairobi</div>
        <h1>Send groceries<br>home to <em>Africa.</em><br>Not just cash.</h1>
        <p class="hero-body">
          You work hard to support your family back home. Sendfro lets you buy their groceries directly — we coordinate with a local merchant and deliver to their door. You see the proof.
        </p>
        <div id="waitlist">
          <div class="hero-form">
            <input type="email" id="emailInput" placeholder="Enter your email address" />
            <button class="btn-primary" onclick="handleSignup()">Notify me</button>
          </div>
          <p class="form-sub">
            Already want to send? Message us on <a href="https://wa.me/17322094392" target="_blank">WhatsApp →</a>
          </p>
          <p class="success-msg" id="successMsg">✅ You're on the list. We'll be in touch soon.</p>
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-card">
          <div class="card-label">Order for Mama · Nairobi</div>
          <ul class="order-items">
            <li>
              <span class="item-name"><span class="item-emoji">🌽</span> Unga (2kg)</span>
              <span class="item-price">KES 180</span>
            </li>
            <li>
              <span class="item-name"><span class="item-emoji">🍚</span> Rice (2kg)</span>
              <span class="item-price">KES 240</span>
            </li>
            <li>
              <span class="item-name"><span class="item-emoji">🥚</span> Eggs × 12</span>
              <span class="item-price">KES 220</span>
            </li>
            <li>
              <span class="item-name"><span class="item-emoji">🫙</span> Cooking oil (1L)</span>
              <span class="item-price">KES 310</span>
            </li>
            <li>
              <span class="item-name"><span class="item-emoji">🧴</span> Soap + Toothpaste</span>
              <span class="item-price">KES 190</span>
            </li>
          </ul>
          <div class="card-total">
            <span class="total-label">Total paid (USD)</span>
            <span class="total-amount">$11.20</span>
          </div>
          <div class="card-delivery">
            <div class="delivery-dot"></div>
            <div class="delivery-text">
              <strong>Delivered · 11:42 AM</strong>
              Photo sent to you on WhatsApp
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="section reveal">
    <div class="section-label">How it works</div>
    <div class="section-title">Four steps.<br>Your family eats.</div>
    <div class="steps">
      <div class="step">
        <div class="step-num">01</div>
        <div class="step-icon">🛒</div>
        <h3>You pick the items</h3>
        <p>Choose from our curated list of 25 household essentials. Fixed prices, no surprises.</p>
      </div>
      <div class="step">
        <div class="step-num">02</div>
        <div class="step-icon">💳</div>
        <h3>You pay in USD</h3>
        <p>Secure checkout with your card. We handle the currency conversion and local payment.</p>
      </div>
      <div class="step">
        <div class="step-num">03</div>
        <div class="step-icon">🏍️</div>
        <h3>We coordinate delivery</h3>
        <p>Our local merchant packs the order. A trusted rider delivers it directly to your recipient.</p>
      </div>
      <div class="step">
        <div class="step-num">04</div>
        <div class="step-icon">📸</div>
        <h3>You get proof</h3>
        <p>A timestamped photo is sent to your WhatsApp the moment goods are in your family's hands.</p>
      </div>
    </div>
  </section>

  <!-- WHY SENDFRO -->
  <section class="why-section">
    <div class="why-inner">
      <div class="reveal">
        <div class="why-label">Why Sendfro exists</div>
        <div class="why-title">Sending money home<br>doesn't always mean<br><em>the bills get paid.</em></div>
      </div>
      <ul class="pain-points reveal">
        <li class="pain-point">
          <span class="pain-icon">💸</span>
          <div class="pain-text">
            <h4>Cash gets redirected</h4>
            <p>The $100 you sent for groceries becomes airtime, debt repayment, or a request you didn't plan for.</p>
          </div>
        </li>
        <li class="pain-point">
          <span class="pain-icon">🔍</span>
          <div class="pain-text">
            <h4>No visibility after sending</h4>
            <p>Once the transfer clears, you have no idea what actually happened with the money.</p>
          </div>
        </li>
        <li class="pain-point">
          <span class="pain-icon">😰</span>
          <div class="pain-text">
            <h4>The worry never stops</h4>
            <p>You work thousands of miles away, wondering if your mother has food in the house this week.</p>
          </div>
        </li>
      </ul>
    </div>
  </section>

  <!-- PROOF / TESTIMONIALS -->
  <section class="proof-section reveal">
    <div class="section-label">Early feedback</div>
    <div class="section-title">What people in the diaspora say</div>
    <p class="proof-sub">From conversations with Kenyans in the US during our research phase.</p>
    <div class="proof-grid">
      <div class="proof-card">
        <p class="proof-quote">"I send money every month but I never actually know what it's being used for. This is the first time I've felt like I'm genuinely providing for my family, not just hoping."</p>
        <div class="proof-author">
          <div class="proof-avatar">👤</div>
          <div>
            <div class="proof-name">James M.</div>
            <div class="proof-location">Atlanta, GA → Nairobi</div>
          </div>
        </div>
      </div>
      <div class="proof-card">
        <p class="proof-quote">"My aunt always says she needs money for food but then I hear she's struggling with rent. I want to make sure the food part is actually covered — that's all I want."</p>
        <div class="proof-author">
          <div class="proof-avatar">👤</div>
          <div>
            <div class="proof-name">Aisha K.</div>
            <div class="proof-location">Houston, TX → Nairobi</div>
          </div>
        </div>
      </div>
      <div class="proof-card">
        <p class="proof-quote">"I don't trust mobile money for this. Too many times the money arrives and then something comes up. I need groceries to actually show up at the door."</p>
        <div class="proof-author">
          <div class="proof-avatar">👤</div>
          <div>
            <div class="proof-name">David O.</div>
            <div class="proof-location">Minneapolis, MN → Nairobi</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CATALOG TEASER -->
  <section class="catalog-section reveal">
    <div class="catalog-inner">
      <div class="section-label">What we deliver</div>
      <div class="section-title">25 essential items.<br>Curated for Nairobi households.</div>
      <div class="catalog-chips">
        <div class="chip">🌽 Unga (2kg)</div>
        <div class="chip">🍚 Rice (2kg)</div>
        <div class="chip">🥚 Eggs × 12</div>
        <div class="chip">🫙 Cooking oil</div>
        <div class="chip">🧂 Sugar + Salt</div>
        <div class="chip">🍅 Tomatoes</div>
        <div class="chip">🧅 Onions</div>
        <div class="chip">🥬 Sukuma wiki</div>
        <div class="chip">🍗 Chicken (500g)</div>
        <div class="chip">🥩 Beef (500g)</div>
        <div class="chip">🧴 Bar soap</div>
        <div class="chip">🪥 Toothpaste</div>
        <div class="chip">🩹 Sanitary pads</div>
        <div class="chip">🍼 Uji flour</div>
        <div class="chip">🔥 Matches + Charcoal</div>
        <div class="chip">+ 10 more</div>
      </div>
      <p class="catalog-note">All items are <strong>fixed price</strong>, updated weekly. No custom quantities. No substitutions without your approval.</p>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final-cta reveal">
    <h2>Your family deserves<br><em>certainty,</em> not hope.</h2>
    <p>Sendfro is launching in Nairobi soon. Join the waitlist to be among the first to send — or message us on WhatsApp if you want to place an order now.</p>
    <div class="cta-row">
      <div>
        <div class="hero-form" style="justify-content: center;">
          <input type="email" id="emailInput2" placeholder="Your email address" style="min-width:220px;" />
          <button class="btn-primary" onclick="handleSignup2()">Join waitlist</button>
        </div>
        <p class="success-msg" id="successMsg2" style="text-align:center; margin-top:12px;">✅ You're on the list. We'll be in touch soon.</p>
      </div>
      <a href="https://wa.me/17322094392" target="_blank" class="btn-secondary">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        Order now via WhatsApp
      </a>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-logo">Send<span>fro</span></div>
    <p>Starting in Nairobi. Built for the diaspora.</p>
    <p>© 2025 Sendfro. All rights reserved.</p>
  </footer>

  <script>
    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // Email signup (top form)
    function handleSignup() {
      const email = document.getElementById('emailInput').value.trim();
      if (!email || !email.includes('@')) {
        document.getElementById('emailInput').style.borderColor = '#E05C3A';
        return;
      }
      document.getElementById('emailInput').style.borderColor = '';
      document.getElementById('successMsg').style.display = 'block';
      document.getElementById('emailInput').value = '';
      // TODO: POST to your email collection endpoint (Mailchimp, Airtable, etc.)
      console.log('Waitlist signup:', email);
    }

    // Email signup (bottom form)
    function handleSignup2() {
      const email = document.getElementById('emailInput2').value.trim();
      if (!email || !email.includes('@')) {
        document.getElementById('emailInput2').style.borderColor = '#E05C3A';
        return;
      }
      document.getElementById('emailInput2').style.borderColor = '';
      document.getElementById('successMsg2').style.display = 'block';
      document.getElementById('emailInput2').value = '';
      console.log('Waitlist signup:', email);
    }

    // Enter key support
    document.getElementById('emailInput').addEventListener('keydown', e => { if (e.key === 'Enter') handleSignup(); });
    document.getElementById('emailInput2').addEventListener('keydown', e => { if (e.key === 'Enter') handleSignup2(); });
  </script>
</body>
</html>