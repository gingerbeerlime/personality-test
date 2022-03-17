const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result")
// 질문개수만큼 
const endPoint = 10;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0];

// 결과 연산 함수
function calResult() {
    console.log(select)
    var result = select.indexOf(Math.max(...select));

    return result
}

// 결과 페이지 구현
function setResult() {
    let point = calResult();
    const resultName = document.querySelector('.resultName')
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.jpg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid'); 
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.classList.add('explanation')
    resultDesc.innerHTML = infoList[point].desc;

}

// 결과 페이지 이동
function goResult() {
    qna.style.WebkitAnimation = 'fadeOut 1s';
    qna.style.animation = 'fadeOut 1s';
    setTimeout(() => {
        result.style.WebkitAnimation = 'fadeIn 1s';
        result.style.animation = 'fadeIn 1s';
        setTimeout(() => {
            qna.style.display = 'none';
            result.style.display = 'block'
        }, 450)
    }, 450)
    setResult();    
}

// 답변 보기 불러오기
function addAnswer(answerText, qIdx, idx){
    var answerBox = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('mx-auto');
    // 버튼 리스트에 클래스명 부여
    answer.classList.add('answerList');
    answer.classList.add('fadeIn');

    answerBox.appendChild(answer);
    answer.innerHTML = answerText;

    // 답 버튼 선택시 애니메이션
    answer.addEventListener("click", function(){
        
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++) {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let j = 0; j < target.length; j++) {
                select[target[j]] += 1;
            }

            for(let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)
    }, false);
}

// 다음 문항으로 이동
function goNext(qIdx){
    if(qIdx === endPoint) {
        goResult();
        return;
    }
    var qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}

// 테스트 시작버튼 눌렀을 때
function begin(){
    main.style.WebkitAnimation = 'fadeOut 1s'
    main.style.animation = 'fadeOut 1s'
    setTimeout(() => {
        qna.style.WebkitAnimation = 'fadeIn 1s'
        qna.style.animation = 'fadeIn 1s'
        setTimeout(() => {
            main.style.display = 'none'
            qna.style.display = 'block'
        }, 450)
        let qIdx = 0
        goNext(qIdx)
    }, 450)
    
    
}