const modelView = document.querySelector(".modal");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");
const makeButton = document.querySelector("#makeButton");
const getName = document.querySelector("#exampleFormControlInput1");
const getPassword = document.querySelector("#exampleFormControlInput2");
const getMessage = document.querySelector("#msg");
const reviewSpace = document.querySelector("#reviewSpace");
let buttonEditDelete = document.querySelector(".btn.btn-danger");
// const  = document.querySelector("");

cancelButton.addEventListener('click', function () {
    modal.style.display = 'none';
})

function makeEvent(data) { // 수정 및 삭제
    data.addEventListener('click', function (element) {
        console.log(element);
        console.log(element.target);
        modal.style.display = 'block';
    });
}

function addReview(data) { // 리뷰 추가
    let { ID, name, msg, time } = data;
    let toChange = document.createElement('div');
    toChange.innerHTML = `
    <div class="comment row" id="${ID}">
        <div class="col">
            <div class="author fw-bold">${name}</div>
            <div class="col-auto">
                <div class="time">${time}</div>
            </div>
            <div class="content mt-2">${msg}</div>
        </div>
        <div class="col-auto">
            <button class="btn btn-danger" style="margin-right: -16px; margin-top: 9px;">수정 및 삭제</button>
        </div>
    </div>`;
    reviewSpace.appendChild(toChange);
    buttonEditDelete = document.querySelectorAll(".btn.btn-danger");
    makeEvent(buttonEditDelete[buttonEditDelete.length - 2]);
}

makeButton.addEventListener('click', function () { // 입력 누를 시
    const name = getName.value;
    const pw = getPassword.value;
    const msg = getMessage.value;
    const today = new Date().toLocaleString();
    let ID = name;
    if (localStorage.length !== 0) {
        let IDs = localStorage.getItem("IDs").split(",");
        if (IDs.find(val => val === ID)) {
            let a = 0;
            while (IDs.find(val => val === ID + a)) {
                a++;
            }
            ID += a;
        }
    }
    const a = {
        ID: ID,
        name: name,
        msg: msg,
        time: today
    }
    addReview(a);

    let editIDs = localStorage.getItem('IDs'); // editIDs에 ID들 불러오기
    if (editIDs === null) editIDs = [];
    else editIDs = [editIDs];
    editIDs.push(ID); // editIDs에 ID 넣기
    localStorage.setItem('IDs', editIDs); // ID 넣은 editIDs 저장
    localStorage.setItem(ID + "name", name); // 나머지 정보 저장
    localStorage.setItem(ID + "pw", pw);
    localStorage.setItem(ID + "msg", msg);
    localStorage.setItem(ID + "time", today);
});

function showReview() { // 리뷰 불러오기
    if (localStorage.length == 0) return; 
    let IDs = localStorage.getItem('IDs').split(",");  // IDs 가져와서
    for (let i = 0; i < IDs.length; i++) { // ID에 맞는 것들 get 해서 출력
        const ID = IDs[i];
        const name = localStorage.getItem(ID + 'name');
        const pw = localStorage.getItem(ID + 'pw');
        const msg = localStorage.getItem(ID + 'msg');
        const time = localStorage.getItem(ID + 'time');
        const a = {
            ID: ID,
            name: name,
            msg: msg,
            time: time
        }
        addReview(a);
    }
}

showReview();


// 수정 및 삭제 페이지에서 처음에 pw빼고 다 입력 해놓고 pw랑 수정 누르면 수정, pw넣고 삭제 누르면 삭제