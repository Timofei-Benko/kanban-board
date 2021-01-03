'use strict'

import { Methods } from './methods.js';
let methods = new Methods;

const   editCardModal = document.body.querySelector('#edit-card-modal'),
        addCardModal = document.body.querySelector('#add-card-modal'),
        modalWindows = document.body.querySelectorAll('.modal'),
        cards = document.body.querySelectorAll('.board__cards-container'),
        addCardBtn = document.body.querySelector('.board__add-new-btn');

// Show modal window

addCardBtn.addEventListener('click', () => methods.toggle(addCardModal))

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', event => {
        if (event.target.classList.contains('board__card-remove-btn-icon') ||
            event.target.closest('.board__card-remove-btn-icon') ||
            event.target.classList.contains('board__card-move-btn-icon' ||
            event.target.closest('.board__card-move-btn-icon'))) {
            return
        } else if (event.target.classList.contains('.board__card') ||
            event.target.closest('.board__card')) {
            methods.toggle(editCardModal);
        }
    })
}

// Close modal window

for (let i = 0; i < modalWindows.length; i++) {
    let titleInput = modalWindows[i].querySelector('input[data-input_type="title"]'),
        descriptionInput = modalWindows[i].querySelector('textarea[data-input_type="description"]');

    modalWindows[i].addEventListener('click', event => {
        if (event.target.classList.contains('modal__close-btn')) {
            methods.toggle(modalWindows[i]);

            setTimeout(() => {
                methods.clearInput(modalWindows[i]);
                methods.hideErrorMessage(titleInput, descriptionInput);
            }, 500); // timeout is needed so that the clearing of values weren't visible while the window
                             // fades away
        }
    })
}



