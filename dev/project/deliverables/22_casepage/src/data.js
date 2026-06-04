/* casus app — DATA & MODEL: content (rollen, situatie, spiekkaart, toets, bronnen) + the figure models (FINMODEL, IMPACT_MODEL) and their default numbers. Edit numbers/content here.
   Canonical source — edit here. Assembled into index.html by assemble.mjs.
   See dev/planning/architecture.md */

const SITUATIE = `
<div class="block">
  <h2>De situatie</h2>
  <p class="lead">Het is <strong>zomer 2026</strong>. Het ongevraagde cash-bod van Nippon Paint en Sherwin-Williams — <strong>€73 per aandeel</strong>, mét opsplitsing van AkzoNobel — is afgewezen en van tafel. Op tafel ligt nu een <strong>fusie van gelijken</strong> met het Amerikaanse Axalta: all-stock, zonder premie, samen ~$25 mrd waard. De aandeelhouders moeten erover stemmen.</p>
</div>
<div class="block">
  <h2>De feiten op tafel</h2>
  <table class="facts">
    <tr><td>Structuur</td><td>fusie van gelijken · all-stock · geen premie</td></tr>
    <tr><td>Eigendom na de fusie</td><td>AkzoNobel-aandeelhouders 55% · Axalta 45%</td></tr>
    <tr><td>Ruilverhouding</td><td>0,6539 AkzoNobel-aandeel per Axalta-aandeel</td></tr>
    <tr><td>Extra voor AkzoNobel</td><td>€2,5 mrd superdividend (vóór closing)</td></tr>
    <tr><td>Beloofde synergie</td><td>~$600 mln per jaar (90% binnen 3 jaar)</td></tr>
    <tr><td>De combinatie</td><td>~$17 mrd omzet · ~$25 mrd waarde · 46.551 werknemers</td></tr>
    <tr><td>Zetel & beurs</td><td>fiscale zetel NL · dual HQ Amsterdam/Philadelphia · uiteindelijk enkel NYSE → weg van Euronext</td></tr>
    <tr><td>Ter vergelijking</td><td>afgewezen cash-bod €73 · beurskoers ~€52</td></tr>
  </table>
  <div class="factq">Fuseren met Axalta — of niet?</div>
</div>
<div class="block">
  <h2>Hoe het werkt</h2>
  <div class="prose">
    <p><strong>Voorbereiden (±12 min):</strong> lees je rolkaart, bepaal één standpunt en je sterkste argument. Kies waar mogelijk één concreet getal.</p>
    <p><strong>De confrontatie:</strong> we lopen langs de keten — bestuur → RvC → OR → minister → Axalta — en iedereen komt aan het woord.</p>
    <p><strong>De stem:</strong> de grootaandeelhouders stemmen vóór of tegen. Dat is de climax.</p>
  </div>
  <div class="callout"><span class="lbl">De toon</span>Dit is geen quiz. Een goede vraag is meer waard dan schijnzekerheid — ook ervaren commissarissen doorgronden niet elk cijfer. Durf door te vragen.</div>
</div>`;

const SPIEKKAART = `
<div class="block">
  <p class="lead">Je hoeft niets uit je hoofd te kennen. Dit is je vangnet: sla het open als een term langskomt die je even kwijt bent.</p>
</div>
<div class="numstrip">
  <span class="num"><b>€73</b> afgewezen cash-bod</span>
  <span class="num"><b>~€52</b> beurskoers</span>
  <span class="num"><b>55 / 45</b> eigendom na fusie</span>
  <span class="num"><b>0,6539</b> ruilverhouding</span>
  <span class="num"><b>€2,5 mrd</b> superdividend</span>
  <span class="num"><b>~$600 mln</b> synergie/jaar</span>
  <span class="num"><b>~$25 mrd</b> waarde combinatie</span>
</div>
<div class="gloss-grp"><div class="h">De drie financiële overzichten</div>
<div class="gloss">
  <div class="term"><b>Balans</b><span>De foto op één dag. <span class="eq">Activa = eigen + vreemd vermogen.</span> Wat bezit en financiert het bedrijf?</span></div>
  <div class="term"><b>Winst &amp; verlies (W&amp;V)</b><span>De film over een periode: omzet → kosten → winst.</span></div>
  <div class="term"><b>Kasstroomoverzicht</b><span>De brug tussen winst en kas. "Winst is een mening, kas is een feit."</span></div>
  <div class="term"><b>Eigen vermogen</b><span>De buffer: bezittingen min schulden. Hoog = veerkracht.</span></div>
</div></div>
<div class="gloss-grp"><div class="h">Kosten & winst</div>
<div class="gloss">
  <div class="term"><b>Opex</b><span>Operationele kosten (onderhoud, personeel) — gaan direct door de W&amp;V.</span></div>
  <div class="term"><b>Capex</b><span>Investeringen in vaste activa — komen op de balans en schrijven over jaren af.</span></div>
  <div class="term"><b>EBITDA</b><span>Winst vóór rente, belasting en afschrijvingen. Ruwe maat voor operationele verdiencapaciteit.</span></div>
  <div class="term"><b>EBIT / nettowinst</b><span>EBIT = na afschrijvingen; nettowinst = ook na rente en belasting.</span></div>
  <div class="term"><b>Marge</b><span>Winst gedeeld door omzet. Lage marge kan een bewuste keuze zijn, geen zwakte.</span></div>
  <div class="term"><b>Bijzondere posten</b><span>Eenmalige baten/lasten. Zoek ze altijd op: ze vertekenen de "krantenkop-winst".</span></div>
</div></div>
<div class="gloss-grp"><div class="h">Ratio's — de signaallampjes</div>
<div class="gloss">
  <div class="term"><b>Solvabiliteit</b><span>Eigen vermogen / totaal vermogen. Hoeveel buffer?</span></div>
  <div class="term"><b>Net debt / EBITDA</b><span>Schuldenlast t.o.v. verdiencapaciteit. Hoger = meer risico.</span></div>
  <div class="term"><b>ROIC vs. WACC</b><span>Rendement op geïnvesteerd kapitaal vs. de kosten ervan. <span class="eq">Waarde ontstaat als ROIC &gt; WACC.</span></span></div>
  <div class="term"><b>Rentedekking</b><span>EBIT / rentelasten. Kan het bedrijf z'n rente betalen?</span></div>
</div></div>
<div class="gloss-grp"><div class="h">Waarde & overnames</div>
<div class="gloss">
  <div class="term"><b>Boek- vs. markt- vs. intrinsieke waarde</b><span>Wat de boeken zeggen · wat de beurs zegt · wat het écht waard is (toekomstige kasstromen).</span></div>
  <div class="term"><b>Equity value vs. Enterprise value</b><span>Waarde voor aandeelhouders vs. <span class="eq">equity + nettoschuld</span> (de hele onderneming).</span></div>
  <div class="term"><b>Multiples (P/E, EV/EBITDA)</b><span>Snelle vergelijkingsmaten tussen bedrijven.</span></div>
  <div class="term"><b>Premium</b><span>Het meerdere boven de beurskoers dat een koper betaalt (synergie, controle, strategie).</span></div>
  <div class="term"><b>DCF / fundamentele waarde</b><span>Toekomstige vrije kasstromen, verdisconteerd naar nu met de WACC. Klein verschil in aannames = grote uitslag.</span></div>
  <div class="term"><b>Synergie</b><span>Kostenbesparing/extra waarde door samengaan. Verhoogt de toekomstige kasstroom — als ze ook echt landt.</span></div>
</div></div>
<div class="gloss-grp"><div class="h">Impact in geld — brede waarde</div>
<div class="gloss">
  <div class="term"><b>Integrale waarde (F+S+E)</b><span>Financieel + sociaal + ecologisch samen gewogen.</span></div>
  <div class="term"><b>Impact-weighted accounts (IWAF)</b><span>Externe effecten zichtbaar maken in euro's, náást de financiële cijfers.</span></div>
  <div class="term"><b>True price</b><span>Marktprijs + verborgen maatschappelijke kosten.</span></div>
  <div class="term"><b>True profit</b><span><span class="eq">Winst − netto externe kosten</span> = de "echte" winst.</span></div>
  <div class="term"><b>True fundamental value</b><span>Intrinsieke lange-termijnwaarde berekend op F+S+E i.p.v. alleen financieel.</span></div>
  <div class="term"><b>Dubbele materialiteit</b><span>Impact op mens & milieu én hoe duurzaamheid de financiën raakt (CSRD/ESRS).</span></div>
</div></div>
<div class="callout"><span class="lbl">De rode draad</span><strong>Markt ≠ fundament.</strong> €73 en ~€52 zijn marktsignalen. Het bestuur claimt dat de échte lange-termijnwaarde — financieel én breed — hóger ligt. Daar wordt vandaag om gevochten.</div>`;

