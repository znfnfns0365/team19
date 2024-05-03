const modelView = document.querySelector(".modal");
const modalOpen = document.querySelector("#editButton");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");
const buttonEditDelete = document.querySelector(".btn.btn-danger");
const makeButton = document.querySelector("#makeButton");
const getName = document.querySelector("#exampleFormControlInput1");
const getPassword = document.querySelector("#exampleFormControlInput2");
const getMessage = document.querySelector("#msg");
const reviewSpace = document.querySelector("#reviewSpace")
// const  = document.querySelector("");



modalOpen.addEventListener('click', function () {
    modal.style.display = 'block';
})

cancelButton.addEventListener('click', function () {
    modal.style.display = 'none';
})

buttonEditDelete.addEventListener('click', function () {

})

makeButton.addEventListener('click', function () {
    const name = getName.value;
    const pw = getPassword.value;
    const msg = getMessage.value;
    let Id = name;
    if (localStorage.getItem(getName.value) !== null) {
        let a = 0;
        while (localStorage.getItem(`${getName.value + a}`) !== null) {
            a++;
        }
    }
    reviewSpace.innerHTML += `
    <div class="comment row">
        <div class="col">
            <div class="author fw-bold">${name}</div>
            <div class="col-auto">
                <div class="time">24-05-03 11:45</div>
            </div>
            <div class="content mt-2">${msg}</div>
        </div>
        <div class="col-auto">
            <button class="btn btn-danger" style="margin-right: -16px; margin-top: 9px;" id="editButton">수정 및 삭제</button>
        </div>
    </div>`
    // localStorage.setItem('key', 'value');
});