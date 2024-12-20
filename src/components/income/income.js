import { HttpUtils } from "../../utils/http-utils";

export class Income {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;
        // Вызываем getIncomeCategories() внутри конструктора
        this.getIncomeCategories().then();
    }

    // Получение категорий доходов
    async getIncomeCategories() {
        const result = await HttpUtils.request('/categories/income');

        // Если в ответе есть редирект, вызываем openNewRoute
        if (result.redirect) {
            return this.openNewRoute(result.redirect);
        }

        // Проверяем наличие ошибки и выводим сообщение
        if (result.error) {
            console.error('Ошибка при получении категорий доходов:', result);
            alert('Возникла ошибка при запросе категорий доходов. Пожалуйста, обратитесь в поддержку!');
            return;
        }

        // Проверка, что ответ не пустой
        if (!result.response || result.response.length === 0) {
            console.warn('Получен пустой массив категорий доходов');
            alert('Нет данных для категорий доходов');
            return;
        }

        // Печатаем полученные данные
        console.log('Категории доходов:', result.response);

        // Отображаем полученные данные
        this.showRecords(result.response);
    }

    // Отображение данных
    showRecords(records) {
        console.log(records);

    }
}
