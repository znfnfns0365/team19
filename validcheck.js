import { inputClicked } from "./reviewEdit.js";
const review_error = document.querySelector(".review_error");
const review_msg = document.querySelector(".review_error");
const review_name = document.querySelector(".review_name");
const review_pwd = document.querySelector(".review_pwd");
const review_btn = document.querySelector(".review_btn");
const review_modify_name = document.querySelector(".review_modify_name");
const review_modify_pw = document.querySelector(".review_modify_pw");
const review_modify_btn = document.querySelector(".review_modify_btn");
const review_modify_error = document.querySelector(".review_modify_error");
// 아이디: 글자 수 제한 ( 2글자~12글자)
function idLength(value) {
  return value.length >= 2 && value.length <= 12;
}
// 아이디: 영어 or 숫자만 가능
function onlyNumberAndEnglish(str) {
  return /^[A-Za-z0-9][A-Za-z0-9]*$/.test(str);
}
// 비밀번호 : 8글자 이상, 영문, 숫자, 특수문자 사용
function strongPassword(str) {
  return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&~])[A-Za-z\d@$!%*#?&~]{8,}$/.test(str);
}
// 리뷰 아이디 이벤트
review_name.onkeyup = function () {
  let return_value = false;
  //에러값 초기화
  review_error.innerHTML = "";
  if (review_name.value.length !== 0) {
    // 영어 또는 숫자 외의 값을 입력했을 경우
    if (onlyNumberAndEnglish(review_name.value) === false) {
      review_error.innerHTML = "<p>아이디 오류 : 영어 혹은 숫자만 입력하시오</p>";
    }
    // 길이 미만 혹은 초과일 경우
    else if (idLength(review_name.value) === false) {
      review_error.innerHTML = "<p>아이디 오류 : 2~12글자이어야 합니다. </p>";
    } else {
      return_value = true;
    }
  }
  return return_value;
};
// 리뷰 비밀번호 이벤트
review_pwd.onkeyup = function () {
  let return_value = false;
  //에러값 초기화
  review_error.innerHTML = "";
  // 8글자 이상, 영문, 숫자, 특수문자 외의 값을 입력했을경우
  if (review_pwd.value.length !== 0) {
    if (strongPassword(review_pwd.value) === false) {
      review_error.innerHTML = "<p>비밀번호 오류 : 8글자 이상, 영문, 숫자, 특수문자이어야 합니다.</p>";
    } else {
      return_value = true;
    }
  }
  return return_value;
};
// 입력버튼을 누른다면
review_btn.addEventListener("click", function () {
  // 아이디의 값을 제대로 입력하지 못했을때 오류메시지
  if (!review_name.onkeyup()) {
    alert("아이디 재확인 요망");
  } else if (!review_pwd.onkeyup()) {
    alert("비밀번호 재확인 요망");
  } else {
    alert("정상적으로 저장되었습니다.");
    inputClicked();
  }
});


// ///////////////////////////////////////////////////////////
// 수정 리뷰 아이디 이벤트
review_modify_name.onkeyup = function () {
  let return_value = false;
  //에러값 초기화
  review_modify_error.innerHTML = "";
  if (review_modify_name.value.length !== 0) {
    // 영어 또는 숫자 외의 값을 입력했을 경우
    if (onlyNumberAndEnglish(review_modify_name.value) === false) {
      review_modify_error.innerHTML = "<p>아이디 오류 : 영어 혹은 숫자만 입력하시오</p>";
    }
    // 길이 미만 혹은 초과일 경우
    else if (idLength(review_modify_name.value) === false) {
      review_modify_error.innerHTML = "<p>아이디 오류 : 2~12글자이어야 합니다. </p>";
    } else {
      return_value = true;
    }
  }
  return return_value;
};
// 수정 리뷰 비밀번호 이벤트
review_modify_pw.onkeyup = function () {
  let return_value = false;
  //에러값 초기화
  review_modify_error.innerHTML = "";
  // 8글자 이상, 영문, 숫자, 특수문자 외의 값을 입력했을경우
  if (review_modify_pw.value.length !== 0) {
    if (strongPassword(review_modify_pw.value) === false) {
      review_modify_error.innerHTML = "<p>비밀번호 오류 : 8글자 이상, 영문, 숫자, 특수문자이어야 합니다.</p>";
    } else {
      return_value = true;
    }
  }
  return return_value;
};
// 수정 입력버튼을 누른다면
review_modify_btn.addEventListener("click", function () {
  // 아이디의 값을 제대로 입력하지 못했을때 오류메시지
  if (!review_modify_name.onkeyup()) {
    alert("아이디 재확인 요망");
  } else if (!review_modify_pw.onkeyup()) {
    alert("비밀번호 재확인 요망");
  } else {
    alert("정상적으로 저장되었습니다.");
    inputClicked();
  }
});
