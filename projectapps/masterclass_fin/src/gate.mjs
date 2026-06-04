/* gate.mjs — shared soft login gate injected into all published pages.
 *
 * CLIENT-SIDE ONLY — the password is visible in page source. This is a
 * casual deterrent, not real authentication. For real auth use a backend
 * (Netlify password protection, Cloudflare Access, etc.).
 *
 * Password: stored in GATE_HASH below as a simple SHA-256 hex digest so
 * the literal "3100" doesn't appear in plaintext in the source.
 * Change it by running:
 *   node -e "const c=require('crypto');console.log(c.createHash('sha256').update('newpassword').digest('hex'))"
 * then update GATE_HASH.
 *
 * Behaviour: on first visit an overlay is shown; on correct entry a
 * localStorage flag (gate_ok) is set and the overlay dismissed. Persists
 * for the session (localStorage survives tab close on most browsers).
 */
export const GATE_HASH = '47012d6a8e8c18e60526a997caabc66257cac6b3457b51186968fc68c9c48673'; // sha256("3100")

export const GATE_HTML = `
<style>
#_gate{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;
  background:rgba(26,58,40,.97);font-family:'Futura PT','Jost','Century Gothic',sans-serif}
#_gate.gone{display:none}
._gbox{background:#fff;border-radius:16px;box-shadow:0 24px 64px rgba(0,0,0,.35);
  padding:44px 40px 36px;width:100%;max-width:380px;text-align:center}
._gbox .eyebrow{font-size:.75rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;
  color:#FC5901;display:block;margin-bottom:14px}
._gbox h2{font-size:1.6rem;color:#1E3A28;margin:0 0 6px;line-height:1.1}
._gbox p{font-size:.95rem;color:#6E6A6A;margin:0 0 26px;line-height:1.45}
._ginput{width:100%;font-family:inherit;font-size:1.25rem;font-weight:600;letter-spacing:.22em;
  text-align:center;padding:14px 16px;border:2px solid #DAD7D6;border-radius:10px;
  background:#F4F3F2;color:#2F2A2A;outline:none;transition:border-color .15s,background .15s}
._ginput:focus{border-color:#FC5901;background:#fff}
._ginput.err{border-color:#BF211E;animation:_shake .25s ease}
._gbtn{margin-top:14px;width:100%;font-family:inherit;font-weight:700;font-size:1rem;
  padding:15px;border:none;border-radius:10px;background:#2A4D36;color:#fff;cursor:pointer;
  transition:background .15s}
._gbtn:hover{background:#1E3A28}
._gerr{margin-top:12px;font-size:.88rem;font-weight:700;color:#BF211E;min-height:1.2em}
@keyframes _shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
</style>
<div id="_gate">
  <div class="_gbox">
    <span class="eyebrow">Masterclass</span>
    <h2>Finance &amp; Impact</h2>
    <p>Voer de toegangscode in om verder te gaan.</p>
    <input id="_gpin" class="_ginput" type="password" inputmode="numeric" maxlength="20"
           autocomplete="current-password" placeholder="●●●●" aria-label="Toegangscode">
    <button class="_gbtn" id="_gbtn">Bevestigen</button>
    <div class="_gerr" id="_gerr" aria-live="polite"></div>
  </div>
</div>
<script>
(function(){
  var HASH='${GATE_HASH}';
  var KEY='gate_ok_v1';
  function sha256(str){
    var buf=new TextEncoder().encode(str);
    return crypto.subtle.digest('SHA-256',buf).then(function(b){
      return Array.from(new Uint8Array(b)).map(function(x){return x.toString(16).padStart(2,'0')}).join('');
    });
  }
  function unlock(){document.getElementById('_gate').classList.add('gone');try{localStorage.setItem(KEY,'1');}catch(e){}}
  // already unlocked this session?
  try{if(localStorage.getItem(KEY)==='1'){unlock();return;}}catch(e){}
  function attempt(){
    var val=document.getElementById('_gpin').value.trim();
    if(!val)return;
    sha256(val).then(function(h){
      if(h===HASH){unlock();}
      else{
        var inp=document.getElementById('_gpin');
        var err=document.getElementById('_gerr');
        inp.classList.add('err');
        inp.value='';
        err.textContent='Onjuiste code. Probeer het opnieuw.';
        setTimeout(function(){inp.classList.remove('err');},300);
        inp.focus();
      }
    });
  }
  document.getElementById('_gbtn').addEventListener('click',attempt);
  document.getElementById('_gpin').addEventListener('keydown',function(e){if(e.key==='Enter')attempt();});
  // focus the input once the page has rendered
  setTimeout(function(){var el=document.getElementById('_gpin');if(el)el.focus();},50);
})();
</script>`;
