// Generates two bright, playful site versions (a, b) x three pages.
// Content comes from Heidi's emails (Sep 23 - Oct 25 2026). Lease/purchase/funding details are deliberately left out.
import { mkdirSync, writeFileSync } from 'node:fs';
const out = process.argv[2];

const ph = (t) => `<mark class="ph">[${t}]</mark>`;

const letters = [
  ['L', 'Local, Fresh, Better Together'],
  ['O', 'Good Food, Brighter KC'],
  ['V', 'Organic, Local, Delicious'],
  ['E', 'Fuel a Kinder KC'],
  ['K', 'Kansas City Grown'],
  ['C', 'Healthier Community, Happier KC'],
];
const lovekc = `<div class="lovekc" aria-label="LOVE KC">${letters.map(([l, t], i) => `<button type="button" class="ltr c${i}"><span class="l">${l}</span><span class="tip">${t}</span></button>`).join('')}</div>`;

// Inline SVG vending machine; slot colours come from CSS variables so each theme recolours it.
const slots = ['🥛', '🥪', '🍦', '🧃', '🥗', '🧇', '🍓', '🥤', '🥖'];
const machine = `<div class="machine" aria-hidden="true">
  <div class="mtop">LOCAL VENDING <b>KC</b></div>
  <div class="mbody"><div class="glass">${slots.map((s, i) => `<span class="slot s${i % 5}">${s}</span>`).join('')}</div>
  <div class="mside"><i></i><i></i><i></i><div class="coin"></div></div></div>
  <div class="mtray">fresh &amp; local ↓</div>
</div>`;

const ticker = ['Local', 'Fresh', 'Organic', 'Kansas City Grown', 'Milk Bar', 'Soft Serve', 'Better Together', 'Healthy Snacks']
  .map((t) => `<span>${t}</span><span class="dot">✺</span>`).join('');
const marquee = `<div class="marquee" aria-hidden="true"><div class="track">${ticker}${ticker}</div></div>`;

