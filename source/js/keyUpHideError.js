'use strict'

const modalWindows = document.body.querySelectorAll('.modal');
import { Methods } from './methods.js';

let methods = new Methods();

for (let i = 0; i < modalWindows.length; i++) {
    modalWindows[i].addEventListener ('keyup', event => {
        // removes error message when user starts to type into the input
        if (event.target.classList.contains('modal__title--input')
            || event.target.classList.contains('modal__description--input')) {
            methods.hideErrorMessage(event.target)
        }
    });
}
