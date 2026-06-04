/* casus app — LOGIC: views, hash router, role/analist render, live model calc, facilitator timer, vote tool, QR, printing, actions. Reads the consts from data.js.
   Canonical source — edit here. Assembled into index.html by assemble.mjs.
   See dev/planning/architecture.md */

window.onerror=function(m,src,line,col,err){ var d=document.getElementById('diag'); if(d){ d.style.color='#bf211e'; d.textContent='JS-FOUT (regel '+line+'): '+m; } return false; };
/* ====================================================================
   GEDEELDE CONTENT
   ==================================================================== */










/* ====================================================================
   ROLLEN
   ==================================================================== */



/* ====================================================================
   FACILITATOR — FASEN & CUES (uit het draaiboek)
   start = verstreken seconden vanaf 0:00
   ==================================================================== */

 // 45 min

/* ====================================================================
   ROUTING + LOGIN
   ==================================================================== */
function codeToRole(raw){
  const c=(raw||'').trim().toLowerCase().replace(/\s+/g,'');
  if(!c) return null;
  if(['facilitator','regie','docent','admin'].includes(c)) return 'facilitator';
  for(const k of ROLE_ORDER){ if(c===k || ROLES[k].aliases.includes(c)) return k; }
  return null;
}
function show(viewId){ document.querySelectorAll('.view').forEach(v=>v.classList.remove('active')); document.getElementById(viewId).classList.add('active'); window.scrollTo(0,0); }
function showLogin(){ show('login'); }
function showLanding(){ show('landing'); }
/* "Andere rol" → terug naar de rolkeuze (casus-scherm) */
function logout(){ stopTimer(); go('casus'); }

/* go = render meteen + zet de hash als bonus (werkt ook als hash-navigatie geblokkeerd is) */
function go(target){
  let h;
  if(target==='facilitator') h='#facilitator';
  else if(target==='analist') h='#analist';
  else if(target==='casus') h='#casus';
  else if(target==='home'||target==='landing') h='';
  else h='#rol/'+target;
  try{ if(location.hash!==h) location.hash=h; }catch(e){}
  applyHash(h);
}

/* render a role page */
let currentRole=null;
function renderRole(key){
  const r=ROLES[key]; if(!r) return logout();
  currentRole=key;
  document.documentElement.style.setProperty('--accent', r.accent);
  document.getElementById('roleChip').style.background=r.accent;
  document.getElementById('roleChipTxt').textContent=r.chip;
  const st=document.getElementById('roleStance'); st.className='stance '+r.stance[0]; st.textContent=r.stance[1];
  document.getElementById('roleTitle').textContent=r.title;
  document.getElementById('roleTag').textContent=r.tag;

  const tabsDef=[['kaart','Rolkaart',r.card],['situatie','De situatie',SITUATIE],['spiek','Spiekkaart finance',SPIEKKAART]];
  if(r.extras.includes('toets')) tabsDef.push(['toets','Maatschappelijke toets',TOETS]);

  const tabsEl=document.getElementById('roleTabs'); tabsEl.innerHTML='';
  const panelsEl=document.getElementById('rolePanels'); panelsEl.innerHTML='';
  tabsDef.forEach(([id,label,html],idx)=>{
    const b=document.createElement('button'); b.className='tab'+(idx===0?' active':''); b.textContent=label;
    b.onclick=()=>{ document.querySelectorAll('#roleTabs .tab').forEach(t=>t.classList.remove('active'));
                    document.querySelectorAll('#rolePanels .panel').forEach(p=>p.classList.remove('active'));
                    b.classList.add('active'); document.getElementById('panel-'+id).classList.add('active'); window.scrollTo(0,0); };
    tabsEl.appendChild(b);
    const p=document.createElement('div'); p.className='panel'+(idx===0?' active':''); p.id='panel-'+id; p.innerHTML=html;
    panelsEl.appendChild(p);
  });
  show('rolePage');
}

