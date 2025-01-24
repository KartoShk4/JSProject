import { HttpUtils } from "../../utils/http-utils";
import { AuthUtils } from "../../utils/auth-utils";

export class IncomeAndExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Проверка наличия токенов
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            return openNewRoute('/login');
        }

        // Получаем ссылки на кнопки создания операций
        this.btnCreateIncome = document.getElementById('btn-create-income');
        this.btnCreateExpenses = document.getElementById('btn-create-expenses');

        if (this.btnCreateIncome) {
            this.btnCreateIncome.addEventListener('click', () => this.handleCreateOperation('Доход'));
        } else {
            console.warn('Кнопка для создания дохода не найдена!');
        }

        if (this.btnCreateExpenses) {
            this.btnCreateExpenses.addEventListener('click', () => this.handleCreateOperation('Расход'));
        } else {
            console.warn('Кнопка для создания расхода не найдена!');
        }
    }

    handleCreateOperation(type) {
        // Переходим на страницу создания операции с параметром типа в URL
        this.openNewRoute(`/create-income-and-expenses?type=${type}`);
    }
}


