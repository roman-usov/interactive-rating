const ratingFormEl = document.querySelector('.rating-form');
const thankYouEl = document.querySelector('.thank-you-content');
const ratingSubmitContainerEl = document.querySelector(
  '.rate-submit-container'
);
const ratingButtonEls = document.querySelectorAll('.rate-btn');
const selectedRatingEl = document.querySelector('.score');

ratingSubmitContainerEl.addEventListener('click', (e) => {
  const button = e.target;

  if (!button) {
    return;
  }

  if (button.matches('.rate-btn')) {
    ratingButtonEls.forEach((btn) => {
      btn.dataset.rating = '';
    });
    button.dataset.rating = button.value;
  }
});

ratingFormEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const selectedRating = [...ratingButtonEls].find(
    (btn) => btn.dataset.rating !== ''
  );

  if (!selectedRating) {
    return;
  }

  selectedRatingEl.textContent = selectedRating.dataset.rating;

  ratingFormEl.addEventListener(
    'transitionend',
    (ev) => {
      ev.preventDefault();

      ratingFormEl.classList.add('hidden');
      thankYouEl.classList.remove('hidden');
      thankYouEl.classList.add('fade-in');
    },
    {
      capture: false,
      once: true,
    }
  );

  ratingFormEl.classList.add('fade-out');
});
