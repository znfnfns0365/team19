const modelView = document.querySelector(".modal");
const modalOpen = document.querySelector("#editButton");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");


modalOpen.addEventListener('click',function(){
    modal.style.display = 'block';
})

cancelButton.addEventListener('click',function(){
    modal.style.display = 'none';
})