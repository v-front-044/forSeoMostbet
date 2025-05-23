const questions = document.querySelectorAll('.faq__question');

questions.forEach((btn) => {
   btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      questions.forEach((otherBtn) => {
         otherBtn.setAttribute('aria-expanded', 'false');
         otherBtn.parentElement.querySelector('.faq__answer').classList.remove('faq__answer--visible');
      });

      if (!expanded) {
         btn.setAttribute('aria-expanded', 'true');
         btn.parentElement.querySelector('.faq__answer').classList.add('faq__answer--visible');
      }
   });
});