const pages = {
  index: {
    title: 'Local Vending KC',
    body: (v) => `
<section class="hero"><div class="wrap heroGrid">
  <div>
    <p class="eyebrow">Kansas City's friendliest mini-market</p>
    <h1>${v === 'a' ? 'Good food, <span class="hl">close to home</span>.' : 'Snack <span class="hl">local</span>. Feel <span class="hl2">good</span>.'}</h1>
    ${lovekc}
    <p class="lead">Fresh, organic, Kansas City&#8209;made food and drink, in vending machines and a milk bar near you. Tap a letter to see what we stand for.</p>
    <p><a class="btn" href="brands.html">Meet the brands</a> <a class="btn ghost" href="bio.html#contact">Host a machine</a></p>
  </div>
  ${machine}
</div></section>
${marquee}
<section><div class="wrap">
  <h2 class="center">What is <span class="hl">Local Vending</span>?</h2>
  <p class="center narrow">Local Vending KC is a vendor, retailer, wholesaler and co-packer. We make and distribute a family of more than five food and drink brands, then put them where Kansas City already is. Every market gets its own city letters, <em>Local Vending (KC)</em>, so it is always truly local.</p>
  <div class="cards">
    <article class="pop p1"><div class="big">🥗</div><h3>Vend</h3><p>Fresh ready&#8209;made food and drinks in machines at coffee shops, luxury apartments and other prime spots.</p></article>
    <article class="pop p2"><div class="big">🧇</div><h3>Make</h3><p>Sauces, milks and waffles produced for wholesale and retail, and co&#8209;packed for our brands.</p></article>
    <article class="pop p3"><div class="big">🥛</div><h3>Serve</h3><p>The Moloko Milk Bar: coolers of sandwiches, sides, fresh juices, fruit milks and herbal&#8209;infused milks.</p></article>
  </div>
</div></section>
<section class="band"><div class="wrap">
  <h2 class="center">What's on the shelf</h2>
  <div class="shelf">
    <div class="item i0"><span>🥪</span>Sandwiches</div><div class="item i1"><span>🧃</span>Fresh juices</div>
    <div class="item i2"><span>🍓</span>Fruit milks</div><div class="item i3"><span>🌿</span>Herbal milks</div>
    <div class="item i4"><span>🍦</span>Soft serve &amp; pints</div><div class="item i0"><span>🧇</span>Waffles</div>
    <div class="item i1"><span>🥖</span>Organic bread</div><div class="item i2"><span>🥫</span>Sauces</div>
  </div>
</div></section>
<section><div class="wrap">
  <h2 class="center">Our <span class="hl">roadmap</span></h2>
  <div class="path">
    <div class="step"><b>1</b><h3>Start</h3><p>New vending accounts in Kansas City coffee shops.</p></div>
    <div class="step"><b>2</b><h3>Next</h3><p>A walk-up space for ready-made sandwiches, drinks and frozen pints. No seating.</p></div>
    <div class="step"><b>3</b><h3>Then</h3><p>Making sauces, milks and waffles for wholesale and retail, sold in our machines too.</p></div>
  </div>
  <div class="sunday"><span>🍨</span><div><h3>Ice Cream Sunday</h3><p>Every week: fresh&#8209;baked organic bread, pizza, sandwiches, soft serve and all the toppings.</p></div></div>
</div></section>
<section class="cta"><div class="wrap center"><h2>Want a machine at your place?</h2><p>Host a machine, carry a brand or co&#8209;pack with us.</p><a class="btn" href="bio.html#contact">Say hello</a></div></section>`,
  },
  bio: {
    title: 'About Heidi',
    body: () => `
<section class="hero small"><div class="wrap">
  <p class="eyebrow">Meet the founder</p><h1>Heidi <span class="hl">Van Pelt</span></h1>
  <p class="lead">Founder of Local Vending KC and creator of more than five food and drink brands.</p>
</div></section>
${marquee}
<section><div class="wrap two">
  <div class="photo">${ph('Headshot')}</div>
  <div>
    <h2>Background</h2>
    <p>Heidi is building a Kansas City food company around one idea: good food that is local, organic and easy to grab. She is the founder behind Local Vending KC, LLC and the Moloko Milk Bar, and she develops and co&#8209;packs her own brands.</p>
    <p>${ph('Add Heidi’s own story in a few sentences')}</p>
    <h2>Experience</h2>
    <ul class="ticks"><li>${ph('Role / company / years')}</li><li>${ph('Role / company / years')}</li><li>${ph('Role / company / years')}</li></ul>
  </div>
</div></section>
<section class="band" id="contact"><div class="wrap">
  <h2 class="center">Let's <span class="hl">talk</span></h2>
  <p class="center">For machine placement, wholesale, co&#8209;packing or press:</p>
  <div class="cards">
    <article class="pop p1"><div class="big">✉️</div><h3>Email</h3><p><a href="mailto:heidivanpelt@protonmail.com">heidivanpelt@protonmail.com</a></p></article>
    <article class="pop p2"><div class="big">📞</div><h3>Phone</h3><p>${ph('phone')}</p></article>
    <article class="pop p3"><div class="big">📱</div><h3>Social</h3><p>${ph('links')}</p></article>
  </div>
</div></section>`,
  },
  brands: {
    title: 'Our Brands',
    body: () => `
<section class="hero small"><div class="wrap">
  <p class="eyebrow">The family</p><h1>The <span class="hl">brands</span> behind the machines</h1>
  <p class="lead">Heidi's family of more than five brands, made, co&#8209;packed and distributed through Local Vending KC.</p>
</div></section>
${marquee}
<section><div class="wrap"><div class="cards three">
  <article class="pop p1"><div class="logo">${ph('Moloko Milk Bar logo')}</div><h3>Moloko Milk Bar</h3><p>A public milk bar with retail coolers of sandwiches, sides, fresh juices, fruit milks and herbal&#8209;infused milks, plus soft serve and snacks.</p></article>
  <article class="pop p2"><div class="logo">${ph('LOVEKC logo')}</div><h3>Local Vending KC · FüD Factory</h3><p>The vending, wholesale and co&#8209;packing arm: sauces, milks and waffles, distributed to machines and retailers across Kansas City.</p></article>
  <article class="pop p3"><div class="logo">${ph('Logo')}</div><h3>${ph('Brand name')}</h3><p>${ph('Description')}</p></article>
  <article class="pop p1"><div class="logo">${ph('Logo')}</div><h3>${ph('Brand name')}</h3><p>${ph('Description')}</p></article>
  <article class="pop p2"><div class="logo">${ph('Logo')}</div><h3>${ph('Brand name')}</h3><p>${ph('Description')}</p></article>
</div></div></section>
<section class="cta"><div class="wrap center"><h2>Carry our brands</h2><p>Coffee shops, apartments and retailers: let's fill your shelves.</p><a class="btn" href="bio.html#contact">Get in touch</a></div></section>`,
  },
};

