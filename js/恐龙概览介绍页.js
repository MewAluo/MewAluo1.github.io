const toggleButton = document.getElementById('toggleSideWindow');
const sideWindow = document.getElementById('sideWindow');
const listItems = sideWindow.querySelectorAll('li');

toggleButton.addEventListener('click', () => {
    sideWindow.classList.toggle('active');
});

listItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetId = item.dataset.target;
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            sideWindow.classList.remove('active');
        }
    });
});