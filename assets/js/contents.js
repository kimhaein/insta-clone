const contents = document.querySelectorAll('.moreBtn')
const deleteBtn = document.querySelectorAll('.deleteBtn')
const hashList =  document.querySelectorAll('.hashList')

// 컨텐츠 삭제
function handleDelete(e) {
    const {id , email} = e.target.dataset
    fetch(`/contents/${id}/delete`, {
        method: 'POST',
        body: JSON.stringify({email}),
        headers : {
            "Content-Type" : "application/json"
        }
    }).then(res => {
        if(res.status === 200 || res.status === 201) {
            location.reload() 
        } else {
            console.error(res.statusText)
        }
    }).catch(err => console.error(err))
}

// 해시 태그
function handleHash(e) {
    hashList.forEach( v => {
        const tagSpan = v.childNodes[0]
        const tagArr = tagSpan.innerText.split(',')

        const tag = tagArr.map((k)=>{
            return `<a href="#">#${k}</a>`
        })
        
        tagSpan.innerHTML = tag.join(' ')
    })
}

if(contents.length) {
    deleteBtn.forEach(e => e.addEventListener("click", (e)=>{
        const delConfirm = confirm('게시글을 삭제 하시겠습니까?');
        if(delConfirm){
            handleDelete(e)
        }else{
            return false
        }
    }))
}

if(hashList.length){
    handleHash()
}

