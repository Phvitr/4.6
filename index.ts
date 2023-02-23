import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bookRoutes from "./src/router/book.router";

const PORT = 3000;
const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");
const DB_URL = 'mongodb://127.0.0.1:27017/book';
mongoose.connect(DB_URL)
.then(() => console.log('DB connection established'))
.catch(err => console.log(err.message));
app.use(bodyParser.json());

app.use(bookRoutes)


app.listen(PORT, () => {
    console.log("app listening on http://localhost:3000/list");
});