/** Original, data-driven ONURIM 4:5 social artwork. Run: node scripts/social-creative-v2.mjs input.json output-dir */
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [input, output, requestedMode] = process.argv.slice(2);
if (!input || !output) throw new Error('usage: node scripts/social-creative-v2.cjs input.json output-dir');
const data = JSON.parse(fs.readFileSync(input, 'utf8'));
const required = ['campaign_id', 'brand', 'theme', 'headline', 'subheadline', 'key_points', 'disclaimer', 'visual_mode', 'landing_path'];
for (const key of required) if (!data[key]) throw new Error(`missing ${key}`);
if (!Array.isArray(data.key_points) || data.key_points.length !== 4) throw new Error('key_points must contain four labels');
if (!/^\/health(?:\/|$)/.test(data.landing_path)) throw new Error('ONURIM landing must be /health or /health/*');
if (data.headline.length > 36 || data.subheadline.length > 34 || data.key_points.some(x => x.length > 9)) throw new Error('Artwork copy exceeds short-form limits');

const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const txt = (x, y, value, size, color, weight = 700, extra = '') => `<text x="${x}" y="${y}" font-family="Malgun Gothic, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" ${extra}>${escape(value)}</text>`;
const base = (defs, body) => `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350"><defs>${defs}</defs>${body}</svg>`;
const brand = (color, x = 76, y = 98) => `${txt(x,y,data.brand,34,color,800,'letter-spacing="4"')}${txt(x,y+34,'by Biz2Lab',18,color,500,'letter-spacing="1"')}`;
const headline = mode => {
  const copy = data.mode_copy?.[mode] ?? data.headline;
  const lines = Array.isArray(copy) ? copy : String(copy).split('|');
  if (lines.length !== 2 || lines.some(line => !line || line.length > 18)) throw new Error(`${mode}: headline needs two short lines`);
  return lines;
};
const cta = data.cta || '오누림 건강 가이드에서 이어보기';

function premium() {
  const [h1,h2] = headline('premium_3d');
  const defs = `
    <linearGradient id="bg" x2="1" y2="1"><stop stop-color="#071723"/><stop offset=".54" stop-color="#102f3e"/><stop offset="1" stop-color="#061b30"/></linearGradient>
    <radialGradient id="halo"><stop stop-color="#3cd9c0" stop-opacity=".55"/><stop offset="1" stop-color="#3cd9c0" stop-opacity="0"/></radialGradient>
    <linearGradient id="card" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#cfe9e7"/></linearGradient>
    <linearGradient id="glass" x2="1" y2="1"><stop stop-color="#e1fffa" stop-opacity=".32"/><stop offset="1" stop-color="#7b9eff" stop-opacity=".10"/></linearGradient>
    <linearGradient id="accent" x2="1" y2="0"><stop stop-color="#77f0d6"/><stop offset=".58" stop-color="#9cc6ff"/><stop offset="1" stop-color="#c9a3ff"/></linearGradient>
    <filter id="blur"><feGaussianBlur stdDeviation="44"/></filter>
    <filter id="shadow"><feDropShadow dx="0" dy="35" stdDeviation="29" flood-color="#000e1b" flood-opacity=".62"/></filter>
    <pattern id="grid" width="47" height="47" patternUnits="userSpaceOnUse"><path d="M47 0H0V47" fill="none" stroke="#99c8d0" stroke-opacity=".08"/></pattern>`;
  const card = `<g transform="rotate(-8 540 738)" filter="url(#shadow)">
    <rect x="190" y="478" width="700" height="480" rx="36" fill="url(#card)"/>
    <rect x="190" y="478" width="700" height="83" rx="36" fill="#e4faf5"/>
    <rect x="190" y="527" width="700" height="35" fill="#e4faf5"/>
    ${txt(238,532,'RESULT / READING',25,'#196b6c',800,'letter-spacing="3"')}
    <circle cx="824" cy="520" r="15" fill="#73e0cf"/>
    ${txt(242,641,'빨간 표시',32,'#657886',600)}
    ${txt(242,735,'↑',96,'#e76875',800)}
    <rect x="352" y="666" width="422" height="80" rx="20" fill="#f5faf8"/>
    ${txt(386,718,'숫자 하나만 보지 않기',32,'#163846',700)}
    <path d="M242 798H823" stroke="#b2d5d1" stroke-width="2"/>
    ${txt(242,863,'함께 읽어야 할 맥락이 있어요',29,'#48616a',600)}
    <path d="M242 902H683" stroke="#acc8c9" stroke-width="9" stroke-linecap="round"/>
    <path d="M242 902H486" stroke="#56d5bb" stroke-width="9" stroke-linecap="round"/>
  </g>`;
  const chips = [
    [96,580,data.key_points[0],'#6fe4d1',-8],
    [702,603,data.key_points[1],'#9cbaff',8],
    [75,947,data.key_points[2],'#c6a6f6',-5],
    [734,924,data.key_points[3],'#77e7c5',6],
  ].map(([x,y,label,c,angle],i)=>`<g transform="rotate(${angle} ${x+90} ${y+32})" filter="url(#shadow)"><rect x="${x}" y="${y}" width="${i===2?238:212}" height="76" rx="25" fill="#153a4a" fill-opacity=".96" stroke="${c}" stroke-opacity=".95" stroke-width="3"/>${txt(x+22,y+52,label,i===2?34:36,'#f5fffd',800)}</g>`).join('');
  return base(defs, `<rect width="1080" height="1350" fill="url(#bg)"/><rect width="1080" height="1350" fill="url(#grid)"/>
    <ellipse cx="618" cy="685" rx="650" ry="470" fill="url(#halo)" filter="url(#blur)"/>
    <circle cx="934" cy="191" r="147" fill="#7a84ff" opacity=".16" filter="url(#blur)"/>
    <path d="M0 0H1080V13H0Z" fill="url(#accent)"/>
    ${brand('#a0efde')}
    <rect x="746" y="68" width="254" height="48" rx="24" fill="#173b4b" stroke="#6fdccf" stroke-opacity=".7"/>
    ${txt(773,100,'HEALTH / 01—04',20,'#b9f4e8',700,'letter-spacing="2"')}
    ${txt(72,241,h1,82,'#f5faf7',800)}
    ${txt(72,346,h2,99,'url(#accent)',800)}
    ${txt(76,414,data.subheadline,31,'#b6d6d5',600)}
    <path d="M76 450H1004" stroke="#90d8cf" opacity=".35"/>
    ${card}${chips}
    <path d="M76 1085H1004" stroke="#98c8c6" opacity=".3"/>
    ${txt(76,1157,'결과지를 읽는 순서',43,'#f5faf7',700)}
    ${txt(77,1220,`${cta}  ↗`,29,'#8fe8d5',700)}
    ${txt(77,1293,data.disclaimer,24,'#c5dfe0',500)}`);
}

