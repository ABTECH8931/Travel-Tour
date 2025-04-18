document.addEventListener('DOMContentLoaded', () => {
  // Show More/Show Less for Packages
  const showCardBtn = document.getElementById('show-card-btn');
  const hiddenCard = document.getElementById('hidden-card');

  if (showCardBtn && hiddenCard) {
    showCardBtn.addEventListener('click', () => {
      if (hiddenCard.style.display === 'none' || !hiddenCard.style.display) {
        hiddenCard.style.display = 'flex';
        showCardBtn.innerHTML = '<i class="fas fa-chevron-up me-2"></i>Show Less';
      } else {
        hiddenCard.style.display = 'none';
        showCardBtn.innerHTML = '<i class="fas fa-chevron-down me-2"></i>Show More';
      }
    });
  }


  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        if (history.pushState) {
          history.pushState(null, null, targetId);
        } else {
          location.hash = targetId;
        }
      }
    });
  });

  // Mobile navbar active link highlighting
  const mobileNavLinks = document.querySelectorAll('.mobile-navbar a');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileNavLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Set active link based on scroll position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link, .mobile-navbar a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // Initialize active section on page load
  const currentHash = window.location.hash;
  if (currentHash) {
    const targetSection = document.querySelector(currentHash);
    if (targetSection) {
      setTimeout(() => {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }, 100);
    }
  }
});

// Simple Theme Toggle for Mobile Only
function initThemeToggle() {
  const themeToggle = document.querySelector('.theme-toggle');
  if (!themeToggle) return;
  
  const icon = themeToggle.querySelector('i');
  
  // Check for saved theme or prefer-color-scheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  
  // Apply saved theme
  if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
      icon.classList.replace('fa-moon', 'fa-sun');
  }
  
  // Toggle function
  themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      
      if (document.body.classList.contains('dark-theme')) {
          icon.classList.replace('fa-moon', 'fa-sun');
          localStorage.setItem('theme', 'dark');
      } else {
          icon.classList.replace('fa-sun', 'fa-moon');
          localStorage.setItem('theme', 'light');
      }
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initThemeToggle);


