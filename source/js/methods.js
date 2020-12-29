'use strict'

export class Methods {

    toggle(el) {
        el.classList.toggle('active');
    };

    getCards(column) {
        if (column === 'toDo') {
            return document.body.querySelector('div[data-column="toDo"]')
                                     .querySelectorAll('.board__card');
        } else if (column === 'inProgress') {
            return document.body.querySelector('div[data-column="inProgress"]')
                                .querySelectorAll('.board__card');
        } else if (column === 'done') {
            return document.body.querySelector('div[data-column="done"]')
            .querySelectorAll('.board__card');
        }
    }

    countCards() {
        let columns = document.body.querySelectorAll('.board__cards-container[data-column]')

        for (let i = 0; i < columns.length; i++) {
            let cards = this.getCards(columns[i].dataset.column),
                counter = document.body.querySelector(`div[data-counter="${columns[i].dataset.column}"]`),
                cardNumber;

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

    generateID() {
        let cardNumber = document.body.querySelectorAll('.board__card').length
        return cardNumber ? `c_${cardNumber + 1}` : `c_1`; // the card id is the number of already existing cards + 1
    };

    putInLocalStorage(cardObject, column) {
        if (column === 'toDo') {
            let toDoStorage = JSON.parse(localStorage.getItem('toDo'));
            toDoStorage.push(cardObject);
            localStorage.setItem('toDo', JSON.stringify(toDoStorage));
        }
    };

    removeFromLocalStorage(column, id) {
        if (column === 'toDo') {
            let toDoStorage = JSON.parse(localStorage.getItem('toDo'));
            toDoStorage.forEach(card => {
                if (card.id === id) {
                    toDoStorage.splice(toDoStorage.indexOf(card), 1);
                }
            })
            localStorage.setItem('toDo', JSON.stringify(toDoStorage));
        }
    };

    showErrorMessage = (...inputs) => inputs.forEach((input => {input.nextElementSibling.classList.add('active')}));
    hideErrorMessage = (...inputs) => inputs.forEach((input => {input.nextElementSibling.classList.remove('active')}));

    checkIfEmpty(...inputs) {
        let isEmpty = false;
        inputs.forEach(input => {
            if (!input.value) {
                methods.showErrorMessage(input)
                return isEmpty = true;
            }
        })
        return isEmpty
    }; 
}
