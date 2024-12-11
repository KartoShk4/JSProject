export class Login {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.rememberMeElement = document.getElementById('remember-me');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.login.bind(this));
    }

    validateForm() {
        let isValid = true;
        if (this.emailElement.value && this.emailElement.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }
        if (this.passwordElement.value) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }


    async login() {
        // Скрываем ошибку в начале авторизации
        this.commonErrorElement.style.display = 'none';
        // Выполняем запрос авторизации
        if (this.validateForm()) {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    rememberMe: this.rememberMeElement.checked
                })
            });
            const result = await response.json();

            if (!result.tokens?.accessToken || !result.tokens?.refreshToken || !result.user?.id || !result.user?.name || !result.user?.lastName) {
                this.commonErrorElement.style.display = 'block';
                return;
            }

            // Сохраняем данные в localStorage
            const userInfo = {
                id: result.user.id,
                name: result.user.name,
                lastName: result.user.lastName
            };

            // Повторно скрываем ошибку при успешной авторизации
            this.commonErrorElement.style.display = 'none';

            localStorage.setItem('accessToken', result.tokens.accessToken);
            localStorage.setItem('refreshToken', result.tokens.refreshToken);
            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // После успешной валидации и проверки, переводим пользователя на главную страницу.
            this.openNewRoute('/');
        }
    }
}