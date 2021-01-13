const removeIcon = `<svg class="board__card-remove-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 414.298 414.299">
  <defs/>
  <path d="M3.663 410.637c2.441 2.44 5.64 3.661 8.839 3.661 3.199 0 6.398-1.221 8.839-3.661l185.809-185.81 185.81 185.811c2.44 2.44 5.641 3.661 8.84 3.661 3.198 0 6.397-1.221 8.839-3.661 4.881-4.881 4.881-12.796 0-17.679l-185.811-185.81 185.811-185.81c4.881-4.882 4.881-12.796 0-17.678-4.882-4.882-12.796-4.882-17.679 0l-185.81 185.81L21.34 3.663c-4.882-4.882-12.796-4.882-17.678 0-4.882 4.881-4.882 12.796 0 17.678l185.81 185.809L3.663 392.959c-4.882 4.882-4.882 12.797 0 17.678z"/>
</svg>`
    
    
    // '<svg class="board__card-remove-btn-icon" height="511.99998pt" viewBox="1 1 511.99998 511.99998"' +
    // ' width="511.99998pt"' +
    // ' xmlns="http://www.w3.org/2000/svg"><path d="m256 0c-141.386719 0-256 114.613281-256 256s114.613281 256 256 256' +
    // ' 256-114.613281 256-256c-.167969-141.316406-114.683594-255.832031-256-256zm0 480c-123.710938 0-224-100.289062-224-224s100.289062-224 224-224 224 100.289062 224 224c-.132812 123.65625-100.34375 223.867188-224 224zm0 0"/><path d="m380.449219 131.550781c-6.25-6.246093-16.378907-6.246093-22.625 0l-101.824219 101.824219-101.824219-101.824219c-6.140625-6.355469-16.269531-6.53125-22.625-.390625-6.355469 6.136719-6.53125 16.265625-.390625 22.621094.128906.132812.257813.265625.390625.394531l101.824219 101.824219-101.824219 101.824219c-6.355469 6.136719-6.53125 16.265625-.390625 22.625 6.136719 6.355469 16.265625 6.53125 22.621094.390625.132812-.128906.265625-.257813.394531-.390625l101.824219-101.824219 101.824219 101.824219c6.355469 6.136719 16.484375 5.960937 22.621093-.394531 5.988282-6.199219 5.988282-16.03125 0-22.230469l-101.820312-101.824219 101.824219-101.824219c6.246093-6.246093 6.246093-16.375 0-22.625zm0 0"/></svg>';

const moveIcon = `<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002">
  <defs/>
  <path d="M388.425 241.951L151.609 5.79c-7.759-7.733-20.321-7.72-28.067.04-7.74 7.759-7.72 20.328.04 28.067l222.72 222.105-222.728 222.104c-7.759 7.74-7.779 20.301-.04 28.061 3.883 3.89 8.97 5.835 14.057 5.835 5.074 0 10.141-1.932 14.017-5.795l236.817-236.155c3.737-3.718 5.834-8.778 5.834-14.05s-2.103-10.326-5.834-14.051z"/>
</svg>`

//     `<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 612 612"><defs/>
// <path d="M431.001 289.189l-108.19-108.19c-7.478-7.478-19.583-7.478-27.042 0-7.478 7.478-7.478 19.584 0 27.043l78.814 78.833H172.125C161.568 286.875 153 295.443 153 306s8.568 19.125 19.125 19.125h202.457l-78.814 78.814c-7.478 7.478-7.478 19.584 0 27.042 7.478 7.479 19.584 7.479 27.042 0L431 322.792c4.59-4.59 6.005-10.863 4.973-16.811 1.033-5.91-.401-12.202-4.972-16.792zM306 0C136.992 0 0 136.992 0 306s136.992 306 306 306 306-137.012 306-306S475.008 0 306 0zm0 573.75C158.125 573.75 38.25 453.875 38.25 306S158.125 38.25 306 38.25 573.75 158.125 573.75 306 453.875 573.75 306 573.75z"/>
// </svg>`;


const moveToFirstColumnIcon =

    `<svg class="board__card-move-btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="-45 -17 533 533.3333">
  <defs/>
  <path d="M202.1875 22.5156c-42.1133 0-84.2031 11.8985-121.7266 34.414-20.5078 12.3516-39.2304 27.4532-55.6367 44.8946l1.8906-89.0625C26.8672 5.8633 21.3945.1445 14.4883 0h-.2735C7.418.004 1.8711 5.4375 1.7266 12.2344l-2.6094 122.621c-1.8203 4.629-.7227 9.8946 2.789 13.4141 3.5118 3.5157 8.7735 4.6211 13.4024 2.8047l122.6523-2.6094c6.9024-.0742 12.4414-5.7265 12.3672-12.6328-.0742-6.8984-5.7265-12.4414-12.6328-12.3672h-.2695l-100.4063 2.1329a236.1187 236.1187 0 0156.3008-47.2383c33.6367-20.1875 71.2852-30.8516 108.8672-30.8516 60.0977 0 115.5117 24.8008 156.039 69.8242 36.1329 40.1485 57.6993 93.9453 57.6993 143.914 0 49.9727-21.5664 103.7696-57.6992 143.918-40.5274 45.0313-95.9414 69.832-156.0391 69.832-35.2344.2423-69.9414-8.578-100.7812-25.625-28.3047-15.914-52.7188-37.9257-71.4727-64.4335-3.9453-5.664-11.7383-7.0586-17.4023-3.1133-5.6641 3.9453-7.0625 11.7383-3.1172 17.4024.0547.0703.1054.1406.1523.2148 20.9297 29.539 48.1563 54.0664 79.7227 71.789 34.543 19.1173 73.4218 29.0196 112.8984 28.7657 67.2813 0 129.2969-27.7344 174.621-78.1016 40.1524-44.6132 64.125-104.6601 64.125-160.6367 0-55.9805-23.9687-116.0312-64.125-160.6445-45.3241-50.3633-107.3397-78.0977-174.621-78.0977zm0 0"/>
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
