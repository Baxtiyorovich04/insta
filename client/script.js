const form = document.getElementById('userForm');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value.trim();
  const surname = document.getElementById('surname').value.trim();

  try {
    const response = await fetch('http://localhost:3000/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, surname })
    });

    if (!response.ok) {
      throw new Error('Request failed');
    }

    alert('Данные успешно отправлены!');
    form.reset();
  } catch (error) {
    alert('Ошибка при отправке. Проверьте, что backend запущен.');
  }
});
