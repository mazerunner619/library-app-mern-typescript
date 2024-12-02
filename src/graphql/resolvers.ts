import {
  getAllBooksByLimit,
  getBookByid,
  getBookOfTheWeek,
  searchForBooksQuery,
  updateBook,
} from "./controllers/bookController";
import {
  createRecord,
  fetchItemForLoanRecord,
  fetchUserForLoanRecord,
  getAllRecords,
  getRecordsByProperty,
  updateRecord,
} from "./controllers/recordController";
import {
  getAllUsers,
  getUserById,
  handleLogin,
  handleRegister,
  updateUser,
} from "./controllers/userController";

const resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    },
    fullName: () => {
      return "Md Atif Ansar";
    },
    bookOfTheWeek: getBookOfTheWeek,
    getAllBooksByLimit,
    handleLogin,
    getBookByid,
    searchForBooksQuery,
    getAllUsers,
    getUserById,
    getAllRecords,
    getRecordsByProperty,
  },
  Mutation: {
    handleRegister,
    updateBook,
    updateUser,
    updateRecord,
    createRecord,
  },
  LoanRecord: {
    item: fetchItemForLoanRecord,
    patron: (parent: any) => fetchUserForLoanRecord(parent, "PATRON"),
    employeeIn: (parent: any) => fetchUserForLoanRecord(parent, "EMPLOYEE_IN"),
    employeeOut: (parent: any) =>
      fetchUserForLoanRecord(parent, "EMPLOYEE_OUT"),
  },
};

export default resolvers;