// Shared layout. Colours/fonts/shape live in per-theme variables below.
const base = `*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;background:var(--bg);color:var(--ink);font-family:var(--body);line-height:1.6;overflow-x:hidden}
.wrap{max-width:1100px;margin:auto;padding:0 20px}a{color:var(--a1)}
h1,h2,h3{font-family:var(--head);line-height:1.08;margin:.3em 0}
h1{font-size:clamp(2.4rem,6.5vw,4.6rem)}h2{font-size:clamp(1.8rem,4vw,2.8rem)}
.center{text-align:center}.narrow{max-width:760px;margin:0 auto 1em}
header{position:sticky;top:0;z-index:20;background:var(--bg);border-bottom:var(--bw) solid var(--ink)}
header .wrap{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding-top:10px;padding-bottom:10px}
.logoT{font-family:var(--head);font-size:1.4rem;font-weight:700;text-decoration:none;color:var(--ink)}.logoT b{color:var(--a1)}
nav a{margin-left:8px;text-decoration:none;color:var(--ink);font-weight:700;padding:6px 14px;border-radius:var(--r);border:var(--bw) solid transparent}
nav a:hover{background:var(--a3)}nav a.on{background:var(--a2);border-color:var(--ink)}
.hero{padding:70px 0 60px;background:var(--herobg)}.hero.small{padding:56px 0}
.heroGrid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:30px;align-items:center}
@media(max-width:820px){.heroGrid{grid-template-columns:1fr}}
.eyebrow{display:inline-block;background:var(--a2);border:var(--bw) solid var(--ink);padding:4px 14px;border-radius:99px;font-weight:800;font-size:.85rem;margin:0}
.hl{background:var(--a2);padding:0 .15em;border-radius:.2em;box-decoration-break:clone;-webkit-box-decoration-break:clone}.hl2{color:var(--a1)}
.lead{font-size:1.2rem;max-width:620px}
.btn{display:inline-block;background:var(--a1);color:var(--btnink);padding:13px 26px;border-radius:var(--r);border:var(--bw) solid var(--ink);box-shadow:var(--sh);text-decoration:none;font-weight:800;margin:6px 10px 6px 0;transition:transform .15s,box-shadow .15s}
.btn:hover{transform:translate(-2px,-2px);box-shadow:var(--shh)}.btn.ghost{background:var(--card);color:var(--ink)}
section{padding:60px 0}.band{background:var(--band)}.cta{background:var(--a3)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:22px;margin-top:26px}
.pop{background:var(--card);padding:26px;border-radius:var(--r2);border:var(--bw) solid var(--ink);box-shadow:var(--sh);transition:transform .2s}
.pop:hover{transform:translateY(-6px) rotate(-1deg)}.p1{background:var(--c1)}.p2{background:var(--c2)}.p3{background:var(--c3)}
.big{font-size:3rem}.pop h3{font-size:1.5rem}
.shelf{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:14px;margin-top:24px}
.item{border:var(--bw) solid var(--ink);border-radius:var(--r2);padding:16px;text-align:center;font-weight:800;box-shadow:var(--sh)}
.item span{display:block;font-size:2.4rem;transition:transform .2s}.item:hover span{transform:scale(1.3) rotate(8deg)}
.i0{background:var(--c1)}.i1{background:var(--c2)}.i2{background:var(--c3)}.i3{background:var(--c4)}.i4{background:var(--c5)}
.path{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px;margin:28px 0}
.step{position:relative;background:var(--card);border:var(--bw) solid var(--ink);border-radius:var(--r2);padding:26px 22px 22px;box-shadow:var(--sh)}
.step b{position:absolute;top:-18px;left:18px;width:40px;height:40px;border-radius:50%;background:var(--a1);color:var(--btnink);border:var(--bw) solid var(--ink);display:grid;place-items:center;font-size:1.2rem}
.sunday{display:flex;gap:18px;align-items:center;background:var(--c3);border:var(--bw) solid var(--ink);border-radius:var(--r2);padding:20px 26px;box-shadow:var(--sh)}
.sunday span{font-size:3.4rem}.sunday h3{margin:0}.sunday p{margin:.2em 0 0}
.marquee{overflow:hidden;background:var(--ink);color:var(--bg);border-block:var(--bw) solid var(--ink);padding:10px 0;white-space:nowrap;font-family:var(--head);font-weight:700;font-size:1.2rem}
.track{display:inline-block;animation:slide 30s linear infinite}.marquee span{margin:0 14px}.dot{color:var(--a2)}
@keyframes slide{to{transform:translateX(-50%)}}
.machine{max-width:340px;margin:auto;width:100%;border:var(--bw) solid var(--ink);border-radius:var(--r2);background:var(--a1);box-shadow:8px 8px 0 var(--ink);padding:14px;transform:rotate(2deg);animation:bob 4s ease-in-out infinite}
@keyframes bob{50%{transform:rotate(-1.5deg) translateY(-8px)}}
.mtop{text-align:center;font-family:var(--head);font-weight:800;color:var(--btnink);letter-spacing:.05em;padding:4px 0 10px}.mtop b{background:var(--a2);color:var(--ink);padding:0 8px;border-radius:6px}
.mbody{display:grid;grid-template-columns:3fr 1fr;gap:10px}
.glass{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;background:#fff9;border:var(--bw) solid var(--ink);border-radius:12px;padding:10px}
.slot{aspect-ratio:1;border-radius:10px;border:2px solid var(--ink);display:grid;place-items:center;font-size:1.9rem}
.s0{background:var(--c1)}.s1{background:var(--c2)}.s2{background:var(--c3)}.s3{background:var(--c4)}.s4{background:var(--c5)}
.mside{background:var(--ink);border-radius:12px;padding:10px;display:flex;flex-direction:column;gap:8px;align-items:center}
.mside i{width:100%;height:12px;border-radius:6px;background:var(--a2)}.coin{margin-top:auto;width:22px;height:34px;border-radius:6px;background:var(--bg)}
.mtray{margin-top:12px;background:var(--ink);color:var(--bg);text-align:center;border-radius:10px;padding:8px;font-weight:700}
.lovekc{display:flex;gap:10px;flex-wrap:wrap;margin:22px 0}
.ltr{position:relative;width:78px;height:78px;border:var(--bw) solid var(--ink);border-radius:var(--r2);color:var(--ink);font:inherit;font-family:var(--head);font-size:2.4rem;font-weight:800;cursor:pointer;padding:0;display:grid;place-items:center;box-shadow:var(--sh);transition:transform .15s}
.ltr:hover,.ltr:focus{transform:translateY(-6px) rotate(-4deg);outline:none}
.c0{background:var(--c1)}.c1{background:var(--c2)}.c2{background:var(--c3)}.c3{background:var(--c4)}.c4{background:var(--c5)}.c5{background:var(--c1)}
.ltr .tip{position:absolute;inset:0;background:#fff;color:#000;border-radius:calc(var(--r2) - 2px);font-family:var(--body);font-size:.74rem;font-weight:800;line-height:1.15;padding:6px;display:none;place-items:center;text-align:center}
.ltr:hover .tip,.ltr:focus .tip{display:grid}.ltr:hover .l,.ltr:focus .l{visibility:hidden}
.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:36px}@media(max-width:700px){.two{grid-template-columns:1fr}}
.logo,.photo{background:#fff8;border:3px dashed var(--ink);display:grid;place-items:center;min-height:120px;border-radius:var(--r2);margin-bottom:14px;text-align:center}.photo{min-height:340px}
.ticks{list-style:none;padding:0}.ticks li:before{content:"✔ ";color:var(--a1);font-weight:800}
.ph{background:#ffe27a;color:#4a3b00;padding:0 4px;border-radius:3px;font-size:.92em}
footer{padding:34px 0;text-align:center;font-weight:700;border-top:var(--bw) solid var(--ink);background:var(--bg)}
@media(prefers-reduced-motion:reduce){.track,.machine{animation:none}}`;

