import {HttpUtils} from "../../utils/http-utils";

export class IncomeDelete {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Метод для извлечения ID из URL
        const urlParams = new URLSearchParams(window.location.search);

        const id = urlParams.get('id');
        if (!id) {
            return this.openNewRoute('/income');
        }
        this.incomeDelete(id).then();
    }

    async incomeDelete(id) {
        const result = await HttpUtils.request('/categories/income/' + id, 'DELETE', true);
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }
        // Проверяем наличие ошибки и выводим сообщение
        if (result.error) {
            console.error('Ошибка при удалении категорий доходов:', result);
            return alert('Возникла ошибка при удалении категорий доходов. Пожалуйста, обратитесь в поддержку!');
        }

        return this.openNewRoute('/income');
    }
}