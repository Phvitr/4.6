"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookRoutes = (0, express_1.Router)();
const book_model_1 = require("../schemas/book.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
bookRoutes.get('/create', async (req, res) => {
    res.render('createBook');
});
bookRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const bookNew = new book_model_1.Book(req.body);
        const book = await bookNew.save();
        if (book) {
            res.redirect('/list');
        }
        else
            res.render('error');
    }
    catch (err) {
        res.render('error');
    }
});
bookRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.body.id });
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if (book) {
            res.render('success');
        }
        else
            res.render('error');
    }
    catch (err) {
        res.render('error');
    }
});
bookRoutes.get('/delete/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.remove({ _id: req.params.id });
        res.redirect('/list');
    }
    catch (err) {
        res.render('error');
    }
});
bookRoutes.get('/list', async (req, res) => {
    try {
        const books = await book_model_1.Book.find();
        res.render("listBook", { books });
    }
    catch (err) {
        res.render('error');
    }
});
bookRoutes.get('/update/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id });
        console.log(book, 'book');
        if (book) {
            res.render('updateBook', { book });
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.render('error');
    }
});
exports.default = bookRoutes;
//# sourceMappingURL=book.router.js.map