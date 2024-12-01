const typeDefs = `#graphql

  scalar Date
  union PaginationGeneric = Book|User|LoanRecord|LibraryCard

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

    type LibraryCard {
        user: String
    }

    type LoanRecord {
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
  type: String
  firstName: String
  lastName: String
  email: String
  password: String
}

type Query {
    hello:String
    fullName:String
    bookOfTheWeek:Book
    getAllBooksByLimit(limit:Int, page:Int, totalCount:Int):Pagination
}
`;

export default typeDefs;
