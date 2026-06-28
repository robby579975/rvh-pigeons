const $=(s,p=document)=>p.querySelector(s), $$=(s,p=document)=>[...p.querySelectorAll(s)];const body=document.body;$("[data-menu]")?.addEventListener("click",()=>body.classList.toggle("menu-open"));$$(".nav a").forEach(a=>{if(a.getAttribute("href")===(location.pathname.split("/").pop()||"index.html"))a.classList.add("active");a.onclick=()=>body.classList.remove("menu-open")});const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});$$(".reveal").forEach(e=>io.observe(e));async function getJSON(path){return(await fetch(path)).json()}function sexLabel(s){return s==="M"?"Cock":s==="V"?"Hen":s}function birdCard(b){return `<article class="card reveal visible"><img src="${b.image}" alt="${b.name}"><div class="pad"><p class="eyebrow">${b.family}</p><h3>${b.name}</h3><p><strong>${b.ring}</strong> · ${sexLabel(b.sex)} · ${b.year}</p><p>${b.description}</p><a class="btn ghost" href="pigeon.html?id=${b.id}">View pedigree</a></div></article>`}async function renderBirds(){const holder=$("[data-birds]");if(!holder)return;const birds=await getJSON("data/birds.json");const search=$("[data-search]"),family=$("[data-family]"),sex=$("[data-sex]");function draw(){const q=(search?.value||"").toLowerCase(),fam=family?.value||"",sx=sex?.value||"";const filtered=birds.filter(b=>(!fam||b.family===fam)&&(!sx||b.sex===sx)&&(`${b.name} ${b.ring} ${b.family} ${b.strain}`.toLowerCase().includes(q)));holder.innerHTML=filtered.map(birdCard).join("")||`<div class="panel">No pigeons found.</div>`}[search,family,sex].forEach(el=>el?.addEventListener("input",draw));draw()}async function renderFeatured(){const h=$("[data-featured]");if(!h)return;const birds=await getJSON("data/birds.json");h.innerHTML=birds.slice(0,6).map(birdCard).join("")}async function renderBloodlines(){const h=$("[data-bloodlines]");if(!h)return;const data=await getJSON("data/bloodlines.json");h.innerHTML=data.map(x=>`<article class="card reveal visible"><img src="${x.image}" alt="${x.title}"><div class="pad"><p class="eyebrow">Foundation</p><h3>${x.title}</h3><p>${x.text}</p><a class="btn ghost" href="breeders.html">Explore</a></div></article>`).join("")}async function renderDetail(){
 const h=$("[data-detail]");if(!h)return;
 const birds=await getJSON("data/birds.json"),id=new URLSearchParams(location.search).get("id")||birds[0].id,b=birds.find(x=>x.id===id)||birds[0];
 document.title=`${b.name} | RVH Pigeons`;
 const hasPremium=b.eye||b.video||b.originalPedigree;
 if(hasPremium){
  h.innerHTML=`<div class="premium-profile">
    <div class="profile-photo"><img src="${b.image}" alt="${b.name}"></div>
    <div class="panel profile-title">
      <p class="eyebrow">${b.family}</p>
      <p class="ring">${b.ring}</p>
      <h1>${b.name}</h1>
      <p><strong>${b.label||""}</strong></p>
      <p>${b.description}</p>
      <div class="meta">
        <div><strong>Sex</strong><br>${sexLabel(b.sex)}</div>
        <div><strong>Year</strong><br>${b.year}</div>
        <div><strong>Father</strong><br>${b.father}</div>
        <div><strong>Mother</strong><br>${b.mother}</div>
      </div>
      <div class="bullets">${b.highlights.map(x=>`<div>${x}</div>`).join("")}</div>
      <div class="actions" style="justify-content:flex-start;margin-top:22px">
        <a class="btn" href="contact.html">Contact for offspring</a>
        <a class="btn ghost" href="#pedigrees">View pedigrees</a>
      </div>
    </div>
  </div>
  <section class="section">
    <div class="title"><h2>Media</h2><p>Professionele foto, oogfoto en video van ${b.name}.</p></div>
    <div class="media-grid">
      ${b.eye?`<div class="media-card"><h3>Eye Photo</h3><img src="${b.eye}" alt="Eye ${b.name}"></div>`:""}
      ${b.video?`<div class="media-card"><h3>Video</h3><video controls preload="metadata" src="${b.video}"></video></div>`:""}
    </div>
  </section>
  <section class="section" id="pedigrees">
    <div class="title"><h2>Pedigrees</h2><p>Originele pedigree en Compustam-stamboom.</p></div>
    <div class="pedigree-tabs">
      ${b.originalPedigree?`<div><p class="eyebrow">Original pedigree</p><div class="pedigree-card"><img src="${b.originalPedigree}" alt="Original pedigree ${b.name}"></div></div>`:""}
      <div><p class="eyebrow">Compustam pedigree</p><div class="pedigree-card"><img src="${b.pedigree}" alt="Compustam pedigree ${b.name}"></div></div>
    </div>
  </section>`;
 } else {
  h.innerHTML=`<div class="detail"><div><img class="card" src="${b.image}" alt="${b.name}"><div class="panel" style="margin-top:20px"><p class="eyebrow">${b.family}</p><h2>${b.name}</h2><div class="meta"><div><strong>Ring</strong><br>${b.ring}</div><div><strong>Sex</strong><br>${sexLabel(b.sex)}</div><div><strong>Year</strong><br>${b.year}</div><div><strong>Strain</strong><br>${b.strain}</div></div><p>${b.description}</p><div class="bullets">${b.highlights.map(x=>`<div>${x}</div>`).join("")}</div></div></div><div><img class="pedigree" src="${b.pedigree}" alt="Pedigree ${b.name}"></div></div>`;
 }
}
renderBirds();renderFeatured();renderBloodlines();renderDetail();