const typeDefs = `#graphql
  scalar Date

  type Book {
    _id:ID
    barcode: String
    cover: String
    title: String
    authors: [String]
    description: String
    subjects: [String]
    publicationDate: String
    publisher: String
    pages: String
    genre: String
    records: [String]
    status: String
    }

    input InputBook {    
    _id:ID
    barcode: String!
    cover: String
    title: String
    authors: [String]
    description: String
    subjects: [String]
    publicationDate: String
    publisher: String
    pages: String
    genre: String
    records: [String]
    status: String
    }

    type LibraryCard {
      _id:ID
        user: String
    }

    type LoanRecord {
      _id:ID
    status:String
    loanedDate:Date
    dueDate:Date
    returnedDate:Date
    patron:User
    employeeOut: User
    employeeIn:User
    item:Book
}

input InputLoanRecord {
      _id:ID
    status:String
    loanedDate:Date
    dueDate:Date
    returnedDate:Date
    patron:String
    employeeOut: String
    employeeIn:String
    item:String
}


type Pagination{
    totalCount: Int
    currentPage: Int
    totalPages:Int
    limit:Int
    pageCount:Int
    items: [Book]
}


type User {
  _id:ID
  type: String
  firstName: String
  lastName: String
  email: String
  password: String
}

input InputUser{
  _id:ID
  type: String
  firstName: String
  lastName: String
  email: String
  password: String
}

input RegisterInput{
  type: String
  firstName: String
  lastName: String
  email: String
  password: String
}


input LoginInput{
  email: String
  password: String
}

input InputRecordByProp{
  property:String
  value:String
}

type Query {
    hello:String
    fullName:String
    bookOfTheWeek:Book
    getAllBooksByLimit(limit:Int, page:Int, totalCount:Int):Pagination
    handleLogin(body:LoginInput):User
    getBookByid(id:String):Book
    searchForBooksQuery(body:InputBook):Pagination
    getAllUsers:[User]
    getUserById(id:String):User
    getAllRecords:[LoanRecord]
    getRecordsByProperty(body:InputRecordByProp):[LoanRecord]
}

type Mutation{
  handleRegister(body:RegisterInput!):User
  updateBook(body:InputBook!):Book
  updateUser(body:InputUser!):User
  updateRecord(body:InputLoanRecord!):LoanRecord
  createRecord(body:InputLoanRecord!):LoanRecord
}
`;

export default typeDefs;
