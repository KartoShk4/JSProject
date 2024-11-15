'use strict'

// Нашли кнопку и иконку на странице
const dropdownToggle = document.querySelector('.btn-toggle');
const chevronIcon = dropdownToggle.querySelector('.fa-chevron-right');
const btnToggle = document.getElementById('btn-toggle');

// Создали функцию, которая при нажатии на кнопку будет использовать стиль CSS и поворачивать стрелочку
dropdownToggle.addEventListener('click', () => {
    chevronIcon.classList.toggle('rotate');
});