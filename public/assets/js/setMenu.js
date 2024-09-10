function setMenu() {
    const url = window.location.href;

    const lastSegment = url.split('/').filter(Boolean).pop();

    const namePage = lastSegment.replace('.html', '');

    const navLink = document.querySelectorAll('.nav-menu');

    const aux = {
        payment: 'pagamento',
        home: 'dashboard'
    };

    navLink.forEach((item) => {
        if(item.querySelector('span').innerHTML.toLowerCase() == aux[namePage]) {
            item.classList.remove('collapsed');
        }else{
            item.classList.add('collapsed');
        }
    });
}

setMenu();

window.addEventListener('load', () => {
    const payload = document.querySelector('meu-payload');
    if (payload) {
        payload.remove();
    }
});