const TOETS = `
<div class="block">
  <span class="eyebrow">Hand-out · achtergrond</span>
  <h2 style="margin-top:8px">De maatschappelijke toets (brede-waarde-analyse)</h2>
  <p class="lead">Een becijfering van de fusie op <strong>brede waarde</strong>: financieel + sociaal + ecologisch (F+S+E), met dezelfde methode als <a href="https://esb.nu/maatschappelijke-toetsing-van-overnames-is-nodig/" target="_blank" rel="noopener">De Adelhart Toorop, De Groot Ruiz &amp; Schoenmaker (ESB, 2017)</a>. Rijnlandse som — alle stakeholders even zwaar. Geen extern oordeel achteraf, maar munitie voor jullie afweging vanuit de bestuurskamer.</p>
</div>
<div class="numstrip">
  <span class="num"><b>≈ −€1,3 mrd</b> verwachte brede waarde (fusie)</span>
  <span class="num"><b>−€14,5 tot +€5,1 mrd</b> bandbreedte</span>
  <span class="num"><b>≈ −€6 mrd</b> ter vergelijking: PPG-bod 2017</span>
</div>
<div class="block"><h2>De vijf effecten — € mrd, contante waarde</h2>
  <table class="mkba">
    <thead><tr><th>Effect</th><th>Onder</th><th>Verwacht</th><th>Boven</th></tr></thead>
    <tbody>
      <tr><td>Werknemers</td><td class="neg">−2,5</td><td class="neg vw">−0,5</td><td class="pos">+0,2</td></tr>
      <tr><td>Consumenten (prijzen)</td><td class="neg">−5,0</td><td class="neg vw">−1,0</td><td>0,0</td></tr>
      <tr><td>Klimaat (CO₂)</td><td class="neg">−2,0</td><td class="neg vw">−0,3</td><td class="pos">+1,0</td></tr>
      <tr><td>Aandeelhouders</td><td class="neg">−2,0</td><td class="pos vw">+1,5</td><td class="pos">+4,0</td></tr>
      <tr><td>Autonomie (NL)</td><td class="neg">−3,0</td><td class="neg vw">−1,0</td><td class="neg">−0,1</td></tr>
      <tr class="tot"><td>Totaal</td><td class="neg">−14,5</td><td class="neg vw">−1,3</td><td class="pos">+5,1</td></tr>
    </tbody>
  </table>
  <p class="src">Bron: 04_mkba_akzo_axalta.xlsx (tab "MKBA 2026 MOE"). Disconto 3% · horizon 4 jr (midden) / 8 jr (extremen) · maatschappelijke waarde ~€70.000 per baan.</p>
</div>
<div class="card accent">
  <h3>Wat drijft elke post</h3>
  <ul class="kv">
    <li><strong>Werknemers (−0,5):</strong> synergie (~$600 mln) komt deels uit footprint/SG&amp;A → ~2.000 netto banen weg (verwacht), tot ~5.000 (onder). Een MOE snijdt minder diep dan een vijandige overname.</li>
    <li><strong>Consumenten (−1,0):</strong> complementaire portefeuilles → beperkte overlap; mededingingstoezicht remt het prijseffect. Veel kleiner dan bij PPG (directe #1+#2).</li>
    <li><strong>Klimaat (−0,3):</strong> symmetrische profielen, geen groot duurzaamheidsvoordeel dat erodeert; schaal kan groene R&amp;D juist helpen (CO₂-prijs ~€110/ton).</li>
    <li><strong>Aandeelhouders (+1,5):</strong> ~$600 mln synergie gekapitaliseerd (~8×) ≈ €4–5 mrd bruto, minus integratiekosten en uitvoeringsrisico; tegenover de gemiste cash-premie (€73 vs ~€52).</li>
    <li><strong>Autonomie (−1,0):</strong> HQ deels naar Philadelphia, enkel-NYSE (delisting Euronext). Mitigatie: NL-domicilie, één HQ Amsterdam, 55% behoud — en de basis is al &gt;60% VS. Hardst te monetariseren, deels kwalitatief.</li>
  </ul>
</div>
<div class="card">
  <h3>Waarom minder negatief dan 2017 (PPG ≈ −€6 mrd)</h3>
  <p class="prose">Fusie van gelijken i.p.v. vijandige overname met opsplitsing → kleinere banen- en prijsschade. Complementaire portefeuilles → lagere mededingingsdrempel. Concrete synergie → de aandeelhouderspost is hier eerder positief. <strong>Counterfactual:</strong> het afgewezen cash-bod (opsplitsing) zou op vrijwel elke post sléchter scoren — "minder slecht dan de cash" is zélf een argument vóór de fusie. De eerlijke vraag blijft of het ook <em>beter dan zelfstandig blijven</em> is; daar gaat de band over.</p>
</div>
<div class="callout"><span class="lbl">Voor de RvC &amp; de Minister</span><strong>RvC:</strong> weeg F+S+E en toets of de aanbeveling niet door bestuurs-eigenbelang is gekleurd (CEO-target ~€14,4 vs ~€11 mln nu). Optie: eis een maatschappelijke fairness-opinie vóór goedkeuring. <strong>Minister:</strong> de autonomie-post (~−€1 mrd) is je hefboom — maar anticipeer op het weerwoord (&gt;60% VS, "strategische onafhankelijkheid", NL-domicilie blijft).</div>
<div class="callout warn"><span class="lbl">Let op bij gebruik</span>Illustratieve onderwijs-schatting, géén volwaardige MKBA — de euro's zijn redeneer-aannames, bedoeld om te <em>bevrágen</em>. In het werkmodel (04_mkba, gele cellen) kun je elke aanname aanpassen en de totalen herrekenen. De kunst: welke aanname drijft de uitkomst, en wie heeft die gekozen?</div>`;

