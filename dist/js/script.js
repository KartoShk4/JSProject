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
    });
}