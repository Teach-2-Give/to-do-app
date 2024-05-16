const themeToggle = document.querySelector('.todo-app header img.available');

themeToggle.addEventListener('click', function() {
    const todoApp = document.querySelector('.todo-app');
    todoApp.classList.toggle('dark');

    todoApp.style.transition = 'background-color 0.5s';

    if (todoApp.classList.contains('dark')) {
        todoApp.style.backgroundColor = 'var(--dt-very-dark-blue)';
    } else {
        todoApp.style.backgroundColor = 'var(--lt-very-light-grayish-blue)';
    }

    // Get the moon icon done: I am new to js anyway, just want to try out everything.
    const moonIcon = document.querySelector('.todo-app header img.available');

    moonIcon.style.transition = 'transform 0.5s, opacity 0.5s';
    moonIcon.style.transform = todoApp.classList.contains('dark') ? 'rotate(180deg)' : 'rotate(0deg)';
    moonIcon.style.opacity = '0';

    setTimeout(() => {
        moonIcon.src = todoApp.classList.contains('dark') ? 'images/icon-sun.svg' : 'images/icon-moon.svg';
        moonIcon.style.opacity = '1';
    }, 500);
});
