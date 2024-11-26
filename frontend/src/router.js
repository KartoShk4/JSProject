import {Dashboard} from "./components/dashboard";
import {Login} from "./components/login";
import {SignUp} from "./components/sign-up";

export class Router {
    constructor() {

        this.titlePageElement = document.getElementById('title')
        this.contentPageElement = document.getElementById('content')

        // Вызываем функцию, для удобства перенесли её из конструктора.
        this.initEvents();
        this.routes = [
            {
                route: '/',
                title: 'Главная',
                filePathTemplate: '/templates/dashboard.html',
                load:() => {
                    new Dashboard();
                },
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                load:() => {
                    new Login();
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-up.html',
                load:() => {
                    new SignUp();
                },
            },
        ];
    }

    initEvents() {
        // Отлавливаем момент, когда пользователь загрузил страницу
        window.addEventListener('DOMContentLoaded', this.activateRoute.bind(this));
        // Вызываем функцию когда поменялся URL
        window.addEventListener('popstate', this.activateRoute.bind(this));
    }

    async activateRoute() {
        // Получили адрес сайта после хоста
        const urlRoute = window.location.pathname;
        // Определили на какой именно странице находится пользователь
        const newRoute = this.routes.find(item => item.route === urlRoute);

        if (newRoute) {
            // Проверяем, есть ли у страницы 'title'
            if (newRoute.title) {
                // Если есть, то присваиваем странице нужный title
                this.titlePageElement.innerText = newRoute.title;
            }
            // Проверяем у newRoute есть pathTemplate
            if (newRoute.filePathTemplate) {
                // Если есть, то подставляем контент на нужную страницу.
                this.contentPageElement.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }
            // Проверяем наличие cвойства load у newRoute, а так же проверяем что там имеется функция и файл не пустой.
            if (newRoute.load && typeof newRoute.load === 'function') {
                // Если всё есть, то вызываем функцию нужной странице.
                newRoute.load();
            }
        } else {
            console.log('Такая страница не найдена');
            // Переводим пользователя на страницу авторизации в случае если страница не найдена
            return window.location = '/login';
        }
    }

}