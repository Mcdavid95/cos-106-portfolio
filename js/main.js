const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

/**
 * @function toggleMenu
 * @description opens or closes the mobile navigation
 * @returns {void}
 */
const toggleMenu = () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
};

navToggle.addEventListener('click', toggleMenu);

document.getElementById('year').textContent = new Date().getFullYear();