/* ====================================================================
   ANALIST — model-details (financieel + impact)
   ==================================================================== */



let analistBuilt=false;
function buildAnalist(){
  document.documentElement.style.setProperty('--accent','var(--teal)');
  if(analistBuilt) return;
  const tabsEl=document.getElementById('analistTabs'); tabsEl.innerHTML='';
  const panelsEl=document.getElementById('analistPanels'); panelsEl.innerHTML='';
  ANALIST_TABS.forEach(([id,label,html],idx)=>{
    const b=document.createElement('button'); b.className='tab'+(idx===0?' active':''); b.textContent=label;
    b.onclick=()=>{ document.querySelectorAll('#analistTabs .tab').forEach(t=>t.classList.remove('active'));
                    document.querySelectorAll('#analistPanels .panel').forEach(p=>p.classList.remove('active'));
                    b.classList.add('active'); document.getElementById('apanel-'+id).classList.add('active'); window.scrollTo(0,0); };
    tabsEl.appendChild(b);
    const p=document.createElement('div'); p.className='panel'+(idx===0?' active':''); p.id='apanel-'+id; p.innerHTML=html;
    panelsEl.appendChild(p);
  });
  panelsEl.addEventListener('input', recomputeModels);
  recomputeModels();
  analistBuilt=true;
}

/* ---- interactieve modellen: rekenlogica ---- */
function nlNum(x,d){ if(!isFinite(x)) return '—'; const s=Math.abs(x).toFixed(d); let p=s.split('.'); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,'.'); return (x<0?'−':'')+(p[1]?p[0]+','+p[1]:p[0]); }
function fval(id){ const el=document.getElementById(id); return el?(parseFloat(el.value)||0):0; }
function setTxt(id,t){ const el=document.getElementById(id); if(el) el.textContent=t; }
function computeFin(){
  if(!document.getElementById('f_koers')) return;
  const koers=fval('f_koers'), opslag=fval('f_opslag'), syn=fval('f_syn'), mult=fval('f_mult'),
        fx=fval('f_fx')||1, own=fval('f_own')/100, real=fval('f_real')/100, sh=fval('f_sh')||1,
        div=fval('f_div'), cash=fval('f_cash');
  const synGross=syn*mult;              // $ mln
  const synEur=synGross/fx/1000;        // € mrd
  const synOwn=synEur*own;              // € mrd
  const synNet=synOwn*real;             // € mrd
  const synPs=synNet*1000/sh;           // € per aandeel
  const divPs=div*1000/sh;              // € per aandeel
  const total=koers+opslag+synPs+divPs;
  setTxt('o_syngross',nlNum(synGross,0)); setTxt('o_syneur',nlNum(synEur,1));
  setTxt('o_synown',nlNum(synOwn,1)); setTxt('o_synnet',nlNum(synNet,1));
  setTxt('o_synps',nlNum(synPs,1)); setTxt('o_divps',nlNum(divPs,1));
  setTxt('b_koers',nlNum(koers,1)); setTxt('b_opslag',nlNum(opslag,1));
  setTxt('b_synps',nlNum(synPs,1)); setTxt('b_divps',nlNum(divPs,1));
  setTxt('b_total',nlNum(total,1)); setTxt('b_cash',nlNum(cash,1));
  const diff=total-cash, ve=document.getElementById('f_verdict');
  if(ve){ ve.className='mverdict '+(diff>=0?'voor':'tegen');
    ve.textContent = diff>=0
      ? 'Fusie wint: € '+nlNum(total,1)+' > € '+nlNum(cash,1)+' cash  (+€ '+nlNum(diff,1)+' per aandeel)'
      : 'Cash wint: € '+nlNum(total,1)+' < € '+nlNum(cash,1)+' cash  (−€ '+nlNum(Math.abs(diff),1)+' per aandeel)'; }
}
function computeImpact(){
  if(!document.getElementById('it_mid')) return;
  const sumCol=col=>{ let s=0; document.querySelectorAll('#impactModel input[data-imp="'+col+'"]').forEach(i=>s+=parseFloat(i.value)||0); return s; };
  const lo=sumCol('lo'), mid=sumCol('mid'), hi=sumCol('hi');
  [['it_lo',lo],['it_mid',mid],['it_hi',hi]].forEach(([id,v])=>{ const c=document.getElementById(id); if(c){ c.textContent='€ '+nlNum(v,1); c.className=v<0?'neg':'pos'; } });
  const ve=document.getElementById('i_verdict');
  if(ve){ ve.className='mverdict '+(mid>=0?'voor':'tegen');
    ve.textContent=(mid>=0
      ? 'Verwacht: +€ '+nlNum(mid,1)+' mrd — de fusie schept (illustratief) brede waarde'
      : 'Verwacht: −€ '+nlNum(Math.abs(mid),1)+' mrd — de fusie vernietigt (illustratief) brede waarde')
      +'  ·  band € '+nlNum(lo,1)+' tot € '+nlNum(hi,1)+' mrd'; }
}
function recomputeModels(){ computeFin(); computeImpact(); }
function resetFin(){ document.querySelectorAll('#finModel input.cell').forEach(i=>{ i.value=i.dataset.def; }); computeFin(); }
function resetImpact(){ document.querySelectorAll('#impactModel input.cell').forEach(i=>{ i.value=i.dataset.def; }); computeImpact(); }

