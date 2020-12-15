'use strict'

// Variables

import { svgIcons } from './svgVariables.js'

const addCardBtn = document.body.querySelector('.board__add-new-btn')
const toDoColumn = document.body.querySelector('.board__to-do-cards-container')

// const column = document.body.querySelector('div[data-cards="cards-container"]')
// const counterBlock = document.body.querySelector('.board__to-do-counter')

const modal = document.body.querySelector('.add-card-modal')
const titleInput = document.body.querySelector('.add-card-modal__title-input')
const descriptionInput = document.body.querySelector('.add-card-modal__description-input')

const today = new Date(Date.now())
const todayFormated = today.toLocaleDateString()

let card = `<div class="board__card">
            <h3 class="board__card-title"></h3>
            <p class="board__card-copy"></p>
            <p class="board__card-date"></p>
            </div>`

// Functions

let toggle = token => token.classList.toggle('active')
let showErrorMessage = input => input.nextElementSibling.classList.add('active')
let hideErrorMessage = input => input.nextElementSibling.classList.remove('active')
let clearInput = (...inputs) => inputs.forEach(input => input.value = '')

import { clampCardBody } from './clampCardBody.js'
import { Methods } from './methods.js'

let methods = new Methods

function checkIfEmpty(...inputs) {
    let isEmpty = false
    inputs.forEach(input => {
        if (!input.value) {
            showErrorMessage(input)
            return isEmpty = true
        }
    })
    return isEmpty
}

// Listeners

// opens the modal window
addCardBtn.addEventListener('click', () => toggle(modal))

// listens to events in modal window
modal.addEventListener('click', event => {
    if (event.target.classList.contains('add-card-modal__close-btn')) {
        toggle(modal) // closes the modal
    }

    if (event.target.classList.contains('add-card-modal__save-btn')) { // makes the necessary checks, shows error if empty, else adds a card 
        if (checkIfEmpty(titleInput, descriptionInput)) {
            return 
        } else {
            let card = `<div class="board__card" data-card="card">
                            <h3 class="board__card-title">${titleInput.value}</h3>
                            <p class="board__card-copy">${descriptionInput.value}</p>
                            <div class="board__card-footer">
                                <p class="board__card-date">${todayFormated}</p>
                                <button class="board__card-move-btn">
                                    ${svgIcons.move}
                                </button>
                                <button class="board__card-remove-btn">
                                    ${svgIcons.remove}
                                </button>
                            </div>
                        </div>`

            toDoColumn.innerHTML += card
            clearInput(titleInput, descriptionInput) // clears inputs so that there are no previously entered values
            toggle(modal)
            // countCards(column, counterBlock)
            methods.countCards()
            clampCardBody()
        }
    }
})

modal.addEventListener ('keyup', event => { // removes error message when user starts to type into the input
    if (event.target.classList.contains('add-card-modal__title-input') 
    || event.target.classList.contains('add-card-modal__description-input')) {
        hideErrorMessage(event.target)
    }
})