const FINMODEL = `
<div id="finModel">
<div class="block">
  <span class="eyebrow">Analist · financieel model</span>
  <h2 style="margin-top:8px">Waardebrug per aandeel — speel met de aannames</h2>
  <p class="lead">Pas de <strong>gele aannames</strong> aan; de berekening, de waardebrug en het oordeel t.o.v. de zekere €73 cash bewegen live mee. Illustratief — redeneer-aannames om te bevrágen, geen waardering of advies.</p>
</div>
<div class="model-grid">
  <div class="mcol">
    <h3>Aannames</h3>
    <label>Beurskoers standalone (€)<input class="cell" type="number" id="f_koers" data-def="52" value="52"></label>
    <label>Fundamentele opslag (€)<input class="cell" type="number" id="f_opslag" data-def="4" value="4"></label>
    <label>Synergie per jaar ($ mln)<input class="cell" type="number" id="f_syn" data-def="600" value="600"></label>
    <label>Multiple op synergie (×)<input class="cell" type="number" id="f_mult" data-def="8" value="8"></label>
    <label>Wisselkoers ($ per €)<input class="cell" type="number" step="0.01" id="f_fx" data-def="1.09" value="1.09"></label>
    <label>Aandeel AkzoNobel (%)<input class="cell" type="number" id="f_own" data-def="55" value="55"></label>
    <label>Realisatie na risico &amp; integratie (%)<input class="cell" type="number" id="f_real" data-def="85" value="85"></label>
    <label>Aantal aandelen (mln)<input class="cell" type="number" id="f_sh" data-def="179" value="179"></label>
    <label>Superdividend (€ mrd)<input class="cell" type="number" step="0.1" id="f_div" data-def="2.5" value="2.5"></label>
    <label>Zeker cash-bod (€)<input class="cell" type="number" id="f_cash" data-def="73" value="73"></label>
    <button class="mreset" data-act="finreset">↺ Herstel aannames</button>
  </div>
  <div class="mcol">
    <h3>Berekening — synergie → €/aandeel</h3>
    <table class="calc">
      <tr><td>Synergie bruto · syn × multiple</td><td>$ <b id="o_syngross">—</b> mln</td></tr>
      <tr><td>In euro · ÷ wisselkoers</td><td>€ <b id="o_syneur">—</b> mrd</td></tr>
      <tr><td>Aandeel AkzoNobel · × %</td><td>€ <b id="o_synown">—</b> mrd</td></tr>
      <tr><td>Na realisatie · × %</td><td>€ <b id="o_synnet">—</b> mrd</td></tr>
      <tr class="key"><td>Synergie per aandeel</td><td>€ <b id="o_synps">—</b></td></tr>
      <tr class="key"><td>Superdividend per aandeel</td><td>€ <b id="o_divps">—</b></td></tr>
    </table>
  </div>
</div>
<div class="block"><h2>De waardebrug — € per AkzoNobel-aandeel</h2>
  <table class="mkba bridge"><tbody>
    <tr><td>Beurskoers standalone</td><td>€ <b id="b_koers">—</b></td></tr>
    <tr><td>+ Fundamentele opslag (markt onderschat)</td><td>€ <b id="b_opslag">—</b></td></tr>
    <tr><td>+ Synergie per aandeel</td><td>€ <b id="b_synps">—</b></td></tr>
    <tr><td>+ Superdividend per aandeel</td><td>€ <b id="b_divps">—</b></td></tr>
    <tr class="tot"><td>= Waarde per aandeel in de fusie</td><td>€ <b id="b_total">—</b></td></tr>
    <tr><td>Zeker cash-bod (vergelijking)</td><td>€ <b id="b_cash">—</b></td></tr>
  </tbody></table>
</div>
<div class="mverdict" id="f_verdict">—</div>
<div class="callout"><span class="lbl">De kern: markt ≠ fundament</span>Bijna alle waarde boven de koers zit in <em>aannames</em> (opslag + synergie), niet in het harde dividend (~€14). Zet de realisatie op 50% en de opslag op 0 → de uitkomst zakt richting of ónder de €73. Eén set aannames draait de conclusie om — dát is het gesprek.</div>
<div class="callout warn"><span class="lbl">Let op bij gebruik</span>Illustratief onderwijsmodel, géén volwaardige waardering of beleggingsadvies. Het aandelenaantal (~179 mln) en de multiple (~8×) zijn ruwe ankers, te verfijnen. Spiegel aan de aandeelhouderspost in het impact-model: die nettoot óók de gemiste cash-premie (€73 − ~€52) en kijkt naar de hele combinatie, niet alleen het AkzoNobel-aandeel.</div>
</div>`;

