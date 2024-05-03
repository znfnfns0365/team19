const modelView = document.querySelector(".modal");
const modalOpen = document.querySelector("#editButton");
const modal = document.querySelector(".modal");
const cancelButton = document.querySelector("#cancelButton");
const buttonEditDelete = document.querySelector(".btn.btn-danger");
const makeButton = document.querySelector("#makeButton");


modalOpen.addEventListener('click',function(){
    modal.style.display = 'block';
})

cancelButton.addEventListener('click',function(){
    modal.style.display = 'none';
})

buttonEditDelete.addEventListener('click',function(){
    
})

makeButton.addEventListener('click', function(){
    
    localStorage.setItem('key', 'value');
});