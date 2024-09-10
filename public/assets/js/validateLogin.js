function validateLogin() {
    const userProfileCookie = getCookie('userProfile');
    const validadeUserProfile = userProfileCookie ? JSON.parse(userProfileCookie) : null; 
    
    if(validadeUserProfile === null) {
        window.location.href = '../../public/login.html';
    }
}

document.addEventListener('DOMContentLoaded', validateLogin);