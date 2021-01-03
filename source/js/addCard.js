'use strict'

// Variables

import { variables } from './variables.js';

const toDoColumn = document.body.querySelector('div[data-column="toDo"]'),
      modal = document.body.querySelector('#add-card-modal'),
      saveBtn = modal.querySelector('.modal__save-btn'),
      titleInput = modal.querySelector('#add-card-modal input[data-input_type="title"]'),
      descriptionInput = modal.querySelector('#add-card-modal textarea[data-input_type="description"]');


// Methods

import { Methods } from './methods.js';
let methods = new Methods;

// Card creation functionality

saveBtn.addEventListener('click', event => {
        if (methods.checkIfEmpty(titleInput, descriptionInput)) {
            return
        } else {
            let cardObject = {
                id: methods.generateID(),
                title: titleInput.value,
                description: descriptionInput.value,
                date: methods.getDate(),
            }

            methods.putInLocalStorage(cardObject, 'toDo');
            toDoColumn.innerHTML += variables.getCard(cardObject);
            setTimeout(() => methods.clearInput(modal), 500);
            methods.countCards();
            methods.clampText();
            methods.toggle(modal);
        }
});