/* ====================================================================
   FACILITATOR DASHBOARD
   ==================================================================== */
let elapsed=0, running=false, lastTick=0, tickHandle=null, soundOn=true, lastPhaseIdx=-1, builtFac=false;

function fmt(s){ s=Math.max(0,Math.floor(s)); const m=Math.floor(s/60); const r=s%60; return String(m).padStart(2,'0')+':'+String(r).padStart(2,'0'); }
function phaseIndexAt(t){ let idx=0; for(let i=0;i<PHASES.length;i++){ if(t>=PHASES[i].start) idx=i; } return idx; }

function buildFacStatic(){
  if(builtFac) return;
  // phase track
  const tr=document.getElementById('track'); tr.innerHTML='';
  PHASES.forEach((p,i)=>{
    const row=document.createElement('div'); row.className='phase'+(p.climax?' climax':''); row.dataset.i=i;
    row.innerHTML=`<span class="t">${fmt(p.start)}</span><span class="nm">${p.label}<small>${p.sub}</small></span><span class="dur">${p.dur}</span>`;
    row.onclick=()=>jumpToPhase(i);
    tr.appendChild(row);
  });
  // codes
  const cl=document.getElementById('codeList');
  const labels={rvb:'Bestuur (RvB)',rvc:'RvC',or:'Ondernemingsraad',minister:'Minister (EZ)',axalta:'Board Axalta',aandeelhouders:'Grootaandeelhouders'};
  ROLE_ORDER.forEach(k=>{ const li=document.createElement('li');
    li.innerHTML=`<span class="role">${labels[k]}</span><span class="code">#rol/${k}</span>`; cl.appendChild(li); });
  const li=document.createElement('li'); li.innerHTML=`<span class="role">Facilitator (dit scherm)</span><span class="code fac">#facilitator</span>`; cl.appendChild(li);
  // peek buttons
  const pb=document.getElementById('peekBtns');
  ROLE_ORDER.forEach(k=>{ const b=document.createElement('button'); b.textContent=ROLES[k].chip; b.onclick=()=>openModal(k); pb.appendChild(b); });
  // vote tool + QR base
  buildSeats();
  const ta=document.getElementById('voteNotes'); if(ta) ta.addEventListener('input',saveVote);
  loadVote();
  document.getElementById('baseUrl').value=location.href.split('#')[0];
  builtFac=true;
}

