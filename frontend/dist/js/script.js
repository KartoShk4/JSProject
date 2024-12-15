function setupDropdown() {
    const dropdownToggle = document.getElementById('btn-action'); // Ищем кнопку
    const chevronIcon = document.getElementById('fa-chevron-right'); // Ищем иконку

    // Проверяем существование элементов
    if (dropdownToggle && chevronIcon) {
        dropdownToggle.addEventListener('click', () => {
            chevronIcon.classList.toggle('rotate');
            dropdownToggle.classList.toggle('border-radius-bottom');
        });
    } else {
        console.error('Элементы не найдены при рендере.');
    }
}

// Вызывайте эту функцию сразу после вставки HTML кнопки в DOM
setupDropdown();
