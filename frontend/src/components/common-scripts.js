import {HttpUtils} from "../utils/http-utils";

export class CommonScripts {
    constructor() {
        // Устанавливаем имя пользователя на странице.
        this.setUserName();
        // Функционал отвечающий за поворот стрелки
        this.rotateArrow();
        // Получили баланс
        this.getBalanceUser().then();
        // Устанавливаем баланс по кнопке "Сохранить"
        this.balanceBtnFunction()
    }

    // Устанавливаем баланс по кнопке "Сохранить"
    balanceBtnFunction() {
        document.getElementById('btn-balance-save').addEventListener('click', () => {
            const balanceInput = document.getElementById('balance-input');
            // Проверяем есть ли какой-либо баланс, если нет то устанавливаем его на ноль, так же если строка пустая.
            const newBalance = balanceInput && balanceInput.value.trim() !== '' ? parseFloat(balanceInput.value) : 0;
            // Обновляем баланс
            this.setBalanceUser(newBalance).then();
        });
    }

    // Функционал обновления баланса
    async setBalanceUser(newBalance) {
        // Делаем запрос на сервер
        const result = await HttpUtils.request('/balance', 'PUT', true, {newBalance});
        // Делаем запрос на сервер
        if (!result || result.error) {
            console.warn('Не удалось обновить баланс!');
            return false;
        }
        // Делаем запрос на получение баланса, если выше ошибок нет
        await this.getBalanceUser();
        return true;
    }

    // Функционал получения баланса
    async getBalanceUser() {
        // Делаем запрос на сервер
        const result = await HttpUtils.request('/balance', 'GET', true);
        // Делаем запрос на сервер
        if (result && result.response && result.response.balance !== undefined) {
            // Делаем запрос на установку баланса на странице, если выше ошибок нет
            this.updateBalanceForPage(result.response.balance);
        }
    }

    // Установка баланса на странице
    updateBalanceForPage(balance) {
        const balanceElement = document.getElementById('balance');
        // делаем проверку на наличие id 'balance' на странице
        if (!balanceElement) {
            console.warn('Элемент с id="balance" не найден!');
            return;
        }
        // Если выше ошибок нет, то показываем актуальный баланс
        balanceElement.textContent = `${balance}$`;
    }

    // Устанавливаем имя пользователя на странице
    setUserName() {
        const userNameForLocalStorage = localStorage.getItem('userInfo');
        const userNamePageElement = document.getElementById('user-name');
        // Выполняем проверку на то что в LocalStorage есть userInfo
        if (userNameForLocalStorage) {
            const userName = JSON.parse(userNameForLocalStorage);
            // После парсинга, если ошибок нет, устанавливаем тия пользователя на страницу.
            userNamePageElement.textContent = userName.name;
        } else {
            console.warn('Ошибка при получении имени пользователя!');
        }
    }

    // Функционал поворота стрелочки
    rotateArrow() {
        document.addEventListener('click', (event) => {
            const dropdownToggle = event.target.closest('#btn-action');
            if (dropdownToggle) {
                const chevronIcon = dropdownToggle.querySelector('#fa-chevron-right');
                // Выполняем проверку на наличие стрелочки на станице (FontAwesome)
                if (chevronIcon) {
                    // Устанавливаем класс
                    chevronIcon.classList.toggle('rotate');
                }
            }
        });
    }
}
