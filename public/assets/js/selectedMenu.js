selectedMenu;

const dataTable = new DataTable('#table');

const btnRegister = document.querySelector('.register');
const btnSave = document.querySelector('.save');
let namei;
let description;
let type;
const modal = document.querySelector('#ModalCenter');
const modalTitle = document.querySelector('.modal-title');
let btnExcluir;
let btnEditar;

let myModal = new bootstrap.Modal(modal, {
    backdrop: 'static',
});

function lists() {

    const meuPayloadElement = document.createElement('meu-payload');

    document.body.appendChild(meuPayloadElement);

    const meuPayload = document.querySelector('meu-payload');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: 'GET',
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/'+selectedMenu, options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        console.log(data);

        const tableData = popularTable(data);

        dataTable.clear(); 
        dataTable.rows.add(tableData);
        dataTable.draw();

        btnExcluir = document.querySelectorAll('.excluir');
        btnEditar = document.querySelectorAll('.edit');

        btnExcluir.forEach(element => {
            element.addEventListener('click', (event) => {
                excluir(event.target);
            });
        });

        btnEditar.forEach(element => {
            element.addEventListener('click', (event) => {
                editar(event.target);
            });
        });

        meuPayload.remove();
    })
    .catch(error => {
        console.error('Error:', error)
        meuPayload.remove();
    });
}

function renderForm() {
    modalTitle.innerHTML = 'Cadastrar unidade de medida';

    const modalBody = document.querySelector('.modal-body');

    modalBody.innerHTML = htmlForm();

    namei = document.querySelector('#name');
    description = document.querySelector('#descrition');
    
    namei.addEventListener('input', escutarInput);

    if(selectedMenu == 'payment') {
        type = document.querySelector('#type');

        type.addEventListener('input', escutarInput);

        modalTitle.innerHTML = 'Cadastrar método de pagamento';
    }

    btnSave.onclick = () => send();

    myModal.show();
        
}

function htmlForm() {
    if(selectedMenu == 'payment') {
        return ` <form>
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
    }

    return ` <form>
                <div class="form-group">
                    <label for="name">Nome</label>
                    <input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Nome">
                </div>
                <div class="form-group">
                    <label for="descrition">Descrição</label>
                    <input type="text" class="form-control" id="descrition" aria-describedby="emailHelp" placeholder="Descrição">
                </div>
            </form>`;
}

function popularTable(data) {

    if(selectedMenu == 'payment') {
        return data.data.map(element => {
            
            element.dataCriacao = element.dataCriacao.split('T')[0].split('-');
            element.dataCriacao = element.dataCriacao[2]+'/'+element.dataCriacao[1]+'/'+element.dataCriacao[0];
    
            element.dataAtualizacao = element.dataAtualizacao.split('T')[0].split('-');
            element.dataAtualizacao = element.dataAtualizacao[2]+'/'+element.dataAtualizacao[1]+'/'+element.dataAtualizacao[0];
    
            element.buttons = `
                <button type="button" id="${element.id}" class="button-action edit">Editar
                    <svg class="svg" viewBox="0 0 512 512">
                        <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                    </svg>
                </button>
                <button type="button" id="${element.id}" class="button-action excluir">Excluir
                  <svg class="delete-svgIcon svg" viewBox="0 0 448 512">
                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
                  </svg>
                </button>
            `;
    
            return [
                element.nome,
                element.descricao ?? '<spam class="orange">Sem descrição!</spam>',
                element.tipo,
                element.status ? 'ativado' : 'desativado',
                element.dataCriacao,
                element.dataAtualizacao,
                element.buttons
            ]
        });
    }

    return data.data.map(element => {
            
        element.dataCriacao = element.dataCriacao.split('T')[0].split('-');
        element.dataCriacao = element.dataCriacao[2]+'/'+element.dataCriacao[1]+'/'+element.dataCriacao[0];

        element.dataAtualizacao = element.dataAtualizacao.split('T')[0].split('-');
        element.dataAtualizacao = element.dataAtualizacao[2]+'/'+element.dataAtualizacao[1]+'/'+element.dataAtualizacao[0];

        element.buttons = `
            <button type="button" id="${element.id}" class="button-action edit">Editar
                <svg class="svg" viewBox="0 0 512 512">
                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                </svg>
            </button>
            <button type="button" id="${element.id}" class="button-action excluir">Excluir
              <svg class="delete-svgIcon svg" viewBox="0 0 448 512">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path>
              </svg>
            </button>
        `;

        return [
            element.nome,
            element.descricao ?? '<spam class="orange">Sem descrição!</spam>',
            element.dataCriacao,
            element.dataAtualizacao,
            element.buttons
        ]
    });
}

function send(id) {

    console.log('id: '+id);

    let method = 'POST';
    let idParam = '';

    if(id) {
        method = 'PUT';
        idParam = '/'+id;
    }

    if(namei.value.length == 0 || (type && type.value.length == 0)) {
        alertInput();
        return;
    }

    let values = {
        "nome": namei.value,
        "descricao": description.value,
    };;

    if(selectedMenu == 'payment') {
        values = {
            "nome": namei.value,
            "descricao": description.value,
            "tipoPagamento": type.value
        };
    }
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: method,
        body: JSON.stringify(values),
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/'+selectedMenu+idParam, options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        console.log(data);

        myModal.hide();

        confirmRegister(data);

        clearInputsRegisters();

        lists();
    })
    .catch(error => {
        const data = {message: 'Algo deu errado! Por favor, tente novamente em alguns minutos.', erro: true};
        errorLogin(data);
    });
}

function excluir(event) {
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: "follow"
    };

    fetch(apiUrl+'/'+selectedMenu+'/'+event.id, options)
    .then(response => response.json())
    .then(data => {

        if(errorLogin(data)){
            return;
        }

        console.log(data);

        /* confirmRegister(data); */

        let tr = event.parentElement.parentElement;

        tr.classList.add('remove-tr')

        setTimeout(() => {
            tr.remove();
        }, 1000);
    })
    .catch(error => {
        const data = {message: 'Algo deu errado! Por favor, tente novamente em alguns minutos.', erro: true};
        errorLogin(data);
    });
}

function clearInputsRegisters() {
    namei.value = '';
    description.value = '';
    if(type) {
        type.value = '';
    }
}

function confirmRegister(data) {
    if (data.ok) {
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

function alertInput() {
    if(type && type.value.length == 0) {
        type.style.border = '1px solid red';
    }

    if(namei.value.length == 0) {
        namei.style.border = '1px solid red';
    }
}

function escutarInput(event) {
    if(event.target.value.length > 0) {
        event.target.style.border = '1px solid #ced4da';
    }
}

function editar(event) {

    renderForm();

    const data = event.parentElement.parentElement.children;

    const descrition = data[1].querySelector('spam');

    namei.value = data[0].innerHTML;
    description.value = (descrition && descrition.innerHTML == 'Sem descrição!' ? '' : data[1].innerHTML);
    if(type) {
        type.value = data[2].innerHTML;   
    }

    document.querySelector('.modal-title').innerHTML = 'Atualizar método de pagamento';

    btnSave.onclick = () => send(event.id);
}

btnCloseAlertWarning.onclick = closeAlertWarnig;
btnRegister.onclick = renderForm;

lists();