const likeButtons = document.querySelectorAll('.like')

function handleLikeClick(e) {
    if(e.target.classList.contains('fas')) {
        e.target.classList.remove('fas')
        e.target.classList.add('far')
    } else {
        e.target.classList.remove('far')
        e.target.classList.add('fas')
    }
}

function init() {
    likeButtons.forEach(e => e.addEventListener("click", handleLikeClick)) 
}

if(likeButtons) {
    init()
}