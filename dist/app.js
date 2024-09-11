"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const server = (0, express_1.default)();
exports.server = server;
server.use((0, cors_1.default)());
server.use(express_1.default.json());
server.use('/', routes_1.default);
server.listen(port, () => {
    console.log('Server started on port 3000!');
});
