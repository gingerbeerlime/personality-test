const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
// 질문개수만큼 
const endPoint = 9;

function addAnswer(answerText, qIdx){
    var answerBox = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('mx-auto');
    // 버튼 리스트에 클래스명 부여
    answer.classList.add('answerList');
    answer.classList.add('fadeIn');

    answerBox.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        //답변 모두 선택
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

function goNext(qIdx){
    var qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {   
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
    
    // main.style.display = "none";
    // qna.style.display = "block";
}