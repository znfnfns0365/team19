import { editValidation } from "./validcheck.js";
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");
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
  let editIDs = localStorage.getItem("IDs").split(","); // 마찬가지로 아이디들을 쉼표(,)기준으로 split하여 배열로 받아옴
  editIDs = editIDs.filter(function (val) {
    // IDs에 저장된 아이디들 중에 현재 ID를 미리 삭제해놓음 (빈칸 아이디가 있을 경우 이것도 삭제해줌)
    return val != ID && val != "";
  });
  localStorage.removeItem(ID + "name"); // 나머지 아이디의 정보들도 삭제해줌
  localStorage.removeItem(ID + "msg");
  localStorage.removeItem(ID + "pw");
  localStorage.removeItem(ID + "movieID");
  localStorage.removeItem(ID + "time");
  if (kind === "delete") {
    // 삭제라면 더이상 할 것이 없음
    alert("삭제가 완료되었습니다.");
  } else {
    // 수정이라면 수정된 내용을 포함해 정보들을 저장소에 추가해야함
    let IDs = editIDs,
      changeId = modalName.value; // changedId는 수정된 이름, IDs는 현재 존재하는 리뷰의 아이디들
    if (IDs.find((val) => val === changeId)) {
      // 겹치는 ID가 있다면
      let a = 0; // ID 뒤에 숫자를 붙여준다
      while (IDs.find((val) => val === changeId + a)) {
        // 숫자를 계속 증가시켜주면서 겹치는 게 없을 때까지 while 돌려준 뒤
        a++;
      }
      changeId += a; // 뒤에 숫자를 붙여줌
    }
    localStorage.setItem(changeId + "name", modalName.value); // 수정된 정보 저장
    localStorage.setItem(changeId + "msg", modalMessage.value);
    localStorage.setItem(changeId + "pw", modalPassword.value);
    localStorage.setItem(changeId + "movieID", localStorage.getItem("exportId")); // 현재 페이지의 영화 ID(exportID)를 저장
    const today = new Date().toLocaleString();
    localStorage.setItem(changeId + "time", today);
    editIDs.push(changeId); // 수정된 ID를 ID배열에 추가해주고
    alert("수정이 완료되었습니다.");
  }
  localStorage.setItem("IDs", editIDs); // IDs를 업데이트 해줌
  modal.style.display = "none"; // 모달창 비활성화
  location.reload(true); // 새로고침
}

function makeEvent(data) {
  // 수정 및 삭제에 이벤트를 만들어줌
  data.addEventListener("click", function (element) {
    // 수정 및 삭제를 누른다면
    const ID = element.target.id;
    modalName.value = localStorage.getItem(ID + "name"); // name input에 이름을 미리 넣어줌
    modalMessage.value = localStorage.getItem(ID + "msg"); // msg input에 내용을 미리 넣어줌
    modal.style.display = "block"; // 모달창 띄우기
    function deleteEventHandler() {
      // 삭제를 누를 시 delete로 editOrDelete함수 실행
      editOrDelete("delete", ID);
    }
    function editEventHandler() {
      // 수정을 누를 시 edit로 editOrDelete함수 실행
      if (editValidation()) {
        // validcheck.js에서 import해온 적합성 검사 함수를 실행하여 검사를 통과하면 함수 호출
        editOrDelete("edit", ID);
      }
    }
    function cancelEventHandler() {
      // 취소를 눌렀을 때 이벤트를 지워줘야함 or 다른 리뷰의 수정 및 삭제에서 이벤트가 살아있어 하나뿐인 모달에 두 개 이상의 이벤트가 들어가서 여러 개의 리뷰가 삭제될 수도 있음
      modal.style.display = "none"; // 모달창 꺼주고
      deleteButton.removeEventListener("click", deleteEventHandler); // 삭제 버튼의 이벤트를 삭제해줌
      editButton.removeEventListener("click", editEventHandler); // 수정 버튼의 이벤트를 삭제해줌
    }
    deleteButton.addEventListener("click", deleteEventHandler); // 이렇게 따로 이벤트를 만들어줌
    editButton.addEventListener("click", editEventHandler);
    cancelButton.addEventListener("click", cancelEventHandler);
  });
}

