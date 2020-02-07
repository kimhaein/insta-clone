const modal = document.querySelector('.modal')

// modal창 이벤트.
function loginModal() {
    location.href = '/login'
}
function joinModal() {
    location.href = '/join'
}
function closeModal() {
    modal.classList.add('hidden')
}

function init() {
    // modal 창에서 버튼별 클릭 이벤트
    modal.querySelector('button').addEventListener('click', loginModal)
    modal.querySelector('.btn2').addEventListener('click', joinModal)
    modal.querySelector('.btn3').addEventListener('click', closeModal)
}

if(modal) {
    init()
}