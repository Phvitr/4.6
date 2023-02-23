import {json, Router} from 'express';
const bookRoutes = Router();
import {Book} from '../schemas/book.model';
import multer from 'multer';
const upload = multer();

bookRoutes.get('/create', async (req, res) => {
  res.render('createBook')
});

bookRoutes.post('/create', upload.none(), async (req, res) => {
    try {
        const bookNew = new Book(req.body);
        const book = await bookNew.save();
        if(book) {
            res.redirect('/list');
        }else res.render('error');
    }
    catch (err) {
        res.render('error');
    }
});

bookRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.body.id});
        book.title = req.body.title;
        book.description = req.body.description;
        book.author = req.body.author;
        await book.save();
        if(book) {
            res.render('success');
        }else res.render('error');
    }
    catch (err) {
        res.render('error');
    }
});

bookRoutes.get('/delete/:id', async (req, res) => {
    try {
        const book = await Book.remove({_id: req.params.id});
        res.redirect('/list');
    }
    catch (err) {
        res.render('error');
    }
})

bookRoutes.get('/list', async (req, res) => {
    try {
        const books = await Book.find();
        res.render("listBook", {books})
    }
    catch (err) {
        res.render('error');
    }
});

bookRoutes.get('/update/:id', async (req,res) => {
    try {
        const book = await Book.findOne({_id: req.params.id});
        console.log(book,'book');
        if(book) {
            res.render('updateBook', {book});
        }else {
            res.render('error');
        }
    }
    catch (err) {
        res.render('error');
    }
});

export default bookRoutes;