function renderTimer(){
  const clock=document.getElementById('clock');
  clock.textContent=fmt(elapsed);
  clock.classList.toggle('warnlast', elapsed>=TOTAL-60 && elapsed<TOTAL);
  document.getElementById('pbar').style.width=Math.min(100,elapsed/TOTAL*100)+'%';
  const i=phaseIndexAt(elapsed); const p=PHASES[i]; const next=PHASES[i+1];
  const pn=document.getElementById('phaseNow'); pn.textContent=running||elapsed>0?p.label:'Klaar om te starten'; pn.classList.toggle('stem',!!p.climax);
  const sc=document.getElementById('subclock');
  if(elapsed>=TOTAL){ sc.innerHTML='<b>Tijd is om.</b> Door naar de plenaire reflectie.'; }
  else if(next){ const left=next.start-elapsed; sc.innerHTML=`Nog <b>${fmt(left)}</b> in deze fase · daarna: ${next.label}`; }
  else { sc.innerHTML=`Laatste fase · nog <b>${fmt(TOTAL-elapsed)}</b>`; }
  // track highlight
  document.querySelectorAll('#track .phase').forEach((row,idx)=>{
    row.classList.toggle('cur',idx===i);
    row.classList.toggle('done',idx<i);
  });
  // cue panel + sound on change
  if(i!==lastPhaseIdx){
    document.getElementById('cueTitle').textContent='Cues · '+p.label;
    document.getElementById('cueSub').textContent=p.dur==='—'?'':'Duur ±'+p.dur;
    document.getElementById('cueBody').innerHTML=p.cues;
    if(soundOn && lastPhaseIdx!==-1 && running) beep(p.climax?2:1);
    lastPhaseIdx=i;
  }
}
function tick(){ const now=performance.now(); elapsed+=(now-lastTick)/1000; lastTick=now;
  if(elapsed>=TOTAL){ elapsed=TOTAL; renderTimer(); stopTimer(); document.getElementById('startBtn').innerHTML='▶ Start'; return; }
  renderTimer(); }
function startTimer(){ if(running) return; running=true; lastTick=performance.now(); tickHandle=setInterval(tick,250);
  document.getElementById('startBtn').innerHTML='❚❚ Pauze'; document.getElementById('startBtn').classList.replace('go','pause'); }
function stopTimer(){ running=false; if(tickHandle){clearInterval(tickHandle);tickHandle=null;} const b=document.getElementById('startBtn'); if(b){b.classList.replace('pause','go');} }
function toggleTimer(){ if(running){ stopTimer(); document.getElementById('startBtn').innerHTML='▶ Hervat'; } else { startTimer(); } }
function resetTimer(){ if(!confirm('Timer terugzetten naar 00:00?')) return; stopTimer(); elapsed=0; lastPhaseIdx=-1;
  document.getElementById('startBtn').innerHTML='▶ Start'; renderTimer(); }
function jumpToPhase(i){ elapsed=PHASES[i].start; lastPhaseIdx=-1; if(running) lastTick=performance.now(); renderTimer(); }
function toggleSound(){ soundOn=!soundOn; const b=document.getElementById('soundBtn'); b.textContent=soundOn?'aan':'uit'; if(soundOn) beep(1); }

let actx=null;
function beep(kind){ try{ actx=actx||new (window.AudioContext||window.webkitAudioContext)();
  const seq=kind===2?[660,880,1100]:[880];
  seq.forEach((f,n)=>{ const o=actx.createOscillator(),g=actx.createGain(); o.type='sine'; o.frequency.value=f;
    const t=actx.currentTime+n*0.13; g.gain.setValueAtTime(0.0001,t); g.gain.exponentialRampToValueAtTime(0.2,t+0.02);
    g.gain.exponentialRampToValueAtTime(0.0001,t+0.12); o.connect(g); g.connect(actx.destination); o.start(t); o.stop(t+0.14); });
 }catch(e){} }

