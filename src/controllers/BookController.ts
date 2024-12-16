import { Request, Response } from "express";
import {
  findAllBooks,
  removeBook,
  modifyBook,
  registerBook,
  queryBooks,
  findAllBooksLimited,
} from "../services/BookService";
import BookDao from "../daos/BookDao";
import fs from "fs";
import { BookDoesNotExistError } from "../utils/LibraryErrors";

export const getAllBooksByLimit = async (req: Request, res: Response) => {
  const { limit = 10, page = 1, totalCount = -1 } = req.query;
  try {
    const paginatedBooks = await findAllBooksLimited(
      Number(limit),
      Number(page),
      Number(totalCount)
    );
    res
      .status(200)
      .json({ message: "fetched all books", page: paginatedBooks });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError)
      res.status(404).json({ message: error.message, error });
    else res.status(500).json({ message: "could not fetch books", error });
  }
};

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await findAllBooks();
    res
      .status(200)
      .json({ message: "fetched all books", count: books.length, books });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError)
      res.status(404).json({ message: error.message, error });
    else res.status(500).json({ message: "could not fetch books", error });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  const { barcode } = req.params;
  try {
    await removeBook(barcode);
    res.status(200).json({ message: "book deleted" });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError)
      res.status(404).json({ message: error.message, error });
    else res.status(500).json({ message: "could not delete book", error });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  const book = req.body;
  try {
    const newBook = await modifyBook(book);
    res.status(200).json({ message: "book updated", newBook });
  } catch (error: any) {
    if (error instanceof BookDoesNotExistError)
      res.status(404).json({ message: error.message, error });
    res.status(500).json({ message: "could not update book", error });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const book = req.body;
  try {
    const newBook = await registerBook(book);
    res.status(200).json({ message: "book created", newBook });
  } catch (error: any) {
    res.status(500).json({ message: "could not create book", error });
  }
};

export const insertManyBooks = async (req: Request, res: Response) => {
  try {
    const books: any = await fs.promises.readFile("./books.json", {
      encoding: "utf-8",
      flag: "r",
    });
    const booksArray = JSON.parse(books);
    let op = await BookDao.insertMany(booksArray);
    res.status(200).json({ message: "books inserted" });
  } catch (error: any) {
    res.status(500).json({ message: "could not insert books", error });
  }
};

export const searchForBooksQuery = async (req: Request, res: Response) => {
  try {
    let {
      barcode,
      title,
      author,
      description,
      subject,
      genre,
      page = 1,
      limit = 10,
      totalCount = -1,
    } = req.query;
    const resultPage = await queryBooks(
      Number(page),
      Number(limit),
      Number(totalCount),
      title as string,
      barcode as string,
      description as string,
      author as string,
      subject as string,
      genre as string
    );
    res.status(200).json({ message: "fetched books", page: resultPage });
  } catch (error: any) {
    res.status(500).json({ message: "could not fetch query books", error });
  }
};

export const getBookByid = async (req: Request, res: Response) => {
  const { bookid } = req.params;
  try {
    const book = await BookDao.findById(bookid);
    res.status(200).json({ message: "fetched books", book });
  } catch (error: any) {
    res.status(500).json({ message: "could not fetch books", error });
  }
};
