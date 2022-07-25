import { Comment } from "./comment.js"
import { CurrentUserComment } from "./current-user-comment.js"
import { Reply } from "./reply.js"


export function blablaReply(obj){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const haha = new CurrentUserComment(data.currentUser)
        haha.createFieldForReply(obj);
    })
  
}


 function getData(){
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
    const globalField = document.querySelector(".comments-field");

    data.comments.forEach(comment => {
        const mainComment = new Comment(comment);
        mainComment.createMainComment(globalField)

        if(comment.replies.length !== 0){
            const repliesArea = document.createElement('div')
            repliesArea.className = "replies-area"
            globalField.appendChild(repliesArea)

            const repliesLine = document.createElement('div')
            repliesLine.className = "reply-line"
            repliesArea.appendChild(repliesLine)

            const replies = document.createElement('div')
            replies.className = "replies"
            repliesArea.appendChild(replies)

            comment.replies.forEach(reply => {
                const rep = new Reply(reply);
                if(data.currentUser.username === reply.user.username){
                    rep.createReply(replies, true)
                } else {
                    rep.createReply(replies)
                }
            })
        }
    });

    // writeCommentSection(data.currentUser)
    const cu = new CurrentUserComment(data.currentUser)
    cu.writeCommentSection()
})
}

getData()