/* ====================================================================
   VEILIGE OPSLAG (alleen voor stemuitslag; valt terug op geheugen)
   ==================================================================== */
const MEM={};
const SS={
  get(k){ try{ const v=localStorage.getItem('casus_'+k); return v==null?null:JSON.parse(v); }catch(e){ return (k in MEM)?MEM[k]:null; } },
  set(k,v){ try{ localStorage.setItem('casus_'+k,JSON.stringify(v)); }catch(e){ MEM[k]=v; } }
};
function esc(s){ return String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])); }

/* ====================================================================
   STEM-TOOL (vijf zetels · 3 van 5)
   ==================================================================== */


let vote={}, voteNotes='';

function buildSeats(){
  const c=document.getElementById('seats'); c.innerHTML='';
  SEATS.forEach(s=>{ const row=document.createElement('div'); row.className='seat';
    row.innerHTML=`<span class="nm">${s.name}<small>${s.sub}</small></span>`;
    const b=document.createElement('span'); b.className='vbtns';
    ['voor','tegen','voorw'].forEach(v=>{ const btn=document.createElement('button'); btn.className=v; btn.textContent=VLAB[v];
      btn.dataset.seat=s.id; btn.dataset.v=v; btn.onclick=()=>setVote(s.id,v); b.appendChild(btn); });
    row.appendChild(b); c.appendChild(row); });
}
function setVote(id,v){ if(vote[id]===v) delete vote[id]; else vote[id]=v; saveVote(); renderVote(); }
function voteCounts(){ const c={voor:0,tegen:0,voorw:0}; Object.values(vote).forEach(v=>c[v]++); return c; }
function voteVerdict(){ const c=voteCounts(); const total=c.voor+c.tegen+c.voorw;
  if(total<5) return {head:`Nog ${5-total} zetel(s) te gaan`, cls:''};
  if(c.voor>=3) return {head:'VOOR — de fusie gaat door', cls:'voor'};
  if(c.tegen>=c.voorw) return {head:'TEGEN — terug naar de tekentafel', cls:'tegen'};
  return {head:'ALLEEN TEGEN BETERE VOORWAARDEN', cls:'cond'};
}
function renderVote(){
  document.querySelectorAll('#seats .vbtns button').forEach(btn=>btn.classList.toggle('on', vote[btn.dataset.seat]===btn.dataset.v));
  const c=voteCounts();
  document.getElementById('tally').innerHTML=
    `<span><b style="color:#bfe6c8">${c.voor}</b>Voor</span><span><b style="color:#ffb9b8">${c.tegen}</b>Tegen</span><span><b style="color:#ffd98a">${c.voorw}</b>Voorw.</span>`;
  const vd=voteVerdict(); const ve=document.getElementById('verdict'); ve.className='verdict '+vd.cls; ve.textContent=vd.head;
}
function saveVote(){ const ta=document.getElementById('voteNotes'); voteNotes=ta?ta.value:voteNotes; SS.set('vote',{vote,notes:voteNotes}); }
function loadVote(){ const d=SS.get('vote'); if(d){ vote=d.vote||{}; voteNotes=d.notes||''; const ta=document.getElementById('voteNotes'); if(ta) ta.value=voteNotes; } renderVote(); }
function resetVote(){ if(!confirm('Stemuitslag en notities wissen?')) return; vote={}; voteNotes=''; document.getElementById('voteNotes').value=''; SS.set('vote',{vote:{},notes:''}); renderVote(); }
function showVoteBig(){ const c=voteCounts(); const vd=voteVerdict();
  const rows=SEATS.map(s=>`<tr><td><strong>${s.name}</strong></td><td style="text-align:right">${vote[s.id]?VLAB[vote[s.id]]:'—'}</td></tr>`).join('');
  document.documentElement.style.setProperty('--accent','var(--sage)');
  document.getElementById('modalBody').innerHTML=
   `<span class="eyebrow">De stem · grootaandeelhouders</span>
    <h1 style="font-size:2.3rem;margin:8px 0 14px">${vd.head}</h1>
    <table class="facts">${rows}</table>
    <p style="margin-top:14px;font-size:1.1rem;color:var(--ink-soft)">Voor ${c.voor} · Tegen ${c.tegen} · Voorwaardelijk ${c.voorw} — meerderheid (3 van 5) beslist.</p>
    ${voteNotes?`<div class="callout" style="margin-top:14px"><span class="lbl">Voor de reflectie</span>${esc(voteNotes).replace(/\n/g,'<br>')}</div>`:''}`;
  document.getElementById('modal').classList.add('show');
}
function voteSummaryPlain(){ const c=voteCounts(); const vd=voteVerdict();
  let t='Casus AkzoNobel × Axalta — stemuitslag\n'+vd.head+'\n\n';
  SEATS.forEach(s=>{ t+=`- ${s.name}: ${vote[s.id]?VLAB[vote[s.id]]:'—'}\n`; });
  t+=`\nVoor ${c.voor} · Tegen ${c.tegen} · Voorwaardelijk ${c.voorw} (meerderheid 3 van 5)\n`;
  if(voteNotes) t+='\nNotities:\n'+voteNotes+'\n';
  return t;
}
function copyVote(){ const t=voteSummaryPlain(); const b=document.getElementById('copyBtn');
  const done=()=>{ b.textContent='Gekopieerd ✓'; setTimeout(()=>b.textContent='Kopieer',1600); };
  const fb=()=>{ const ta=document.createElement('textarea'); ta.value=t; document.body.appendChild(ta); ta.select(); try{document.execCommand('copy');}catch(e){} document.body.removeChild(ta); done(); };
  try{ if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(t).then(done,fb); } else fb(); }catch(e){ fb(); }
}
function printVote(){ const c=voteCounts(); const vd=voteVerdict();
  const rows=SEATS.map(s=>`<tr><td>${s.name}</td><td style="text-align:right">${vote[s.id]?VLAB[vote[s.id]]:'—'}</td></tr>`).join('');
  printSection(`<div class="print-card"><div class="ph-rule" style="background:#6E9079"></div>
    <h1>Stemuitslag — AkzoNobel × Axalta</h1><p class="ph-tag">${vd.head}</p>
    <table class="facts">${rows}<tr class="tot" style="border-top:1.5px solid #999"><td><strong>Telling</strong></td><td style="text-align:right"><strong>Voor ${c.voor} · Tegen ${c.tegen} · Voorw. ${c.voorw}</strong></td></tr></table>
    ${voteNotes?`<div class="card" style="margin-top:12px"><h3>Notities voor de reflectie</h3><p>${esc(voteNotes).replace(/\n/g,'<br>')}</p></div>`:''}</div>`);
}

