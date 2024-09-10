class Header extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <header id="header" class="header fixed-top d-flex align-items-center">

                <div class="d-flex align-items-center justify-content-between">
                <a href="home.html" class="logo d-flex align-items-center">
                    <img src="http://" alt="">
                    <span class="d-none d-lg-block">Crie Açaí</span>
                </a>
                </div>

                <nav class="header-nav ms-auto">
                <ul class="d-flex align-items-center">

                    <li class="nav-item d-block d-lg-none">
                    <a class="nav-link nav-icon search-bar-toggle " href="#">
                        <i class="bi bi-search"></i>
                    </a>
                    </li>

                    <li class="nav-item dropdown pe-3">

                    <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                        <img src="assets/img/profile-img.jpg" alt="Perfil" class="rounded-circle">
                        <span class="d-none d-md-block dropdown-toggle ps-2">Marcelo</span>
                    </a>

                    <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                        <li class="dropdown-header">
                        <h6>Marcelo Martiniano</h6>
                        <span>Desenvolvedor</span>
                        </li>
                        <li>
                        <hr class="dropdown-divider">
                        </li>

                        <li>
                        <a class="dropdown-item d-flex align-items-center" href="../../public/logout.html">
                            <i class="bi bi-box-arrow-right"></i>
                            <span>Sign Out</span>
                        </a>
                        </li>

                    </ul>
                    </li>

                </ul>
                </nav>

            </header>
        `;
    }
}

class Aside extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <aside id="sidebar" class="sidebar">

                <i class="bi bi-cup-straw toggle-sidebar-btn" style="right: -40px; position: absolute; font-size: 50pt; top: 60px; cursor: pointer;"></i>

                <ul class="sidebar-nav" id="sidebar-nav">

                <li class="nav-item">
                    <a class="nav-link nav-menu" href="./home.html">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link nav-menu" href="./payment.html">
                    <i class="bi bi-wallet2"></i>
                    <span>Pagamento</span>
                    </a>
                </li>

                </ul>

            </aside>
        `;
    }
}

class PayLoad extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
           <div style="position: fixed; top: 0; background: rgb(150 150 150 / 96%); z-index: 1000; height: 100vh; width: 100vw;"><div class="loader"></div></div>
        `;
    }
}
  
class Footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer id="footer" class="footer">
            <div class="copyright">
            &copy; Copyright <strong><span>Crie Açaí</span></strong>. Todos os direitos reservados
            </div>
        </footer>
        `;
    }
}

class Modal extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
            <!-- Modal -->
            <div class="modal fade" id="ModalCenter" tabindex="-1" role="dialog"
                aria-labelledby="ModalCenterTitle" aria-hidden="true" data-backdrop="static">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="ModalCenterTitle">Modal</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary save">Salvar</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }
}

customElements.define('meu-modal', Modal);
customElements.define('meu-payload', PayLoad);
customElements.define('meu-header', Header);
customElements.define('meu-aside', Aside);
customElements.define('meu-footer', Footer);