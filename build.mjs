// Generates two site versions (a, b) x three pages from shared content.
import { mkdirSync, writeFileSync } from 'node:fs';
const out = process.argv[2];

// Placeholders are wrapped in <mark class="ph"> so they are easy to spot and replace.
const ph = (t) => `<mark class="ph">[${t}]</mark>`;

const pages = {
  index: {
    title: 'Local Vending KC',
    body: (v) => `
<section class="hero"><div class="wrap">
  <p class="eyebrow">Kansas City</p>
  <h1>${v === 'a' ? 'Good food, close to home.' : 'Vending, rebuilt for Kansas City.'}</h1>
  <p class="lead">Local Vending KC brings fresh, locally sourced products to the places people already are: workplaces, gyms, clinics and community spaces. ${ph('one-line mission from the business plan')}</p>
  <p><a class="btn" href="brands.html">See the brands</a> <a class="btn ghost" href="bio.html">Meet Heidi</a></p>
</div></section>
<section><div class="wrap">
  <h2>What is Local Vending?</h2>
  <p>${ph('Plain-language explanation of the concept, from the business plan')}</p>
  <div class="cards">
    <article><h3>Local</h3><p>${ph('Local sourcing story')}</p></article>
    <article><h3>Fresh</h3><p>${ph('Quality and freshness story')}</p></article>
    <article><h3>Convenient</h3><p>${ph('Placement and service model')}</p></article>
  </div>
</div></section>
<section class="alt"><div class="wrap">
  <h2>Where we place machines</h2>
  <p>${ph('Target locations and partner types')}</p>
  <h2>Partner with us</h2>
  <p>Host a machine or carry a brand. <a href="bio.html#contact">Get in touch</a>.</p>
</div></section>`,
  },
  bio: {
    title: 'About Heidi',
    body: () => `
<section class="hero small"><div class="wrap">
  <p class="eyebrow">About</p><h1>Heidi Van Pelt</h1>
  <p class="lead">${ph('Short professional headline')}</p>
</div></section>
<section><div class="wrap two">
  <div class="photo">${ph('Headshot')}</div>
  <div>
    <h2>Background</h2>
    <p>${ph('Bio paragraph: who Heidi is and why she started Local Vending KC')}</p>
    <h2>Experience</h2>
    <ul><li>${ph('Role / company / years')}</li><li>${ph('Role / company / years')}</li><li>${ph('Role / company / years')}</li></ul>
  </div>
</div></section>
<section class="alt" id="contact"><div class="wrap">
  <h2>Get in touch</h2>
  <p>For machine placement, wholesale or press:</p>
  <ul class="plain"><li>Email: ${ph('email')}</li><li>Phone: ${ph('phone')}</li><li>Social: ${ph('links')}</li></ul>
</div></section>`,
  },
  brands: {
    title: 'Our Brands',
    body: () => `
<section class="hero small"><div class="wrap">
  <p class="eyebrow">Brands</p><h1>The brands behind the machines</h1>
  <p class="lead">${ph('Intro line about the brand family')}</p>
</div></section>
<section><div class="wrap"><div class="cards three">
  <article><div class="logo">${ph('Logo')}</div><h3>${ph('Milk brand name')}</h3><p>${ph('Description of the milk brand')}</p></article>
  <article><div class="logo">${ph('Logo')}</div><h3>${ph('Food brand name')}</h3><p>${ph('Description of the food brand')}</p></article>
  <article><div class="logo">${ph('Logo')}</div><h3>${ph('Other brand')}</h3><p>${ph('Description')}</p></article>
</div></div></section>`,
  },
};

