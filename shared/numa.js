/* NuMA – gemeinsame Bausteine der Entwürfe v1–v4.
   Sprache (ES/EN), WhatsApp-Links, Steine mit Herkunft und traditioneller Bedeutung, Stein-Zeichnung, Plätze. */
(function(w){
  /* ===== Pflege ===== */
  var PLAZAS_LIBRES = 5, PLAZAS_TOTAL = 5;
  var PHONE = '34642527397';

  var MSG = {
    es: 'Hola Charlotte, vengo de la web de NuMA y quiero saber más.',
    en: 'Hi Charlotte, I found NuMA online and would love to know more.'
  };

  /* Steine: c = Farben (hell, mittel, dunkel), t = Textur, s = Form */
  var S = {
    lapis:{es:'Lapislázuli',en:'Lapis lazuli',c:['#5B7FE0','#1F3A9E','#0D1A5C'],t:'lapis',s:'slab',o:{es:'Afganistán y Chile',en:'Afghanistan and Chile'},m:{es:'La piedra de los faraones. Se asocia a la verdad y la sabiduría.',en:'The stone of the pharaohs. Associated with truth and wisdom.'}},
    azurita:{es:'Azurita',en:'Azurite',c:['#4F86E8','#1C4FB8','#0B235E'],t:'none',o:{es:'Marruecos, México y Estados Unidos',en:'Morocco, Mexico and the United States'},m:{es:'Se asocia a la claridad y la intuición.',en:'Associated with clarity and intuition.'}},
    labradorita:{es:'Labradorita',en:'Labradorite',c:['#7D8A96','#3A434D','#1C2229'],t:'flash',o:{es:'Canadá, Finlandia y Madagascar',en:'Canada, Finland and Madagascar'},m:{es:'Su destello cambia con la luz. Se asocia a la intuición y la protección.',en:'Its flash changes with the light. Associated with intuition and protection.'}},
    malaquita:{es:'Malaquita',en:'Malachite',c:['#4FB98A','#17805A','#07402C'],t:'band',b:['#0B5A3E','#2E9C6E','#6CCB9C'],s:'slab',o:{es:'R. D. del Congo y Zambia',en:'DR Congo and Zambia'},m:{es:'Es verde porque contiene cobre. Se asocia a la transformación.',en:'Green because it contains copper. Associated with transformation.'}},
    turquesa:{es:'Turquesa',en:'Turquoise',c:['#8DE0D6','#38A9A3','#1C6E6C'],t:'vein',v:'#6B4A2C',o:{es:'Irán, Estados Unidos y China',en:'Iran, the United States and China'},m:{es:'El amuleto de los viajeros. Se asocia a la protección.',en:"The traveller's amulet. Associated with protection."}},
    cuarzorosa:{es:'Cuarzo rosa',en:'Rose quartz',c:['#FCE6EB','#E9A9B8','#C07489'],t:'none',o:{es:'Brasil y Madagascar',en:'Brazil and Madagascar'},m:{es:'Se asocia al amor y la ternura.',en:'Associated with love and tenderness.'}},
    tigre:{es:'Ojo de tigre',en:"Tiger's eye",c:['#F0C46E','#B9771F','#5C350C'],t:'ray',o:{es:'Sudáfrica y Australia',en:'South Africa and Australia'},m:{es:'Se asocia al valor y la confianza.',en:'Associated with courage and confidence.'}},
    agata:{es:'Ágata',en:'Agate',c:['#E8C9A7','#A97B57','#5A3B26'],t:'band',b:['#F1DCC4','#A97B57','#6E4A30'],o:{es:'Brasil y Uruguay',en:'Brazil and Uruguay'},m:{es:'Se asocia al equilibrio.',en:'Associated with balance.'}},
    amatista:{es:'Amatista',en:'Amethyst',c:['#D2BDF0','#8A63C6','#46297F'],t:'none',o:{es:'Brasil y Uruguay',en:'Brazil and Uruguay'},m:{es:'Se asocia a la calma y el buen descanso.',en:'Associated with calm and good rest.'}},
    cornalina:{es:'Cornalina',en:'Carnelian',c:['#F7A46A','#D3561F','#7E2A0B'],t:'none',o:{es:'India y Brasil',en:'India and Brazil'},m:{es:'Se asocia a la energía y el valor.',en:'Associated with energy and courage.'}},
    obsidiana:{es:'Obsidiana',en:'Obsidian',c:['#6B6F78','#24262B','#08090B'],t:'none',o:{es:'Vidrio volcánico, también de Canarias',en:'Volcanic glass, also from the Canaries'},m:{es:'Se asocia a la protección.',en:'Associated with protection.'}},
    nacar:{es:'Nácar',en:'Mother-of-pearl',c:['#FFFFFF','#EADFE6','#B9C6D6'],t:'flash',o:{es:'Del interior de las conchas marinas',en:'From inside sea shells'},m:{es:'Nace del mar, capa a capa. Se asocia a la calma.',en:'Born of the sea, layer by layer. Associated with calm.'}},
    luna:{es:'Piedra luna',en:'Moonstone',c:['#FFFFFF','#DCE3EE','#9FB0C8'],t:'flash',o:{es:'Sri Lanka e India',en:'Sri Lanka and India'},m:{es:'Se asocia a la intuición y los ciclos.',en:'Associated with intuition and cycles.'}},
    aguamarina:{es:'Aguamarina',en:'Aquamarine',c:['#E0F6F8','#8FD0DA','#4E98A6'],t:'none',o:{es:'Brasil y Madagascar',en:'Brazil and Madagascar'},m:{es:'El mar hecho piedra. Se asocia a la calma.',en:'The sea as a stone. Associated with calm.'}}
  };

  function lang(){ return document.documentElement.getAttribute('data-l') || 'es'; }
  function wa(text){ return 'https://api.whatsapp.com/send/?phone='+PHONE+'&text='+encodeURIComponent(text); }
  var custom = null; /* {es:'…', en:'…'} wenn ein Entwurf eine eigene Nachricht setzt */
  function setLinks(){
    var l=lang(), t = custom ? custom[l] : MSG[l];
    [].forEach.call(document.querySelectorAll('a[data-wa]'),function(a){ a.href = wa(t); a.target='_blank'; a.rel='noopener'; });
  }
  function setLang(l){
    document.documentElement.setAttribute('data-l', l);
    document.documentElement.lang = l;
    try{ localStorage.setItem('numa-l', l); }catch(e){}
    [].forEach.call(document.querySelectorAll('[data-lang-btn]'),function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-lang-btn')===l ? 'true':'false'); });
    plazas(); setLinks();
    document.dispatchEvent(new CustomEvent('numa:lang',{detail:l}));
  }
  function plazas(){
    var l=lang(), full=PLAZAS_LIBRES<=0;
    var t = full ? (l==='es'?'La primera edición está completa':'The first edition is fully booked')
                 : (l==='es'?'Quedan '+PLAZAS_LIBRES+' de '+PLAZAS_TOTAL+' plazas':PLAZAS_LIBRES+' of '+PLAZAS_TOTAL+' places left');
    [].forEach.call(document.querySelectorAll('[data-plazas]'),function(el){ el.textContent=t; });
  }

  /* Stein als SVG (Cabochon oder Platte) mit Textur. Braucht #numa-lapis-s und #numa-grain im Dokument (inject()). */
  var uid=0, SLAB='M14 22 L70 8 L92 40 L84 86 L30 94 L6 62 Z';
  /* Echte Steine aus Charlottes Collar-Foto; alle anderen matt gezeichnet, ohne Glanzpunkt (Platzhalter bis Fotos da sind) */
  var REAL={lapis:'../assets/stones/lapis.webp', nacar:'../assets/stones/nacar.webp'};
  function stone(k){
    if(REAL[k]) return '<img class="real-stone" src="'+REAL[k]+'" alt="" width="200" height="200" decoding="async" style="width:100%;height:100%;object-fit:contain">';
    var d=S[k], id='ns'+(uid++), c=d.c, slab=d.s==='slab';
    var shape = slab ? '<path d="'+SLAB+'"/>' : '<ellipse cx="50" cy="50" rx="45" ry="41" transform="rotate(-12 50 50)"/>';
    var g='<defs><clipPath id="c'+id+'">'+shape+'</clipPath><linearGradient id="g'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="'+c[1]+'"/><stop offset=".6" stop-color="'+c[1]+'"/><stop offset="1" stop-color="'+c[2]+'" stop-opacity=".9"/></linearGradient>', tex='';
    if(d.t==='band'){ g+='<radialGradient id="b'+id+'" cx="30%" cy="80%" r="14%" spreadMethod="repeat"><stop offset="0" stop-color="'+d.b[0]+'"/><stop offset=".45" stop-color="'+d.b[1]+'"/><stop offset=".75" stop-color="'+d.b[2]+'"/><stop offset="1" stop-color="'+d.b[0]+'"/></radialGradient>'; tex='<rect width="100" height="100" fill="url(#b'+id+')" opacity=".85"/>'; }
    if(d.t==='ray'){ g+='<linearGradient id="r'+id+'" x1="0" y1="0" x2=".18" y2=".05" spreadMethod="repeat"><stop offset="0" stop-color="'+c[2]+'"/><stop offset=".5" stop-color="'+c[0]+'"/><stop offset="1" stop-color="'+c[2]+'"/></linearGradient>'; tex='<rect width="100" height="100" fill="url(#r'+id+')" opacity=".55"/><rect x="0" y="38" width="100" height="16" fill="'+c[0]+'" opacity=".35" transform="rotate(-14 50 50)"/>'; }
    if(d.t==='flash'){ tex='<path d="M-5 70 C 30 40, 60 70, 105 30 L105 55 C 60 90, 30 60, -5 90Z" fill="'+(k==='labradorita'?'#5FB3D6':'#CFE2F7')+'" opacity=".55"/><path d="M-5 58 C 35 35, 55 60, 105 22 L105 32 C 60 66, 30 45, -5 66Z" fill="'+(k==='labradorita'?'#D9C46A':'#F3E6F5')+'" opacity=".45"/>'; }
    if(d.t==='vein'){ tex='<path d="M5 30 C 30 40, 45 20, 70 35 S 95 30, 100 45 M10 75 C 30 62, 55 82, 95 66 M40 0 C 45 25, 30 45, 42 60" fill="none" stroke="'+d.v+'" stroke-width="1.6" opacity=".7"/>'; }
    if(d.t==='lapis'){ tex='<rect width="100" height="100" filter="url(#numa-lapis-s)"/>'; }
    g+='</defs>';
    return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">'+g+'<g clip-path="url(#c'+id+')"><rect width="100" height="100" fill="url(#g'+id+')"/>'+tex+
      '<rect width="100" height="100" filter="url(#numa-grain)" opacity=".22" style="mix-blend-mode:multiply"/></g></svg>';
  }
  function inject(){
    if(document.getElementById('numa-defs')) return;
    var d=document.createElement('div'); d.id='numa-defs'; d.setAttribute('aria-hidden','true');
    d.innerHTML='<svg width="0" height="0" style="position:absolute"><defs>'+
      '<filter id="numa-lapis-s" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feFlood flood-color="#1F3A9E" result="base"/><feTurbulence type="fractalNoise" baseFrequency=".035 .05" numOctaves="3" seed="11" result="n1"/><feColorMatrix in="n1" type="matrix" values="0 0 0 0 .035  0 0 0 0 .075  0 0 0 0 .29  2.6 0 0 0 -1.05" result="deep"/><feTurbulence type="fractalNoise" baseFrequency=".08 .1" numOctaves="2" seed="4" result="n2"/><feColorMatrix in="n2" type="matrix" values="0 0 0 0 .27  0 0 0 0 .42  0 0 0 0 .86  3.2 0 0 0 -1.75" result="light"/><feTurbulence type="turbulence" baseFrequency=".03 .04" numOctaves="2" seed="23" result="n3"/><feColorMatrix in="n3" type="matrix" values="0 0 0 0 .9  0 0 0 0 .92  0 0 0 0 .97  -16 0 0 0 1.2" result="veins"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="1" seed="3" result="n4"/><feColorMatrix in="n4" type="matrix" values="0 0 0 0 .93  0 0 0 0 .79  0 0 0 0 .42  14 0 0 0 -9.4" result="pyrite"/><feMerge><feMergeNode in="base"/><feMergeNode in="deep"/><feMergeNode in="light"/><feMergeNode in="veins"/><feMergeNode in="pyrite"/></feMerge></filter>'+
      '<filter id="numa-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="5"/><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 -.9 .55"/></filter>'+
      '</defs></svg>';
    document.body.insertBefore(d, document.body.firstChild);
  }

  function init(){
    inject();
    var l='es'; try{ l = localStorage.getItem('numa-l') || ((navigator.language||'es').slice(0,2)==='es'?'es':'en'); }catch(e){}
    if(l!=='es' && l!=='en') l='es';
    [].forEach.call(document.querySelectorAll('[data-lang-btn]'),function(b){ b.addEventListener('click',function(){ setLang(b.getAttribute('data-lang-btn')); }); });
    setLang(l);
  }

  w.NUMA = { S:S, stone:stone, lang:lang, setLang:setLang, wa:wa, setLinks:setLinks,
    setMessage:function(m){ custom=m; setLinks(); }, init:init, plazasLibres:PLAZAS_LIBRES };
})(window);
