window.onload = function() {
  const sections = document.querySelectorAll('section');
  const navBar = document.querySelector('.navbar__menu')
  const navList = document.querySelector('#navbar__list');
  console.log('navList', navList);

  function buildNav(){
    sections.forEach(section => {
      //Create the li elements that contained inside the ul
      const navButton = document.createElement('li');
      //Insert the html text to  the li
      navButton.insertAdjacentHTML("afterbegin",`<a href="#${section.id}" class="menu__link ${section.id}">${section.dataset.nav}</a>`);
      //Append the li to the ul
      navList.appendChild(navButton)
  });
  //Append the ul to the nav
  navBar.appendChild(navList);
  makeActive();
  }

  function getVisibleArea(element) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth = Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    return visibleHeight * visibleWidth;
  }

  function makeActive() {
    const navLinks = document.querySelectorAll('#navbar__list li a');
    console.log('navLinks', navLinks);
    let maxVisibleArea = 0;
    let activeSection = 'Section1';

    sections.forEach((section) => {
      section.classList.remove('active-section');
      const visibleArea = getVisibleArea(section);

      if (visibleArea > maxVisibleArea) {
        maxVisibleArea = visibleArea;
        activeSection = section.getAttribute('id');
      }
    });

    navLinks.forEach((nav) => {
      nav.classList.remove('active');
      if (nav.classList.contains(activeSection)) {
        nav.classList.add('active');
      }
    });
  }

  buildNav();
  window.addEventListener('scroll', makeActive);
  
  setTimeout(() => {
    const navLinks = document.querySelectorAll('#navbar__list li a');
    console.log('navLinks', navLinks);
    navLinks.forEach((link, index) => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      link.classList.add('active');
      sections[index].scrollIntoView({ behavior: 'smooth', block: "start", inline: "nearest" });
    });
  });
  }, 500)
  
};

