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
                useLayout: '/templates/layout.html',
                load: () => {
                    new Dashboard();
                },
            },
            {
                route: '/login',
                title: 'Авторизация',
                filePathTemplate: '/templates/login.html',
                useLayout: false,
                load: () => {
                    new Login(this.openNewRoute.bind(this));
                },
            },
            {
                route: '/sign-up',
                title: 'Регистрация',
                filePathTemplate: '/templates/sign-up.html',
                useLayout: false,
                load: () => {
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
        // Вызываем функцию по созданию нового роута вручную, в обход браузера
        document.addEventListener('click', this.clickHandler.bind(this));
    }

    async openNewRoute(url) {
        // Взяли старый URl
        const currentRoute = window.location.pathname;
        // В историю браузера вручную поменяли на новый URL
        history.pushState({}, '', url);
        await this.activateRoute(null, currentRoute);
    }

    async clickHandler(e) {
        // Проверка на ссылку
        let element = null;
        if (e.target.nodeName === 'A') {
            element = e.target;
        } else if (e.target.parentNode.nodeName === 'A') {
            element = e.target.parentNode;
        }

        // Выполнили проверку на то что если ссылка является пустой или # или javascript:void(0), то мы её не обрабатываем.
        if (element) {
            e.preventDefault();
            const url = element.href.replace(window.location.origin, '');
            if (!url || url === '/#' || url.startsWith('javascript:void(0)')) {
                return;
            }
            await this.openNewRoute(url);
        }
    }

    async activateRoute(e, oldRoute = null) {
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
                let contentBlock = this.contentPageElement;
                // Если в нашем новом роуте есть useLayout (шаблон layout)
                if (newRoute.useLayout) {
                    // Если есть, то подставляем layout на страницу
                    this.contentPageElement.innerHTML = await fetch(newRoute.useLayout).then(response => response.text());
                    // Нашли на странице layout нужный нам id, куда будет подставляться весь контент.
                    contentBlock = document.getElementById('contend-layout');
                    // Для Layout (пока не используется)
                    document.body.classList.add('sidebar-mini');
                    document.body.classList.add('layout-fixed');
                } else {
                    // Для Layout (пока не используется)
                    document.body.classList.remove('sidebar-mini');
                    document.body.classList.remove('layout-fixed');
                }
                // Если pathTemplate есть, но нет useLayout, то подставляем контент на нужную страницу без layout.
                contentBlock.innerHTML = await fetch(newRoute.filePathTemplate).then(response => response.text());
            }

            // Проверяем наличие cвойства load у newRoute, а так же проверяем что там имеется функция и файл не пустой.
            if (newRoute.load && typeof newRoute.load === 'function') {
                // Если всё есть, то вызываем функцию нужной странице.
                newRoute.load();
            }
        } else {
            console.log('Такая страница не найдена');
            // Переводим пользователя на страницу авторизации в случае если страница не найдена
            history.pushState({}, '', '/login');
            await this.activateRoute();
        }
    }
}