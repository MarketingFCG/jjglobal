// Disable browser scroll memory
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// Force scroll to top ASAP
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});

// HERO CAROUSEL
const slides = document.querySelectorAll('.hero-carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
let currentSlide = 0;

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = n;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}


const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runSlideshow() {
  while (true) {
    await sleep(5000);
    goToSlide((currentSlide + 1) % slides.length);
  }
}

runSlideshow();

// MAP
const map = L.map('map').setView([40.3, -76.2], 8);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

const stationIcon = L.divIcon({
  className: '',
  html: '<img src="/Images/MlogoNBG.png" style="width:55px; height:55px; object-fit:contain;" alt="JJ Global"/>',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -36]
});

const stations = [
  { name: "Lancaster Travel Places", address: "2622 Lincoln Hwy E, Ronks, PA 17572", lat: 40.0423, lng: -76.1641 },
  { name: "Trexler Express", address: "5917 Tilghman St, Allentown, PA 18104", lat: 40.6024, lng: -75.5279 },
  { name: "Willow Street Enterprise", address: "2930 Willow Street Pike, Willow Street, PA 17584", lat: 39.9965, lng: -76.2724 },
  { name: "Willow Valley Center", address: "2504 Willow Street Pike, Lancaster, PA 17584", lat: 40.0012, lng: -76.2698 },
  { name: "Mountjoy Retail Center", address: "2040 W Main St, Mountjoy, PA 17552", lat: 40.1676, lng: -76.6994 },
  { name: "Harrisburg Travel Plaza", address: "2826 E Harrisburg Pike, Middletown, PA 17057", lat: 40.2021, lng: -76.6891 },
  { name: "Blue Mountain Travel Center", address: "511 PA-61 S, Schuylkill Haven, PA 17972", lat: 40.6248, lng: -76.1627 }
];

const markers = [];
stations.forEach((station, i) => {
  const marker = L.marker([station.lat, station.lng], { icon: stationIcon })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:'Source Sans 3',sans-serif; min-width:180px;">
        <strong style="font-family:'Oswald',sans-serif; color:#1a2c5b; font-size:15px;">⛽ ${station.name}</strong>
        <p style="margin-top:6px; color:#6b7a99; font-size:13px; line-height:1.5;">${station.address}</p>
        <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(station.address)}" 
           target="_blank" 
           style="display:inline-block; margin-top:10px; background:#f0a500; color:#1a2c5b; padding:6px 14px; border-radius:4px; font-size:12px; font-weight:600; text-decoration:none; font-family:'Oswald',sans-serif; letter-spacing:.5px;">
          Get Directions →
        </a>
      </div>
    `);
  markers.push(marker);
});

function focusStation(index) {
  const station = stations[index];
  map.setView([station.lat, station.lng], 13, { animate: true });
  markers[index].openPopup();
  document.querySelectorAll('#map-section [onclick^="focusStation"]').forEach((el, i) => {
    el.style.borderLeft = i === index ? '4px solid var(--navy)' : '4px solid var(--accent)';
    el.style.background = i === index ? '#e8eef8' : '#fff';
  });
}

function closeMaintenance() {
  document.getElementById('maintenance-overlay').style.display = 'none';
  document.getElementById('maintenance-strip').style.display = 'block';
  document.querySelector('nav').style.top = '34px';
}



  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function scrollTo(id) {
  
    requestAnimationFrame(() => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
});
  }

  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    this.style.display = 'none';
    document.getElementById('formSuccess').style.display = 'block';
  });