/* ====================================================================
   QR-CODES (offline gegenereerd; aanvulling op de codes)
   ==================================================================== */
function makeQR(text){ const qr=qrcode(0,'M'); qr.addData(text); qr.make(); return qr.createSvgTag({cellSize:4,margin:16,scalable:true}); }
function baseClean(){ let u=(document.getElementById('baseUrl').value||'').trim(); if(!u) u=location.href.split('#')[0];
  if(!/\/$/.test(u) && !/\.html?$/i.test(u)) u+='/'; return u; }
function genQR(){ const base=baseClean(); const g=document.getElementById('qrGrid'); g.innerHTML='';
  ROLE_ORDER.forEach(k=>{ const cell=document.createElement('div'); cell.className='qrcell';
    cell.innerHTML=`<div class="lab">${ROLES[k].chip}</div>${makeQR(base+'#rol/'+k)}`; g.appendChild(cell); });
  document.getElementById('qrActions').style.display='flex';
}
function printQR(){ const base=baseClean();
  const cells=ROLE_ORDER.map(k=>{ const url=base+'#rol/'+k;
    return `<div class="qr-tent"><div class="lab">${ROLES[k].chip}</div>${makeQR(url)}<div class="url">${url}</div></div>`; }).join('');
  printSection(`<div class="qr-sheet">${cells}</div>`);
}

