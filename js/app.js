/* ============ CONFIGURACIÓN POR PROYECTO ============
   Cambia estos datos, activa/oculta páginas con on:true/false
   y activa/oculta zonas de la anatomía con on:true/false. */
const CONFIG={
  project:"Med-Page", client:"Maria Camila P.", analyst:"Inti Panesso C. / Analista Funcional",
  contact:"intipanessochavez@gmail.com · +57 333 2356966",
  goal:"[Ej.: Presentar los servicios y facilitar que los clientes nos contacten.]",
  audience:"[Ej.: Familias de la ciudad que buscan servicios de ___.]",
  formspree:"https://formspree.io/f/TU_ID",
  pages:[
    {id:"inicio",label:"Inicio",on:true},
    {id:"estructura",label:"Estructura",on:true},
    {id:"contenido",label:"Contenido",on:true},
    {id:"proceso",label:"Proceso",on:true},
    {id:"branding",label:"Identidad",on:true},
    {id:"prototipo",label:"Prototipo",on:true},
    {id:"glosario",label:"Glosario",on:true}
  ],
  styler:true, /* mostrar el selector de estilos visuales */
  zones:{nav:true,header:true,body:true,footer:true,modal:true,anim:true},
  brandingState:[["Logotipo","[Sí / No / En proceso]"],["Paleta de colores","[Sí / No / En proceso]"],["Tipografías","[Sí / No / En proceso]"],["Fotografías propias","[Sí / No / En proceso]"],["Manual de marca","[Sí / No / En proceso]"]],
  stages:[["Descubrimiento","Conversamos sobre tu negocio, objetivos y público.","Responder preguntas","[X días]"],["Estructura (el plano)","Definimos páginas y contenido de cada una.","Aprobar el mapa del sitio","[X días]"],["Diseño","Colores, tipografías, imágenes y estilo.","Opinar y aprobar","[X días]"],["Desarrollo","Convertimos el diseño en página funcional.","Entregar textos e imágenes finales","[X días]"],["Pruebas","Revisamos celular, tablet y computador.","Probar y reportar","[X días]"],["Publicación","Tu sitio sale a internet.","Aprobación final","[X días]"],["Acompañamiento","Resolvemos dudas y ajustes.","Avisarnos novedades","[X días]"]]
};
const ZONES=[
 {k:"nav",cls:"nv",name:"Barra de navegación (nav)",what:"El directorio del sitio: enlaces para moverse entre secciones.",does:"Si el visitante no encuentra lo que busca en segundos, se va. En el celular suele plegarse en un ícono ☰.",ask:"Qué opciones tendrá, en qué orden y si lleva un botón destacado."},
 {k:"header",cls:"hd",name:"Encabezado principal (header)",what:"La primera impresión: título, frase de apoyo, imagen y botón.",does:"Debe decir en 5 segundos quién eres, qué ofreces y qué hacer a continuación.",ask:"Tu mensaje principal y la imagen que mejor te representa."},
 {k:"body",cls:"bd",name:"Cuerpo (body)",what:"Todo lo que está entre el encabezado y el pie: servicios, historias, fotos, testimonios, formularios.",does:"Se organiza en secciones, como capítulos, cada una con un propósito: informar, convencer, mostrar o invitar a contactar.",ask:"Qué secciones quieres y qué contenido va en cada una."},
 {k:"footer",cls:"ft",name:"Pie de página (footer)",what:"La “firma” del sitio, visible en todas las páginas.",does:"Reúne contacto, redes sociales, enlaces rápidos y avisos legales.",ask:"Teléfono, correo, dirección, redes y textos legales."},
 {k:"modal",cls:"md",name:"Ventana modal",what:"Una ventana que aparece por encima de la página tras una acción.",does:"Muestra información extra sin cambiar de página: un formulario, una foto ampliada, un aviso. Úsalas con moderación.",ask:"Qué ventanas necesitas y qué acción las abre."},
 {k:"anim",cls:"an pulse",name:"Animaciones",what:"Movimientos sutiles: un texto que aparece, un botón que reacciona.",does:"Guían la atención y confirman acciones. En exceso distraen y vuelven lenta la página.",ask:"Pocas, suaves y con propósito: ¿dónde las quieres?"}
];
const FIELDS=[
 {g:"Tu proyecto",f:[["nombre","Tu nombre","t"],["correo","Tu correo","email"],["negocio","Nombre del negocio","t"],["objetivo","Objetivo de la página en una frase","a"],["publico","¿A quién va dirigida?","a"]]},
 {g:"Contenido",f:[["menu","Opciones del menú (ej.: Inicio, Servicios, Contacto)","t"],["titular","Mensaje principal del encabezado","t"],["historia","Descripción e historia de tu negocio","a"],["servicios","Servicios o productos","a"]]},
 {g:"Contacto y pie de página",f:[["tel","Teléfono","t"],["mail","Correo público","t"],["dir","Dirección y horarios","a"],["redes","Enlaces a redes sociales","a"],["dominio","Dominio deseado (ej.: www.minegocio.com)","t"]]},
 {g:"Identidad visual",f:[["colores","Colores que usas o te gustan","t"],["refs","3 a 5 páginas de referencia (enlaces)","a"],["branding","¿Tienes logo y manual de marca?","s",["Tengo ambos","Solo logo","Nada aún"]]]},
 {g:"Prototipo",f:[["proto","Comentarios sobre el prototipo","a"]]}
];
const MATS=["Logotipo","Fotografías de calidad","Videos","Textos legales"];
const GLOS=[["Nav / Menú","Barra de enlaces para moverse por el sitio."],["Header","Zona superior; la primera impresión."],["Body","Contenido principal."],["Footer","Pie de página con información de apoyo."],["Modal","Ventana emergente sobre la página."],["CTA","“Call to Action”: elemento que invita a actuar."],["Responsive","Que la página se adapte a celular, tablet y computador."],["Dominio","La dirección de tu página."],["Hosting","El “terreno” donde vive tu sitio en internet."],["SEO","Prácticas para que Google encuentre tu página."],["Wireframe","Boceto simple de la estructura."],["Branding","La identidad visual de tu marca."]];

/* ============ COMPONENTES REUTILIZABLES ============ */
const $=s=>document.querySelector(s);
const on=()=>CONFIG.pages.filter(p=>p.on);
const Nav=cur=>`<b>${CONFIG.project}</b>`+on().map(p=>`<a href="#${p.id}" ${p.id===cur?'aria-current="page"':''}>${p.label}</a>`).join("")+`<button class="btn alt mt" id="mt" type="button" aria-label="Cambiar entre modo claro y oscuro">☾</button>`;
const Header=(p,title,lead)=>{const l=on(),i=l.findIndex(x=>x.id===p.id)+1;return `<header class="hdr"><small>Página ${i} de ${l.length}</small><h1>${title}</h1><p>${lead}</p></header>`};
const Footer=()=>`<p><b>${CONFIG.client}</b> · Preparado por ${CONFIG.analyst}</p><p>${CONFIG.contact}</p>`;
const Placeholder=(slot,t)=>Carousel(slot,t);
function openModal(t,h){$("#dt").textContent=t;$("#db").innerHTML=h;$("#dlg").showModal()}
$("#dc").onclick=()=>$("#dlg").close();