function editorial() {
  const [h1,h2] = headline('editorial');
  const defs = `<linearGradient id="paper" x2="1" y2="1"><stop stop-color="#fffefa"/><stop offset="1" stop-color="#f0eee7"/></linearGradient>
  <filter id="drop"><feDropShadow dx="0" dy="18" stdDeviation="17" flood-color="#2e3f58" flood-opacity=".22"/></filter>
  <pattern id="dots" width="12" height="12" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1.4" fill="#0a45c3" opacity=".18"/></pattern>`;
  const labels = data.key_points.map((s,i)=>`<g transform="translate(${i%2?568:98} ${870+Math.floor(i/2)*115})"><circle cx="15" cy="-11" r="10" fill="${['#ff745f','#c7e267','#0e4ac0','#ffad7d'][i]}"/>${txt(42,0,s,40,'#18314f',800)}</g>`).join('');
  return base(defs, `<rect width="1080" height="1350" fill="#f5f0e6"/>
    <path d="M0 0H1080V22H0Z" fill="#1546be"/><path d="M0 0H49V1350H0Z" fill="#e6eec9"/>
    <rect x="730" y="0" width="350" height="510" fill="url(#dots)"/>
    ${brand('#1946bb',96,103)}
    ${txt(719,89,'THE HEALTH ISSUE  ·  09/29',19,'#49607b',700,'letter-spacing="1"')}
    <path d="M96 141H987" stroke="#1946bb" stroke-width="3"/>
    ${txt(92,261,h1,78,'#153da3',800)}
    ${txt(92,357,h2,72,'#18314f',800)}
    <rect x="98" y="391" width="432" height="14" fill="#ff7664"/>
    ${txt(96,476,'숫자보다 먼저 보는 네 가지 맥락',31,'#4b5b68',600)}
    <g transform="rotate(-8 730 665)" filter="url(#drop)"><rect x="494" y="484" width="414" height="339" rx="9" fill="#ff755f"/>
      <rect x="516" y="480" width="414" height="339" rx="8" fill="url(#paper)"/>
      <path d="M547 545H892" stroke="#a9b8bf" stroke-width="4"/>
      ${txt(551,532,'RESULT NOTE',27,'#386197',800,'letter-spacing="2"')}
      <path d="M551 620H865M551 668H865M551 716H865" stroke="#c0cbd0" stroke-width="8" stroke-linecap="round"/>
      <rect x="790" y="583" width="66" height="38" rx="7" fill="#ffdeca"/>
      ${txt(796,613,'↑',32,'#eb685d',800)}
    </g>
    <path d="M100 793H981" stroke="#1d45a3" stroke-width="3"/>
    ${txt(95,766,'04',352,'#1546be',800,'letter-spacing="-35"')}
    <circle cx="905" cy="780" r="64" fill="#c7e267"/>
    <path d="M871 781l20 20 48-55" fill="none" stroke="#1546be" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    ${labels}
    <path d="M95 1150H986" stroke="#1d45a3" stroke-width="3"/>
    ${txt(96,1220,`${cta}  ↗`,34,'#1546be',800)}
    ${txt(96,1290,data.disclaimer,20,'#5e6870',500)}`);
}

