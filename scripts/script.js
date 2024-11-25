'use strict'

// Нашли кнопку и иконку на странице
const dropdownToggle = document.querySelector('.btn-toggle');
const chevronIcon = dropdownToggle.querySelector('.fa-chevron-right');


// Функция при нажатии на кнопку будет использовать стиль CSS и поворачивать стрелочку
dropdownToggle.addEventListener('click', () => {
    chevronIcon.classList.toggle('rotate');
});

// Убираем border-radius-bottom при клике
dropdownToggle.addEventListener('click', () => {
    dropdownToggle.classList.toggle('border-radius-bottom')
})
