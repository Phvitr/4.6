"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const book_router_1 = __importDefault(require("./src/router/book.router"));
const PORT = 3000;
const app = (0, express_1.default)();
app.set("view engine", "ejs");
app.set("views", "./src/views");
const DB_URL = 'mongodb://127.0.0.1:27017/book';
mongoose_1.default.connect(DB_URL)
    .then(() => console.log('DB connection established'))
    .catch(err => console.log(err.message));
app.use(body_parser_1.default.json());
app.use(book_router_1.default);
app.listen(PORT, () => {
    console.log("app listening on http://localhost:3000/list");
});
//# sourceMappingURL=index.js.map