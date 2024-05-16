const themeToggle = document.querySelector('.todo-app header img.available');

/*Load the saved theme from local storage*/
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.querySelector('.todo-app').classList.add(savedTheme);
}

themeToggle.addEventListener('click', function() {
    const todoApp = document.querySelector('.todo-app');
    todoApp.classList.toggle('dark');

    todoApp.style.transition = 'background-color 0.5s';

    if (todoApp.classList.contains('dark')) {
        todoApp.style.backgroundColor = 'var(--dt-very-dark-blue)';
        localStorage.setItem('theme', 'dark');
    } else {
        todoApp.style.backgroundColor = 'var(--lt-very-light-grayish-blue)';
        localStorage.setItem('theme', '');
    }

    /* Get the moon icon done: I am new to js anyway, just want to try out everything.*/
    const moonIcon = document.querySelector('.todo-app header img.available');

    moonIcon.style.transition = 'transform 0.5s, opacity 0.5s';
    moonIcon.style.transform = todoApp.classList.contains('dark') ? 'rotate(180deg)' : 'rotate(0deg)';
    moonIcon.style.opacity = '0';

    setTimeout(() => {
        moonIcon.src = todoApp.classList.contains('dark') ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
        moonIcon.style.opacity = '1';
    }, 500);
});