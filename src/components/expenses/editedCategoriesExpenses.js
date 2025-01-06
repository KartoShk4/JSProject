import { HttpUtils } from "../../utils/http-utils";

export class EditedCategoriesExpenses {
    constructor(openNewRoute) {
        this.openNewRoute = openNewRoute; // Получаем функцию редиректа

        this.inputEdited = document.getElementById('input-edited');
        this.btnEdited = document.getElementById('btn-edited');
        this.btnEdited.addEventListener('click', () => this.editedExpensesCategories());
    }

    // Метод для извлечения ID из URL
    getCategoryIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id'); // Извлекаем значение параметра id
    }

    // Редактирование категории доходов
    async editedExpensesCategories() {
        const categoryId = this.getCategoryIdFromUrl(); // Получаем ID из URL
        if (!categoryId) {
            alert('Не удалось получить ID категории.');
            return;
        }

        // Убираем лишние пробелы из названия
        const newCategoryTitle = this.inputEdited.value.trim();

        // Если поле ввода пустое, выводим предупреждение
        if (!newCategoryTitle) {
            alert('Пожалуйста, введите новое название категории!');
            return;
        }

        // Отправляем запрос на сервер с новым названием категории
        const result = await HttpUtils.request(`/categories/expense/${categoryId}`, 'PUT', true, { title: newCategoryTitle });

        // Проверка на ошибку запроса
        if (result.error) {
            console.error('Ошибка при попытке редактировать категорию расходов:', result);
            alert('Возникла ошибка при редактировании категорий расходов. Пожалуйста, обратитесь в поддержку!');
            return;
        }

        // Обработка редиректа, если он присутствует в ответе
        if (result.redirect) {
            return this.openNewRoute(result.redirect); // Используем переданную функцию для редиректа
        }

        // Если всё прошло успешно, переводим пользователя на страницу доходов
        this.openNewRoute('/expenses'); // Перенаправляем на страницу с доходами
    }
}