/* ============ CARRUSEL DE IMÁGENES (carpeta assets/) ============ */
const capOf=src=>{try{return decodeURIComponent(src.split("/").pop().replace(/\.[a-z0-9]+$/i,"")).replace(/^\d+[-_. ]*/,"").replace(/[-_]+/g," ").trim()}catch(e){return ""}};
let CID=0;
function Carousel(slot,label){
 const list=((window.ASSETS||{})[slot]||[]).map(i=>typeof i==="string"?{src:i,cap:capOf(i)}:i);
 if(!list.length)return `<div class="ph">[Insertar imagen: ${label}]<small>Coloca las imágenes en <code>assets/${slot}/</code> y ejecuta <code>python3 tools/build-assets.py</code></small></div>`;
 const id="car"+(++CID),n=list.length;
 return `<section class="car" aria-roledescription="carrusel" aria-label="${label}"><div class="trk" tabindex="0" id="${id}">${list.map((m,i)=>`<figure class="sl" aria-label="Imagen ${i+1} de ${n}"><img src="${m.src}" alt="${(m.cap||label).replace(/"/g,"&quot;")}" loading="lazy">${m.cap?`<figcaption>${m.cap}</figcaption>`:""}</figure>`).join("")}</div>${n>1?`<button class="cb pv" type="button" aria-label="Imagen anterior">‹</button><button class="cb nx" type="button" aria-label="Imagen siguiente">›</button><div class="dots">${list.map((_,i)=>`<button type="button" aria-label="Ir a la imagen ${i+1}" data-i="${i}"></button>`).join("")}</div>`:""}</section>`;
}
function initCarousels(root){root.querySelectorAll(".car").forEach(c=>{
 const t=c.querySelector(".trk"),dots=[...c.querySelectorAll(".dots button")],n=t.children.length;
 const idx=()=>Math.round(t.scrollLeft/t.clientWidth);
 const go=i=>t.scrollTo({left:Math.max(0,Math.min(n-1,i))*t.clientWidth,behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
 const mark=()=>dots.forEach((d,i)=>d.setAttribute("aria-current",i===idx()?"true":"false"));
 t.addEventListener("scroll",mark,{passive:true});mark();
 const pv=c.querySelector(".pv"),nx=c.querySelector(".nx");if(pv){pv.onclick=()=>go(idx()-1);nx.onclick=()=>go(idx()+1)}
 dots.forEach(d=>d.onclick=()=>go(+d.dataset.i));
})}
function openForm(){$("#fp").classList.remove("min");$("#tg").setAttribute("aria-expanded","true");const sp=$("#sp");if(sp){sp.classList.add("min");$("#stg").setAttribute("aria-expanded","false")}}

/* ============ PÁGINAS (bloques intercambiables) ============ */
const PAGES={
inicio:()=>({t:"Bienvenida a tu proyecto",l:"Este sitio te explica, paso a paso, de qué se compone una página web y qué necesitamos de ti. No necesitas conocimientos técnicos 🤓.",h:`
<div class="grid"><div class="box"><h2>Objetivo del proyecto</h2><p>${CONFIG.goal}</p></div><div class="box"><h2>¿A quién va dirigida?</h2><p>${CONFIG.audience}</p></div></div>
<div class="box"><h2>Cómo usar esta guía</h2><p><b>1.</b> Recorre las páginas del menú para conocer cada parte de un sitio web.<br><b>2.</b> Abre el panel <b>Tu información</b>, abajo a la derecha, y ve completando tus datos cuando quieras: se guarda en este navegador.<br><b>3.</b> Revisa el prototipo en la página Prototipo y anota tus comentarios.<br><b>4.</b> Abre el panel <b>Estilo visual</b>, abajo a la izquierda, en este apartado puedes adaptar el desarrollo del estilo, diseño, tipografía y color de la pagina a tus gustos: se guarda en este navegador.<br><b>5.</b> Pulsa <b>Enviar</b> en el formulario (<b>Tu información</b>) y recibire todo.</p>
<button class="btn" onclick="location.hash='estructura'">Empezar por la estructura</button></div>${Placeholder("portada","logo o imagen de portada del proyecto")}`}),

estructura:()=>({t:"Dónde va cada cosa",l:"Una página web se arma como un edificio: entrada, directorio, espacios principales y zona de servicios. Toca cada zona del boceto.",h:`
<div class="grid"><div><div class="wf" id="wf">${ZONES.filter(z=>CONFIG.zones[z.k]).map(z=>`<button class="z ${z.cls}" data-k="${z.k}" aria-pressed="false">${z.k==="anim"?"Animación":z.name.split(" (")[0]}</button>`).join("")}</div></div>
<div class="box" id="zp" aria-live="polite"><p>Elige una zona para ver su función.</p></div></div>
<p></p>${Placeholder("estructura","wireframe real del proyecto con las zonas marcadas")}`,after(){
 const sel=k=>{const z=ZONES.find(x=>x.k===k);document.querySelectorAll(".z").forEach(b=>b.setAttribute("aria-pressed",b.dataset.k===k));
  $("#zp").innerHTML=`<h2>${z.name}</h2><p><b>¿Qué es?</b> ${z.what}</p><p><b>¿Para qué sirve?</b> ${z.does}</p><p><b>Qué decidiremos juntos:</b> ${z.ask}</p>${Carousel("zona-"+k,"referencia de esta zona en tu proyecto")}`;initCarousels($("#zp"))};
 document.querySelectorAll(".z").forEach(b=>b.onclick=()=>sel(b.dataset.k));
 const f=ZONES.find(z=>CONFIG.zones[z.k]);if(f)sel(f.k)}}),

contenido:()=>({t:"Títulos, textos y botones",l:"Dentro de cada sección, el contenido se construye con tres piezas básicas. Aquí las ves en vivo.",h:`
<div class="grid"><div class="box"><h3>Títulos (h1 a h6)</h3><p>Organizan el contenido por importancia, como en un periódico. Solo hay un título principal (h1) por página; los subtítulos (h2, h3…) dividen el texto. Ayudan a leer rápido y a que Google entienda tu página.</p></div>
<div class="box"><h3>Párrafos (p)</h3><p>Los textos que explican o describen. Mejor cortos, directos y con un solo tema por párrafo.</p></div>
<div class="box"><h3>Botones (button)</h3><p>Invitan a hacer algo, con verbos claros: “Cotiza ahora”, “Reserva tu cita”.</p><button class="btn">Reservar ahora</button></div></div>
<div class="box"><h2>Pruébalo</h2><p><b>Animación:</b> pasa el cursor sobre el botón y reacciona. Pocas animaciones, suaves y con propósito.</p>
<p><b>Ventana modal:</b> así aparece una ventana por encima de la página.</p><button class="btn alt" id="dm">Abrir ejemplo de modal</button></div>
${Placeholder("contenido","sección del proyecto con título, párrafo y botón señalados")}`,after(){$("#dm").onclick=()=>openModal("¡Tu mensaje fue enviado!","<p>Esto es una ventana modal: muestra información extra sin salir de la página.</p>")}}),

proceso:()=>({t:"Cómo trabajaremos",l:"Como construir una casa: se conversa, se dibuja el plano, se construye y se entrega.",h:`<div class="box tw"><table><thead><tr><th>Etapa</th><th>¿Qué sucede?</th><th>Qué necesitamos de ti</th><th>Duración</th></tr></thead><tbody>${CONFIG.stages.map((s,i)=>`<tr><td><b>${i+1}. ${s[0]}</b></td><td>${s[1]}</td><td>${s[2]}</td><td>${s[3]}</td></tr>`).join("")}</tbody></table></div>
<div class="box"><h3>Revisiones</h3><p>En cada etapa te mostraremos un avance y pediremos tu aprobación. Sé específico/a: “Quiero el título de Servicios más grande” ayuda más que “No me convence”. Si cambia el alcance, ajustaremos tiempos y costos.</p></div>${Placeholder("proceso","línea de tiempo con fechas reales")}`}),

branding:()=>({t:"Tu identidad visual",l:"Es la personalidad visual de tu negocio: cómo se ve y cómo se siente. Si aún no la tienes, la definimos contigo.",h:`
<div class="grid"><div class="box"><h3>Qué incluye</h3><p>Logotipo, paleta de 2 a 4 colores, tipografías, estilo de imágenes y tono de comunicación.</p></div>
<div class="box"><h3>¿Sin branding?</h3><p>Conversamos cómo quieres que te perciban, revisamos 3 a 5 referencias, proponemos colores y tipografías, y ajustamos hasta que te sientas representado/a.</p></div></div>
<div class="box tw"><table><thead><tr><th>Elemento</th><th>¿Existe?</th></tr></thead><tbody>${CONFIG.brandingState.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</tbody></table></div>${Placeholder("branding","moodboard, paleta de colores o propuesta de logo")}`}),

prototipo:()=>({t:"Prototipo del proyecto",l:"Recorre las capturas del prototipo y cuéntanos tus comentarios en el panel “Tu información”, sección Prototipo.",h:`${Carousel("prototipo","capturas del prototipo del proyecto")}
<div class="box"><h3>¿Qué revisar?</h3><p>Fíjate en la estructura, los textos, los colores y si falta algo. Anota lo que quieras cambiar en el formulario.</p><button class="btn" onclick="openForm()">Abrir formulario</button></div>`}),

glosario:()=>({t:"Mini glosario",l:"Toca un término para ver su significado.",h:`<div class="grid">${GLOS.map((g,i)=>`<button class="btn alt" data-g="${i}">${g[0]}</button>`).join("")}</div>`,after(){document.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{const g=GLOS[b.dataset.g];openModal(g[0],`<p>${g[1]}</p>`)})}})
};

/* ============ ROUTER ============ */
function route(){const l=on();if(!l.length)return;const p=l.find(x=>x.id===location.hash.slice(1))||l[0];const d=PAGES[p.id]?PAGES[p.id]():{t:p.label,l:"",h:""};
 document.title=`${d.t} · ${CONFIG.project}`;$("#nav").innerHTML=Nav(p.id);$("#mt").onclick=toggleMode;syncMT();$("#app").innerHTML=Header(p,d.t,d.l)+d.h+Pager(p.id);$("#ftr").innerHTML=Footer();if(d.after)d.after();initCarousels($("#app"));window.scrollTo(0,0)}
addEventListener("hashchange",route);

/* ============ FORMULARIO FLOTANTE ============ */
const frm=$("#frm");
frm.innerHTML=FIELDS.map(g=>`<fieldset><legend>${g.g}</legend>${g.f.map(f=>{const [n,lb,t,o]=f;const c=t==="a"?`<textarea name="${n}" rows="2"></textarea>`:t==="s"?`<select name="${n}"><option value="">Elige…</option>${o.map(x=>`<option>${x}</option>`).join("")}</select>`:`<input name="${n}" type="${t==="email"?"email":"text"}">`;return `<label>${lb}${c}</label>`}).join("")}</fieldset>`).join("")
 +`<fieldset><legend>Materiales que ya tienes</legend>${MATS.map(m=>`<label class="chk"><input type="checkbox" name="materiales" value="${m}">${m}</label>`).join("")}</fieldset>
 <p style="margin-top:14px"><button class="btn" type="submit">Enviar mi información</button> <button class="btn alt" type="button" id="cp">Copiar resumen</button></p><p id="st" role="status"></p>`;
const KEY="guia-borrador";
/* Borra todo lo guardado en el navegador (borrador del formulario y estilo visual, incluidas versiones anteriores) */
function clearSaved(){try{[KEY,"guia-estilo","guia-estilo2","guia-estilo3"].forEach(k=>localStorage.removeItem(k))}catch(e){}}
function count(){const n=[...frm.querySelectorAll("input:not([type=checkbox]),textarea,select")].filter(e=>e.value.trim()).length;$("#cnt").textContent=`${n} campos`}
try{const d=JSON.parse(localStorage.getItem(KEY)||"{}");Object.entries(d).forEach(([k,v])=>{const e=frm.elements[k];if(e&&e.type!=="checkbox"&&!e.length)e.value=v})}catch(e){}
frm.addEventListener("input",()=>{count();try{const d={};[...frm.elements].forEach(e=>{if(e.name&&e.type!=="checkbox")d[e.name]=e.value});localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}});
$("#tg").onclick=()=>{const fp=$("#fp");fp.classList.toggle("min");const sp=$("#sp");if(sp){sp.classList.add("min");$("#stg").setAttribute("aria-expanded","false")}$("#tg").setAttribute("aria-expanded",!fp.classList.contains("min"))};
const summary=()=>{const fd=new FormData(frm);let t=`Proyecto: ${CONFIG.project}\nEstilo visual: ${themeText()}\n${styleData().css}\nCLASES CSS:\n${styleRules()}\n`;for(const [k,v] of fd.entries())if(String(v).trim())t+=`${k}: ${v}\n`;return t};
$("#cp").onclick=async()=>{try{await navigator.clipboard.writeText(summary());$("#st").textContent="Resumen copiado. Pégalo en un correo para enviarlo."}catch(e){$("#st").textContent="No se pudo copiar automáticamente."}};
frm.onsubmit=async e=>{e.preventDefault();const st=$("#st");
 if(CONFIG.formspree.includes("TU_ID")){st.textContent="Falta configurar el ID de Formspree en CONFIG.formspree.";return}
 st.textContent="Enviando…";const fd=new FormData(frm);fd.append("proyecto",CONFIG.project);addPayload(fd);fd.append("_subject",`Información de ${CONFIG.project}`);
 try{const r=await fetch(CONFIG.formspree,{method:"POST",body:fd,headers:{Accept:"application/json"}});if(!r.ok)throw new Error();st.textContent="¡Recibido! Gracias, te escribiremos pronto.";clearSaved();frm.reset();count();openModal("¡Información enviada!","<p>Recibimos tus datos y capturas. Revisaremos todo y te contactaremos.</p>")}
 catch(err){st.textContent="No pudimos enviarlo. Usa “Copiar resumen” y envíanoslo por correo."}};
/* ============ SELECTOR DE ESTILOS (mezclador) ============ */
/* [nombre, fuente, 3 colores principales, 3 secundarios, forma:[radio botones, radio contenedores, grosor, trazo, color borde, sombra]] */
const STYLES=[
["Minimalista Elegante","inter",["#ffffff","#f8fafc","#f1f5f9"],["#0f172a","#334155","#64748b"],["2px","4px","1px","solid","line","none"]],
["Brutalista Moderno","space",["#ffffff","#e5e5e5","#d4d4d4"],["#000000","#ef4444","#3b82f6"],["0","0","3px","solid","ink","6px 6px 0 var(--ink)"]],
["Elegante Clásico","playfair",["#faf9f6","#f3f0e9","#e8e2d5"],["#1a1a1a","#4a4a4a","#8b7355"],["6px","8px","1px","solid","line","0 4px 10px rgba(0,0,0,.12)"]],
["Tecnológico / IT","roboto",["#0f172a","#1e293b","#334155"],["#38bdf8","#818cf8","#e0e7ff"],["16px 0 16px 0","16px 0 16px 0","1px","solid","line","0 6px 14px rgba(0,0,0,.35)"]],
["Amigable / Startup","poppins",["#ffffff","#fef2f2","#fee2e2"],["#ef4444","#b91c1c","#7f1d1d"],["16px","20px","1px","solid","line","0 1px 3px rgba(0,0,0,.12)"]],
["Editorial / Revista","lora",["#fdfbf7","#f4f0e6","#e9e3d5"],["#2c1810","#4a2c2a","#8c5a4f"],["2px","4px","1px","solid","line","none"]],
["Monocromático Oscuro","inter",["#09090b","#18181b","#27272a"],["#fafafa","#e4e4e7","#a1a1aa"],["8px","10px","1px","solid","#52525b","none"]],
["Juguetón Pop","poppins",["#fdf4ff","#fae8ff","#f5d0fe"],["#c026d3","#db2777","#9333ea"],["32px","28px","1px","solid","line","0 10px 24px rgba(192,38,211,.25)"]],
["Corporativo Moderno","space",["#ffffff","#f3f4f6","#e5e7eb"],["#1d4ed8","#1e40af","#1f2937"],["6px","8px","1px","solid","#e5e7eb","0 1px 2px rgba(0,0,0,.08)"]],
["Vintage Nostálgico","lora",["#fef3c7","#fde68a","#fcd34d"],["#78350f","#92400e","#b45309"],["12px","14px","2px","dashed","ink","none"]],
["Cyberpunk","roboto",["#000000","#111111","#222222"],["#00ff00","#ff00ff","#00ffff"],["0","0","1px","solid","#00ffff","0 0 15px rgba(0,255,255,.5)"]],
["Lujo Moderno","playfair",["#111827","#1f2937","#374151"],["#fbbf24","#f59e0b","#d97706"],["0","0","1px","solid","#ca8a04","none"]],
["Natural Orgánico","inter",["#f0fdf4","#dcfce7","#bbf7d0"],["#14532d","#166534","#15803d"],["30% 70% 70% 30% / 30% 30% 70% 70%","24px 48px 24px 48px","1px","solid","line","none"]],
["Neumorfismo Suave","poppins",["#f1f5f9","#e2e8f0","#cbd5e1"],["#475569","#334155","#0f172a"],["24px","24px","1px","solid","#ffffff","8px 8px 16px #cbd5e1,-8px -8px 16px #ffffff"]],
["Geométrico Estricto","space",["#ffffff","#f4f4f5","#e4e4e7"],["#27272a","#3f3f46","#52525b"],["0","0","1px","solid","line","none"]],
["Art Deco","playfair",["#0f172a","#1e293b","#334155"],["#d4af37","#aa8c2c","#fef08a"],["24px 24px 6px 6px","32px 32px 6px 6px","2px","solid","#d4af37","none"]],
["Bauhaus","inter",["#f8fafc","#f1f5f9","#e2e8f0"],["#dc2626","#2563eb","#eab308"],["999px","24px","1px","solid","line","none"]],
["Tropical Vibrante","poppins",["#ecfeff","#cffafe","#a5f3fc"],["#0891b2","#0d9488","#ea580c"],["24px 0 24px 0","24px 0 24px 0","1px","solid","line","0 4px 10px rgba(8,145,178,.2)"]],
["Gótico / Dark","lora",["#000000","#0a0a0a","#171717"],["#a3a3a3","#d4d4d8","#7f1d1d"],["28px 28px 0 0","28px 28px 0 0","2px","solid","#7f1d1d","none"]],
["Espacial Sci-Fi","roboto",["#020617","#0f172a","#1e293b"],["#c084fc","#a855f7","#38bdf8"],["24px","24px","1px","solid","#a855f7","0 0 18px rgba(168,85,247,.35)"]]
];
/* 25 estilos de diseño: [nombre, fuente, 3 principales, 3 secundarios, forma, efectos CSS (variables), descripción] */
const mk=(g,a)=>a.map(x=>[...x,g]);
STYLES.push(
...mk("Modernos y Corporativos",[
["Minimalismo","DM Sans",["#ffffff","#ffffff","#f4f4f5"],["#111111","#52525b","#111111"],["0","0","1px","solid","line","none"],"--hw:500;--ls:-.01em;--pd:36px;--gap:36px","Elimina lo innecesario: grandes espacios en blanco y tipografías ultra limpias."],
["Clean Design","Nunito Sans",["#f8fafc","#ffffff","#e2e8f0"],["#1e293b","#64748b","#3b82f6"],["12px","16px","1px","solid","line","0 2px 8px rgba(15,23,42,.08)"],"--pd:24px","Corporativo pulido: colores suaves y formas amigables."],
["Bento UI","Plus Jakarta Sans",["#f1f5f9","#ffffff","#e2e8f0"],["#0f172a","#475569","#6366f1"],["20px","28px","1px","solid","line","0 1px 2px rgba(0,0,0,.05)"],"--gap:10px;--pd:24px","Contenido modular en celdas independientes de esquinas redondeadas."],
["Flat Design 2.0","Poppins",["#ffffff","#f3f4f6","#e5e7eb"],["#1f2937","#4b5563","#ef4444"],["8px","12px","0","solid","line","0 2px 4px rgba(0,0,0,.06)"],"--btnbg:linear-gradient(135deg,var(--acc),var(--hl))","Diseño plano con sombras sutiles y gradientes."],
["Material Design","Roboto",["#fafafa","#ffffff","#e0e0e0"],["#212121","#5f6368","#1a73e8"],["4px","8px","0","solid","line","0 2px 4px rgba(0,0,0,.2),0 4px 8px rgba(0,0,0,.14)"],"--ls:.01em","Sistema de Google: capas físicas y elevaciones."]]),
...mk("Dimensionales y Futuristas",[
["Glassmorphism","Outfit",["#0f0c29","#1a1740","#3a3670"],["#f8fafc","#c4b5fd","#22d3ee"],["16px","24px","1px","solid","rgba(255,255,255,.25)","0 8px 32px rgba(0,0,0,.35)"],"--surf:color-mix(in srgb,var(--card) 45%,transparent);--bf:blur(16px) saturate(1.4);--bgi:radial-gradient(circle at 15% 20%,color-mix(in srgb,var(--acc) 55%,transparent),transparent 45%),radial-gradient(circle at 85% 70%,color-mix(in srgb,var(--hl) 50%,transparent),transparent 45%)","Vidrio esmerilado: fondos semitransparentes y desenfoque."],
["Claymorphism","Nunito",["#fdf2f8","#ffe4ef","#fbcfe8"],["#4a1d3d","#9d174d","#ec4899"],["24px","32px","0","solid","line","inset -6px -6px 12px rgba(0,0,0,.12),inset 6px 6px 12px rgba(255,255,255,.8),8px 8px 20px rgba(157,23,77,.2)"],"","Componentes 3D de arcilla: sombras internas y externas."],
["Neumorphism","Manrope",["#e0e5ec","#e0e5ec","#c9d1dc"],["#2d3748","#4a5568","#3b6fd4"],["16px","24px","0","solid","line","8px 8px 16px color-mix(in srgb,var(--bg) 78%,#000),-8px -8px 16px color-mix(in srgb,var(--bg) 70%,#fff)"],"--surf:var(--bg)","Sombras gemelas de luz y oscuridad: todo parece extruido."],
["Dark Mode / Neon Cyberpunk","Space Grotesk",["#05010f","#0d0820","#1a1033"],["#f0f0ff","#00f0ff","#ff2bd6"],["4px","6px","1px","solid","#ff2bd6","0 0 14px rgba(255,43,214,.45)"],"--tsh:0 0 10px color-mix(in srgb,var(--acc) 70%,transparent)","Fondos oscuros con elementos neón fluorescentes."],
["Futurismo Sci-Fi UI","JetBrains Mono",["#030b14","#071a2b","#0e3a5c"],["#d6f4ff","#4fd1ff","#00ff9c"],["2px","4px","1px","solid","#4fd1ff","0 0 0 1px rgba(79,209,255,.25),inset 0 0 24px rgba(79,209,255,.08)"],"--bgi:linear-gradient(color-mix(in srgb,var(--acc) 10%,transparent) 1px,transparent 1px),linear-gradient(90deg,color-mix(in srgb,var(--acc) 10%,transparent) 1px,transparent 1px);--bgs:28px 28px;--ht:uppercase;--ls:.04em;--hz:.85","Cuadrículas milimétricas y estética de datos."]]),
...mk("Disruptivos y Artísticos",[
["Neobrutalismo","Rubik",["#fff8e1","#ffffff","#000000"],["#000000","#1d4ed8","#ff3b30"],["8px","12px","3px","solid","ink","5px 5px 0 var(--ink)"],"--bbw:3px;--hw:800","Bordes negros gruesos, sombras duras y colores saturados."],
["Anti-Design / Brutalismo Puro","Syne",["#e8ff3c","#ffffff","#000000"],["#000000","#ff0000","#0000ff"],["0","0","2px","solid","ink","-6px 6px 0 var(--acc)"],"--hz:1.3;--ht:uppercase;--hw:800;--ls:-.03em;--rot:-1.2deg","Rompe a propósito la simetría y las reglas de usabilidad."],
["Maximalismo Visual","Kanit",["#fff0f6","#ffe066","#ff6b9d"],["#2b0a3d","#6a00f4","#ff006e"],["24px 4px 24px 4px","28px 6px 28px 6px","4px","double","ink","8px 8px 0 var(--hl)"],"--hz:1.5;--ht:uppercase;--hw:900;--bgi:repeating-linear-gradient(45deg,transparent 0 14px,color-mix(in srgb,var(--hl) 18%,transparent) 14px 28px);--tsh:2px 2px 0 var(--hl)","Sobrecarga intencional: tipografías gigantes, texturas y contrastes."],
["Typographic / Typo-Centric","Oswald",["#ffffff","#ffffff","#e5e5e5"],["#0a0a0a","#404040","#e11d48"],["0","0","1px","solid","line","none"],"--hz:2.1;--ht:uppercase;--hw:700;--ls:-.02em;--pd:12px","Sin imágenes: todo depende de tipografía gigante."],
["Bauhaus Web Style","Josefin Sans",["#f5f1e8","#ffffff","#d9d2c0"],["#111111","#1d4e89","#d62828"],["999px","0","3px","solid","ink","6px 6px 0 var(--hl)"],"--hw:700;--ht:uppercase;--ls:.06em","Geometría pura y colores primarios."]]),
...mk("Nostálgicos y Retro",[
["Retro Y2K (Dial-up)","VT323",["#e8e0ff","#ffffff","#b8a9ff"],["#1a0b3b","#ff2d95","#00b8d9"],["6px","10px","2px","solid","ink","3px 3px 0 var(--acc)"],"--fz:19px;--bgi:linear-gradient(135deg,color-mix(in srgb,var(--hl) 30%,transparent),color-mix(in srgb,var(--acc) 22%,transparent))","Internet de fines de los 90: fuentes bitmap y colores dopamínicos."],
["Frutiger Aero","Quicksand",["#e6f7ff","#ffffff","#a8e0ff"],["#0b3a53","#0a7aa5","#3cb44b"],["999px","28px","1px","solid","#ffffff","0 8px 24px rgba(10,122,165,.25),inset 0 2px 0 rgba(255,255,255,.9)"],"--bgi:radial-gradient(circle at 20% 15%,color-mix(in srgb,var(--bg) 40%,#fff),transparent 35%),linear-gradient(180deg,color-mix(in srgb,var(--hl) 25%,var(--bg)),var(--bg) 60%);--btnbg:linear-gradient(180deg,var(--acc),var(--hl))","Estética de mediados de los 2000: glossy, burbujas, verdes y azules."],
["Web Retro 95 / OS Style","Space Mono",["#c0c0c0","#dfdfdf","#808080"],["#000000","#000080","#008080"],["0","0","2px","outset","#ffffff","none"],"--bbw:2px;--bbs:outset;--bbc:#ffffff;--ls:0","Simula ventanas de sistemas operativos antiguos."],
["Acid Graphics","Bricolage Grotesque",["#0a0a0a","#161616","#2a2a2a"],["#f4f4f5","#c8ff00","#ff3df2"],["14px","22px","2px","solid","#c8ff00","0 0 24px rgba(255,61,242,.35)"],"--bgi:radial-gradient(ellipse at 30% 0%,color-mix(in srgb,var(--hl) 40%,transparent),transparent 55%),radial-gradient(ellipse at 90% 60%,color-mix(in srgb,var(--acc) 35%,transparent),transparent 50%);--btnbg:linear-gradient(135deg,var(--acc),var(--hl));--ht:uppercase;--hw:800;--hz:1.2","Urbana y psicodélica: degradados metálicos y estética de club."],
["Pixel Art Style","Press Start 2P",["#1b1b2f","#2a2a45","#44446a"],["#f5f5f5","#ffd23f","#3ddc97"],["0","0","4px","solid","ink","4px 4px 0 #000000"],"--fz:12px;--hz:.7;--ls:0;--hw:400;--bbw:4px;--ir:pixelated","Gráficos de píxeles marcados, ideal para videojuegos."]]),
...mk("Orgánicos, Ilustrativos y Editoriales",[
["Organic / Earthy Design","Fraunces",["#f3ead8","#faf3e3","#ddd0b4"],["#3b2f1e","#5b6b3a","#a0522d"],["30% 70% 70% 30% / 30% 30% 70% 70%","28px 56px 28px 56px","1px","solid","line","none"],"--bgi:radial-gradient(color-mix(in srgb,var(--ink) 7%,transparent) 1px,transparent 1.2px);--bgs:6px 6px","Formas fluidas, tonos tierra y textura de papel granulado."],
["Hand-Drawn / Doodle","Patrick Hand",["#fffef5","#ffffff","#e8e6d5"],["#222222","#3b5bdb","#e8590c"],["225px 15px 255px 15px / 15px 225px 15px 255px","18px 8px 22px 6px / 8px 20px 6px 18px","2px","solid","ink","3px 3px 0 rgba(0,0,0,.25)"],"--fz:18px;--rot:-.4deg;--hw:400;--hz:1.15","Trazos y letras que parecen dibujados a mano."],
["Editorial / Magazine Layout","Playfair Display",["#f7f3ea","#ffffff","#d8d0bd"],["#1a1a1a","#444444","#b3261e"],["0","0","1px","solid","ink","none"],"--hz:1.25;--hw:700;--ls:-.01em;--gap:28px","Revista de alta gama: serifs elegantes y cuadrículas de texto."],
["Collage Digital","DM Serif Display",["#e9dfc9","#f6efdd","#c9b996"],["#2a2118","#8a2b1d","#1f5f8b"],["2px","3px","2px","dashed","ink","6px 8px 0 rgba(0,0,0,.18)"],"--rot:-1deg;--bgi:repeating-linear-gradient(0deg,color-mix(in srgb,var(--ink) 4%,transparent) 0 2px,transparent 2px 5px);--hw:400","Recortes analógicos, papel rústico y tipografía mixta."],
["Abstract Geometry","Urbanist",["#fafaff","#ffffff","#e4e4f7"],["#14142b","#4f46e5","#f43f5e"],["12px","20px","1px","solid","line","0 10px 30px rgba(79,70,229,.15)"],"--bgi:radial-gradient(circle at 92% 8%,color-mix(in srgb,var(--acc) 22%,transparent) 0 120px,transparent 121px),radial-gradient(circle at 6% 88%,color-mix(in srgb,var(--hl) 20%,transparent) 0 90px,transparent 91px),linear-gradient(135deg,transparent 0 60%,color-mix(in srgb,var(--acc) 8%,transparent) 60% 100%)","Formas geométricas flotantes sobre fondos minimalistas."]])
);

const FD=`Roboto|Sans-Serif Neo-Grotesca|Estándar universal para UI web y móvil
Open Sans|Sans-Serif Humanista|Cuerpo de texto, blogs y portales de noticias
Inter|Sans-Serif UI/Grotesca|SaaS, dashboards y productos digitales
Lato|Sans-Serif Humanista|Sitios corporativos B2B y landing pages
Montserrat|Sans-Serif Geométrica|Encabezados enérgicos y e-commerce
Poppins|Sans-Serif Geométrica|Startups, apps de consumo y UI moderna
Noto Sans|Sans-Serif Universal|Aplicaciones multilingües globales
Source Sans 3|Sans-Serif Gótica|Interfaces densas y paneles administrativos
DM Sans|Sans-Serif Geométrica|Tablas de precios y SaaS compactos
Plus Jakarta Sans|Sans-Serif Geométrica UI|Landing pages de IA y tecnología
Work Sans|Sans-Serif Grotesca|Texto descriptivo de densidad media
Nunito|Sans-Serif Redondeada|Apps educativas, bienestar y tono amigable
Nunito Sans|Sans-Serif Humanista|Alternativa corporativa con bordes rectos
Raleway|Sans-Serif Elegante|Moda, lujo y portafolios
Oswald|Sans-Serif Condensada|Títulos de alto impacto, deportes y noticias
Rubik|Sans-Serif Redondeada|Interfaces dinámicas, botones y tarjetas
Quicksand|Sans-Serif Redondeada|Encabezados amigables y diseño creativo
Mulish|Sans-Serif Minimalista|Diseño limpio en e-commerce y apps móviles
Space Grotesk|Sans-Serif Display/Tech|Web3, agencias creativas y tech
Urbanist|Sans-Serif Geométrica|E-commerce premium y arquitectura
Manrope|Sans-Serif Moderna|Interfaces para modo claro/oscuro
Outfit|Sans-Serif Geométrica UI|Apps móviles e interfaces minimalistas
Public Sans|Sans-Serif Gubernamental|Portales institucionales y salud
IBM Plex Sans|Sans-Serif Industrial|Sistemas empresariales y finanzas
Fira Sans|Sans-Serif Técnica|Portales informativos y documentación
Ubuntu|Sans-Serif Orgánica|Tecnología y código abierto
PT Sans|Sans-Serif Universal|Blogs, revistas digitales y contenido masivo
Hind|Sans-Serif UI|Múltiples sistemas de escritura
Heebo|Sans-Serif Grotesca|Portales corporativos de alta densidad
Kanit|Sans-Serif Display|Encabezados pesados en deportes y entretenimiento
Mukta|Sans-Serif Multilingüe|Sitios multilenguaje y bloques informativos
Barlow|Sans-Serif Industrial|Marcas industriales, transporte y tecnología
Cabin|Sans-Serif Humanista|Texto continuo en blogs y páginas corporativas
Josefin Sans|Sans-Serif Vintage|Estética retro de los años 20 y moda
Karla|Sans-Serif Grotesca|Landing pages creativas y blogs personales
Syne|Sans-Serif Display Artística|Agencias de diseño y proyectos de arte
Bricolage Grotesque|Sans-Serif Neo-Grotesca|Interfaces de autor y diseño editorial web
Playfair Display|Serif Didone|Hoteles y marcas de lujo
Merriweather|Serif Transicional|Larga lectura en blogs y diarios digitales
Lora|Serif Caligráfica|Literatura, gastronomía y sitios editoriales
PT Serif|Serif Editorial|Artículos de opinión y noticias
DM Serif Display|Serif Display|Títulos principales en héroes de sitios web
Noto Serif|Serif Universal|Publicaciones digitales multilingües
Source Serif 4|Serif Documentación|Sitios académicos y manuales web
Spectral|Serif Lectura Densa|Edición académica y libros digitales
Libre Baskerville|Serif Clásica|Marcas legales e institucionales
Fraunces|Serif Retro Variable|Branding contemporáneo y gastronomía craft
Roboto Mono|Monospace|Bloques de código y tablas financieras
JetBrains Mono|Monospace|Entornos de desarrollo web y editores
Space Mono|Monospace Futurista|Portafolios Web3 y estética cyberpunk
Press Start 2P|Display Pixel|Pixel art y videojuegos
VT323|Display Bitmap|Retro Y2K y terminales
Patrick Hand|Display Manuscrita|Doodle y estilo dibujado a mano
Permanent Marker|Display Marcador|Graffiti y acid graphics`.split("\n").map(l=>{const [n,c,u]=l.split("|"),g=c.startsWith("Serif")?"Serif":c.startsWith("Mono")?"Monospace":c.startsWith("Display")?"Display y especiales":"Sans-serif";return {n,c,u,g,st:`"${n}",${g==="Serif"?"Georgia,serif":g==="Monospace"?"ui-monospace,monospace":"system-ui,sans-serif"}`}});
const PAL=[["Tecnología, Software y SaaS",`Modo Oscuro Cyberpunk|#0B0C10,#1F2833,#C5C6C7,#66FCF1,#45A29E
SaaS Corporativo Clásico|#0A192F,#172A45,#306BAC,#64FFDA,#F4F5F7
Fintech Limpia|#FFFFFF,#0F172A,#3B82F6,#10B981,#F1F5F9
Inteligencia Artificial Eléctrica|#050505,#1A1A24,#7928CA,#FF0080,#FFFFFF
Startup Minimalista|#FAFAFA,#18181B,#6366F1,#A5B4FC,#E4E4E7
Cripto/Web3|#0D0E12,#1E202B,#F5A623,#2F80ED,#FFFFFF
Desarrollador / Código|#1E1E1E,#2D2D2D,#4EC9B0,#CE9178,#D4D4D4
Plataforma Cloud|#F8FAFC,#0284C7,#0369A1,#0F172A,#E2E8F0
Cyber Security|#030712,#111827,#22C55E,#EF4444,#F9FAFB
Data Analytics|#FFFFFF,#312E81,#F43F5E,#10B981,#6B7280`],
["Naturaleza, Bienestar y Sustentabilidad",`Bosque Profundo|#1A3636,#40534C,#D6C0B3,#E7F0DC,#000000
Ecológica Moderna|#F4F6F0,#2D4B34,#5C8353,#86A789,#1F2937
Spa y Yoga|#EAE4D9,#7D8A82,#A9B3AC,#C9D1C8,#4A4A4A
Cafetería Orgánica|#2C1A11,#6F4E37,#A67B5B,#ECB176,#FED8B1
Océano Calmo|#E0F2FE,#0284C7,#075985,#F0FDFA,#1E2937
Tierra Arcillosa|#FFFBEB,#B45309,#78350F,#D97706,#1F2937
Desierto Atardecer|#FDF8F5,#E76F51,#F4A261,#2A9D8F,#264653
Té Verde / Matcha|#F7F9F6,#606C38,#283618,#DDA15E,#FEFAE0
Lavanda & Relax|#FAF5FF,#6B21A8,#A855F7,#E9D5FF,#1E1B4B
Frutas del Bosque|#FFF1F2,#9F1239,#E11D48,#FDA4AF,#4C051E`],
["Creatividad, Arte y Portafolios",`Arte Pop / Neón|#000000,#FF007F,#00F5D4,#7B2CBF,#FFFF00
Retro VHS 80s|#2B2D42,#8D99AE,#EDF2F4,#EF233C,#D90429
Studio de Diseño|#FFFFFF,#000000,#FF5A5F,#FFB400,#007A87
Portafolio Editorial|#F9F6F0,#111111,#D62828,#003049,#FDF0D5
Duotono Eléctrico|#150050,#3F0071,#FB2576,#000000,#FFFFFF
Inspiración Van Gogh|#0F2027,#203A43,#2C5364,#F39C12,#F1C40F
Pastel Energético|#E8F0FE,#FFCCD5,#FFB3C1,#C77DFF,#9D4EDD
Moderna de Mediados de Siglo|#293241,#3D5A80,#98C1D9,#E0FBFC,#EE6C4D
Brutalismo Web|#FFFF00,#000000,#0000FF,#FF0000
Moderna Urbana|#1A1A1A,#333333,#FEE715,#FFFFFF,#888888`],
["E-Commerce y Retail",`E-Commerce Moda de Lujo|#FFFFFF,#111111,#A3704C,#E5E5E5,#7F7F7F
Tienda de Electrónica|#F3F4F6,#1F2937,#2563EB,#FF5A1F,#FFFFFF
Cosmética y Skin Care|#FAF6F0,#F3DCD4,#D9B48F,#4A3E3D,#FFFFFF
Tienda Infantil|#FFFDF9,#FFB5A7,#FCD5CE,#F8AD9D,#F4978E
Alimentos / Supermercado|#FFFFFF,#16A34A,#DC2626,#F59E0B,#1F2937
Suplementos Deportivos|#080808,#E2F113,#FFFFFF,#262626,#737373
Librería / Cultura|#FCFBF7,#782E2E,#2B4C6F,#D4A373,#1A1A1A
Muebles y Decoración|#F8F9FA,#2F3E46,#354F52,#CAD2C5,#A3B18A
Juguetería / Gaming|#111827,#FF0055,#00E5FF,#7000FF,#FFFFFF
Productos Gourmet|#1C1917,#D69E2E,#F5F5F4,#44403C,#FFFFFF`],
["Institucionales, Editorial y Bienes Raíces",`Monocromática Premium|#FFFFFF,#F4F4F5,#71717A,#18181B,#09090B
Firma de Abogados / Consultoría|#0B132B,#1C2541,#5BC0BE,#6FFFE6,#FFFFFF
Bienes Raíces / Real Estate|#F8F9FA,#1A365D,#C5A880,#2D3748,#E2E8F0
Revista Digital / Periódico|#FFFFFF,#000000,#4A5568,#E53E3E,#EDF2F7
Clínica / Médica|#F0FDFA,#0D9488,#0F766E,#111827,#FFFFFF
Educación / Universidad|#7A1C1C,#1A202C,#F7FAFC,#D69E2E,#EDF2F7
Arquitectura Minimalista|#FFFFFF,#EAEAEA,#7A7A7A,#111111,#C19A6B
Inversiones / Wealth Management|#0F172A,#014F56,#10B981,#F8FAFC,#64748B
Gubernamental / ONG|#FFFFFF,#002F6C,#ED1C24,#F4F4F4,#333333
Elegancia Vintage / Museos|#1F1A16,#F5EBE6,#D4AF37,#A66E4E,#3D312A`]];
const lum=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255).map(v=>v<=.03928?v/12.92:((v+.055)/1.055)**2.4);return .2126*c[0]+.7152*c[1]+.0722*c[2]};
const cr=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};
const sat=h=>{const c=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255),m=Math.max(...c);return m?(m-Math.min(...c))/m:0};
const mix=(a,b,t)=>"#"+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,"0")).join("");
const bcv=c=>c==="ink"?"var(--ink)":c==="line"?"var(--line)":c;
/* Asigna roles (fondo, tarjeta, texto, acento) a una paleta de 4-5 colores buscando contraste legible */
function derive5(c){
 const best=(b,a)=>[...a].sort((x,y)=>cr(y,b)-cr(x,b))[0];
 const bg=c[0],rest=c.slice(1);let ink=best(bg,rest);
 if(cr(ink,bg)<4.5)ink=lum(bg)>.5?"#1a1a1a":"#f5f5f5";
 const oth=rest.filter(x=>x!==ink&&x!==bg),lo=[...oth].sort((x,y)=>cr(x,bg)-cr(y,bg))[0];
 const card=lo&&cr(lo,bg)<=2.2?lo:mix(bg,ink,.06),pool=oth.filter(x=>x!==card&&cr(x,bg)>=3);
 const acc=[...pool].sort((x,y)=>sat(y)-sat(x))[0]||ink;
 return {bg,card,ink,acc,accT:cr(bg,acc)>=cr(ink,acc)?bg:ink,hl:pool.find(x=>x!==acc)||acc};
}
function deriveOld(C){const p=C[2],o=[...C[3]].sort((a,b)=>cr(b,p[0])-cr(a,p[0])),ink=o[0],acc=cr(o[1],p[0])>=3?o[1]:ink;return {bg:p[0],card:p[1],ink,acc,accT:p[0],hl:cr(o[2],p[0])>=3?o[2]:acc}}
const COLORS=STYLES.map(s=>({n:s[0],g:s[7]||"Estilos clásicos",sw:[...s[2],...s[3]],t:deriveOld(s)}))
 .concat(PAL.flatMap(([g,t])=>t.split("\n").map(l=>{const [n,k]=l.split("|"),c=k.toLowerCase().split(",");return {n,g,sw:c,t:derive5(c)}})));
