'use strict'

import { variables } from "./variables.js";

export class Methods {

    toggle(...el) {
        el.forEach(el => {
            el.classList.toggle('active');
        })
    };

    getCards = (column) => document.body.querySelector(`div[data-column=${column}]`)
                                        .querySelectorAll('.board__card');

    countCards() {
        let columns = document.body.querySelectorAll('.board__cards-container[data-column]')

        for (let i = 0; i < columns.length; i++) {
            let cardNumber,
                cards = this.getCards(columns[i].dataset.column),
                counter = document.body.querySelector(`div[data-counter="${columns[i].dataset.column}"]`)

                cards ? cardNumber = cards.length : cardNumber = 0;
                counter.innerHTML = cardNumber;            
        }
    };

    deleteCard(card) {
        let column = event.target.closest('div[data-column]').dataset.column;
        this.removeFromLocalStorage(column, card.dataset.card_id);
        card.remove();
        this.countCards();
    };

    deleteAllCards(column) {
            let cards = this.getCards(column);

            for (let i = 0; i < cards.length; i++) {
                this.removeFromLocalStorage(column, cards[i].dataset.card_id);
            }

            let cardContainer = document.body.querySelector(`div[data-column=${column}]`);
            cardContainer.innerHTML = '';

        this.countCards();
    };

    clampText() {
        let cardBodies = document.body.querySelectorAll('.board__card-copy');
        for (let i = 0; i < cardBodies.length; i++) {
            $clamp(cardBodies[i], {clamp: 2})
        }
    };

    clearInput(modal) {
        if (modal) { // else browser will throw an error cause it is unable to run qs on null
            let inputs = [
                modal.querySelector('textarea[data-input_type="description"]'),
                modal.querySelector('input[data-input_type="title"]')
            ];
            inputs.forEach(input => input.value = '');
        }
    };

    getDate() {
        return new Date(Date.now()).toLocaleDateString();
    };

    generateID = () => `c_${Date.now()}`;

    putInLocalStorage(cardObject, column) {
        let storage = JSON.parse(localStorage.getItem(column));
        storage.push(cardObject);
            localStorage.setItem(column, JSON.stringify(storage));
    };

    updateLocalStorage(column, id, fieldToUpdate, value) {
        let storage = JSON.parse(localStorage.getItem(column));
        let card = storage.find(card => card.id === id);
        card[`${fieldToUpdate}`] = value;
        storage.splice(storage.indexOf(card), 1, card);
        localStorage.setItem(column, JSON.stringify(storage));
    }

    removeFromLocalStorage(column, id) {
        let storage = JSON.parse(localStorage.getItem(column));
        storage.forEach(card => {
            if (card.id === id) {
                storage.splice(storage.indexOf(card), 1);
            }
        })
        localStorage.setItem(column, JSON.stringify(storage));
    };

    getCardFromLocalStorage(column, id) {
        let storage = JSON.parse(localStorage.getItem(column));
        return storage.find(card => card.id === id)
    };

    showErrorMessage = (...inputs) => inputs.forEach((
            input => {
                let modal = input.parentElement,
                    inputType = input.dataset.input_type,
                    errorMessage = modal.querySelector(`span[data-input_type="${inputType}"]`);

                errorMessage.classList.add('active');
            }
        ));

    hideErrorMessage = (...inputs) => inputs.forEach((
            input => {
                let modal = input.parentElement,
                    inputType = input.dataset.input_type,
                    errorMessage = modal.querySelector(`span[data-input_type="${inputType}"]`);

                errorMessage.classList.remove('active');
            }
        ));

    checkIfEmpty(...inputs) {
        let isEmpty = false;
        inputs.forEach(input => {
            if (!input.value) {
                this.showErrorMessage(input)
                return isEmpty = true;
            }
        })
        return isEmpty
    };

    toggleEdit(...inputs) {
        inputs.forEach(input => {
            if (input === 'title') {
                this.toggle(
                    variables.titleEM,
                    variables.titleInputEM,
                    variables.saveTitleBtn,
                    variables.discardTitleBtn
                );
                variables.titleInputEM.focus();
            } else if (input === 'description') {
                this.toggle(
                    variables.descriptionEM,
                    variables.descriptionInputEM,
                    variables.saveDescriptionBtn,
                    variables.discardDescriptionBtn
                );
                variables.descriptionInputEM.focus()
            }
        })
    };
}

// TODO:
//  - figure out how to remove hover class in done
//  - carousel
//  - unify show/hide error message methods