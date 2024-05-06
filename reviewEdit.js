import { editValidation } from "./validcheck.js";
const modelView = document.querySelector(".modal");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");
const makeButton = document.querySelector("#makeButton");
const getName = document.querySelector("#exampleFormControlInput1");
const getPassword = document.querySelector("#exampleFormControlInput2");
const getMessage = document.querySelector("#msg");
const reviewSpace = document.querySelector("#reviewSpace");
const modalName = document.querySelector("#modalName");
const modalPassword = document.querySelector("#modalPassword");
const modalMessage = document.querySelector("#modalMessage");
const deleteButton = document.getElementById("deleteButton");
const editButton = document.getElementById("editButton");
let buttonEditDelete = document.querySelector(".btn.btn-danger");

function editOrDelete(kind, ID) {
  // 수정 혹은 삭제
  if (modalPassword.value !== localStorage.getItem(ID + "pw")) {
    // 비밀번호 검사
    alert("비밀번호가 일치하지 않습니다!");
    return;
  }
  let editIDs = localStorage.getItem("IDs").split(",");
  editIDs = editIDs.filter(function (val) {
    // IDs에서 ID삭제
    return val != ID;
  });
  localStorage.removeItem(ID + "name");
  localStorage.removeItem(ID + "msg");
  localStorage.removeItem(ID + "pw");
  localStorage.removeItem(ID + "time");
  if (kind === "delete") {
    alert("삭제가 완료되었습니다.");
  } else {
    // 수정
    let IDs = editIDs,
      changeId = modalName.value;
    if (IDs.find((val) => val === changeId)) {
      let a = 0;
      while (IDs.find((val) => val === changeId + a)) {
        a++;
      }
      changeId += a;
    }
    localStorage.setItem(changeId + "name", modalName.value);
    localStorage.setItem(changeId + "msg", modalMessage.value);
    localStorage.setItem(changeId + "pw", modalPassword.value);
    const today = new Date().toLocaleString();
    localStorage.setItem(changeId + "time", today);
    editIDs.push(changeId);
    alert("수정이 완료되었습니다.");
  }
  localStorage.setItem("IDs", editIDs);
  modal.style.display = "none";
  location.reload(true);
}

function makeEvent(data) {
  // 수정 및 삭제
  data.addEventListener("click", function (element) {
    const ID = element.target.id;
    modalName.value = localStorage.getItem(ID + "name");
    modalMessage.value = localStorage.getItem(ID + "msg");
    modal.style.display = "block";
    function deleteEventHandler() {
      editOrDelete("delete", ID);
    }
    function editEventHandler() {
      if (editValidation()) {
        editOrDelete("edit", ID);
      }
    }
    function cancelEventHandler() {
      modal.style.display = "none";
      deleteButton.removeEventListener("click", deleteEventHandler);
      editButton.removeEventListener("click", editEventHandler);
    }
    deleteButton.addEventListener("click", deleteEventHandler);
    editButton.addEventListener("click", editEventHandler);
    cancelButton.addEventListener("click", cancelEventHandler);
  });
}

function addReview(data) {
  // 리뷰 추가
  let { ID, name, msg, time } = data;
  let toChange = document.createElement("div");
  toChange.innerHTML = `
    <div class="comment row">
        <div class="col">
            <div class="author fw-bold">${name}</div>
            <div class="col-auto">
                <div class="time">${time}</div>
            </div>
            <div class="content mt-2">${msg}</div>
        </div>
        <div class="col-auto">
            <button class="btn btn-danger" id="${ID}" style="margin-right: -16px; margin-top: 9px;">수정 및 삭제</button>
        </div>
    </div>`;
  reviewSpace.appendChild(toChange);
  buttonEditDelete = document.querySelectorAll(".btn.btn-danger");
  makeEvent(buttonEditDelete[buttonEditDelete.length - 2]);
}

export function inputClicked() {
  // 입력 누를 시
  const name = getName.value;
  const pw = getPassword.value;
  const msg = getMessage.value;
  const today = new Date().toLocaleString();
  let ID = name;
  if (localStorage.length !== 0) {
    let IDs = localStorage.getItem("IDs").split(",");
    if (IDs.find((val) => val === ID)) {
      let a = 0;
      while (IDs.find((val) => val === ID + a)) {
        a++;
      }
      ID += a;
    }
  }
  const data = {
    ID: ID,
    name: name,
    msg: msg,
    time: today
  };
  addReview(data); // 코드 추가

  let editIDs = localStorage.getItem("IDs"); // editIDs에 ID들 불러오기
  if (editIDs === null) editIDs = [];
  else editIDs = [editIDs];
  editIDs.push(ID); // editIDs에 ID 넣기
  localStorage.setItem("IDs", editIDs); // ID 넣은 editIDs 저장
  localStorage.setItem(ID + "name", name); // 나머지 정보 저장
  localStorage.setItem(ID + "pw", pw);
  localStorage.setItem(ID + "msg", msg);
  localStorage.setItem(ID + "time", today);

  getName.value = null;
  getPassword.value = null;
  getMessage.value = null;
}

function showReview() {
  // 리뷰 불러오기
  if (localStorage.length == 0 || localStorage.getItem("IDs") == "") return;
  let IDs = localStorage.getItem("IDs").split(","); // IDs 가져와서
  for (let i = 0; i < IDs.length; i++) {
    // ID에 맞는 것들 get 해서 출력
    if (IDs[i] === "") continue;
    const ID = IDs[i];
    const name = localStorage.getItem(ID + "name");
    const pw = localStorage.getItem(ID + "pw");
    const msg = localStorage.getItem(ID + "msg");
    const time = localStorage.getItem(ID + "time");
    const data = {
      ID: ID,
      name: name,
      msg: msg,
      time: time
    };
    addReview(data);
  }
}

showReview();

// IDmovie만들어서 영화 아이디도 저장하고 addReview에서 출력전에 확인하고 출력/