function showReview(data) {
  // data에 담긴 리뷰들을 화면에 출력
  let { ID, name, msg, time } = data; // 구조분해할당으로 받아온 데이터를 각각의 변수에 넣어주고
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
  reviewSpace.appendChild(toChange); // 이렇게 html에 바로 넣지 않고 append child 하는 이유가 += 으로 넣으면 저장소가 달라져서 이전의 수정 및 삭제 버튼들의 이벤트가 전부 사라지게 됨
  buttonEditDelete = document.querySelectorAll(".btn.btn-danger"); // 수정 및 삭제 버튼을 모두 가져와서
  makeEvent(buttonEditDelete[buttonEditDelete.length - 2]); // 이벤트를 만들어줌 (-2한 이유는 0부터 시작해서 -1, 맨 뒤에 모달의 삭제 버튼도 class가 같아서 들어옴 -1)
}

export function inputClicked() {
  // 입력 누를 시
  const name = getName.value; // 입력된 정보들 가져오기
  const pw = getPassword.value;
  const msg = getMessage.value;
  const movieID = localStorage.getItem("exportId"); // 영화 ID엔 현재 페이지의 ID(exportID) 저장
  const today = new Date().toLocaleString();
  let ID = name;
  if (
    localStorage.getItem("IDs") !== null &&
    localStorage.getItem("IDs") !== undefined &&
    localStorage.getItem("IDs") !== ""
  ) {
    // IDs에 중복된 ID가 있는지 확인하려는데 비어있거나 그런 경우를 제외시켜줌
    let IDs = localStorage.getItem("IDs").split(","); // IDs를 불러와서 쉼표(,)기준으로 나눠 배열로 만들어줌
    if (IDs.find((val) => val === ID)) {
      // 겹치는 ID가 있다면
      let a = 0; // 뒤에 숫자를 붙여 저장
      while (IDs.find((val) => val === ID + a)) {
        // 중복되는 숫자가 없을 때까지 ++
        a++;
      }
      ID += a; // ID뒤에 숫자를 붙여줌
    }
  }
  const data = {
    // 객체에 넣어 출력 함수에 보냄
    ID: ID,
    name: name,
    msg: msg,
    time: today
  };
  showReview(data); // 코드 추가

  let editIDs = localStorage.getItem("IDs"); // editIDs에 ID들 불러오기
  if (editIDs === null || editIDs === "") editIDs = [];
  else editIDs = [editIDs];
  editIDs.push(ID); // editIDs에 ID 넣기
  localStorage.setItem("IDs", editIDs); // ID 넣은 editIDs 저장
  localStorage.setItem(ID + "name", name); // 나머지 정보 저장
  localStorage.setItem(ID + "pw", pw);
  localStorage.setItem(ID + "msg", msg);
  localStorage.setItem(ID + "movieID", movieID);
  localStorage.setItem(ID + "time", today);

  getName.value = null;
  getPassword.value = null;
  getMessage.value = null;
}

function getReview() {
  // 리뷰 불러오기
  if (localStorage.length <= 2 || localStorage.getItem("IDs") === "") return; // 저장소에 리뷰가 있다면 길이가 7이상임, IDs가 비어있다면 return
  let IDs = localStorage.getItem("IDs").split(","); // IDs(리뷰들의 ID를 모아놓은 string) 가져와서 쉼표(,)기준으로 split -> 배열 반환
  for (let i = 0; i < IDs.length; i++) {
    // IDs에 들어있는 각각의 ID에 저장된 정보들을 get 해서 출력
    if (IDs[i] === "") continue; // ID가 "" 처럼 비어있는 것이 가끔 오류로 들어오면 null로 출력되므로 continue
    const ID = IDs[i];
    const movieID = localStorage.getItem(ID + "movieID");
    if (movieID !== localStorage.getItem("exportId")) continue; // ID가 저장되어있는 영화(movieID)가 현재 상세 페이지의 ID(exportID)와 같지 않다면 continue (현재 상세페이지에 저장된 리뷰들을 가져오기 위함)
    const name = localStorage.getItem(ID + "name");
    const msg = localStorage.getItem(ID + "msg");
    const time = localStorage.getItem(ID + "time");
    // const pw = localStorage.getItem(ID + "pw"); // pw는 표시하지 않아도 됨
    const data = {
      // 객체로 정보를 모아서
      ID: ID,
      name: name,
      msg: msg,
      time: time
    };
    showReview(data); // 화면에 출력해주는 함수에 보냄
  }
}

getReview(); //(1)
