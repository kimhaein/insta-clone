const likeButtons = document.querySelectorAll('.like')
const myEmail = document.querySelector('#user_email')
const modal = document.querySelector('.modal')

// 좋아요 버튼 클릭 이벤트 발생시 호출되는 함수
function handleLikeClick(e) {
    const content_idx = e.target.parentElement.children[2].value
    const body = {content_idx}
    fetchLikeBtn(content_idx, body, e)

    if(!myEmail) {
        modal.classList.remove('hidden')
    }
}

// 좋아요 버튼 누를시 서버 통신
function fetchLikeBtn(content_idx, body, e) {
    fetch('/contents/like', {
        method: 'POST',
        body: JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json" // 타입 반드시 지정해줘야함.. 
        }
    }).then(res => {
        if(res.status === 200 || res.status === 201) {
            res.json().then(json => {
                if(!json.likeOn) {
                    e.target.classList.remove('fas')
                    e.target.classList.add('far')
                }
                e.target.parentNode.parentNode.children[1].children[1].value = json.likes
                handleLikeBtn()
            })
        } else {
            console.error(res.statusText)
        }
    }).catch(err => console.error(err))
}

// 기존에 좋아요를 눌렀던 게시글 색칠하는 함수
function handleLikeBtn() {
    // 내가 누른 좋아요 표시
    document.querySelectorAll('[name=likes]').forEach( v => {
        if(v.value) {
            const arr = v.value.split(',')
            v.parentNode.children[0].textContent = `좋아요 ${arr.length - 1}개`
            if(myEmail && arr.indexOf(myEmail.value) >= 0) {
                v.parentNode.parentNode.children[0].children[0].classList.remove('far')
                v.parentNode.parentNode.children[0].children[0].classList.add('fas')
            }
        } else {
            v.parentNode.children[0].textContent = `좋아요 0개`
        }
    })
}

function init() {
    // like 클래스 전부에 클릭이벤트 할당
    likeButtons.forEach(e => e.addEventListener("click", handleLikeClick))

    // myEmail은 로그인한 유저에 경우에만 해당 값을 갖고 있음 isLogin이라고 봐도 무방.
    handleLikeBtn()
}

if(likeButtons.length) {
    init()
}