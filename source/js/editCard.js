'use strict'

import { Methods } from "./methods.js";
import { variables } from "./variables.js";

let methods = new Methods();

let currentTitleValue,
    currentDescriptionValue;

variables.editModal.addEventListener('click', event => {

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

variables.editModal.addEventListener('dblclick', event => {
    let     cardId = variables.editModal.dataset.edit_card_id,
            card = document.body.querySelector(`div[data-card_id="${cardId}"]`),
            column = card.closest('div[data-column]').dataset.column;

    const   board = document.body.querySelector('.board__column-container');
    const   lastColumn = board.children[board.children.length - 1].dataset.column;

    if (column === lastColumn) {
        // TODO:
        //  - figure out how to remove hover class in done
        variables.titleEM.classList.remove('.modal__element-hover');
        return
    }

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