const css = {
  a: `:root{--bg:#fbf7ef;--ink:#2b2b26;--accent:#3f6b3a;--alt:#f0e9d8;--card:#fff}
body{font-family:Georgia,'Times New Roman',serif}h1,h2,h3{font-family:Georgia,serif;font-weight:600}
.hero{padding:96px 0;background:linear-gradient(180deg,#e9f0dc,var(--bg))}.btn{border-radius:999px}`,
  b: `:root{--bg:#0f1b2d;--ink:#eef2f7;--accent:#ff8a3d;--alt:#16263d;--card:#1b2f4b}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif}h1,h2,h3{font-weight:800;letter-spacing:-.02em}
.hero{padding:110px 0;background:radial-gradient(900px 400px at 80% 0,#24406a,var(--bg))}h1{font-size:clamp(2.4rem,6vw,4.2rem)}.btn{border-radius:6px;color:#0f1b2d}.btn.ghost{color:var(--accent)}.eyebrow{text-transform:uppercase;letter-spacing:.15em}`,
};

const base = `*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);line-height:1.65}
.wrap{max-width:1040px;margin:auto;padding:0 20px}a{color:var(--accent)}
header{position:sticky;top:0;background:var(--bg);border-bottom:1px solid #8884;z-index:5}
header .wrap{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px}
header strong{font-size:1.15rem}nav a{margin-left:18px;text-decoration:none;color:var(--ink)}nav a.on{color:var(--accent);font-weight:700}
h1{font-size:clamp(2rem,5vw,3.4rem);line-height:1.1;margin:.2em 0}.hero.small{padding:56px 0}
.eyebrow{color:var(--accent);font-weight:700;margin:0}.lead{font-size:1.2rem;max-width:640px}
section{padding:56px 0}.alt{background:var(--alt)}
.btn{display:inline-block;background:var(--accent);color:#fff;padding:12px 24px;text-decoration:none;font-weight:700;margin-right:8px}
.btn.ghost{background:none;border:2px solid var(--accent);color:var(--accent)}
.cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin-top:20px}
article{background:var(--card);padding:24px;border-radius:12px;border:1px solid #8883}
.logo,.photo{background:#8882;border:2px dashed #8886;display:grid;place-items:center;min-height:120px;border-radius:12px;margin-bottom:12px}
.photo{min-height:320px}.two{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:36px}
@media(max-width:700px){.two{grid-template-columns:1fr}}
.plain{list-style:none;padding:0}.ph{background:#ffe27a;color:#4a3b00;padding:0 4px;border-radius:3px;font-size:.92em}
footer{padding:32px 0;text-align:center;opacity:.7;font-size:.9rem}`;

const nav = [['index', 'Local Vending'], ['bio', 'About Heidi'], ['brands', 'Brands']];
for (const v of ['a', 'b']) {
  mkdirSync(`${out}/${v}`, { recursive: true });
  writeFileSync(`${out}/${v}/style.css`, base + css[v]);
  for (const [key, p] of Object.entries(pages)) {
    const links = nav.map(([k, l]) => `<a href="${k}.html"${k === key ? ' class="on"' : ''}>${l}</a>`).join('');
    writeFileSync(`${out}/${v}/${key}.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${p.title} | Local Vending KC</title><link rel="stylesheet" href="style.css"></head><body>
<header><div class="wrap"><strong>Local Vending KC</strong><nav>${links}</nav></div></header>
<main>${p.body(v)}</main>
<footer><div class="wrap">© Local Vending KC · Kansas City, MO · Draft with placeholder content</div></footer></body></html>`);
  }
}
writeFileSync(`${out}/index.html`, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Local Vending KC: Site Options</title>
<style>body{font-family:system-ui;max-width:640px;margin:60px auto;padding:0 20px;line-height:1.6}a.c{display:block;padding:20px;border:1px solid #ccc;border-radius:10px;margin:14px 0;text-decoration:none;color:inherit}a.c:hover{border-color:#000}</style></head><body>
<h1>Local Vending KC: two design options</h1><p>Each option has three pages: Local Vending, About Heidi, and Brands. Yellow text marks content still to be filled in.</p>
<a class="c" href="a/index.html"><strong>Option A: Fresh &amp; Warm</strong><br>Cream and green, serif type, friendly and organic.</a>
<a class="c" href="b/index.html"><strong>Option B: Bold &amp; Modern</strong><br>Dark navy with orange accents, sans-serif, high contrast.</a></body></html>`);
