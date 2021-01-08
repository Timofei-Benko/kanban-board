'use strict'

import { variables } from './variables.js';
import { Methods } from './methods.js';

let methods = new Methods;

window.addEventListener('load', () => {

    // creates local storage structure on first page load or after LS was cleared
    // then it renders the cards if there are any

    if (!localStorage.getItem('toDo')) {
        localStorage.setItem('toDo', JSON.stringify([]));
    } else {
        let toDoStorage = JSON.parse(localStorage.getItem('toDo'));
        toDoStorage.forEach(cardObject => {
            document.querySelector('div[data-column="toDo"]').innerHTML += variables.getCard(cardObject)
        });
    }
    if (!localStorage.getItem('inProgress')) {
        localStorage.setItem('inProgress', JSON.stringify([]));
    } else {
        let inProgress = JSON.parse(localStorage.getItem('inProgress'));
        inProgress.forEach(cardObject => {
            document.querySelector('div[data-column="inProgress"]').innerHTML += variables.getCard(cardObject)
        });
    }
    if (!localStorage.getItem('done')) {
        localStorage.setItem('done', JSON.stringify([]));
    }

    methods.countCards();
    methods.clampText();
});
