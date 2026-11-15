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

const themeToggle = document.querySelector('.theme-toggle');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * @function getTheme
 * @returns {string} the active theme: the saved choice, or the system setting
 */
const getTheme = () => document.documentElement.dataset.theme || (prefersDark.matches ? 'dark' : 'light');

/**
 * @function updateThemeButton
 * @description shows a moon in light mode and a sun in dark mode
 * @returns {void}
 */
const updateThemeButton = () => {
  const isDark = getTheme() === 'dark';
  themeToggle.textContent = isDark ? '☀' : '☾';
  themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
};

/**
 * @function toggleTheme
 * @description switches between light and dark and remembers the choice
 * @returns {void}
 */
const toggleTheme = () => {
  const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = nextTheme;
  try {
    localStorage.setItem('theme', nextTheme);
  } catch (error) {
    // storage blocked: the theme still changes for this page
  }
  updateThemeButton();
};

themeToggle.addEventListener('click', toggleTheme);
prefersDark.addEventListener('change', updateThemeButton);
updateThemeButton();

document.getElementById('year').textContent = new Date().getFullYear();
