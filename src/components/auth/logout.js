import {AuthUtils} from "../../utils/auth-utils";
import {HttpUtils} from "../../utils/http-utils";

export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Выполняем проверку на наличии токена, если он есть
        if (AuthUtils.getAuthInfo(AuthUtils.accessTokenKey)) {
            // Переводим пользователя на главную страницу
            return openNewRoute('/');
        }

        this.logout().then();
    }

    async logout() {
        // Выполняем запрос авторизации
        await HttpUtils.request('/logout', 'POST', false , {
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)
        });

        // Удаляем токены при выходе из учетной записи
        AuthUtils.removeAuthInfo();

        // Переводим пользователя на страницу авторизации.
        this.openNewRoute('/login');
    }
}