import {AuthUtils} from "../../utils/auth-utils";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Выполняем проверку на наличии токена, если его нет
        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            // Переводим пользователя на главную страницу
            return openNewRoute('/login');
        }

        this.logout().then();
    }

    async logout() {
        // Выполняем запрос авторизации
        const response = await fetch('http://localhost:3000/api/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken'),
            })
        });

        // Получаем токены из ответа
        const result = await response.json();

        // Удаляем токены при выходе из учетной записи
        AuthUtils.removeAuthInfo();

        // Переводим пользователя на страницу авторизации.
        this.openNewRoute('/login');
    }
}