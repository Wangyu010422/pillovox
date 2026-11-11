const nav = document.getElementById('nav');
addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>40),{passive:true});
const io = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.08});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
/* ================= Milestones drag scroll ================= */
const track = document.getElementById('msTrack');
let dragging = false, startX = 0, startL = 0;
track.addEventListener('pointerdown', e => {
  dragging = true; startX = e.clientX; startL = track.scrollLeft;
  track.classList.add('dragging'); track.setPointerCapture(e.pointerId);
});
track.addEventListener('pointermove', e => {
  if (dragging) track.scrollLeft = startL - (e.clientX - startX);
});
['pointerup','pointercancel'].forEach(ev =>
  track.addEventListener(ev, () => { dragging = false; track.classList.remove('dragging'); }));

/* auto-nudge the timeline when it enters view */
new IntersectionObserver((es, ob) => {
  if (!es[0].isIntersecting) return; ob.disconnect();
  track.scrollTo({left: 160, behavior: 'smooth'});
}, {threshold:.3}).observe(track);


/* ================= Story lightbox ================= */
const lb = document.getElementById('lightbox');
document.querySelectorAll('.story-card').forEach(f => f.addEventListener('click', () => {
  document.getElementById('lbImg').src = f.dataset.full;
  lb.classList.add('on');
  document.body.style.overflow = 'hidden';
}));
document.querySelectorAll('.story-card').forEach(card => card.addEventListener('keydown', e => {if(e.key === 'Enter' || e.key === ' '){e.preventDefault();card.click();}}));
document.getElementById('lbClose').addEventListener('click', () => {
  lb.classList.remove('on'); document.body.style.overflow = '';
});
lb.addEventListener('click', e => {
  if (e.target === lb) { lb.classList.remove('on'); document.body.style.overflow = ''; }
});

addEventListener('keydown',e=>{if(e.key==='Escape'){lb.classList.remove('on');document.body.style.overflow='';}});