function story() {
  const [h1,h2] = headline('friendly_story');
  const defs = `<linearGradient id="sky" x2="1" y2="1"><stop stop-color="#e8f8f4"/><stop offset="1" stop-color="#fef5e9"/></linearGradient>
    <linearGradient id="lens" x2="1" y2="1"><stop stop-color="#c8f6ec" stop-opacity=".82"/><stop offset="1" stop-color="#9ebff1" stop-opacity=".7"/></linearGradient>
    <filter id="soft"><feDropShadow dx="0" dy="19" stdDeviation="14" flood-color="#327d8d" flood-opacity=".20"/></filter>
    <pattern id="speck" width="31" height="31" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#4e9c9f" opacity=".18"/></pattern>`;
  const dots = [[468,765],[566,853],[632,919]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${12-i*2}" fill="#ef7c6d" opacity="${.8-i*.2}"/>`).join('');
  const labels = data.key_points.map((s,i)=>{const x=i%2?579:84,y=972+Math.floor(i/2)*115;return `<g filter="url(#soft)"><rect x="${x}" y="${y}" width="426" height="83" rx="41" fill="${['#d3f4e9','#d8eafd','#ffe7d5','#e3ead2'][i]}"/>${txt(x+32,y+55,`${i+1}. ${s}`,36,'#1d5361',800)}</g>`}).join('');
  return base(defs, `<rect width="1080" height="1350" fill="url(#sky)"/><rect width="1080" height="1350" fill="url(#speck)"/>
    <circle cx="1024" cy="92" r="205" fill="#bfebe0" opacity=".55"/><circle cx="65" cy="1051" r="180" fill="#ffe6d9" opacity=".72"/>
    <path d="M0 0H1080V14H0Z" fill="#61cbb4"/>
    ${brand('#247c79')}
    <rect x="755" y="67" width="242" height="45" rx="22" fill="#fffdf7"/>
    ${txt(783,97,'읽기 쉬운 건강정보',21,'#317b7b',700)}
    ${txt(75,229,h1,72,'#1b4251',800)}
    ${txt(75,322,h2,69,'#1b4251',800)}
    ${txt(79,391,data.subheadline,31,'#4d7476',600)}
    <g transform="rotate(7 527 648)" filter="url(#soft)"><rect x="235" y="455" width="530" height="439" rx="18" fill="#fffdf8"/>
      <path d="M275 522H716" stroke="#a6c5c6" stroke-width="4"/>
      ${txt(276,505,'HEALTH RESULT',24,'#2f827f',800,'letter-spacing="2"')}
      <path d="M281 591H665M281 643H643M281 695H672M281 747H605" stroke="#d0dbd8" stroke-width="15" stroke-linecap="round"/>
      <rect x="538" y="601" width="68" height="40" rx="8" fill="#ffe2d7"/>
      ${txt(552,634,'↑',34,'#ee776b',800)}
      <path d="M280 820H646" stroke="#e2e9e5" stroke-width="5"/>
    </g>
    <g transform="rotate(-20 681 741)" filter="url(#soft)"><circle cx="622" cy="659" r="147" fill="url(#lens)" stroke="#67bac0" stroke-width="23"/>
      <circle cx="622" cy="659" r="117" fill="none" stroke="#fff" stroke-opacity=".67" stroke-width="7"/>
      <path d="M721 761L854 894" stroke="#176b7c" stroke-width="46" stroke-linecap="round"/>
      <path d="M738 777L844 883" stroke="#68b5bb" stroke-width="18" stroke-linecap="round"/>
    </g>
    ${dots}
    <path d="M398 862Q508 934 600 941" stroke="#e77f6f" stroke-width="5" stroke-dasharray="11 13" fill="none"/>
    ${labels}
    ${txt(87,1258,`${cta}  ↗`,30,'#267e7a',800)}
    ${txt(87,1312,data.disclaimer,19,'#617d7c',500)}`);
}

const families = {premium_3d: ['candidate-a-premium-3d.png',premium], editorial: ['candidate-b-editorial.png',editorial], friendly_story: ['candidate-c-friendly-story.png',story]};
async function main() {
  fs.mkdirSync(output, {recursive:true});
  if (!families[data.visual_mode]) throw new Error('visual_mode must be premium_3d, editorial, or friendly_story');
  if (requestedMode && !families[requestedMode]) throw new Error('unknown requested visual mode');
  const selected = requestedMode ? [[requestedMode, families[requestedMode]]] : Object.entries(families);
  for (const [mode,[name,render]] of selected) {
    const svg = render();
    const target = path.join(output,name);
    await sharp(Buffer.from(svg)).flatten({background:'#ffffff'}).png({compressionLevel:9}).toFile(target);
    const meta = await sharp(target).metadata();
    if (meta.width !== 1080 || meta.height !== 1350) throw new Error(`${mode}: wrong dimensions`);
    process.stdout.write(`${mode}\t${target}\t${meta.width}x${meta.height}\n`);
  }
}
main().catch(error => { console.error(error); process.exitCode=1; });
