'use strict'

export class Methods {

    toggle(el) {
        el.classList.toggle('active');
    };

    getCards(column) {
        if (column === 'toDo') {
            let cards = document.body.querySelector('div[data-column="toDo"]')
                                     .querySelectorAll('.board__card');
            return cards
        } 
    }

    countCards() {
        let cards = document.body.querySelectorAll('div[data-card="card"]'),
            counterBlock = document.body.querySelector('.board__to-do-counter'),
            counter = cards.length;

        cards ? counter = cards.length : counter = 0;
        counterBlock.innerHTML = counter;    
    };

    deleteCard(card) {
        let column = event.target.closest('div[data-column]').dataset.column;
        this.removeFromLocalStorage(column, card.dataset.card_id);
        card.remove();
        this.countCards();
    };

    deleteAllCards(column) {
        if (column === 'toDo') {
            let cards = this.getCards('toDo');

            for (let i = 0; i < cards.length; i++) {
                this.removeFromLocalStorage('toDo', cards[i].dataset.card_id);
            }

            let cardContainer = document.body.querySelector('div[data-column="toDo"]');
            cardContainer.innerHTML = '';
        }
        this.countCards();
    };

    clampText() {
        let cardBodies = document.body.querySelectorAll('.board__card-copy');
        for (let i = 0; i < cardBodies.length; i++) {
            $clamp(cardBodies[i], {clamp: 2})
        };
    };

    clearInput(modal) {
        if (modal) { // else browser will throw an error cause it is unable to run qs on null
            let inputs = [
                modal.querySelector('input[data-input_type="title"]'), 
                modal.querySelector('textarea[data-input_type="description"]')
            ];
            inputs.forEach(input => input.value = '');
        };
    };

    getInputValues(modal) {
        return inputValues = {
            title: modal.body.querySelector('.add-card-modal__title-input').value,
            description: modal.body.querySelector('.add-card-modal__description-input').value,
        };
    };

    getDate() {
        return new Date(Date.now()).toLocaleDateString();
    };

    generateID() {
        let cardNumber = document.body.querySelectorAll('.board__card').length
        return cardNumber ? `c_${cardNumber + 1}` : `c_1`;
    };

    putInLocalStorage(cardObject, column) {
        if (column === 'toDo') {
            let toDoStorage = JSON.parse(localStorage.getItem('toDo'));
            toDoStorage.push(cardObject);
            localStorage.setItem('toDo', JSON.stringify(toDoStorage));
        };
    };

    removeFromLocalStorage(column, id) {
        if (column === 'toDo') {
            let toDoStorage = JSON.parse(localStorage.getItem('toDo'));
            toDoStorage.forEach(card => {
                if (card.id === id) {
                    toDoStorage.splice(toDoStorage.indexOf(card), 1);
                }
            });
            localStorage.setItem('toDo', JSON.stringify(toDoStorage));
        };
    };
};

let methods = new Methods;

methods.clearInput()