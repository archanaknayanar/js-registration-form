const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function setError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function setSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    if(re.test(input.value.trim())){
        setSuccess(input);
    }else {
        setError(input,`Email is not valid`);
    }
}

//Check required fields
function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            setError(input, `${getFieldName(input)} is required`);
        } else {
            setSuccess(input);
        }
    });
}
//Check input length
function checkInputLength(input, min, max){
    if (input.value.length < min){
        setError(input, `${getFieldName(input)} must be atleast ${min} characters`);
    } else if (input.value.length > max){
        setError(input, `${getFieldName(input)} must be greater than ${max} characters`);
    } else {
        setSuccess(input);
    }
}

//Check if passowrds match
function checkPasswordMatch(input1, input2){
    if(input1.value !== input2.value){
        setError(input2, `Password do not match`)
    }
}

//Get field name
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
//Event listners
form.addEventListener('submit', function(e){
    e.preventDefault();

    checkRequired([username , email, password, password2]);
    checkInputLength(username, 3 , 15);
    checkInputLength(password, 6 , 25);
    checkEmail(email);
    checkPasswordMatch(password, password2);

});
