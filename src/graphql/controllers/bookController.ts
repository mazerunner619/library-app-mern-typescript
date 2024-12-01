import { Request, Response } from "express";
import BookDao from "../../daos/BookDao";
import { findAllBooksLimited } from "../../services/BookService";
import { BookDoesNotExistError } from "../../utils/LibraryErrors";
import { GraphQLError } from "graphql";

export const getBookOfTheWeek = async () => {
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
};

interface PageT {
  limit: Number;
  page: Number;
  totalCount: Number;
}

export const getAllBooksByLimit = async (parent: null, args: PageT) => {
  // const { limit = 10, page = 1, totalCount = -1 } = req.query;
  try {
    console.log("args ==== ", args);
    const { limit = 10, page = 1, totalCount = -1 } = args;
    const paginatedBooks = await findAllBooksLimited(
      Number(limit),
      Number(page),
      Number(totalCount)
    );
    return paginatedBooks;
  } catch (error: any) {
    throw new GraphQLError("something went wrong!", {
      extensions: {
        code: "NOT FOUND",
        status: 404,
      },
    });
    // if (error instanceof BookDoesNotExistError)
    //   res.status(404).json({ message: error.message, error });
    // else res.status(500).json({ message: "could not fetch books", error });
  }
};

export const getParamsValus = ({}, args: { name: String; age: Number }) => {
  console.log("called", args);
  return "hello there";
};