const themes = {
  // A: sunny farmers-market. Warm cream, tomato, leaf green, sunshine.
  a: {
    font: 'Fredoka:wght@500;600;700&family=Nunito:wght@500;700;800',
    css: `:root{--bg:#fff8e7;--ink:#2a2118;--card:#fff;--a1:#e8472f;--a2:#ffcf33;--a3:#bfe8a8;--btnink:#fff;--band:#ffeaf0;
--c1:#ffd9d2;--c2:#fff0a8;--c3:#c9efb5;--c4:#cde6ff;--c5:#ffd6ec;
--head:'Fredoka',system-ui,sans-serif;--body:'Nunito',system-ui,sans-serif;--r:99px;--r2:22px;--bw:3px;--sh:5px 5px 0 var(--ink);--shh:8px 8px 0 var(--ink);
--herobg:radial-gradient(circle at 85% 20%,#ffe48a 0,transparent 40%),radial-gradient(circle at 5% 90%,#c9efb5 0,transparent 40%),var(--bg)}`,
  },
  // B: pop neon mini-mart. Deep grape ink, mint, hot pink, lemon.
  b: {
    font: 'Space+Grotesk:wght@500;700&family=Bricolage+Grotesque:wght@700;800',
    css: `:root{--bg:#fff4fb;--ink:#1d1033;--card:#fff;--a1:#ff3d9a;--a2:#c8ff3d;--a3:#7df0d3;--btnink:#1d1033;--band:#e9ffd9;
--c1:#ffb3dc;--c2:#d9ff7a;--c3:#8ff2dc;--c4:#ffe066;--c5:#b9a6ff;
--head:'Bricolage Grotesque',system-ui,sans-serif;--body:'Space Grotesk',system-ui,sans-serif;--r:10px;--r2:6px;--bw:3px;--sh:6px 6px 0 var(--ink);--shh:9px 9px 0 var(--ink);
--herobg:linear-gradient(135deg,#7df0d3 0,#7df0d3 35%,transparent 35%),radial-gradient(circle at 90% 10%,#ffb3dc 0,transparent 45%),var(--bg)}
h1{text-transform:uppercase;letter-spacing:-.02em}.eyebrow{text-transform:uppercase;letter-spacing:.1em}.pop:hover{transform:translate(-4px,-4px) rotate(1deg)}`,
  },
};

