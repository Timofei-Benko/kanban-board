'use strict'

import { variables } from "./variables.js";
import { Methods } from './methods.js';
let methods = new Methods;

const   editCardModal = document.body.querySelector('#edit-card-modal'),
        addCardModal = document.body.querySelector('#add-card-modal'),
        modalWindows = document.body.querySelectorAll('.modal'),
        cardsContainers = document.body.querySelectorAll('.board__cards-container'),
        addCardBtn = document.body.querySelector('.board__add-new-btn'),
        columns = document.body.querySelectorAll('.board__column'),
        lastColumn = columns[columns.length - 1].dataset.column;

// Open modal window

addCardBtn.addEventListener('click', () => methods.toggle(addCardModal))

for (let i = 0; i < cardsContainers.length; i++) {
    cardsContainers[i].addEventListener('click', event => {
        let column = event.target.closest('div[data-column]').dataset.column
        if (event.target.classList.contains('board__card-remove-btn') ||
            event.target.closest('.board__card-remove-btn') ||
            event.target.classList.contains('board__card-move-btn') ||
            event.target.closest('.board__card-move-btn')) {
            return
        } else if (event.target.classList.contains('.board__card') ||
            event.target.closest('.board__card')) {

            if (column === lastColumn) {
                variables.titleEM.classList.remove('modal__element-hover');
                variables.descriptionEM.classList.remove('modal__element-hover');
            } else if (column !== lastColumn &&
                       !variables.titleEM.classList.contains('modal__element-hover') ||
                       !variables.descriptionEM.classList.contains('modal__element-hover')){
                variables.titleEM.classList.add('modal__element-hover');
                variables.descriptionEM.classList.add('modal__element-hover')

            }

            let card = event.target.closest('.board__card'),
                cardId = card.dataset.card_id,
                cardObject = methods.getCardFromLocalStorage(column, cardId);

            variables.editModal.dataset.edit_card_id = card.dataset.card_id

            variables.titleEM.innerHTML = cardObject.title;
            variables.descriptionEM.innerHTML = cardObject.description;

            methods.toggle(editCardModal);
        }
    })
}

// Close modal window

for (let i = 0; i < modalWindows.length; i++) {
    let titleInput = modalWindows[i].querySelector('input[data-input_type="title"]'),
        descriptionInput = modalWindows[i].querySelector('textarea[data-input_type="description"]');

    modalWindows[i].addEventListener('click', event => {
        if (event.target.classList.contains('modal__header-close-btn')) {
            methods.toggle(modalWindows[i]);


            setTimeout(() => {

                if (modalWindows[i].id === 'edit-card-modal') {
                    if (modalWindows[i].querySelector('.modal__title--input').classList.contains('active')) {
                        methods.toggleEdit('title');
                    } else if (modalWindows[i].querySelector('.modal__description--input').classList.contains('active')) {
                        methods.toggleEdit('description');
                    }
                }

                methods.clearInput(modalWindows[i]);
                methods.hideErrorMessage(titleInput, descriptionInput);
            }, 500); // timeout is needed so that all the things altering the DOM
                             // weren't visible while the window fades away
        }
    })
}



