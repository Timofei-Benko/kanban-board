'use strict'

import { Methods } from './methods.js';
let methods = new Methods;

const clearBtn = document.body.querySelector('.board__clear-btn svg');
let cards = document.body.querySelector('div[data-column="toDo"]');

clearBtn.addEventListener('click', () => {
    methods.deleteAllCards('toDo');
});

cards.addEventListener ('click', event => {
    if(event.target.classList.contains('board__card-remove-btn')
    || event.target.closest('.board__card-remove-btn')) {
        let card = event.target.closest('.board__card');
        methods.deleteCard(card);
    };
});
