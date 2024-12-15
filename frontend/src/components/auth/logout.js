export class Logout {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        // Выполняем проверку на наличии токена, если его нет
        if (!localStorage.getItem('accessToken') || !localStorage.getItem('refreshToken')) {
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
        console.log(result);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userInfo');

        // Переводим пользователя на страницу авторизации.
        this.openNewRoute('/login');
    }
}