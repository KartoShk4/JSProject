export class SignUp {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute;

        this.fullNameElement = document.getElementById('full-name');
        this.emailElement = document.getElementById('email');
        this.passwordElement = document.getElementById('password');
        this.passwordRepeatElement = document.getElementById('password-repeat');
        this.commonErrorElement = document.getElementById('common-error');

        document.getElementById('process-button').addEventListener('click', this.signUp.bind(this));
    }

    validateForm() {
        // Устанавливаем флаг, форма валидна изначально
        let isValid = true;

        // Проверяем поле ФИО не пустое
        if (this.fullNameElement.value) {
            // Если заполнено поле, удаляем класс
            this.fullNameElement.classList.remove('is-invalid');
        } else {
            // Если пустое, до добавляем класс
            this.fullNameElement.classList.add('is-invalid');
            // Если поле пустое, то меняем флаг
            isValid = false;
        }

        // Проверяем поле e-mail на регулярку
        if (this.emailElement.value && this.emailElement.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            this.emailElement.classList.remove('is-invalid');
        } else {
            this.emailElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordElement.value && this.passwordElement.value.match(/^(?=.*[A-Z])(?=.*\d).{8,}$/)) {
            this.passwordElement.classList.remove('is-invalid');
        } else {
            this.passwordElement.classList.add('is-invalid');
            isValid = false;
        }

        if (this.passwordRepeatElement.value && this.passwordRepeatElement.value === this.passwordElement.value) {
            this.passwordRepeatElement.classList.remove('is-invalid');
        } else {
            this.passwordRepeatElement.classList.add('is-invalid');
            isValid = false;
        }
        return isValid;
    }

    async signUp() {
        // Скрываем ошибку в начале авторизации
        this.commonErrorElement.style.display = 'none';
        // Выполняем запрос авторизации
        if (this.validateForm()) {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: this.fullNameElement.value.split(' ')[0],
                    lastName: this.fullNameElement.value.split(' ')[1],
                    email: this.emailElement.value,
                    password: this.passwordElement.value,
                    passwordRepeat: this.passwordRepeatElement.value,
                })
            });

            const result = await response.json();
            console.log(result);

            if (result.error || !result.id || !result.name) {
                this.commonErrorElement.style.display = 'block';
            }

            // Сохраняем данные в localStorage
            const userInfo = {id: result.user.id, email: result.user.email, name: result.user.name, lastName: result.user.lastName
            };

            // Повторно скрываем ошибку при успешной авторизации
            this.commonErrorElement.style.display = 'none';

            localStorage.setItem('userInfo', JSON.stringify(userInfo));

            // После успешной валидации и проверки, переводим пользователя на главную страницу.
            this.openNewRoute('/login');
        }
    }

}