const IMPACT_MODEL = `
<div id="impactModel">
<div class="block">
  <span class="eyebrow">Analist · impact-model (brede waarde)</span>
  <h2 style="margin-top:8px">Brede-waarde-toets — pas de posten aan</h2>
  <p class="lead">De vijf maatschappelijke effecten in <strong>€ mrd contante waarde</strong> (F+S+E). Pas de <strong>gele cellen</strong> aan; de kolomtotalen en het oordeel herrekenen live. Zelfde opzet als 04_mkba — gele cellen zijn aannames, bedoeld om te bevrágen.</p>
  <p class="src">Methode: De Adelhart Toorop, De Groot Ruiz &amp; Schoenmaker (ESB, 2017) · zie tab <strong>Bronnen</strong>.</p>
</div>
<table class="mkba editable">
  <thead><tr><th>Effect (€ mrd, CW)</th><th>Voorzichtig</th><th>Verwacht</th><th>Optimistisch</th></tr></thead>
  <tbody>
    <tr><td>Werknemers</td>
      <td><input class="cell" type="number" step="0.1" data-imp="lo" data-def="-2.5" value="-2.5"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="mid" data-def="-0.5" value="-0.5"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="hi" data-def="0.2" value="0.2"></td></tr>
    <tr><td>Consumenten (prijzen)</td>
      <td><input class="cell" type="number" step="0.1" data-imp="lo" data-def="-5.0" value="-5.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="mid" data-def="-1.0" value="-1.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="hi" data-def="0.0" value="0.0"></td></tr>
    <tr><td>Klimaat (CO₂)</td>
      <td><input class="cell" type="number" step="0.1" data-imp="lo" data-def="-2.0" value="-2.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="mid" data-def="-0.3" value="-0.3"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="hi" data-def="1.0" value="1.0"></td></tr>
    <tr><td>Aandeelhouders</td>
      <td><input class="cell" type="number" step="0.1" data-imp="lo" data-def="-2.0" value="-2.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="mid" data-def="1.5" value="1.5"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="hi" data-def="4.0" value="4.0"></td></tr>
    <tr><td>Autonomie (NL)</td>
      <td><input class="cell" type="number" step="0.1" data-imp="lo" data-def="-3.0" value="-3.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="mid" data-def="-1.0" value="-1.0"></td>
      <td><input class="cell" type="number" step="0.1" data-imp="hi" data-def="-0.1" value="-0.1"></td></tr>
    <tr class="tot"><td>Totaal — brede waarde</td><td id="it_lo">—</td><td id="it_mid">—</td><td id="it_hi">—</td></tr>
  </tbody>
</table>
<button class="mreset" data-act="impactreset">↺ Herstel posten</button>
<div class="mverdict" id="i_verdict">—</div>
<div class="card accent">
  <h3>Wat drijft elke post</h3>
  <ul class="kv">
    <li><strong>Werknemers:</strong> synergie (~$600 mln) deels uit footprint/SG&amp;A → ~2.000 netto banen weg (verwacht), tot ~5.000 (voorzichtig); maatschappelijke waarde ~€70.000 per baan. Een fusie van gelijken snijdt minder diep dan een vijandige overname.</li>
    <li><strong>Consumenten:</strong> complementaire portefeuilles → beperkte overlap; mededingingstoezicht remt het prijseffect. Veel kleiner dan bij PPG (directe #1+#2).</li>
    <li><strong>Klimaat:</strong> symmetrische profielen, geen groot duurzaamheidsvoordeel dat erodeert; schaal kan groene R&amp;D juist helpen (CO₂-prijs ~€110/ton).</li>
    <li><strong>Aandeelhouders:</strong> ~$600 mln synergie gekapitaliseerd (~8×) ≈ €4–5 mrd bruto, minus integratiekosten en risico, tegenover de gemiste cash-premie (€73 vs ~€52). Zie ook het financieel model.</li>
    <li><strong>Autonomie (NL):</strong> HQ deels naar Philadelphia, enkel-NYSE (delisting Euronext). Mitigatie: NL-domicilie, één HQ Amsterdam, 55% behoud; basis al &gt;60% VS. Hardst te monetariseren, deels kwalitatief.</li>
  </ul>
</div>
<div class="callout warn"><span class="lbl">Let op bij gebruik</span>Illustratieve onderwijs-schatting, géén volwaardige MKBA — de euro's zijn redeneer-aannames. Disconto 3% · horizon 4 jr (midden) / 8 jr (extremen). Ter vergelijking: de PPG-overname (2017) scoorde ≈ −€6 mrd. De kunst: welke aanname drijft de uitkomst, en wie heeft die gekozen?</div>
</div>`;

