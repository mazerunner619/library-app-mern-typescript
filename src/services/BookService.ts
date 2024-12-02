import BookDao, { IBookModel } from "../daos/BookDao";
import { IBook } from "../models/Book";
import { IPagination } from "../models/pagination";
import { BookDoesNotExistError } from "../utils/LibraryErrors";

export const findAllBooksLimited = async (
  limit: number,
  page: number,
  totalCount: number
): Promise<IPagination<IBookModel>> => {
  try {
    let totalPages: number = 0;
    if (totalCount === -1) {
      totalCount = await BookDao.countDocuments();
    }
    totalPages = Math.ceil(totalCount / limit);
    const books = await BookDao.find()
      .skip((page - 1) * limit)
      .limit(limit);
    const result: IPagination<IBookModel> = {
      totalCount: totalCount,
      currentPage: page,
      totalPages: totalPages,
      limit: limit,
      pageCount: books.length,
      items: books,
    };
    return result;
  } catch (error: any) {
    throw error;
  }
};

export const findAllBooks = async (): Promise<IBookModel[]> => {
  try {
    const books = await BookDao.find();
    return books;
  } catch (error: any) {
    throw error;
  }
};

export const modifyBook = async (book: IBookModel): Promise<IBookModel> => {
  try {
    const { barcode, ...updateFields } = book;
    const updatedBook = await BookDao.findOneAndUpdate(
      { barcode: book.barcode },
      { $set: { ...updateFields } },
      { new: true }
    );
    if (updatedBook) return updatedBook;
    throw new BookDoesNotExistError("book does not exist");
  } catch (error: any) {
    throw error;
  }
};

export const registerBook = async (book: IBook): Promise<IBookModel> => {
  try {
    const newBook = new BookDao(book);
    return await newBook.save();
  } catch (error: any) {
    throw error;
  }
};

export const removeBook = async (barcode: string): Promise<boolean> => {
  try {
    const book = await BookDao.findOneAndDelete({ barcode });
    if (book) return true;
    throw new BookDoesNotExistError("book does not exist");
  } catch (error: any) {
    throw error;
  }
};

export const findBookById = async (id: string): Promise<IBookModel> => {
  try {
    const book = await BookDao.findById(id);
    if (book) return book;
    throw new BookDoesNotExistError("the book with given id does not exist");
  } catch (error) {
    throw error;
  }
};

export const queryBooks = async (
  page: number,
  limit: number,
  totalCount: number,
  title?: string,
  barcode?: string,
  description?: string,
  author?: string,
  subject?: string,
  genre?: string
): Promise<IPagination<IBookModel>> => {
  try {
    const filter = [];

    if (barcode && barcode !== "")
      filter.push({ barcode: new RegExp(barcode, "i") });
    if (title && title !== "") filter.push({ title: new RegExp(title, "i") });
    if (description && description !== "")
      filter.push({ description: new RegExp(description, "i") });
    if (author && author !== "")
      filter.push({ authors: new RegExp(author, "i") });
    if (subject && subject !== "")
      filter.push({ subjects: new RegExp(subject, "i") });
    if (genre && genre !== "") filter.push({ genre: new RegExp(genre, "i") });

    let totalPages: number = 0;
    if (totalCount === -1) {
      totalCount = await BookDao.countDocuments({
        $or: filter,
      });
    }

    totalPages = Math.ceil(totalCount / limit);
    const books = await BookDao.find({
      $or: filter,
    })
      .skip(limit * (page - 1))
      .limit(limit);

    const result: IPagination<IBookModel> = {
      totalCount: totalCount,
      currentPage: page,
      totalPages: totalPages,
      limit: limit,
      pageCount: books.length,
      items: books,
    };

    return result;
  } catch (error: any) {
    throw error;
  }
};

export const paginateBooks = (
  books: IBookModel[],
  page: number,
  limit: number
): IPagination<IBookModel> => {
  const pages = Math.ceil(books.length / Number(limit));
  let resBooks: IBookModel[] = [];
  let startIndex = (Number(page) - 1) * Number(limit);

  if (pages === page) {
    // last page
    resBooks = books.slice(startIndex);
  } else {
    resBooks = books.slice(startIndex, startIndex + limit);
  }

  const result: IPagination<IBookModel> = {
    totalCount: books.length,
    currentPage: Number(page),
    totalPages: Number(pages),
    limit: Number(limit),
    pageCount: resBooks.length,
    items: resBooks,
  };

  return result;
};
