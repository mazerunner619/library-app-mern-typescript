import { Request, Response } from "express";
import BookDao, { IBookModel } from "../../daos/BookDao";
import {
  findAllBooksLimited,
  modifyBook,
  queryBooks,
} from "../../services/BookService";
import { BookDoesNotExistError } from "../../utils/LibraryErrors";
import { GraphQLError } from "graphql";
import { commonError } from "../graphql";

export const searchForBooksQuery = async (parent: {}, args: { body: any }) => {
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
    } = args.body;
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
    return resultPage;
  } catch (error: any) {
    throw commonError;
  }
};

export const updateBook = async (parent: {}, args: { body: IBookModel }) => {
  const book = args.body;
  try {
    const newBook = await modifyBook(book);
    return newBook;
  } catch (error: any) {
    throw commonError;
  }
};

export const getBookByid = async (parent: {}, args: { id: string }) => {
  const { id } = args;
  try {
    const book = await BookDao.findById(id);
    return book;
  } catch (error: any) {
    throw commonError;
  }
};

export const getBookOfTheWeek = async () => {
  try {
    let result = await BookDao.aggregate([
      {
        $addFields: {
          recordCount: { $size: "$records" },
        },
      },
      {
        $sort: {
          recordCount: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    let lastIndexWithAboveCount = result.findIndex(
      (rec: any) => rec.recordCount < result[0].recordCount
    );
    if (lastIndexWithAboveCount === -1) lastIndexWithAboveCount = result.length;
    let randomIndex = Math.floor(Math.random() * lastIndexWithAboveCount);
    return result[randomIndex];
  } catch (error) {
    throw commonError;
  }
};

interface PageT {
  limit: Number;
  page: Number;
  totalCount: Number;
}

export const getAllBooksByLimit = async (parent: null, args: PageT) => {
  // const { limit = 10, page = 1, totalCount = -1 } = req.query;
  try {
    const { limit = 10, page = 1, totalCount = -1 } = args;
    const paginatedBooks = await findAllBooksLimited(
      Number(limit),
      Number(page),
      Number(totalCount)
    );
    return paginatedBooks;
  } catch (error: any) {
    throw commonError;
  }
};
