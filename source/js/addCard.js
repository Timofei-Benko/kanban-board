'use strict'

// Variables

import { variables } from './variables.js';

const addCardBtn = document.body.querySelector('.board__add-new-btn'),
      toDoColumn = document.body.querySelector('div[data-column="toDo"]'),
      modal = document.body.querySelector('.add-card-modal'),
      titleInput = document.body.querySelector('.add-card-modal__title-input'),    
      descriptionInput = document.body.querySelector('.add-card-modal__description-input');


// Functions

let showErrorMessage = input => input.nextElementSibling.classList.add('active')
let hideErrorMessage = input => input.nextElementSibling.classList.remove('active')

import { Methods } from './methods.js'

let methods = new Methods

// Listeners

// opens the modal window
addCardBtn.addEventListener('click', () => methods.toggle(modal))

// listens to events in modal window
modal.addEventListener('click', event => {
    if (event.target.classList.contains('add-card-modal__close-btn')) {
        methods.toggle(modal) // closes the modal

        setTimeout(() => {
            methods.clearInput(modal) 
        }, 500); // clears inputs so that there are no previously entered values
                         // timeout is needed so that the clearing of values weren't visible during window fade out
    }

    if (event.target.classList.contains('add-card-modal__save-btn')) { // makes the necessary checks, shows error if empty, else adds a card
        if (methods.checkIfEmpty(titleInput, descriptionInput)) {
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
    }
});

modal.addEventListener ('keyup', event => { // removes error message when user starts to type into the input
    if (event.target.classList.contains('add-card-modal__title-input')
    || event.target.classList.contains('add-card-modal__description-input')) {
        methods.hideErrorMessage(event.target)
    }
});
