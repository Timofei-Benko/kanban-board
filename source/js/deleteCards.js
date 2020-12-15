'use strict'

const clearBtn = document.body.querySelector('.board__clear-btn');
let cards = document.body.querySelector('.board__to-do-cards-container');

import { Methods } from './methods.js';

let methods = new Methods;

clearBtn.addEventListener('click', () => {
    methods.deleteAllCards();
});

cards.addEventListener ('click', event => {
    if(event.target.classList.contains('board__card-remove-btn')
    || event.target.closest('.board__card-remove-btn')) {
        let card = event.target.closest('.board__card');
        methods.deleteCard(card);
    }
});
