'use strict'

export class Methods {
    countCards() {
        let cards = document.body.querySelectorAll('div[data-card="card"]'),
            counterBlock = document.body.querySelector('.board__to-do-counter'),
            counter = cards.length;

        cards ? counter = cards.length : counter = 0;
        counterBlock.innerHTML = counter;    
    };

    deleteCard(card) {
       card.remove();
       this.countCards();
    };

    deleteAllCards() {
        let cards = document.body.querySelector('.board__to-do-cards-container');
        cards.innerHTML = '';
        this.countCards();
    };
};