/* ====================================================================
   PRINTEN (rolkaarten / losse rol / uitslag / QR)
   ==================================================================== */
function printSection(html){ const root=document.getElementById('printRoot'); root.innerHTML=html; document.body.classList.add('do-print');
  const after=()=>{ document.body.classList.remove('do-print'); root.innerHTML=''; window.removeEventListener('afterprint',after); };
  window.addEventListener('afterprint',after); setTimeout(()=>window.print(),80);
}
function roleAccentHex(k){ return {rvb:'#FC5901',rvc:'#2A4D36',or:'#4B9A95',minister:'#172E43',axalta:'#F7B538',aandeelhouders:'#6E9079'}[k]; }
function buildRoleCardHTML(k){ const r=ROLES[k];
  return `<div class="print-card"><div class="ph-rule" style="background:${roleAccentHex(k)}"></div><h1>${r.title}</h1><p class="ph-tag">${r.tag} · ${r.stance[1]}</p>${r.card}</div>`; }
function printRolkaarten(){ printSection(ROLE_ORDER.map(buildRoleCardHTML).join('')); }
function printCurrentRole(){ if(currentRole) printSection(buildRoleCardHTML(currentRole)); }

/* modal peek */
function openModal(key){ const r=ROLES[key]; document.documentElement.style.setProperty('--accent', r.accent);
  document.getElementById('modalBody').innerHTML=`<span class="eyebrow">${r.chip}</span><h1 style="font-size:1.7rem;margin:8px 0 4px">${r.title}</h1><p class="tag" style="color:var(--slate);margin-bottom:18px">${r.tag}</p>`+r.card;
  document.getElementById('modal').classList.add('show'); }
function closeModal(){ document.getElementById('modal').classList.remove('show'); }
document.addEventListener('keydown',e=>{ if(e.key==='Escape') closeModal(); });

/* ====================================================================
   HASH ROUTER
   ==================================================================== */
function applyHash(h){
  if(h==='#facilitator'){ buildFacStatic(); renderTimer(); show('facPage'); }
  else if(h==='#analist'){ buildAnalist(); show('analistPage'); }
  else if(h==='#casus'){ show('login'); }
  else if(h.startsWith('#rol/')){ const k=h.slice(5); if(ROLES[k]) renderRole(k); else show('login'); }
  else { showLanding(); }
}
const ACTIONS={
  go:a=>go(a), home:()=>{ stopTimer(); go('home'); }, logout:()=>logout(), printrole:()=>printCurrentRole(),
  toggletimer:()=>toggleTimer(), resettimer:()=>resetTimer(), togglesound:()=>toggleSound(),
  votebig:()=>showVoteBig(), votecopy:()=>copyVote(), voteprint:()=>printVote(), votereset:()=>resetVote(),
  genqr:()=>genQR(), printqr:()=>printQR(), printroles:()=>printRolkaarten(), closemodal:()=>closeModal(),
  finreset:()=>resetFin(), impactreset:()=>resetImpact()
};
document.addEventListener('click',function(e){
  if(e.target && e.target.id==='modal'){ closeModal(); return; }
  const el=e.target.closest && e.target.closest('[data-act]'); if(!el) return;
  const fn=ACTIONS[el.getAttribute('data-act')]; if(fn) fn(el.getAttribute('data-arg'));
});
function route(){ applyHash(location.hash); }
window.addEventListener('hashchange',route);
route();
(function(){ var d=document.getElementById('diag'); if(d){ d.style.color='#4e7459'; d.textContent='build __BUILD__ · interactief ✓ — klik op een rol'; } })();
