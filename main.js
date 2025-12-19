// ============================================
// Global Functions - Define Early
// ============================================
// Define scrollToSection immediately so it's available for onclick handlers
window.scrollToSection = function(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof toggleMobileMenu === 'function') {
      toggleMobileMenu(false);
    }
    
    // Update active section after scroll
    setTimeout(() => {
      window.activeSection = id;
      if (typeof updateNavItems === 'function') {
        updateNavItems();
      }
    }, 500);
  }
};

// Define toggleMobileMenu early
window.toggleMobileMenu = function(force) {
  const mobileMenu = document.getElementById('mobile-menu');
  if (!mobileMenu) return;
  
  if (force !== undefined) {
    mobileMenu.classList.toggle('open', force);
  } else {
    mobileMenu.classList.toggle('open');
  }
};

// Define scrollToTop early
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// ============================================
// Scroll Progress Bar
// ============================================
function updateScrollProgress() {
    const scrollProgress = document.getElementById('scroll-progress');
    if (!scrollProgress) return;
    
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = windowHeight > 0 ? scrolled / windowHeight : 0;
    scrollProgress.style.transform = `scaleX(${progress})`;
  }
  
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  
  // Initialize immediately if possible
  if (document.readyState !== 'loading') {
    updateScrollProgress();
  }
  
  // ============================================
  // Navbar Scroll Detection
  // ============================================
  const navbar = document.getElementById('navbar');
  let ticking = false;
  
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  }
  
  function handleNavbarScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  
  // ============================================
  // Active Section Detection
  // ============================================
  const sections = ['home', 'about', 'ed206', 'overview', 'media', 'financial', 'digital', 'eco', 'references'];
  window.activeSection = 'home';
  
  function updateActiveSection() {
    const scrollPosition = window.scrollY + 200;
    
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          if (window.activeSection !== sections[i]) {
            window.activeSection = sections[i];
            updateNavItems();
          }
          break;
        }
      }
    }
  }
  
  // Make updateActiveSection globally available
  window.updateActiveSection = updateActiveSection;
  
  function updateNavItems() {
    const navItems = document.querySelectorAll('.nav-item, .nav-item-mobile');
    if (navItems.length === 0) {
      console.warn('No nav items found');
      return;
    }
    navItems.forEach(item => {
      const section = item.getAttribute('data-section');
      if (section === window.activeSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
    console.log('Active section updated to:', window.activeSection);
  }
  
  // Make updateNavItems globally available
  window.updateNavItems = updateNavItems;
  
  window.addEventListener('scroll', updateActiveSection, { passive: true });
  
  // ============================================
  // Smooth Scroll to Section
  // ============================================
  function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toggleMobileMenu(false);
      
      // Update active section after scroll
      setTimeout(() => {
        activeSection = id;
        updateNavItems();
      }, 500);
    }
  }
  
  // Make it globally available
  window.scrollToSection = scrollToSection;
  
  // ============================================
  // Mobile Menu Toggle
  // ============================================
  function toggleMobileMenu(force) {
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu) return;
    
    if (force !== undefined) {
      mobileMenu.classList.toggle('open', force);
    } else {
      mobileMenu.classList.toggle('open');
    }
  }
  
  window.toggleMobileMenu = toggleMobileMenu;
  
  // ============================================
  // Scroll to Top Button
  // ============================================
  const scrollToTopBtn = document.getElementById('scroll-to-top');
  
  function updateScrollToTop() {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add('visible');
    } else {
      scrollToTopBtn.classList.remove('visible');
    }
  }
  
  // scrollToTop is already defined globally at the top of the file
  window.addEventListener('scroll', updateScrollToTop, { passive: true });
  
  // ============================================
  // Accordion Functionality
  // ============================================
  function toggleAccordion(section) {
    const content = document.getElementById(`accordion-${section}`);
    const arrow = document.getElementById(`arrow-${section}`);
    
    if (!content || !arrow) return;
    
    const isOpen = content.classList.contains('open');
    
    // Close all accordions
    document.querySelectorAll('.accordion-content').forEach(acc => {
      acc.classList.remove('open');
    });
    document.querySelectorAll('.accordion-arrow').forEach(arr => {
      arr.classList.remove('rotated');
    });
    
    // Open clicked one if it wasn't open
    if (!isOpen) {
      content.classList.add('open');
      arrow.classList.add('rotated');
    }
  }
  
  window.toggleAccordion = toggleAccordion;
  
  // ============================================
  // Budget Pie Chart
  // ============================================
  function createBudgetChart() {
    const container = document.getElementById('budget-chart');
    if (!container) {
      console.warn('Budget chart container not found');
      return;
    }
    
    // Clear container first
    container.innerHTML = '';
    
    const budgetData = [
      { label: 'Needs', value: 50, color: '#E87899' },
      { label: 'Wants', value: 30, color: '#E6C36A' },
      { label: 'Savings', value: 20, color: '#A9CBB7' },
    ];
    
    let currentAngle = -90;
    const segments = budgetData.map((item, index) => {
      const angle = (item.value / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;
      
      const radius = 80;
      const x1 = 100 + radius * Math.cos(startAngleRad);
      const y1 = 100 + radius * Math.sin(startAngleRad);
      const x2 = 100 + radius * Math.cos(endAngleRad);
      const y2 = 100 + radius * Math.sin(endAngleRad);
      
      const largeArcFlag = angle > 180 ? 1 : 0;
      
      const pathData = `M 100 100 L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
      
      return {
        ...item,
        pathData,
        index,
      };
    });
    
    let hoveredSegment = null;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '200');
    svg.setAttribute('height', '200');
    svg.className = 'budget-chart-svg';
    
    const chartContainer = document.createElement('div');
    chartContainer.style.position = 'relative';
    chartContainer.style.width = '200px';
    chartContainer.style.height = '200px';
    chartContainer.style.margin = '0 auto';
    chartContainer.style.display = 'block';
    
    segments.forEach(segment => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', segment.pathData);
      path.setAttribute('fill', segment.color);
      path.style.cursor = 'pointer';
      path.style.transition = 'all 0.3s';
      path.style.transformOrigin = '100px 100px';
      
      path.addEventListener('mouseenter', () => {
        hoveredSegment = segment.index;
        updateChartOpacity();
      });
      
      path.addEventListener('mouseleave', () => {
        hoveredSegment = null;
        updateChartOpacity();
      });
      
      function updateChartOpacity() {
        segments.forEach((s, idx) => {
          const p = svg.querySelector(`path:nth-child(${idx + 1})`);
          if (p) {
            if (hoveredSegment !== null && hoveredSegment !== idx) {
              p.style.opacity = '0.6';
            } else {
              p.style.opacity = '1';
            }
            if (hoveredSegment === idx) {
              p.style.transform = 'scale(1.05)';
            } else {
              p.style.transform = 'scale(1)';
            }
          }
        });
      }
      
      svg.appendChild(path);
    });
    
    const center = document.createElement('div');
    center.className = 'budget-chart-center';
    center.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 1.5rem; font-weight: 700; color: var(--charcoal);">100%</div>
        <div style="font-size: 0.875rem; color: rgba(58, 58, 58, 0.6);">Total Budget</div>
      </div>
    `;
    
    chartContainer.appendChild(svg);
    chartContainer.appendChild(center);
    
    const title = document.createElement('h4');
    title.className = 'budget-chart-title';
    title.textContent = 'Budget Allocation Example';
    
    const legend = document.createElement('div');
    legend.className = 'budget-chart-legend';
    
    budgetData.forEach((item, index) => {
      const legendItem = document.createElement('div');
      legendItem.className = 'budget-legend-item';
      
      legendItem.addEventListener('mouseenter', () => {
        hoveredSegment = index;
        updateChartOpacity();
      });
      
      legendItem.addEventListener('mouseleave', () => {
        hoveredSegment = null;
        updateChartOpacity();
      });
      
      function updateChartOpacity() {
        segments.forEach((s, idx) => {
          const p = svg.querySelector(`path:nth-child(${idx + 1})`);
          if (p) {
            if (hoveredSegment !== null && hoveredSegment !== idx) {
              p.style.opacity = '0.6';
            } else {
              p.style.opacity = '1';
            }
            if (hoveredSegment === idx) {
              p.style.transform = 'scale(1.05)';
            } else {
              p.style.transform = 'scale(1)';
            }
          }
        });
      }
      
      legendItem.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem; flex: 1;">
          <div class="budget-legend-color" style="background-color: ${item.color};"></div>
          <span class="budget-legend-label">${item.label}</span>
        </div>
        <span class="budget-legend-value">${item.value}%</span>
      `;
      
      legend.appendChild(legendItem);
    });
    
    const note = document.createElement('p');
    note.className = 'budget-chart-note';
    note.textContent = 'The 50/30/20 rule: 50% needs, 30% wants, 20% savings';
    
    container.appendChild(title);
    container.appendChild(chartContainer);
    container.appendChild(legend);
    container.appendChild(note);
  }
  
  // Make functions globally accessible
  window.createBudgetChart = createBudgetChart;
  
  // ============================================
  // Digital Timeline
  // ============================================
  function createDigitalTimeline() {
    const container = document.getElementById('digital-timeline');
    if (!container) {
      console.warn('Digital timeline container not found');
      return;
    }
    
    // Clear container first
    container.innerHTML = '';
    
    const milestones = [
      {
        year: '1990s',
        title: 'Internet Revolution',
        description: 'World Wide Web becomes accessible to the public',
      },
      {
        year: '2000s',
        title: 'Social Media Era',
        description: 'Platforms like Facebook and Twitter reshape communication',
      },
      {
        year: '2010s',
        title: 'Mobile First',
        description: 'Smartphones become primary digital devices',
      },
      {
        year: '2020s',
        title: 'AI Integration',
        description: 'Artificial intelligence becomes mainstream in daily life',
      },
    ];
    
    const title = document.createElement('h4');
    title.className = 'timeline-title';
    title.textContent = 'Digital Evolution Timeline';
    
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'timeline-container';
    
    const line = document.createElement('div');
    line.className = 'timeline-line';
    
    const items = document.createElement('div');
    items.className = 'timeline-items';
    
    milestones.forEach((milestone, index) => {
      const item = document.createElement('div');
      item.className = 'timeline-item';
      item.style.animationDelay = `${index * 0.1}s`;
      
      const iconWrapper = document.createElement('div');
      iconWrapper.className = 'timeline-icon-wrapper';
      
      const iconCircle = document.createElement('div');
      iconCircle.className = 'timeline-icon-circle';
      iconCircle.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      `;
      
      iconWrapper.appendChild(iconCircle);
      
      const content = document.createElement('div');
      content.className = 'timeline-content';
      
      const year = document.createElement('div');
      year.className = 'timeline-year';
      year.textContent = milestone.year;
      
      const title = document.createElement('h5');
      title.textContent = milestone.title;
      
      const description = document.createElement('p');
      description.className = 'timeline-description';
      description.textContent = milestone.description;
      
      content.appendChild(year);
      content.appendChild(title);
      content.appendChild(description);
      
      item.appendChild(iconWrapper);
      item.appendChild(content);
      
      items.appendChild(item);
    });
    
    timelineContainer.appendChild(line);
    timelineContainer.appendChild(items);
    
    container.appendChild(title);
    container.appendChild(timelineContainer);
  }
  
  // Make function globally accessible
  window.createDigitalTimeline = createDigitalTimeline;
  
  // ============================================
  // Current Year in Footer
  // ============================================
  const currentYearEl = document.getElementById('current-year');
  if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
  }
  
  // ============================================
  // Initialize on DOM Load
  // ============================================
  let initialized = false;
  
  function initialize() {
    if (initialized) {
      console.log('Already initialized, skipping...');
      return;
    }
    
    console.log('Initializing portfolio features...');
    console.log('Budget chart container exists:', !!document.getElementById('budget-chart'));
    console.log('Digital timeline container exists:', !!document.getElementById('digital-timeline'));
    
    // Initialize charts
    try {
      createBudgetChart();
      console.log('✓ Budget chart initialized');
    } catch (e) {
      console.error('✗ Error creating budget chart:', e);
    }
    
    try {
      createDigitalTimeline();
      console.log('✓ Digital timeline initialized');
    } catch (e) {
      console.error('✗ Error creating digital timeline:', e);
    }
    
    // Initialize scroll features
    updateActiveSection();
    updateNavbar();
    updateScrollProgress();
    updateScrollToTop();
    
    // Update active section again after a short delay to ensure sections are positioned
    setTimeout(() => {
      updateActiveSection();
    }, 300);
    
    initialized = true;
    console.log('✓ All features initialized');
  }
  
  // Run initialization when DOM is ready
  function runInit() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initialize, 100);
      });
    } else {
      // DOM is already ready
      setTimeout(initialize, 100);
    }
    
    // Also try on window load as backup
    window.addEventListener('load', () => {
      if (!initialized) {
        setTimeout(initialize, 100);
      }
    });
  }
  
  runInit();
  