const SOURCES = `
<div class="block">
  <span class="eyebrow">Analist · bronnen</span>
  <h2 style="margin-top:8px">Bronnen &amp; verantwoording</h2>
  <p class="lead">De feiten en concepten achter de casus. Externe bronnen zijn aanklikbaar; de modellen op de andere tabs zijn illustratieve onderwijs-schattingen op basis hiervan (zie de disclaimers per tab).</p>
</div>
<div class="block"><h2>De casus — dealfeiten</h2>
  <ul class="kv">
    <li><strong>AkzoNobel × Axalta — merger of equals</strong> (18 nov 2025): ruil 0,6539 · ~$25 mrd · dual HQ Amsterdam/Philadelphia · leiderschap. <a href="https://www.akzonobel.com/en/media/media-releases/akzonobel-and-axalta-to-combine-in-all-stock-merger-of-equals-creating-a-premier-global-coatings-company" target="_blank" rel="noopener">AkzoNobel persbericht</a> · <a href="https://ir.axalta.com/news/press-releases/detail/671/akzonobel-and-axalta-to-combine-in-all-stock-merger-of-equals-creating-a-premier-global-coatings-company" target="_blank" rel="noopener">Axalta IR</a></li>
    <li><strong>04_mkba_akzo_axalta.xlsx</strong> — het brede-waarde-werkmodel (tab "MKBA 2026 MOE"), bron voor het impact-model. <em>Intern.</em></li>
    <li><strong>Validatie_getallen_presentatie.xlsx</strong> — validatie van de cijfers in de lezing. <em>Intern.</em></li>
  </ul>
</div>
<div class="block"><h2>Brede waarde &amp; maatschappelijke toetsing</h2>
  <ul class="kv">
    <li><strong>De Adelhart Toorop, De Groot Ruiz &amp; Schoenmaker (2017)</strong> — "Maatschappelijke toetsing van overnames is nodig", <em>ESB</em>. De methode achter de toets; analyseerde destijds AkzoNobel–PPG (≈ −€6 mrd). <a href="https://esb.nu/maatschappelijke-toetsing-van-overnames-is-nodig/" target="_blank" rel="noopener">esb.nu</a></li>
    <li><strong>Sturen op integrale waarde</strong> — beslissen op F+S+E i.p.v. alleen winst (integrated value). <a href="https://esb.nu/bedrijven-moeten-sturen-op-integrale-waarde-en-niet-alleen-op-winst/" target="_blank" rel="noopener">esb.nu</a></li>
  </ul>
</div>
<div class="block"><h2>Impact in geld — frameworks</h2>
  <ul class="kv">
    <li><strong>Impact-Weighted Accounts Framework (IWAF)</strong> — Impact Economy Foundation, m.m.v. Impact Institute, Harvard, RSM &amp; SMU. <a href="https://impacteconomyfoundation.org/impactweightedaccountsframework/" target="_blank" rel="noopener">impacteconomyfoundation.org</a></li>
    <li><strong>True Price</strong> — marktprijs + verborgen sociale &amp; ecologische kosten; methode &amp; monetarisatiefactoren. <a href="https://www.trueprice.org/methodology/" target="_blank" rel="noopener">trueprice.org</a></li>
    <li><strong>IFVI — International Foundation for Valuing Impacts</strong> — voortzetting van Harvards Impact-Weighted Accounts Initiative (Serafeim). <a href="https://ifvi.org/" target="_blank" rel="noopener">ifvi.org</a></li>
  </ul>
</div>
<div class="block"><h2>Governance &amp; verslaggeving</h2>
  <ul class="kv">
    <li><strong>Nederlandse Corporate Governance Code 2022</strong> — lange-termijn waardecreatie &amp; dubbele materialiteit. Monitoring Commissie. <a href="https://www.mccg.nl/documenten/2022/12/20/corporate-governance-code-2022" target="_blank" rel="noopener">mccg.nl</a></li>
    <li><strong>CSRD / ESRS</strong> — duurzaamheidsverslaggeving met assurance; dubbele materialiteit. EU-standaardzetter EFRAG. <a href="https://www.efrag.org/" target="_blank" rel="noopener">efrag.org</a></li>
  </ul>
</div>
<div class="callout warn"><span class="lbl">Let op</span>Het financieel model en het impact-model op deze pagina zijn <strong>illustratieve onderwijs-schattingen</strong> op basis van publieke dealfeiten en de bovenstaande methoden — geen waardering, beleggingsadvies of volwaardige MKBA.</div>`;

