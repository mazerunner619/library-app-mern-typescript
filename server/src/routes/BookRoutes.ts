import express from "express";
import { Schemas, ValidateSchema } from "../middlewares/Validation";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
  searchForBooksQuery,
  getBookByid,
  getAllBooksByLimit,
  getBookOftheWeek,
} from "../controllers/BookController";
const router = express.Router();

router.put("/", ValidateSchema(Schemas.book.update, "body"), updateBook);
router.get("/", getAllBooksByLimit);
router.get("/query", searchForBooksQuery);
// router.get("/many", insertManyBooks);
router.get("/book-of-the-week", getBookOftheWeek);
router.get("/:bookid", getBookByid);
router.post("/", ValidateSchema(Schemas.book.create, "body"), createBook);
router.delete(
  "/:barcode",
  ValidateSchema(Schemas.book.delete, "params"),
  deleteBook
);
export default router;
