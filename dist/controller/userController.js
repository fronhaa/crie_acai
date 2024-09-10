"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
class UserController {
    constructor() {
        this.users = [
            { username: 'juca@bala.com.br', password: '123' }
        ];
    }
    loginUser(req, res) {
        const { username, password } = req.body;
        const user = this.users.find(user => user.username === username && user.password === password);
        if (!user) {
            res.status(200).json({ message: 'Usuário ou senha inválidos' });
            return;
        }
        res.status(200).json({ message: 'Login bem-sucedido', user: user.username });
    }
}
exports.userController = new UserController();
