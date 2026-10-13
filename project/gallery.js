// ---- PLACEHOLDER DATA: replace img + text with real project info ----
const img = (seed) => `https://picsum.photos/seed/${seed}/800/900`;

const categories = [
  {
    id: 'water',
    label: 'Water Construction',
    projects: [
      { id: 'water-1', title: 'Water Treatment Plant', location: 'Coimbatore', year: '2024', status: 'Completed',
        desc: 'Placeholder description for the treatment plant project. Add scope, capacity and what KLK delivered.',
        points: ['Capacity: 00 MLD', 'Client: Department name', 'Scope: Civil works & piping'] },
      { id: 'water-2', title: 'Overhead Water Tank', location: 'Tiruppur', year: '2023', status: 'Completed',
        desc: 'Placeholder description for the overhead tank project. Add height, volume and structural details.',
        points: ['Capacity: 00,000 litres', 'Client: Department name', 'Scope: RCC structure'] },
      { id: 'water-3', title: 'Pipeline Network', location: 'Erode', year: '2025', status: 'Ongoing',
        desc: 'Placeholder description for the pipeline project. Add length, diameter and area covered.',
        points: ['Length: 00 km', 'Client: Department name', 'Scope: Laying & testing'] }
    ]
  },
  {
    id: 'restoration',
    label: 'Restoration',
    projects: [
      { id: 'rest-1', title: 'Bridge Restoration', location: 'Salem', year: '2024', status: 'Completed',
        desc: 'Placeholder description for the bridge restoration. Add what was repaired and why.',
        points: ['Span: 00 m', 'Client: Department name', 'Scope: Repair & strengthening'] },
      { id: 'rest-2', title: 'Canal Renovation', location: 'Madurai', year: '2023', status: 'Completed',
        desc: 'Placeholder description for the canal renovation. Add lining, desilting and capacity details.',
        points: ['Length: 00 km', 'Client: Department name', 'Scope: Lining & desilting'] },
      { id: 'rest-3', title: 'Building Renovation', location: 'Trichy', year: '2025', status: 'Ongoing',
        desc: 'Placeholder description for the building renovation. Add built-up area and work done.',
        points: ['Area: 00,000 sq.ft', 'Client: Department name', 'Scope: Structural & finishing'] }
    ]
  },
  {
    id: 'highway',
    label: 'Highway Road',
    projects: [
      { id: 'road-1', title: 'Four-Lane Highway', location: 'Coimbatore - Salem', year: '2024', status: 'Completed',
        desc: 'Placeholder description for the highway project. Add length, lanes and surface details.',
        points: ['Length: 00 km', 'Client: Department name', 'Scope: Earthwork & bituminous paving'] },
      { id: 'road-2', title: 'Rural Link Road', location: 'Nilgiris', year: '2023', status: 'Completed',
        desc: 'Placeholder description for the link road. Add length, width and drainage details.',
        points: ['Length: 00 km', 'Client: Department name', 'Scope: Road & culverts'] },
      { id: 'road-3', title: 'Flyover Approach Road', location: 'Chennai', year: '2025', status: 'Ongoing',
        desc: 'Placeholder description for the flyover approach. Add structure type and traffic notes.',
        points: ['Length: 0.0 km', 'Client: Department name', 'Scope: Approach & retaining walls'] }
    ]
  }
];

// ---- state ----
let cat = 0;
let idx = 0;

const pills = document.getElementById('pills');
const stage = document.getElementById('stage');
const capTitle = document.getElementById('capTitle');
const details = document.getElementById('details');

// ---- category buttons ----
categories.forEach((c, i) => {
  const b = document.createElement('button');
  b.className = 'gal-pill';
  b.textContent = c.label;
  b.onclick = () => { cat = i; idx = 0; renderCarousel(); };
  pills.appendChild(b);
});

// ---- carousel ----
function renderCarousel() {
  const list = categories[cat].projects;
  [...pills.children].forEach((b, i) => b.classList.toggle('is-on', i === cat));

  stage.innerHTML = '';
  list.forEach((p, i) => {
    const slide = document.createElement('div');
    slide.className = 'gal-slide';
    slide.innerHTML = `<img src="${img(p.id)}" alt="${p.title}">`;
    slide.onclick = () => (i === idx ? goToDetails() : (idx = i, position()));
    stage.appendChild(slide);
  });
  position();
}

function position() {
  const list = categories[cat].projects;
  const n = list.length;
  [...stage.children].forEach((s, i) => {
    const d = (i - idx + n) % n;
    s.className = 'gal-slide ' + (d === 0 ? 'is-active' : d === 1 ? 'is-next' : 'is-prev');
  });
  capTitle.textContent = list[idx].title;
}

const step = (dir) => {
  const n = categories[cat].projects.length;
  idx = (idx + dir + n) % n;
  position();
};
document.getElementById('prev').onclick = () => step(-1);
document.getElementById('next').onclick = () => step(1);
document.getElementById('explore').onclick = () => goToDetails();

function goToDetails() {
  const el = document.getElementById('p-' + categories[cat].projects[idx].id);
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}

// ---- details: heading by heading, image + info ----
categories.forEach((c) => {
  const wrap = document.createElement('div');
  wrap.className = 'gal-group';
  wrap.innerHTML = `<h2>${c.label}</h2>` + c.projects.map((p) => `
    <article class="gal-project" id="p-${p.id}">
      <img src="${img(p.id)}" alt="${p.title}">
      <div class="gal-info">
        <h3>${p.title}</h3>
        <p class="gal-meta">${p.location} &bull; ${p.year} &bull; ${p.status}</p>
        <p>${p.desc}</p>
        <ul>${p.points.map((x) => `<li>${x}</li>`).join('')}</ul>
      </div>
    </article>`).join('');
  details.appendChild(wrap);
});

renderCarousel();