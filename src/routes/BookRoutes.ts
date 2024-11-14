import express from "express";
import { Schemas, ValidateSchema } from "../middlewares/Validation";
import { createBook, deleteBook, getAllBooks, updateBook, insertManyBooks, searchForBooksQuery, getBookByid, getAllBooksByLimit } from "../controllers/BookController";
const router = express.Router();

router.get("/", getAllBooksByLimit);
router.get('/query', searchForBooksQuery);
router.get('/:bookid', getBookByid);
router.post("/", ValidateSchema(Schemas.book.create, "body"), createBook);
router.delete('/:barcode', ValidateSchema(Schemas.book.delete, "params"), deleteBook);
router.put('/', ValidateSchema(Schemas.book.update, "body"), updateBook);
router.get('/many', insertManyBooks);

export default router;
