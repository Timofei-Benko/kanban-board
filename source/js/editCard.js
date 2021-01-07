'use strict'

import { Methods } from "./methods.js";
import { variables } from "./variables.js";

let methods = new Methods();

const   saveTitleBtn = document.body.querySelector('.modal__save-title-btn'),
        discardTitleBtn = document.body.querySelector('.modal__discard-title-btn');

let     currentTitleValue,
        currentDescriptionValue,
        newTitleValue,
        newDescriptionValue;

variables.editModal.addEventListener('dblclick', event => {
    if (event.target.classList.contains('modal__title--activate-input') &&
        !variables.descriptionInputEM.classList.contains('active')) {
        methods.toggleEdit('title');

        currentTitleValue = variables.titleEM.innerHTML;
        variables.titleInputEM.value = currentTitleValue;

    } else if (event.target.classList.contains('modal__description--activate-input') &&
               !variables.titleInputEM.classList.contains('active')) {
        methods.toggleEdit('description');

        currentDescriptionValue = variables.descriptionEM.innerHTML;
        variables.descriptionInputEM.value = currentDescriptionValue;
    }
});

variables.editModal.addEventListener('click', event => {
    let cardId = variables.editModal.dataset.edit_card_id,
        card = document.body.querySelector(`div[data-card_id="${cardId}"]`),
        column = card.closest('div[data-column]').dataset.column,
        cardTitleUI = card.querySelector('.board__card-title'),
        cardDescriptionUI = card.querySelector('.board__card-copy');

    if (event.target.classList.contains('modal__save-title-btn') ||
        event.target.closest('.modal__save-title-btn')) {
        if(!methods.checkIfEmpty(variables.titleInputEM)) {
            variables.titleEM.innerHTML = variables.titleInputEM.value;

            methods.updateLocalStorage(column, cardId, 'title', variables.titleInputEM.value);
            cardTitleUI.innerHTML = variables.titleInputEM.value;
            methods.toggleEdit('title');
        }
    }

    if (event.target.classList.contains('modal__discard-title-btn') ||
        event.target.closest('.modal__discard-title-btn')) {
        variables.titleEM.innerHTML = currentTitleValue;
        methods.toggleEdit('title')
    }

    if (event.target.classList.contains('modal__description-save-btn') ||
        event.target.closest('.modal__description-save-btn')) {
        if(!methods.checkIfEmpty(variables.descriptionInputEM)) {
            variables.descriptionEM.innerHTML = variables.descriptionInputEM.value;

            methods.updateLocalStorage(column, cardId, 'description', variables.descriptionInputEM.value);
            cardDescriptionUI.innerHTML = variables.descriptionInputEM.value;
            methods.toggleEdit('description');
        }
    }

    if (event.target.classList.contains('modal__description-discard-btn') ||
        event.target.closest('.modal__description-discard-btn')) {
        variables.descriptionEM.innerHTML = currentDescriptionValue;
        methods.toggleEdit('description')
    }
});
