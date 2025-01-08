import {HttpUtils} from "../../utils/http-utils";

export class IncomeAndExpenses {
    constructor() {
        this.getOperations().then();
    }

    async getOperations() {
        const result = await HttpUtils.request('/operations', 'GET', true);

        // Делаем проверку на то, есть ли эти данные, если нет то выводим ошибку.
        if (result.error || !result.response || (result.response && result.response.error)) {
            return alert('Возникла ошибка при запросе. Обратитесь в поддержку');
        }

        this.showRecords(result.response)
    }

    showRecords(records) {
        console.log('Результат', records)
    }

}