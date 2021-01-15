const removeIcon =
    `<svg class="board__card-remove-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.298 414.299">
        <defs/>
        <path d="M3.663 410.637c2.441 2.44 5.64 3.661 8.839 3.661 3.199 0 6.398-1.221 8.839-3.661l185.809-185.81 185.81 185.811c2.44 2.44 5.641 3.661 8.84 3.661 3.198 0 6.397-1.221 8.839-3.661 4.881-4.881 4.881-12.796 0-17.679l-185.811-185.81 185.811-185.81c4.881-4.882 4.881-12.796 0-17.678-4.882-4.882-12.796-4.882-17.679 0l-185.81 185.81L21.34 3.663c-4.882-4.882-12.796-4.882-17.678 0-4.882 4.881-4.882 12.796 0 17.678l185.81 185.809L3.663 392.959c-4.882 4.882-4.882 12.797 0 17.678z"/>
    </svg>`

const moveIcon =
      `<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002">
          <defs/>
          <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061 3.883 3.89 8.97 5.835 14.057 5.835 5.074 0 10.141-1.932 14.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"/>
      </svg>`

const moveToFirstColumnIcon =
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <defs/>
              <path d="M408.973 142.689c-40.86-40.86-95.188-63.363-152.973-63.363h-31.717l50.907-51.032L246.826 0 147.68 99.389l97.852 99.488 28.563-28.093-50.551-51.396H256c97.198 0 176.275 79.076 176.275 176.275S353.198 471.938 256 471.938 79.725 392.861 79.725 295.659v-20.031l-40.062.004v20.031c0 57.786 22.503 112.113 63.364 152.973C143.887 489.497 198.215 512 256 512c57.785 0 112.113-22.503 152.973-63.364 40.861-40.861 63.364-95.188 63.364-152.973s-22.503-112.113-63.364-152.974z"/>
        </svg>`

export const variables = {

    editModal: document.body.querySelector('#edit-card-modal'),
    titleInputEM: document.body.querySelector('#edit-card-modal .modal__title--input'),
    descriptionInputEM: document.body.querySelector('#edit-card-modal .modal__description--input'),
    titleEM: document.body.querySelector('#title'),
    descriptionEM: document.body.querySelector('#description'),
    saveTitleBtn: document.body.querySelector('.modal__save-title-btn'),
    discardTitleBtn: document.body.querySelector('.modal__discard-title-btn'),
    saveDescriptionBtn: document.body.querySelector('.modal__description-save-btn'),
    discardDescriptionBtn: document.body.querySelector('.modal__description-discard-btn'),

    removeIcon: removeIcon,
    moveIcon: moveIcon,
    moveToFirstColumnIcon: moveToFirstColumnIcon,

    getCard(cardObject, isLastColumn = false) {
        if (isLastColumn) {
            return `<div class="board__card" data-card="card" data-card_id=${cardObject.id}>
                    <h3 class="board__card-title">${cardObject.title}</h3>
                    <p class="board__card-copy">${cardObject.description}</p>
                    <div class="board__card-footer">
                        <p class="board__card-date">${cardObject.date}</p>
                        <button class="board__card-move-btn">${this.moveToFirstColumnIcon}</button>
                        <button class="board__card-remove-btn">${this.removeIcon}</button>
                    </div>
                </div>`
        }
        return `<div class="board__card" data-card="card" data-card_id=${cardObject.id}>
                    <h3 class="board__card-title">${cardObject.title}</h3>
                    <p class="board__card-copy">${cardObject.description}</p>
                    <div class="board__card-footer">
                        <p class="board__card-date">${cardObject.date}</p>
                        <button class="board__card-move-btn">${this.moveIcon}</button>
                        <button class="board__card-remove-btn">${this.removeIcon}</button>
                    </div>
                </div>`
    },
};
