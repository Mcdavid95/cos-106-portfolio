const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const digitsPattern = /^\d+$/;

/**
 * @function setError
 * @param {HTMLElement} input form field to mark
 * @param {string} message error text, empty string clears the error
 * @returns {boolean} true when the field is valid
 */
const setError = (input, message) => {
  const field = input.parentElement;
  field.querySelector('.error').textContent = message;
  field.classList.toggle('invalid', Boolean(message));
  return !message;
};

/**
 * @function validateField
 * @param {HTMLElement} input form field to check
 * @returns {boolean} true when the field is valid
 */
const validateField = (input) => {
  const value = input.value.trim();

  if (!value) return setError(input, 'This field is required.');
  if (input.name === 'email' && !emailPattern.test(value)) {
    return setError(input, 'Please enter a valid email address.');
  }
  if (input.name === 'phone' && !digitsPattern.test(value)) {
    return setError(input, 'Phone number should contain digits only.');
  }
  return setError(input, '');
};

/**
 * @function handleSubmit
 * @param {Event} event form submit event
 * @returns {void}
 */
const handleSubmit = (event) => {
  event.preventDefault();
  const inputs = [...contactForm.querySelectorAll('input, textarea')];
  const results = inputs.map(validateField);

  if (results.includes(false)) {
    successMessage.classList.remove('show');
    inputs[results.indexOf(false)].focus();
    return;
  }

  successMessage.classList.add('show');
  contactForm.reset();
  setTimeout(() => successMessage.classList.remove('show'), 5000);
};

contactForm.addEventListener('submit', handleSubmit);

// re-check a field as soon as the user fixes it
contactForm.addEventListener('input', (event) => {
  if (event.target.parentElement.classList.contains('invalid')) validateField(event.target);
});
