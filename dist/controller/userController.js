"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const userModel_1 = require("../model/userModel");
class UserController {
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password) {
                res.status(400).json({ message: 'Usuário e senha são obrigatórios', erro: true });
                return;
            }
            const user = yield userModel_1.UserModel.findByUsername(username, password);
            if (!user) {
                res.status(401).json({ message: 'Usuário ou senha inválidos' });
                return;
            }
            res.status(200).json({ message: 'Login bem-sucedido', profile: user });
        });
    }
}
exports.userController = new UserController();
