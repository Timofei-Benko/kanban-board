'use strict'

import { variables } from "./variables.js";
import  { Methods } from "./methods.js";

let methods = new Methods();

const   board = document.body.querySelector('.board'),
        columns = Array.from(document.body.querySelectorAll('.board__cards-container'));

board.addEventListener('click', event => {
    if (event.target.classList.contains('.board__card-move-btn-icon')
        || event.target.closest('.board__card-move-btn-icon')) {
        let  cardUI = event.target.closest('.board__card'),
             cardId = cardUI.dataset.card_id,
             columnString = cardUI.parentElement.dataset.column,
             card = methods.getCardFromLocalStorage(columnString, cardId);

        let nextColumn;

        for (let i = 0; i < columns.length; i++) {
            if (columnString === columns[i].dataset.column) {
                columns.indexOf(columns[i]) === columns.length - 1 ?
                nextColumn = columns[0] :
                nextColumn = columns[columns.indexOf(columns[i]) + 1];
            }
        }

        nextColumn.innerHTML += variables.getCard(card);
        methods.clampText();
        cardUI.remove();
        methods.putInLocalStorage(card, nextColumn.dataset.column);
        methods.removeFromLocalStorage(columnString, cardId);
    }
})

