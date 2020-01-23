const likeButtons = document.querySelectorAll('.like')
const myEmail = document.querySelector('#user_email')
const myNickname = document.querySelector('#user_nickname')

// 좋아요 버튼 클릭 이벤트 발생시 호출되는 함수
function handleLikeClick(e) {
    if(e.target.classList.contains('fas')) {
        // 좋아요 버튼이 눌려있을 경우
        e.target.classList.remove('fas')
        e.target.classList.add('far')
        // Todo..
        // 눌려있을 경우 해당 컨텐츠 좋아요 취소하는 로직 
        // 해당 컨텐츠 likes항목(좋아요를 누른사람 이메일 목록)에서 
        // 로그인한 유저의 이메일을 제외한 나머지 이메일을 
        // post로 전송후 db Update
    } else {
        // 좋아요 버튼이 눌려있지 않을 경우
        e.target.classList.remove('far')
        e.target.classList.add('fas')
        // Todo..
        // 좋아요를 누른 로직 
        // 해당 컨텐츠 likes항목(좋아요를 누른사람 이메일 목록)에서 
        // 로그인한 유저의 이메일을 추가해서
        // post로 전송후 db Update
    }
}

// 기존에 좋아요를 눌렀던 게시글 색칠하는 함수
function handleLikeBtn() {
    // Todo... 
    // 로딩된 모든 컨텐츠 또는 디테일페이지 내 단일 컨텐츠에 넘어온
    // likes 항목 (좋아요를 누른사람 이메일 목록)중 내 이메일이 있다면 해당 컨텐츠 하트 색칠
    // 그리고 이메일 목록이 몇명인지 계산해 좋아요가 몇개인지 표시
}

function init() {
    // like 클래스 전부에 클릭이벤트 할당
    likeButtons.forEach(e => e.addEventListener("click", handleLikeClick))
    
    // myEmail은 로그인한 유저에 경우에만 해당 값을 갖고 있음 isLogin이라고 봐도 무방.
    if(myEmail) handleLikeBtn()
}

if(likeButtons) {
    init()
}