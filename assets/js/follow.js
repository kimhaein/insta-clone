const followBtn = document.querySelector('.follow')
const myEmail = document.querySelector('#user_email')
const modal = document.querySelector('.modal')
const user_following = document.querySelector('#user_following')

// 클릭시 이벤트
function handleFollowBtnClick(){
    if(myEmail) {
        if(followBtn.textContent === '팔로잉') {
            confirm('취소할래요 ? '? 'yes': 'no')
        } else {
            const targetEmail = document.querySelector('#targetEmail').textContent
            eventFollowBtn(targetEmail)
        }
    } else {
        modal.classList.remove('hidden')
    }
}

function eventFollowBtn(target) {
    body = { target }
    fetch('/users/follow', {
        method: 'POST',
        body: JSON.stringify(body),
        headers : {
            "Content-Type" : "application/json" // 타입 반드시 지정해줘야함.. 
        }
    }).then(res => {
        if(res.status === 200 || res.status === 201) {
            res.json().then(json => {
                console.log(json)
            })
        } else {
            console.error(res.statusText)
        }
    }).catch(err => console.error(err))
}

// 페이지 진입시 버튼 컨트롤
function handleFollowBtn() {
    const arr = user_following.value.split(',')
    if(myEmail && arr.indexOf(myEmail.value) > 0) {
        followBtn.style.backgroundColor = 'white'
        followBtn.style.color = 'black'
        followBtn.textContent = '팔로잉'
    }
}

function init() {
    // 팔로우 버튼 클릭 이벤트
    followBtn.addEventListener('click', handleFollowBtnClick)

    // 팔로우 하는지 체크
    handleFollowBtn()
}

if(followBtn) {
    init()
}