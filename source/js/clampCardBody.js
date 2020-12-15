// const cardBody = document.body.querySelector('.board__card-copy')

// $clamp(cardBody, {clamp: 2})

export function clampCardBody() {
    const cardBodies = document.body.querySelectorAll('.board__card-copy')
    for (let i = 0; i < cardBodies.length; i++) {
        $clamp(cardBodies[i], {clamp: 2})
    }
}

