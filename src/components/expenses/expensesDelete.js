import {HttpUtils} from "../../utils/http-utils";

export class ExpensesDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Метод для извлечения ID из URL
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');
        if (!id) {
            return this.openNewRoute('/expenses');
        }
        this.expensesDelete(id).then();
    }

    async expensesDelete(id) {
        const result = await HttpUtils.request('/categories/expense/' + id, 'DELETE', true);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        // Проверяем наличие ошибки и выводим сообщение
        if (result.error) {
            console.error('Ошибка при удалении категорий расходов:', result);
            return alert('Возникла ошибка при удалении категорий расходов. Пожалуйста, обратитесь в поддержку!');
        }

        return this.openNewRoute('/expenses');
    }
}