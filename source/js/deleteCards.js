'use strict'

import { Methods } from './methods.js';
let methods = new Methods;

const clearBtns = document.body.querySelectorAll('.board__header-clear-btn svg');
const cards = document.body.querySelectorAll('div[data-column]');

for (let i = 0; i < clearBtns.length; i++) {
    clearBtns[i].addEventListener('click', event => {
        let column = event.target.closest('button[data-column]').dataset.column;
        methods.deleteAllCards(column);
    })    
}

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener ('click', event => {
        if(event.target.closest('.board__card-remove-btn-icon')) {
            let card = event.target.closest('.board__card');
            methods.deleteCard(card);
        }
    });
}
