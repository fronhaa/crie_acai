const dataTable = new DataTable('#table-payment');

const btnRegister = document.querySelector('.register');
const btnSave = document.querySelector('.save');
let namei;
let description;
let type;
const modal = document.querySelector('#ModalCenter');
const modalTitle = document.querySelector('.modal-title');

let myModal = new bootstrap.Modal(modal, {
    backdrop: 'static',
});

function listPayments() {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/payment', options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        console.log(data);

        const tableData = data.data.map(element => [
            element.name,
            element.description || '',
            element.type,
            element.status ? 'ativado' : 'desativado',
            element.creation,
            element.update
        ]);

        dataTable.clear(); 
        dataTable.rows.add(tableData);
        dataTable.draw();
    })
    .catch(error => console.error('Error:', error));
}

function renderForm() {
    modalTitle.innerHTML = 'Cadastrar método de pagamento';
    const modalBody = document.querySelector('.modal-body');

    modalBody.innerHTML = ` <form>
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nome">
                </div>
                <div class="form-group">
                    <label for="descrition">Descrição</label>
                    <input type="text" class="form-control" id="descrition" aria-describedby="emailHelp" placeholder="Descrição">
                </div>
                <div class="form-group">
                    <label for="type">Tipo</label>
                    <input type="text" class="form-control" id="type" aria-describedby="emailHelp" placeholder="Tipo">
                </div>
            </form>`;

    namei = document.querySelector('#name');
    description = document.querySelector('#descrition');
    type = document.querySelector('#type');

    myModal.show();
        
}

function sendPayment() {

    let values = {
        "name": namei.value,
        "description": description.value,
        "type": type.value
    };
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: 'POST',
        body: JSON.stringify(values),
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/payment', options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        console.log(data);

        myModal.hide();

        confirmRegister(data);

        clearInputsRegisters();

        listPayments();
    })
    .catch(error => console.error('Error:', error));
}

function clearInputsRegisters() {
    namei.value = '';
    description.value = '';
    type.value = '';
}

function confirmRegister(data) {
    if (data.message === 'Método de pagamento criado com sucesso!') {
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
btnSave.onclick = sendPayment;
btnRegister.onclick = renderForm;

listPayments();