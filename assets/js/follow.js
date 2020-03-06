const followBtn = document.querySelector('.follow')
const myEmail = document.querySelector('#user_email')
const modal = document.querySelector('.modal')
const user_following = document.querySelector('#user_following')
const followCnt = document.querySelector('#followCnt')

// 클릭시 이벤트
function handleFollowBtnClick(){
    if(myEmail) {
        if(followBtn.textContent === '팔로잉') {
            if(confirm('팔로우를 취소하시겠습니까 ?')) {
                const targetEmail = document.querySelector('#targetEmail').textContent
                eventFollowBtn(targetEmail, false)
            }
        } else {
            const targetEmail = document.querySelector('#targetEmail').textContent
            eventFollowBtn(targetEmail, true)
        }
    } else {
        modal.classList.remove('hidden')
    }
}

function eventFollowBtn(target, type) {
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
                console.log(json.followCnt.follower)
                followCnt.textContent =  json.followCnt.follower
                following(type)
            })
        } else {
            console.error(res.statusText)
        }
    }).catch(err => console.error(err))
}

// 페이지 진입시 버튼 컨트롤
function handleFollowBtn() {
    const arr = user_following.value.split(',')
    if(myEmail && arr.indexOf(myEmail.value) >= 0) {
        following(true)
    }
}

function following(type) {
    if(type) {
        followBtn.style.backgroundColor = 'white'
        followBtn.style.color = 'black'
        followBtn.style.border = '1px black solid'
        followBtn.textContent = '팔로잉'
    } else {
        followBtn.style.backgroundColor = '#3897f0'
        followBtn.style.color = '#fff'
        followBtn.style.border = ''
        followBtn.textContent = '팔로우'
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