import {HttpUtils} from "../../utils/http-utils";
import {AuthUtils} from "../../utils/auth-utils";

export class CreateIncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Выполняем проверку на наличии токена, если его нет
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            // Переводим пользователя на главную страницу
            return openNewRoute('/login');
        }

        document.getElementById('button-create').addEventListener('click', this.createOperations.bind(this));

        this.nameInputElement = document.getElementById('name-input');
        this.categoryInputElement = document.getElementById('category-input');
        this.sumInputElement = document.getElementById('sum-input');
        this.dateInputElement = document.getElementById('date-input');
        this.commentInputElement = document.getElementById('comments-input');
    }

    validateForm() {
        let isValid = true;
        let textInputArray = [this.nameInputElement, this.categoryInputElement, this.sumInputElement, this.dateInputElement];

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
                type: this.nameInputElement.value,
                amount: this.sumInputElement.value,
                date: this.dateInputElement.value,
                comment: this.commentInputElement.value,
            });
            if (result.redirect) {
                return this.openNewRoute(result.redirect);
            }

            // Проверяем наличие ошибки и выводим сообщение
            if (result.error || !result.response || (result.response && result.response.error)) {
                console.warn('Ошибка при создании операции', result);
                alert('Возникла ошибка. Пожалуйста, обратитесь в поддержку!');
            }
            return this.openNewRoute('/income-and-expenses');
        }
    }
}