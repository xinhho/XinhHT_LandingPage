window.onload = function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar a');

  function getVisibleArea(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    return visibleHeight * visibleWidth;
  }

  function makeActive() {
    let maxVisibleArea = 0;
    let activeSection = 'Section1';

    sections.forEach((section) => {
      const visibleArea = getVisibleArea(section);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        activeSection = section.getAttribute('id');
      }
    });

    console.log('activeSection', activeSection);

    navLinks.forEach((nav) => {
      nav.classList.remove('active');
      if (nav.classList.contains(activeSection)) {
        nav.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', makeActive);
  makeActive();
  navLinks.forEach((link, index) => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      link.classList.add('active');
      sections[index].scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    });
  });
};

