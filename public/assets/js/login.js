const apiUrl = 'https://crie-acai-4.onrender.com';

const btnSubmeter = document.querySelector('#btn-submit');
let divAlertWarning = document.querySelector('.alert-warning') || document.querySelector('.alert-success');
const btnCloseAlertWarning = document.querySelector('.close');

function sendLogin() {

    let credentials = {
        "username": document.querySelector('#email-login').value,
        "password": document.querySelector('#password-login').value
    };
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/login', options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        const userProfile = data.profile;
        
        setCookie('userProfile', JSON.stringify(userProfile), 0.04);

        window.location.href = '../src/view/home.html';
    })
    .catch(error => console.error('Error:', error));
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return decodeURIComponent(parts.pop().split(';').shift());
    }

    return null;
}

function errorLogin(data) {
    if (data.erro) {
        divAlertWarning.style.display = 'flex';
        divAlertWarning.style.right = '0';
        divAlertWarning.classList.add('show');

        const existingAlertMessage = divAlertWarning.querySelector('p');
        if (existingAlertMessage) {
            existingAlertMessage.remove();
        }

        const alertMessage = document.createElement('p');
        alertMessage.textContent = data.message;

        const closeButton = divAlertWarning.querySelector('button');

        divAlertWarning.insertBefore(alertMessage, closeButton);

        setTimeout(() => {
            divAlertWarning.style.right = '-30%';
            divAlertWarning.classList.remove('show');
        }, 5000);

        setTimeout(() => {
            divAlertWarning.style.display = 'none';
        }, 10000);

        return true;
    }

    return false;
}

async function closeAlertWarnig() {
    divAlertWarning.style.right = '-30%';
    divAlertWarning.classList.remove('show');

    setTimeout(() => {
        divAlertWarning.style.display = 'none';
    }, 10000);
}

btnCloseAlertWarning.onclick = closeAlertWarnig;

btnSubmeter.onclick = sendLogin;