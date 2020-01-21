const likeButtons = document.querySelectorAll('.like')

function handleLikeClick(e) {
    if(e.target.style.backgroundColor === 'red') {
        e.target.style.backgroundColor = ''
        console.log('좋아요 취소')
    } else {
        e.target.style.backgroundColor = 'red'
        console.log('좋아요 누름')
    }
}

function init() {
    likeButtons.forEach(e => e.addEventListener("click", handleLikeClick)) 
}

if(likeButtons) {
    init()
}