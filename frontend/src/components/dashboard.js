import {createPopper} from "@popperjs/core";
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';

export class Dashboard {
    constructor() {
        console.log('DASHBOARD');
        // Вынесли функцию вызова tooltip из конструктора
        this.tooltip();

        // Регистрация контроллеров и элементов диаграммы
        Chart.register(PieController, ArcElement, Tooltip, Legend);

        const myChartIncomeCanvas = document.getElementById('myChartIncome').getContext('2d');
        const myChartExpensesCanvas = document.getElementById('myChartExpenses').getContext('2d');

        const myChartIncome = new Chart(myChartIncomeCanvas, {
            type: 'pie', // Тип диаграммы (круговая)
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                datasets: [{
                    // label: '# of Votes',
                    data: [300, 50, 100, 20, 80],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(0, 255, 0)',
                        'rgb(255, 165, 0)',
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
        const myChartExpenses = new Chart(myChartExpensesCanvas, {
            type: 'pie', // Тип диаграммы (круговая)
            data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Orange'],
                datasets: [{
                    // label: '# of Votes',
                    data: [20, 50, 90, 92, 80],
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 205, 86)',
                        'rgb(0, 255, 0)',
                        'rgb(255, 165, 0)',
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        enabled: true
                    }
                }
            }
        });
    }


    tooltip() {
        const button = document.querySelector('#button');
        const tooltipElement = document.querySelector('#tooltip');

        if (button && tooltipElement) {
            // Инициализируем тултип Bootstrap
            new Tooltip(button, {
                title: 'Tooltip content', // Текст тултипа
                placement: 'bottom',         // Расположение тултипа
            });

            // Инициализируем Popper.js для дополнительной настройки, если нужно
            this.initPopper(button, tooltipElement);
        }
    }

    initPopper(button, tooltipElement) {
        const popperInstance = createPopper(button, tooltipElement, {
            placement: 'top',
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 8],
                    },
                },
            ],
        });

        // Показываем тултип
        button.addEventListener('mouseenter', () => {
            tooltipElement.setAttribute('data-show', '');
            popperInstance.update(); // Обновляем позицию
        });

        // Скрываем тултип
        button.addEventListener('mouseleave', () => {
            tooltipElement.removeAttribute('data-show');
        });
    }
}
