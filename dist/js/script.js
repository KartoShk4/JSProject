// Функционал отвечающий за поворот стрелки
document.addEventListener('click', (event) => {
    // Проверяем, кликнули ли по кнопке
    const dropdownToggle = event.target.closest('#btn-action');
    if (dropdownToggle) {
        const chevronIcon = dropdownToggle.querySelector('#fa-chevron-right');
        if (chevronIcon) {
            // Поворачиваем стрелку
            chevronIcon.classList.toggle('rotate');
        }
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateUsername();
    });
} else {
    updateUsername();
}

function updateUsername() {
    const userNameElement = document.getElementById('username');
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userNameElement && userInfo && userInfo.name) {
        userNameElement.textContent = userInfo.name;
    } else {
        console.error('Элемент "username" или данные пользователя отсутствуют.');
    }
}
updateUsername();