const nav = [['index', 'Home'], ['bio', 'About Heidi'], ['brands', 'Brands']];
for (const v of ['a', 'b']) {
  mkdirSync(`${out}/${v}`, { recursive: true });
  writeFileSync(`${out}/${v}/style.css`, themes[v].css + base);
  for (const [key, p] of Object.entries(pages)) {
    const links = nav.map(([k, l]) => `<a href="${k}.html"${k === key ? ' class="on"' : ''}>${l}</a>`).join('');
    writeFileSync(`${out}/${v}/${key}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${p.title} | Local Vending KC</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=${themes[v].font}&display=swap" rel="stylesheet"><link rel="stylesheet" href="style.css"></head><body>
<header><div class="wrap"><a class="logoT" href="index.html">Local Vending <b>KC</b></a><nav>${links}</nav></div></header>
<main>${p.body(v)}</main>
<footer><div class="wrap">© Local Vending KC · Kansas City, MO · Draft for review</div></footer></body></html>`);
  }
}
writeFileSync(`${out}/index.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local Vending KC: Site Options</title>
<style>body{font-family:system-ui;max-width:680px;margin:60px auto;padding:0 20px;line-height:1.6;background:#fffdf5}h1{font-size:2.2rem}a.c{display:block;padding:22px;border:3px solid #222;border-radius:18px;margin:18px 0;text-decoration:none;color:#222;box-shadow:5px 5px 0 #222;transition:transform .15s}a.c:hover{transform:translate(-3px,-3px)}.a{background:#ffe48a}.b{background:#ff9fd2}mark{background:#ffe27a;padding:0 4px}</style></head><body>
<h1>Local Vending KC: two design options</h1><p>Each option has three pages: Home, About Heidi, and Brands. <mark>Yellow</mark> text marks content still to be filled in.</p>
<a class="c a" href="a/index.html"><strong>Option A: Sunny Market</strong><br>Warm cream, tomato red and leaf green. Rounded, friendly, farmers-market feel.</a>
<a class="c b" href="b/index.html"><strong>Option B: Pop Mini-Mart</strong><br>Hot pink, lime and mint with chunky offset shadows. Loud, fun, snack-aisle feel.</a></body></html>`);
