"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const PORT = 3000;
app.get('/users', (req, res) => {
    const users = JSON.parse(fs_1.default.readFileSync('./users.json', 'utf8'));
    res.send(users);
});
app.post('/users', (req, res) => {
    const users = JSON.parse(fs_1.default.readFileSync('./users.json', 'utf8'));
    let { body: user } = req;
    user = Object.assign(Object.assign({}, user), { id: (0, uuid_1.v4)() });
    const final = JSON.stringify([...users, user]);
    fs_1.default.writeFileSync('./users.json', final, 'utf-8');
    res.send(true);
});
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const users = JSON.parse(fs_1.default.readFileSync('./users.json', 'utf8'));
    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);
    const final = JSON.stringify(users);
    fs_1.default.writeFileSync('./users.json', final, 'utf-8');
    res.send(true);
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
