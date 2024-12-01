import {
  getAllBooksByLimit,
  getBookOfTheWeek,
  getParamsValus,
} from "./controllers/bookController";

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    fullName: () => {
      return "Md Atif Ansar";
    },
    bookOfTheWeek: getBookOfTheWeek,
    getAllBooksByLimit: getAllBooksByLimit,
  },
};

export default resolvers;
