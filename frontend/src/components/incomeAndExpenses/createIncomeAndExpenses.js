import {HttpUtils} from "../../utils/http-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class CreateIncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Проверка авторизации
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return openNewRoute('/login');
        }

        // Получаем тип операции из URL
        const urlParams = new URLSearchParams(window.location.search);
        // Если параметр не найден
        this.operationType = urlParams.get("type") || "Неизвестный тип";

        // Вставляем название типа операции в name-input
        const nameInput = document.getElementById("name-input");
        if (nameInput) {
            // Автозаполнение
            nameInput.value = this.operationType;
        }

        // Вешаем обработчик на кнопку создания
        const buttonCreate = document.getElementById('button-create');
        if (buttonCreate) {
            buttonCreate.addEventListener('click', this.createOperations.bind(this));
        }

        // Получаем ссылки на инпуты
        this.sumInputElement = document.getElementById('sum-input');
        this.dateInputElement = document.getElementById('date-input');
        this.commentInputElement = document.getElementById('comments-input');
        this.categorySelectElement = document.getElementById('category-select')

        if (this.operationType === 'Доход') {
            // Категории доходов
            this.getIncomeCategories().then();
        } else if (this.operationType === 'Расход') {
            // Категории расходов
            this.getExpensesCategories().then();
        }
    }

    // Получение категорий доходов
    async getIncomeCategories() {
        const result = await HttpUtils.request('/categories/income');

        if (result.error) {
            console.warn('Ошибка при получении категорий доходов:', result);
            alert('Ошибка при запросе категорий доходов.');
            return;
        }
        // Заполняем select категориями доходов
        this.populateCategories(result.response);
    }

    // Получение категорий расходов
    async getExpensesCategories() {
        const result = await HttpUtils.request('/categories/expense');

        if (result.error) {
            console.warn('Ошибка при получении категорий расходов:', result);
            alert('Ошибка при запросе категорий расходов.');
            return;
        }

        // Заполняем select категориями расходов
        this.populateCategories(result.response);
    }

    populateCategories(categories) {
        if (!this.categorySelectElement) {
            return;
        }

        // Если категория пустая, не делаем ничего
        if (!categories || categories.length === 0) {
            console.warn('Нет категорий для добавления.');
            return;
        }

        categories.forEach(category => {
            // Создаем новый option для категории
            const option = document.createElement('option');
            // id категории как значение
            option.value = category.id;
            // Название категории как текст
            option.textContent = category.title;
            // Добавляем option в select
            this.categorySelectElement.appendChild(option);
        });
    }


    validateForm() {
        let isValid = true;
        let textInputArray = [this.sumInputElement];

        for (let i = 0; i < textInputArray.length; i++) {
            if (textInputArray[i].value) {
                textInputArray[i].classList.remove('is-invalid');
            } else {
                textInputArray[i].classList.add('is-invalid');
                isValid = false;
            }
        }
        return isValid;
    }

    async createOperations(e) {
        e.preventDefault();

        if (this.validateForm()) {
            const result = await HttpUtils.request('/operations', 'POST', true, {
                type: this.operationType,
                amount: this.sumInputElement.value,
                // date: this.dateInputElement.value,
                comment: this.commentInputElement.value,
                categoryId: this.categorySelectElement.value
            });

            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            if (result.error || !result.response || (result.response && result.response.error)) {
                console.warn('Ошибка при создании операции', result);
                alert('Ошибка! Обратитесь в поддержку.');
            }

            return this.openNewRoute('/income-and-expenses');
        }
    }
}




