// MAIN APPLICATION LOGIC & COMPONENT RENDERING
import { initHeroCanvas } from './heroCanvas.js';
import { PROJECTS_DATA, SERVICES_DATA } from './projectsData.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Hero Cinematic Canvas Video
  initHeroCanvas('hero-canvas', '/assets/images/hero.jpg');

  // 2. Navigation & SPA Routing
  initNavigation();

  // 3. Render Homepage Projects Gallery
  const homeProjects = document.getElementById('home-projects-container');
  if (homeProjects) {
    homeProjects.innerHTML = PROJECTS_DATA.map(p => `
      <div class="project-card-editorial" data-target="projects-view">
        <div class="project-image-box"><img src="${p.image}" alt="${p.title}" loading="lazy"></div>
        <div class="project-meta">
          <span class="project-num">${p.id}</span>
          <span class="project-cat">${p.category}</span>
        </div>
        <h3 class="project-title">${p.title}</h3>
        <div class="project-loc"><span>&loz;</span> ${p.location} &bull; ${p.area}</div>
      </div>
    `).join('');
  }

  // 4. Horizontal Scroll Controls for Gallery
  const leftBtn = document.getElementById('scroll-left-btn');
  const rightBtn = document.getElementById('scroll-right-btn');
  if (leftBtn && rightBtn && homeProjects) {
    leftBtn.addEventListener('click', () => homeProjects.scrollBy({ left: -420, behavior: 'smooth' }));
    rightBtn.addEventListener('click', () => homeProjects.scrollBy({ left: 420, behavior: 'smooth' }));
  }

  // 5. Render Homepage Services Rows
  const homeServices = document.getElementById('home-services-container');
  if (homeServices) {
    homeServices.innerHTML = SERVICES_DATA.map(s => `
      <div class="service-row">
        <div class="service-idx">${s.id}</div>
        <div class="service-name">${s.name}</div>
        <div class="service-desc">${s.shortDesc}</div>
        <div class="service-action">Explore capability &rarr;</div>
      </div>
    `).join('');
  }

  // 6. Render All Projects Grid (Dedicated Projects View)
  const projectsGrid = document.getElementById('all-projects-grid');
  if (projectsGrid) {
    projectsGrid.innerHTML = PROJECTS_DATA.map(p => `
      <div class="project-card-editorial" style="background-color: var(--bg-dark-surface); padding: 1.5rem; border: 1px solid rgba(247,245,240,0.1);">
        <div class="project-image-box" style="margin-bottom: 1.25rem;"><img src="${p.image}" alt="${p.title}"></div>
        <div class="project-meta"><span class="project-num">${p.id}</span><span class="project-cat">${p.category}</span></div>
        <h3 class="project-title" style="margin: 0.5rem 0;">${p.title}</h3>
        <p style="font-size: 0.88rem; color: var(--text-dark-secondary); margin-bottom: 1rem;">${p.description}</p>
        <div class="project-loc"><span>&loz;</span> ${p.location} &bull; ${p.area} (${p.year})</div>
      </div>
    `).join('');
  }

  // 7. Render All Services List (Dedicated Services View)
  const servicesList = document.getElementById('all-services-list');
  if (servicesList) {
    servicesList.innerHTML = SERVICES_DATA.map(s => `
      <div style="background-color: var(--bg-white); padding: 2.5rem; margin-bottom: 1.8rem; border: 1px solid var(--border-concrete);">
        <div style="font-size: 0.78rem; letter-spacing: 0.2em; color: var(--accent-bronze); font-weight: 700; margin-bottom: 0.4rem;">CAPABILITY ${s.id}</div>
        <h2 style="font-size: 1.7rem; font-weight: 800; margin-bottom: 0.8rem; text-transform: uppercase;">${s.name}</h2>
        <p style="font-size: 1.05rem; color: var(--text-primary); margin-bottom: 0.8rem; font-weight: 600;">${s.shortDesc}</p>
        <p style="font-size: 0.92rem; color: var(--text-muted); line-height: 1.65;">${s.details}</p>
      </div>
    `).join('');
  }
});