const SINGLE=["DM Serif Display","Press Start 2P","VT323","Patrick Hand","Permanent Marker"];
const MODES={auto:"Automático",light:"Claro",dark:"Oscuro"};
const nat=t=>lum(t.bg)<.2?"dark":"light";
const hsl=h=>{const [r,g,b]=[1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255),M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,d=M-m;let H=0,S=0;if(d){S=d/(1-Math.abs(2*l-1));H=(M===r?((g-b)/d+6)%6:M===g?(b-r)/d+2:(r-g)/d+4)*60}return [H,Math.min(1,S),l]};
const hx=(H,S,L)=>{const c=(1-Math.abs(2*L-1))*S,x=c*(1-Math.abs((H/60)%2-1)),m=L-c/2,[r,g,b]=H<60?[c,x,0]:H<120?[x,c,0]:H<180?[0,c,x]:H<240?[0,x,c]:H<300?[x,0,c]:[c,0,x];return "#"+[r,g,b].map(v=>Math.round((v+m)*255).toString(16).padStart(2,"0")).join("")};
const fit=(H,S,L,bg,min,dir)=>{let l=L,i=0;while(cr(hx(H,S,l),bg)<min&&i++<30)l=Math.max(.03,Math.min(.97,l+dir*.03));return hx(H,S,l)};
/* Paleta complementaria: si la paleta es clara genera su versión oscura, y viceversa (conserva el tono) */
function comp(t){
 const dark=lum(t.bg)<.2,[bh,bs]=hsl(t.bg),[ah,as_]=hsl(t.acc),H=bs>.1?bh:ah,S=Math.min(bs,.3);
 const bg=dark?hx(H,S*.6,.965):hx(H,Math.min(S+.12,.4),.085),card=dark?hx(H,S*.4,1):hx(H,Math.min(S+.12,.4),.135),ink=dark?hx(H,.3,.1):hx(H,.15,.93);
 const acc=fit(ah,as_,dark?.42:.62,bg,4.5,dark?-1:1),hl=fit((ah+40)%360,as_,dark?.45:.6,bg,3,dark?-1:1);
 return {bg,card,ink,acc,accT:cr(bg,acc)>=cr(ink,acc)?bg:ink,hl};
}
function roles(C,m){return (m==="light"||m==="dark")&&m!==nat(C.t)?(C.c2||(C.c2=comp(C.t))):C.t}
const FK={inter:"Inter",playfair:"Playfair Display",poppins:"Poppins",lora:"Lora",space:"Space Grotesk",roboto:"Roboto Mono"};
const fi=n=>FD.findIndex(f=>f.n===n);
const loaded=new Set();
function loadFont(f){if(loaded.has(f.n))return;loaded.add(f.n);const l=document.createElement("link");l.rel="stylesheet";l.href=`https://fonts.googleapis.com/css2?family=${f.n.replace(/ /g,"+")}${SINGLE.includes(f.n)?"":":wght@400;700"}&display=swap`;document.head.appendChild(l)}
const SEL={f:-1,c:-1,s:-1,m:"auto"};
try{Object.assign(SEL,JSON.parse(localStorage.getItem("guia-estilo3")||"{}"))}catch(e){}
if(!MODES[SEL.m])SEL.m="auto";
function themeText(){const g=(k,L)=>SEL[k]>=0&&L[SEL[k]]?(L[SEL[k]].n||L[SEL[k]][0]):"Predeterminado";return `Tipografía: ${g("f",FD)} | Colores: ${g("c",COLORS)} | Formas: ${g("s",STYLES)} | Modo: ${MODES[SEL.m]}`}
let FXSET=[];
const parseFx=str=>str.split(";").map(x=>x.trim()).filter(Boolean).map(x=>{const i=x.indexOf(":");return [x.slice(0,i).trim(),x.slice(i+1).trim()]});
function effMode(){if(SEL.m!=="auto")return SEL.m;const C=COLORS[SEL.c];if(C)return nat(C.t);return document.documentElement.dataset.theme||(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}
function syncMT(){const mt=$("#mt");if(!mt)return;const d=effMode()==="dark";mt.textContent=d?"☀":"☾";mt.title=d?"Cambiar a modo claro":"Cambiar a modo oscuro"}
function toggleMode(){SEL.m=effMode()==="dark"?"light":"dark";applyTheme();if(CONFIG.styler)drawStyles()}
function applyTheme(){
 const H=document.documentElement,R=H.style,set=(k,v)=>R.setProperty(k,v),del=(...k)=>k.forEach(x=>R.removeProperty(x));
 FXSET.forEach(k=>R.removeProperty(k));FXSET=[];
 const F=FD[SEL.f],C=COLORS[SEL.c],S=STYLES[SEL.s];
 if(F){loadFont(F);set("--fh",F.st);set("--fb",F.st)}else del("--fh","--fb");
 if(C){const t=roles(C,SEL.m);set("--bg",t.bg);set("--card",t.card);set("--ink",t.ink);set("--mut",`color-mix(in srgb,${t.ink} 72%,${t.bg})`);set("--acc",t.acc);set("--accT",t.accT);set("--hl",t.hl);
  set("--line",`color-mix(in srgb,${t.ink} 28%,${t.bg})`);set("color-scheme",lum(t.bg)<.2?"dark":"light")}
 else del("--bg","--card","--ink","--mut","--acc","--accT","--hl","--line","color-scheme");
 if(SEL.m==="auto")H.removeAttribute("data-theme");else H.dataset.theme=SEL.m;
 if(S){const h=S[4];set("--r",h[0]);set("--rl",h[1]);set("--bw",h[2]);set("--bs",h[3]);set("--bc",bcv(h[4]));set("--sh",h[5])}
 else del("--r","--rl","--bw","--bs","--bc","--sh");
 if(S&&S[5])parseFx(S[5]).forEach(([k,v])=>{set(k,v);FXSET.push(k)});
 const sn=$("#sn");if(sn)sn.textContent=(SEL.f>=0||SEL.c>=0||SEL.s>=0||SEL.m!=="auto")?"Personalizado":"Predeterminado";
 syncMT();
 try{localStorage.setItem("guia-estilo3",JSON.stringify(SEL))}catch(e){}
}
let TAB="t";
const TABS=[["t","Todo"],["f","Tipografía"],["c","Colores"],["s","Formas y efectos"]];
const sw=a=>`<span class="sw">${a.map(c=>`<i style="background:${c}"></i>`).join("")}</span>`;
const swa=t=>`<span class="sw alt">${[t.bg,t.card,t.ink,t.acc].map(c=>`<i style="background:${c}"></i>`).join("")}</span>`;
function drawStyles(){
 $("#smode").innerHTML=Object.entries(MODES).map(([k,v])=>`<button type="button" data-m="${k}" aria-pressed="${SEL.m===k}">${k==="light"?"☀ ":k==="dark"?"☾ ":"◐ "}${v}</button>`).join("");
 $("#stabs").innerHTML=TABS.map(t=>`<button type="button" role="tab" data-t="${t[0]}" aria-selected="${t[0]===TAB}">${t[1]}</button>`).join("");
 const cur=TAB==="t"?null:SEL[TAB],G=s=>s[7]||"Estilos clásicos";
 const items=TAB==="f"?FD.map(f=>({n:f.n,g:f.g,t:`${f.c}: ${f.u}`,st:`style="font-family:${f.st}"`,x:`<span style="font-family:${f.st}">Aa</span>`}))
  :TAB==="c"?COLORS.map(c=>({n:c.n,g:c.g,t:`Principal ${nat(c.t)==="dark"?"oscura":"clara"} + complementaria ${nat(c.t)==="dark"?"clara":"oscura"}`,x:sw(c.sw)+swa(roles(c,nat(c.t)==="dark"?"light":"dark"))}))
  :TAB==="s"?STYLES.map(s=>({n:s[0],g:G(s),t:s[6]||"",x:`<span class="shp" style="border-radius:${s[4][0]};border:${s[4][2]} ${s[4][3]} ${bcv(s[4][4])};box-shadow:${s[4][5]}"></span>`}))
  :STYLES.map((s,i)=>({n:s[0],g:G(s),t:s[6]||"",x:sw(COLORS[i].sw)}));
 if(TAB==="f")FD.forEach(loadFont);
 const row=(i,it)=>`<label class="ch" title="${(it.t||"").replace(/"/g,"&quot;")}"><input type="radio" name="ax" value="${i}" ${cur===i?"checked":""}><span ${it.st||""}>${it.n}</span>${it.x||""}</label>`;
 let prev="",h=TAB==="t"?"":row(-1,{n:"Predeterminado"});
 items.forEach((it,i)=>{if(it.g&&it.g!==prev){h+=`<div class="gh">${it.g}</div>`;prev=it.g}h+=row(i,it)});
 $("#sl").innerHTML=h;
}
if(CONFIG.styler){
 $("#smode").onclick=e=>{const b=e.target.closest("[data-m]");if(b){SEL.m=b.dataset.m;applyTheme();drawStyles()}};
 $("#stabs").onclick=e=>{const b=e.target.closest("[data-t]");if(b){TAB=b.dataset.t;drawStyles()}};
 $("#sl").onchange=e=>{const i=+e.target.value;if(TAB==="t"){SEL.f=fi(FK[STYLES[i][1]]||STYLES[i][1]);SEL.c=i;SEL.s=i}else SEL[TAB]=i;applyTheme()};
 $("#srst").onclick=()=>{SEL.f=SEL.c=SEL.s=-1;SEL.m="auto";applyTheme();drawStyles()};
 $("#srnd").onclick=()=>{const r=n=>Math.floor(Math.random()*n);SEL.f=r(FD.length);SEL.c=r(COLORS.length);SEL.s=r(STYLES.length);applyTheme();drawStyles()};
 $("#stg").onclick=()=>{const sp=$("#sp");sp.classList.toggle("min");$("#stg").setAttribute("aria-expanded",!sp.classList.contains("min"));if(!sp.classList.contains("min")){$("#fp").classList.add("min");$("#tg").setAttribute("aria-expanded","false")}};
 drawStyles();
}else{$("#sp").remove();SEL.f=SEL.c=SEL.s=-1}
applyTheme();
/* ============ ENVÍO COMPLETO (datos + estilo visual con CSS) ============ */
const VARDOC={"--fh":"fuente de títulos","--fb":"fuente del texto","--bg":"color de fondo de la página","--card":"fondo de tarjetas y paneles","--ink":"color del texto","--mut":"texto secundario","--acc":"color de acento (botones, enlaces)","--accT":"texto sobre el acento","--hl":"color de resalte","--line":"color de líneas y bordes suaves","--r":"radio de esquinas de botones y controles","--rl":"radio de esquinas de tarjetas y contenedores","--bw":"grosor del borde de tarjetas","--bs":"trazo del borde de tarjetas","--bc":"color del borde de tarjetas","--sh":"sombra de tarjetas y botones","--surf":"fondo de superficies (vidrio, degradados)","--bf":"desenfoque del fondo (backdrop-filter)","--bgi":"imagen o degradado de fondo de la página","--bgs":"tamaño del patrón de fondo","--btnbg":"fondo de botones","--bbw":"grosor del borde de botones","--bbs":"trazo del borde de botones","--bbc":"color del borde de botones","--hz":"escala de los títulos","--ht":"mayúsculas/minúsculas de títulos","--hw":"peso de los títulos","--tsh":"sombra del texto de títulos","--ls":"espaciado entre letras de títulos","--fz":"tamaño base de la fuente","--gap":"separación entre tarjetas","--pd":"relleno interno de tarjetas","--rot":"inclinación de las tarjetas","--ir":"renderizado de imágenes","color-scheme":"esquema de color del navegador"};
const BASE={light:{"--bg":"#F5F7FA","--card":"#ffffff","--ink":"#12263A","--mut":"#53657A","--line":"#CBD5E1","--acc":"#2457D6","--accT":"#ffffff","--hl":"#F2B84B","color-scheme":"light"},dark:{"--bg":"#0F1B2A","--card":"#16273A","--ink":"#E8EEF6","--mut":"#9FB1C5","--line":"#2D4059","--acc":"#6C97FF","--accT":"#0F1B2A","--hl":"#F2B84B","color-scheme":"dark"}};
/* Clases/reglas CSS del sitio que consumen las variables (instantánea; styleRules() usa las reglas vivas si el navegador lo permite) */
const RULES_FALLBACK=`:root{--bg:#F5F7FA;--card:#fff;--ink:#12263A;--mut:#53657A;--line:#CBD5E1;--acc:#2457D6;--accT:#fff;--hl:#F2B84B;color-scheme:light;--fh:Georgia,"Iowan Old Style",serif;--fb:system-ui,-apple-system,"Segoe UI",sans-serif;--r:8px;--rl:10px;--bw:1px;--bs:solid;--bc:var(--line);--sh:none;--surf:var(--card);--hz:1;--ht:none;--hw:700;--tsh:none;--ls:normal;--fz:16px;--gap:20px;--pd:20px;--rot:0deg;--ir:auto;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;background-color:var(--bg);background-image:var(--bgi,none);background-size:var(--bgs,auto);background-attachment:fixed;color:var(--ink);font:var(--fz)/1.6 var(--fb)}
h1,h2,h3{font-family:var(--fh);font-weight:var(--hw);text-transform:var(--ht);text-shadow:var(--tsh);letter-spacing:var(--ls);line-height:1.2;margin:0 0 .5em}
h1{font-size:calc(clamp(2rem,5vw,3.1rem)*var(--hz));overflow-wrap:anywhere}
h2{font-size:calc(1.5rem*(1 + (var(--hz) - 1)*.5))}
a{color:var(--acc)}
:focus-visible{outline:3px solid var(--hl);outline-offset:2px}
.nav{position:sticky;top:env(safe-area-inset-top,0px);z-index:5;background:var(--surf);backdrop-filter:var(--bf,none);-webkit-backdrop-filter:var(--bf,none);border-bottom:1px solid var(--line);display:flex;gap:4px;align-items:center;padding:8px 16px;overflow-x:auto}
.nav b{font-family:var(--fh);margin-right:12px;white-space:nowrap}
.nav a{padding:6px 12px;border-radius:var(--r);text-decoration:none;color:var(--ink);white-space:nowrap}
.nav a[aria-current]{background:var(--acc);color:var(--accT)}
.hdr{padding:24px 0 20px;border-bottom:2px solid var(--ink);margin-bottom:28px}
.hdr small{color:var(--mut)}
.box{background:var(--surf);backdrop-filter:var(--bf,none);-webkit-backdrop-filter:var(--bf,none);border:var(--bw) var(--bs) var(--bc);box-shadow:var(--sh);border-radius:var(--rl);padding:var(--pd);margin-bottom:20px}
.grid{display:grid;gap:var(--gap);grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.ph{border:2px dashed var(--line);border-radius:var(--r);padding:14px;color:var(--mut);font-size:.95rem}
.btn{background:var(--btnbg,var(--acc));color:var(--accT);border:var(--bbw,0) var(--bbs,solid) var(--bbc,var(--ink));box-shadow:var(--sh);border-radius:var(--r);padding:10px 18px;font:inherit;font-weight:600;cursor:pointer;transition:transform .15s}
.btn.alt{background:transparent;color:var(--acc);border:1px solid var(--acc)}
th,td{text-align:left;padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
.ftr{border-top:1px solid var(--line);padding:24px 16px 100px;color:var(--mut);text-align:center}
.z{border:2px solid var(--line);background:var(--card);border-radius:var(--r);padding:8px;font:inherit;color:var(--ink);text-align:left;cursor:pointer}
.z[aria-pressed=true]{border-color:var(--acc);background:color-mix(in srgb,var(--acc) 14%,var(--card));box-shadow:0 0 0 3px var(--hl)}
.z.md{position:absolute;right:10px;bottom:76px;width:46%;height:70px;background:var(--hl);color:var(--bg);border-color:var(--ink)}
#fp,#sp{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom,0px));z-index:9;width:min(380px,calc(100vw - 32px));background:var(--surf);backdrop-filter:var(--bf,none);-webkit-backdrop-filter:var(--bf,none);border:1px solid var(--ink);border-radius:var(--rl);box-shadow:0 8px 30px rgba(0,0,0,.25);display:flex;flex-direction:column;max-height:80vh}
#fp>button.tg,#sp>button.tg{display:flex;justify-content:space-between;width:100%;background:var(--ink);color:var(--bg);border:0;padding:12px 14px;font:inherit;font-weight:600;cursor:pointer;border-radius:inherit}
.fb label{display:block;font-size:.85rem;margin:10px 0 3px;color:var(--mut)}
.fb input,.fb textarea,.fb select{width:100%;font:inherit;padding:8px;border:1px solid var(--line);border-radius:var(--r);background:var(--bg);color:var(--ink)}
.fb fieldset{border:0;border-top:1px solid var(--line);margin:14px 0 0;padding:6px 0 0}
dialog{border:1px solid var(--ink);border-radius:var(--rl);max-width:min(520px,92vw);background:var(--surf);backdrop-filter:var(--bf,none);-webkit-backdrop-filter:var(--bf,none);color:var(--ink);padding:24px}
.sh img{width:100%;aspect-ratio:16/10;object-fit:cover;border-radius:var(--r);display:block}
.sh input{margin-top:6px;width:100%;font:inherit;padding:6px;border:1px solid var(--line);border-radius:var(--r);background:var(--bg);color:var(--ink)}
.sh .x{position:absolute;top:6px;right:6px;background:var(--ink);color:var(--bg);border:0;border-radius:50%;width:28px;height:28px;cursor:pointer}
#dz{border:2px dashed var(--acc);border-radius:var(--rl);padding:28px;text-align:center;cursor:pointer}
#dz.on{background:color-mix(in srgb,var(--acc) 12%,var(--card))}
.tabs button{flex:1;padding:6px 8px;font:inherit;font-size:.85rem;background:transparent;color:var(--ink);border:1px solid var(--line);border-radius:var(--r);cursor:pointer}
.tabs button[aria-selected=true],.tabs button[aria-pressed=true]{background:var(--acc);color:var(--accT);border-color:var(--acc)}
.fb .ch{position:relative;display:flex;align-items:center;justify-content:space-between;gap:8px;margin:0;padding:8px 10px;border:1px solid var(--line);border-radius:var(--r);cursor:pointer;font-size:.9rem;color:var(--ink)}
.fb .ch:has(input:checked){border-color:var(--acc);box-shadow:0 0 0 2px var(--acc)}
.fb .ch:has(input:focus-visible){outline:3px solid var(--hl);outline-offset:2px}
.gh{font-weight:700;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em;color:var(--mut);margin-top:8px}
.shp{width:34px;height:20px;background:var(--card);flex:none}
.kh{color:var(--mut)}
.trk{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;border:var(--bw) var(--bs) var(--bc);border-radius:var(--rl);box-shadow:var(--sh);background:var(--surf);backdrop-filter:var(--bf,none);-webkit-backdrop-filter:var(--bf,none);scrollbar-width:thin}
.sl img{image-rendering:var(--ir);width:100%;max-height:70vh;aspect-ratio:16/10;object-fit:contain;display:block;border-radius:var(--r)}
.sl figcaption{margin-top:8px;color:var(--mut);font-size:.9rem;text-transform:capitalize}
.cb{position:absolute;top:calc(50% - 22px);width:40px;height:40px;border-radius:50%;border:1px solid var(--ink);background:var(--card);color:var(--ink);font-size:1.4rem;line-height:1;cursor:pointer}
.dots button{width:12px;height:12px;border-radius:50%;border:1px solid var(--ink);background:transparent;padding:0;cursor:pointer}
.dots button[aria-current=true]{background:var(--acc);border-color:var(--acc)}
.ph code{background:var(--card);padding:0 4px;border-radius:4px}
.sw.alt{margin-left:6px;padding-left:6px;border-left:1px solid var(--line)}
.box:nth-of-type(odd){transform:rotate(var(--rot))}
.box:nth-of-type(even){transform:rotate(calc(var(--rot)*-.6))}`;
function styleRules(){
 const out=[];
 for(const sh of document.styleSheets){try{for(const r of sh.cssRules)if(r.type===1&&r.cssText.includes("var(--"))out.push(r.cssText)}catch(e){}}
 return out.length>5?out.join("\n"):RULES_FALLBACK;
}
function styleData(){
 const R=document.documentElement.style,vars=[],seen=new Set();
 for(let i=0;i<R.length;i++){const k=R.item(i);if(k.startsWith("--")||k==="color-scheme"){vars.push([k,R.getPropertyValue(k).trim()]);seen.add(k)}}
 const F=FD[SEL.f],C=COLORS[SEL.c],S=STYLES[SEL.s],T=C?roles(C,SEL.m):null,A=C?roles(C,nat(T)==="dark"?"light":"dark"):null;
 if(!C&&SEL.m!=="auto")Object.entries(BASE[SEL.m]).forEach(([k,v])=>{if(!seen.has(k)){vars.push([k,v]);seen.add(k)}});
 const fxv=S&&S[5]?parseFx(S[5]):[];
 const imp=F?`@import url("https://fonts.googleapis.com/css2?family=${F.n.replace(/ /g,"+")}${SINGLE.includes(F.n)?"":":wght@400;700"}&display=swap");\n`:"";
 const attr=SEL.m!=="auto"?` data-theme="${SEL.m}"`:"";
 const modo=`/* Modo: ${MODES[SEL.m]}${SEL.m!=="auto"?` (atributo <html${attr}>)`:" (sigue la preferencia del sistema)"} */\n`;
 const css=modo+(vars.length?imp+`:root{\n${vars.map(v=>`  ${v[0]}:${v[1]};`).join("\n")}\n}`:"/* Estilo predeterminado: sin personalización */");
 const sh=S?S[4]:null;
 return {css,html:`<html lang="es"${attr}>`,
  efectos:fxv.length?fxv.map(([k,v])=>`${k}: ${v}  — ${VARDOC[k]||""}`).join("\n"):"Ninguno",
  tipografia:F?`${F.n} (${F.c}) — ${F.st}`:"Predeterminada",
  paleta:C?`${C.n} [${C.g}] colores base: ${C.sw.join(", ")} | modo ${MODES[SEL.m]} | fondo ${T.bg}, tarjeta ${T.card}, texto ${T.ink}, acento ${T.acc}, texto sobre acento ${T.accT}, resalte ${T.hl} | complementaria (${nat(T)==="dark"?"clara":"oscura"}): fondo ${A.bg}, tarjeta ${A.card}, texto ${A.ink}, acento ${A.acc}, resalte ${A.hl}`:"Predeterminada",
  formas:S?`${S[0]} (${S[7]||"Estilos clásicos"})\n- Radio de botones y controles (--r): ${sh[0]}\n- Radio de tarjetas y contenedores (--rl): ${sh[1]}\n- Borde de tarjetas: grosor ${sh[2]}, trazo ${sh[3]}, color ${sh[4]} (--bw / --bs / --bc)\n- Sombra (--sh): ${sh[5]}\n- Efectos: ${fxv.length?fxv.map(x=>x[0]).join(", "):"ninguno"}`:"Predeterminadas",
  json:JSON.stringify({modo:SEL.m,atributoHtml:attr.trim()||null,
   tipografia:F?{nombre:F.n,categoria:F.c,familia:F.st}:null,
   paleta:C?{nombre:C.n,grupo:C.g,colores:C.sw,roles:T,rolesComplementarios:A}:null,
   formas:S?{nombre:S[0],grupo:S[7]||"Estilos clásicos",descripcion:S[6]||null,radioBotones:sh[0],radioContenedores:sh[1],bordeGrosor:sh[2],bordeTrazo:sh[3],bordeColor:sh[4],sombra:sh[5],efectos:Object.fromEntries(fxv)}:null,
   variablesCSS:Object.fromEntries(vars),
   detalle:vars.map(([k,v])=>({variable:k,valor:v,descripcion:VARDOC[k]||""}))})};
}
function addPayload(fd){
 const d=styleData();
 fd.delete("materiales");fd.append("materiales",[...frm.querySelectorAll("[name=materiales]:checked")].map(x=>x.value).join(", ")||"Ninguno marcado");
 const mail=frm.elements.correo.value.trim();if(mail)fd.set("email",mail);
 fd.append("estilo_resumen",themeText());fd.append("estilo_tipografia",d.tipografia);fd.append("estilo_paleta",d.paleta);fd.append("estilo_formas",d.formas);fd.append("estilo_efectos",d.efectos);
 fd.append("estilo_html",d.html);fd.append("estilo_css",d.css);fd.append("estilo_css_reglas",styleRules());fd.append("estilo_json",d.json);
}
/* ============ NAVEGACIÓN CON FLECHAS DEL TECLADO ============ */
const Pager=id=>{const l=on(),i=l.findIndex(x=>x.id===id),a=l[i-1],b=l[i+1];return `<nav class="pg" aria-label="Navegar entre páginas">${a?`<a class="btn alt" href="#${a.id}">← ${a.label}</a>`:"<span></span>"}<small class="kh">Usa las flechas ← → del teclado</small>${b?`<a class="btn" href="#${b.id}">${b.label} →</a>`:"<span></span>"}</nav>`};
function go(d){const l=on(),i=l.findIndex(x=>x.id===(location.hash.slice(1)||l[0].id)),n=l[i+d];if(n)location.hash=n.id}
addEventListener("keydown",e=>{
 if((e.key!=="ArrowRight"&&e.key!=="ArrowLeft")||e.altKey||e.ctrlKey||e.metaKey||e.shiftKey||e.defaultPrevented||$("#dlg").open)return;
 if(e.target.closest&&e.target.closest("input,textarea,select,[contenteditable],#fp,#sp,.tw,.car"))return;
 e.preventDefault();go(e.key==="ArrowRight"?1:-1);
});
count();route();