const ROLES = {
  rvb:{ code:'bestuur', aliases:['rvb','bestuur'], chip:'RvB', accent:'var(--orange)',
    title:'Bestuur (RvB) AkzoNobel', tag:'Het dagelijks bestuur · jullie dragen de aanbeveling',
    stance:['vast','Vast: vóór de fusie'], extras:[], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose">Het dagelijks bestuur van AkzoNobel. Jullie formuleren de aanbeveling, voeren het proces en dragen de afweging. CEO Greg Poux-Guillaume wordt CEO van de combinatie.</p></div>
    <div class="block"><h2>Jullie opdracht</h2><p class="lead">Beveel de fusie aan en verdedig waarom die méér waard is dan de afgewezen €73 cash.</p></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>~$600 mln synergie per jaar (90% binnen 3 jaar) → hogere toekomstige kasstromen.</li>
      <li>AkzoNobel-aandeelhouders: 55% + €2,5 mrd superdividend.</li>
      <li>Afgewezen cash €73 vs. beurskoers ~€52.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Waarom levert de fusie méér lange-termijnwaarde dan de zekere €73 cash?</div></div>
    <div class="card"><h3>Jullie sterkste argument</h3><p class="prose">Synergie → hogere vrije kasstroom → hogere <strong>fundamentele</strong> waarde (DCF). Markt ≠ fundament: €73 en ~€52 zijn marktsignalen, niet de echte waarde. En: de brede-waarde-analyse laat zien dat de opsplitsing uit het cash-bod maatschappelijk sléchter scoort dan deze fusie.</p></div>
    <div class="callout warn"><span class="lbl">Let op — belangenconflict</span>Jullie gaan er zélf op vooruit: de top blijft aan en de CEO-beloning loopt op (target ~€14,4 mln vs ~€11 mln nu), terwijl het cash-bod jullie buitenspel had gezet. RvC en aandeelhouders zúllen vragen: beveel je dit aan voor de aandeelhouders, of voor jezelf? Heb je antwoord klaar.</div>`},

  rvc:{ code:'rvc', aliases:['rvc'], chip:'RvC', accent:'var(--green)',
    title:'RvC AkzoNobel', tag:'De raad van commissarissen · jullie houden toezicht',
    stance:['open','Open: jij weegt'], extras:['toets'], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose">De raad van commissarissen. Jullie houden toezicht en keuren de fusie goed óf af. Jullie kompas: het <strong>vennootschappelijk belang</strong> en lange-termijn waardecreatie — breder dan alleen de aandeelhouders. Voorzitter: Ben Noteboom.</p></div>
    <div class="block"><h2>Jullie opdracht</h2><p class="lead">Toets de aanbeveling van het bestuur. Keur goed, af, of onder voorwaarden — en motiveer.</p></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>De maatschappelijke toets (jullie hand-out, zie tab): verwacht ≈ <strong>−€1,3 mrd</strong> brede waarde, band −€14,5 tot +€5,2 mrd, incl. autonomie-post.</li>
      <li>Ter vergelijking: de PPG-overname uit 2017 scoorde ≈ −€6 mrd.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Is de afweging zorgvuldig en dient ze het vennootschappelijk belang — niet alleen de koers van morgen?</div></div>
    <div class="card"><h3>Jullie sterkste rol</h3><p class="prose">Stel de vraag die niemand stelt. Weeg financieel + sociaal + ecologisch (F+S+E). Toets of de aanbeveling niet gekleurd is door het eigenbelang van het bestuur. Optionele zet: eis een <strong>maatschappelijke fairness-opinie</strong> vóór goedkeuring.</p></div>
    <div class="callout"><span class="lbl">Let op</span>Je hoeft geen accountant te zijn — de "naïeve" vraag is vaak de scherpste. Keur niet blind goed, maar blokkeer ook niet zonder grond.</div>`},

  or:{ code:'or', aliases:['or'], chip:'OR', accent:'var(--teal)',
    title:'Ondernemingsraad (OR)', tag:'Medezeggenschap namens de werknemers',
    stance:['vast','Vast: kritisch / voorwaardelijk'], extras:[], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose">De medezeggenschap namens de werknemers. Jullie hebben adviesrecht (WOR) — en jullie advies is een <strong>harde closing-voorwaarde</strong>.</p></div>
    <div class="block"><h2>Jullie opdracht</h2><p class="lead">Geef advies over de fusie en eis concrete garanties.</p></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>Gecombineerd 46.551 werknemers.</li>
      <li>De $600 mln synergie komt deels uit "footprint optimization" en SG&amp;A — oftewel locaties en functies.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Wat betekent $600 mln synergie voor de mensen — en welke garanties eisen we?</div></div>
    <div class="card"><h3>Jullie sterkste argument</h3><p class="prose">Synergie zónder banenverlies bestaat zelden. Eis harde toezeggingen over banen, R&amp;D-locaties en NL-verankering. De sociale waarde (de S in F+S+E) telt mee in de echte waarde van het bedrijf.</p></div>
    <div class="callout warn"><span class="lbl">Let op</span>Jullie kunnen de deal niet blokkeren, maar wél vertragen en voorwaarden afdwingen. Gebruik dat als hefboom — niet als dreigement zonder onderbouwing.</div>`},

  minister:{ code:'minister', aliases:['minister','ez'], chip:'Minister EZ', accent:'var(--navy)',
    title:'Ministerie van Economische Zaken', tag:'De minister · bewaakt het nationaal belang',
    stance:['vast','Vast: vóór harde toezeggingen'], extras:['toets'], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose">De minister en het departement. Jullie bewaken het nationaal belang. <strong>Geen formeel veto</strong> (geen Wet Vifo) — maar wél politieke druk en het podium om toezeggingen af te dwingen.</p></div>
    <div class="block"><h2>Jullie opdracht</h2><p class="lead">Bescherm het nationaal belang en eis publieke garanties.</p></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>Dual HQ Amsterdam/Philadelphia; uiteindelijk enkel een notering in New York → weg van Euronext Amsterdam.</li>
      <li>De autonomie-post in de maatschappelijke toets (zie tab): verwacht ≈ −€1 mrd.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Blijven hoofdkantoor, R&amp;D en werkgelegenheid in NL geborgd — en wat is jullie hefboom zónder veto?</div></div>
    <div class="card"><h3>Jullie sterkste argument</h3><p class="prose">"BV Nederland": een strategisch bedrijf, zijn R&amp;D en zijn hoofdkantoor horen verankerd. Eis publieke, harde toezeggingen vóór steun.</p></div>
    <div class="callout warn"><span class="lbl">Let op — speel jezelf niet vast</span>Je krijgt weerwoord, en dat moet je kunnen pareren: de aandeelhoudersbasis is <strong>al meer dan 60% Amerikaans</strong>, het bestuur zegt dat schaal het bedrijf juist mínder een overnameprooi maakt, en de fiscale zetel + één HQ + 55% blijven Nederlands. Wees scherp over wélke autonomie je precies wilt beschermen — en waarom dat een prijs waard is.</div>`},

  axalta:{ code:'axalta', aliases:['axalta'], chip:'Board Axalta', accent:'var(--amber)',
    title:'Board Axalta', tag:'Het bestuur van Axalta · jullie willen deze fusie',
    stance:['vast','Vast: vóór de fusie'], extras:[], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose">Het bestuur van Axalta. Jullie willen deze fusie binnenhalen. CEO Chris Villavarayan wordt Deputy CEO; voorzitter Rakesh Sachdev wordt Chair van de combinatie.</p></div>
    <div class="block"><h2>Jullie opdracht</h2><p class="lead">Verdedig de ruilverhouding en de no-premium-structuur.</p></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>Ruil 0,6539 per aandeel; jullie aandeelhouders krijgen 45%.</li>
      <li>De combinatie: ~$17 mrd omzet, ~$3,3 mrd EBITDA, ~$600 mln synergie.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Hoe verdedig je "geen premie" tegenover aandeelhouders die er wél een eisen?</div></div>
    <div class="card"><h3>Jullie sterkste argument</h3><p class="prose">Een fusie van gelijken betekent geen premie, maar wél blíjvend meedelen in de upside en de volledige synergie — niet eenmalig uitgekocht worden. Samen sterker tegen PPG en Sherwin-Williams.</p></div>
    <div class="callout warn"><span class="lbl">Let op</span>Echte Axalta-aandeelhouders zijn verdeeld: Shapiro Capital en Artisan Partners vinden het te weinig en dreigen tegen te stemmen; Cevian steunt. Anticipeer op "wij worden tekortgedaan."</div>`},

  aandeelhouders:{ code:'aandeelhouders', aliases:['aandeelhouders','aandeel'], chip:'Grootaandeelhouders', accent:'var(--sage)',
    title:'Grootaandeelhouders', tag:'Het stempanel · jullie brengen de beslissende stem uit',
    stance:['open','Open: jullie beslissen'], extras:[], card:`
    <div class="block"><h2>Wie zijn jullie</h2><p class="prose"><strong>Vijf zetels</strong> die samen stemmen — elk één stem, de meerderheid (3 van 5) beslist. Verdeel de zetels, knok eerst intern, stem dan. Oneven aantal, dus er ís altijd een uitslag.</p></div>
    <div class="card"><h3>De vijf zetels</h3><table class="facts">
      <tr><td><strong>BlackRock</strong></td><td>grote, lange-termijn-belegger; governance en waardecreatie; niet sentimenteel over NL</td></tr>
      <tr><td><strong>Pensioenfonds AkzoNobel (APF)</strong></td><td>rendement én de NL-banen van je eigen deelnemers — je voelt het dilemma persoonlijk</td></tr>
      <tr><td><strong>Groot NL-pensioenfonds (ESG)</strong></td><td>fiduciaire plicht + duurzaamheid; gevoelig voor het brede-waarde-argument, maar wil rendement zien</td></tr>
      <tr><td><strong>VEB</strong> (kleine beleggers)</td><td>eerlijke prijs, minderheidsrechten, governance — een volwaardige stem</td></tr>
      <tr><td><strong>Activistische belegger</strong> (type Cevian/Elliott)</td><td>event-driven; harde waarde/premie-focus; vaak de swing-stem — te overtuigen door een sterk waardeverhaal</td></tr>
    </table></div>
    <div class="card accent"><h3>Kerncijfers om in te zetten</h3><ul class="kv">
      <li>55% + €2,5 mrd superdividend vs. de afgewezen €73 cash (koers ~€52).</li>
      <li>~$600 mln synergie; maatschappelijke toets: band −€14,5 tot +€5,1 mrd.</li></ul></div>
    <div class="block"><h2>Jullie hoofdvraag</h2><div class="bigq">Is 55% + dividend in een no-premium fusie méér waard dan de zekere cash die we afsloegen?</div></div>
    <div class="card"><h3>Jullie sterkste rol</h3><p class="prose">Dwing het bestuur en Axalta tot een hard waardeverhaal. Weeg zekerheid (cash) tegen upside en risico (aandelen), en weeg financieel tegen sociaal/ecologisch.</p></div>
    <div class="callout warn"><span class="lbl">Let op</span>Jullie stem beslist — vijf zetels, elk één stem, meerderheid (3 van 5) wint. "Voor", "tegen", of "alleen tegen betere voorwaarden" zijn alle drie mogelijk. Eén afwijkende zetel kan de doorslag geven.</div>`}
};

const ROLE_ORDER=['rvb','rvc','or','minister','axalta','aandeelhouders'];

const PHASES=[
 {start:0,    label:'Intro & rolverdeling', sub:'Situatie schetsen · mappen uit · klok aan', dur:'5 min', cues:`
   <div class="cue"><div class="who">Voorlezen — kort & energiek</div><div class="say">"We staan in de zomer van 2026. Het cash-bod van Nippon Paint en Sherwin-Williams — €73 per aandeel, mét opsplitsing van AkzoNobel — is afgewezen en van tafel. Op tafel ligt nu een fusie van gelijken met Axalta. De aandeelhouders moeten straks stemmen. Jullie taak vanaf nu: bepaal vanuit je rol één standpunt en je sterkste argument. Aan het eind stemmen we echt."</div></div>
   <div class="cue note"><div class="say">Deel groepen + mappen uit (vooraf ingedeeld). Wijs op de spiekkaart-finance; RvC en Minister krijgen ook de maatschappelijke toets. Niet de hele dealstructuur voorlezen — één minuut situatie, dan loslaten. Zet de klok zichtbaar aan.</div></div>`},
 {start:300,  label:'Voorbereiding in rol', sub:'Standpunt + hoofdargument + één getal', dur:'12 min', cues:`
   <div class="cue note"><div class="say">Circuleer langs de tafels. Bij een vastgelopen groep een gerichte duw:</div></div>
   <div class="cue probe"><div class="who">RvB</div><div class="say">"Wat is jullie sterkste cijfer-argument dat de fusie méér waard is dan de €73 cash?"</div></div>
   <div class="cue probe"><div class="who">RvC</div><div class="say">"Welke vraag aan het bestuur is nog niet beantwoord?"</div></div>
   <div class="cue probe"><div class="who">OR</div><div class="say">"Als de $600 mln synergie deels uit banen komt — welke garantie eisen jullie?"</div></div>
   <div class="cue probe"><div class="who">Minister</div><div class="say">"Geen veto — wat is dán je hefboom, en wat is je concrete eis?"</div></div>
   <div class="cue probe"><div class="who">Axalta</div><div class="say">"Waarom is geen-premie tóch een goede deal voor de ander?"</div></div>
   <div class="cue probe"><div class="who">Aandeelhouders</div><div class="say">"Verdeel de vijf zetels en bepaal per zetel: voor, tegen, of voorwaardelijk."</div></div>
   <div class="cue"><div class="who">Halverwege (±11:00)</div><div class="say">"Halverwege. Kies nú je standpunt en je gétal — niet alles, één scherp punt."</div></div>`},
 {start:1020, label:'Beurt · RvB AkzoNobel', sub:'Aanbeveling + hét waardeargument', dur:'3 min', cues:`
   <div class="cue"><div class="who">Overgang</div><div class="say">"We beginnen bij het bestuur. RvB, drie minuten: jullie aanbeveling en hét argument."</div></div>
   <div class="cue probe"><div class="who">Probe</div><div class="say">"Hoeveel van de $600 mln synergie zit al in jullie waarde — en wat als die maar half landt?"</div></div>
   <div class="cue probe"><div class="who">Probe — belangenconflict</div><div class="say">"Voor wie is dit het beste: de aandeelhouders of het bestuur?"</div></div>`},
 {start:1200, label:'Beurt · RvC AkzoNobel', sub:'Toetst · keurt goed of af', dur:'3 min', cues:`
   <div class="cue"><div class="who">Overgang</div><div class="say">"RvC, jullie houden toezicht. Keuren jullie dit goed — en welke vraag stellen jullie?"</div></div>
   <div class="cue probe"><div class="who">Probe</div><div class="say">"Wat zegt de maatschappelijke toets over Nederland én de wereld?"</div></div>
   <div class="cue probe"><div class="who">Probe</div><div class="say">"Is de aanbeveling gekleurd door het eigenbelang van het bestuur?"</div></div>`},
 {start:1380, label:'Beurt · OR AkzoNobel', sub:'Advies + garanties (harde voorwaarde)', dur:'2,5 min', cues:`
   <div class="cue"><div class="who">Overgang</div><div class="say">"Het advies van de OR is een harde closing-voorwaarde. Wat is het — en welke garanties?"</div></div>
   <div class="cue probe"><div class="who">Probe</div><div class="say">"Synergie zonder banenverlies — kan dat? Laat het zien."</div></div>`},
 {start:1530, label:'Beurt · Minister (EZ)', sub:'Nationaal belang / autonomie', dur:'2,5 min', cues:`
   <div class="cue"><div class="who">Overgang</div><div class="say">"De minister van Economische Zaken wil iets kwijt."</div></div>
   <div class="cue note"><div class="say">Laat de minister de zorg + eis neerleggen (nationaal belang, R&amp;D, hoofdkantoor, Euronext-delisting, autonomie). Houd het tweezijdig:</div></div>
   <div class="cue probe"><div class="who">Weerwoord (speel het zelf als 't te makkelijk gaat)</div><div class="say">"Minister, de aandeelhoudersbasis is al meer dan 60% Amerikaans, en het bestuur zegt dat schaal het bedrijf juist mínder een prooi maakt. Wat is dan precies uw zorg — en wat is uw hefboom zónder veto?"</div></div>`},
 {start:1680, label:'Beurt · Board Axalta', sub:'Verdedigt de merger of equals', dur:'3 min', cues:`
   <div class="cue"><div class="who">Overgang</div><div class="say">"Axalta, jullie willen deze fusie. Verdedig de ruil — 0,6539, 45% — tegenover wie een premie eist."</div></div>
   <div class="cue probe"><div class="who">Probe</div><div class="say">"Waarom zou een AkzoNobel-aandeelhouder géén premie verdienen?"</div></div>`},
 {start:1860, label:'Buffer', sub:'Uitloop / overgangen — bescherm de stem', dur:'2 min', cues:`
   <div class="cue note"><div class="say">Loop je op schema? Gebruik deze twee minuten voor één extra confrontatie tussen twee groepen. Loop je uit? Laat de probes vallen — houd alleen de overgangen. <b>De stem wordt nooit ingekort.</b></div></div>`},
 {start:1980, label:'DE STEM (climax)', sub:'Reprise → één zin p/groep → stemmen', dur:'8 min', climax:true, cues:`
   <div class="cue"><div class="who">Minister-reprise (33:00–34:00)</div><div class="say">"Voor we stemmen — de minister, één laatste keer: welke harde toezegging moet er liggen?"</div></div>
   <div class="cue"><div class="who">Eén zin per groep (34:00–37:30)</div><div class="say">"Elke groep: één zin. Wat is jullie boodschap aan de aandeelhouders?" — snel langs RvB, RvC, OR, Minister, Axalta. Kap af na één zin.</div></div>
   <div class="cue probe"><div class="who">De stem (37:30–41:00)</div><div class="say">~2 min intern knokken. Laat dán elke zetel hardop verklaren: BlackRock · Pensioenfonds APF · het grote NL-fonds · VEB · de activistische belegger — vóór, tegen, of voorwaardelijk. Leg het vast in "Uitslag vastleggen" hiernaast.</div></div>
   <div class="cue note"><div class="say">Vijf gelijke stemmen, <b>meerderheid (3 van 5)</b> beslist — oneven, dus er ís altijd een uitslag, geen tiebreak nodig. De activist is vaak de swing. "De uitslag is… [voor / tegen / alleen tegen betere voorwaarden]."</div></div>`},
 {start:2460, label:'Debrief-haakje', sub:'3 vragen + brug naar de plenaire reflectie', dur:'4 min', cues:`
   <div class="cue"><div class="who">Drie vragen, kort</div><div class="say">1. "Wie stemde met het hoofd, wie met het hart?"<br>2. "Welk gétal was doorslaggevend — en wie bepaalde dat getal?"<br>3. "Wat zou jij als jong commissaris hebben gevraagd dat vandaag níet gevraagd is?"</div></div>
   <div class="cue"><div class="who">Brug</div><div class="say">"Onthoud je stem. In de reflectie koppelen we dit aan je eigen rol en de zelf-assessment."</div></div>`},
 {start:2700, label:'Einde', sub:'Tijd is om', dur:'—', cues:`<div class="cue note"><div class="say">45 minuten verstreken. Door naar de plenaire reflectie (laatste 15 min van de masterclass).</div></div>`}
];

const TOTAL=2700;

const SEATS=[
  {id:'blackrock',name:'BlackRock',sub:'lange termijn · governance'},
  {id:'apf',name:'Pensioenfonds APF',sub:'rendement én NL-banen'},
  {id:'nlfonds',name:'Groot NL-pensioenfonds',sub:'fiduciair + ESG'},
  {id:'veb',name:'VEB',sub:'kleine beleggers'},
  {id:'activist',name:'Activistische belegger',sub:'de swing-stem'}
];

const VLAB={voor:'Voor',tegen:'Tegen',voorw:'Voorw.'};

const ANALIST_TABS=[
  ['fin','Financieel model',FINMODEL],
  ['impact','Impact-model',IMPACT_MODEL],
  ['situatie','De situatie',SITUATIE],
  ['spiek','Spiekkaart finance',SPIEKKAART],
  ['bronnen','Bronnen',SOURCES]
];
