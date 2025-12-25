const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

async function loadJSON(path){
  try{
    const url = path + (path.includes('?')? '&':'?') + 't=' + Date.now();
    const res = await fetch(url, { cache: 'no-store' });
    if(!res.ok) throw new Error('Fetch error');
    return await res.json()
  }catch(e){console.warn('Could not load',path,e);return []}
}

function mkEl(html){const t=document.createElement('template');t.innerHTML=html.trim();return t.content.firstChild}

function renderProjects(list){
  const grid = document.getElementById('projectsGrid'); grid.innerHTML='';
  list.forEach(p=>{
    const card = mkEl(`<article class="card fade-up" tabindex="0">
      <img src="${p.image}" alt="${p.title} key art">
      <h3>${p.title}</h3>
      <p class="muted">${p.description}</p>
      <div style="display:flex;gap:8px;align-items:center;margin-top:8px">
        <span class="status ${p.status.replace(/\s/g,'\\ ')}">${p.status}</span>
  ${p.link?`<a class="btn open" href="${p.link}" target="_blank" rel="noopener">Open</a>`:''}
      </div>
    </article>`)
    grid.appendChild(card)
  })
  requestAnimationFrame(()=>observeFade())
}

function renderEvents(list){
  const el = document.getElementById('eventsList'); el.innerHTML='';
  list.forEach(ev=>{
    const card = mkEl(`<article class="card fade-up">
      <div style="display:flex;gap:12px;align-items:center">
        ${ev.image?`<img src="${ev.image}" alt="${ev.name} logo">`:''}
        <div>
          <h3>${ev.name} <small class="muted">• ${ev.type}</small></h3>
          <p class="muted">${ev.date} · ${ev.location}</p>
          <p>${ev.description}</p>
        </div>
      </div>
    </article>`)
    el.appendChild(card)
  })
}

function renderTeam(list){
  const el = document.getElementById('teamGrid'); el.innerHTML='';
  list.forEach(m=>{
    const avatar = m.avatar||'Assets/Images/Undisclosed.png'
    const card = mkEl(`<article class="card team-card fade-up">
      <img class="avatar" src="${avatar}" alt="${m.name||'Team member'} avatar">
      <div>
        <h3>${m.name||'Anonymous'}</h3>
        <p class="muted">${m.role||'Contributor'}</p>
        <p>${m.bio||''}</p>
      </div>
    </article>`)
    el.appendChild(card)
  })
}

function observeFade(){
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible') })
  },{threshold:0.12})
  document.querySelectorAll('.fade-up').forEach(n=>obs.observe(n))
}

function initFilters(projects){
  const sel = document.getElementById('filterStatus');
  sel.addEventListener('change',()=>{
    const v = sel.value;
    const out = v==='all'?projects:projects.filter(p=>p.status===v);
    renderProjects(out);
  })
}

async function boot(){
  const [projects,events,team] = await Promise.all([
    loadJSON('data/projects.json'),
    loadJSON('data/events.json'),
    loadJSON('data/team.json')
  ])
  // sort events desc by date (ISO)
  events.sort((a,b)=> (b.date||'').localeCompare(a.date||''))
  renderProjects(projects)
  renderEvents(events)
  renderTeam(team)
  initFilters(projects)
}

// theme toggle
document.getElementById('themeToggle')?.addEventListener('click',()=>{
  document.documentElement.classList.toggle('light')
})

// If a video fallback exists for the hero animation, use it and slow playback
async function useHeroVideoIfAvailable(){
  const base = 'Assets/Images/Snow_slow'
  const tryPaths = [base + '.webm', base + '.mp4']
  for(const p of tryPaths){
    try{
      const r = await fetch(p, { method: 'HEAD' })
      if(r.ok){
        const bg = document.querySelector('.hero-bg')
        if(bg){
          bg.style.backgroundImage = 'none'
          const vid = document.createElement('video')
          vid.src = p
          vid.autoplay = true
          vid.loop = true
          vid.muted = true
          vid.playsInline = true
          vid.style.width = '100%'
          vid.style.height = '100%'
          vid.style.objectFit = 'cover'
          vid.style.position = 'absolute'
          vid.style.inset = '0'
          vid.style.zIndex = '-1'
          // set slower playback
          vid.addEventListener('canplay', ()=>{ try{ vid.playbackRate = 0.4 }catch(e){} })
          bg.appendChild(vid)
        }
        break
      }
    }catch(e){/* ignore */}
  }
}

boot()
useHeroVideoIfAvailable()
