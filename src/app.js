import "./styles/styles.scss";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'air-datepicker/air-datepicker.css';


import {Router} from "./router";

class App {
    constructor() {
        new Router();
    }
}

(new App());
