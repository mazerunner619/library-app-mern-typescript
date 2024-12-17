import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../models/Book";
import axios from "axios";
import { PageInfo } from "../../models/Page";
import {
  CheckinBookPayload,
  CheckoutBookPayload,
  LoanRecordItemWithIdAndTitle,
} from "../../models/LoanRecord";
import { LoanRecord } from "../../models/LoanRecord";
const BASE_URL = import.meta.env.VITE_BASE_URL;

interface BookSliceState {
  loading: boolean;
  error: boolean;
  errorDetail: any;
  books: Book[];
  pagingInfo: PageInfo | undefined;
  currentBook: Book | undefined;
  currentBookLoanRecord: LoanRecord[];
}

const initialState: BookSliceState = {
  loading: false,
  error: false,
  errorDetail: undefined,
  books: [],
  pagingInfo: undefined,
  currentBook: undefined,
  currentBookLoanRecord: [],
};

export const checkoutBook = createAsyncThunk(
  "book/checkout",
  async (payload: CheckoutBookPayload, thunkAPI) => {
    try {
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 14);
      let result = await axios.get(
        BASE_URL + `/api/card/${payload.libraryCard}`
      );
      const patronId = result.data.libraryCard.user;
      const record = {
        status: "LOANED",
        loanedDate: new Date(),
        dueDate: dueDate,
        patron: patronId,
        employeeOut: payload.employee._id,
        item: payload.book._id,
      };
      result = await axios.post(BASE_URL + "/api/record", record);
      return result.data.record;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const checkinBook = createAsyncThunk(
  "book/checkin",
  async (payload: CheckinBookPayload, thunkAPI) => {
    try {
      let result = await axios.post(BASE_URL + "/api/record/query", {
        property: "_id",
        value: payload.book.records[0],
      });
      const loanRecord: LoanRecordItemWithIdAndTitle = result.data.records[0];
      const record = {
        _id: loanRecord._id,
        status: "AVAILABLE",
        loanedDate: loanRecord.loanedDate,
        dueDate: loanRecord.dueDate,
        returnedDate: new Date(),
        patron: loanRecord.patron,
        employeeOut: loanRecord.employeeOut,
        employeeIn: payload.employee._id,
        item: loanRecord.item._id,
      };
      result = await axios.put(BASE_URL + "/api/record", record);
      return result.data.record;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAllBooks = createAsyncThunk(
  "book/all",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL + "/api/book");
      return data.books;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const queryBooks = createAsyncThunk(
  "book/query",
  async (payload: string, thunkAPI) => {
    try {
      const { data } = await axios.get(BASE_URL + `/api/book/query${payload}`);
      console.log(data.page);
      return data.page;
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const loadBookByBarcode = createAsyncThunk(
  "book/barcode",
  async (payload: string, thunkAPI) => {
    try {
      const { data } = await axios.get(
        BASE_URL + `/api/book/query?barcode=${payload}`
      );
      let book = data.page.items[0];
      if (!book || book.barcode !== payload)
        throw new Error("not found book with this barcode");
      let bookLoanRecord = await axios.post(BASE_URL + "/api/record/query", {
        property: "item",
        value: book._id,
      });
      // bookLoanRecord = bookLoanRecord.data.records;
      return { book: book, bookLoanRecord: bookLoanRecord.data.records };
    } catch (error: any) {
      if (error.response?.data?.message)
        return thunkAPI.rejectWithValue(error.response.data.message);
      else return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const BookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setCurrentBook(state, action: PayloadAction<Book | undefined>) {
      return {
        ...state,
        currentBook: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state) => {
      return {
        ...state,
        loading: true,
        error: false,
        errorDetail: undefined,
        books: [],
      };
    });

    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        books: action.payload,
      };
    });

    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: action.payload,
      };
    });

    builder.addCase(queryBooks.pending, (state) => {
      return {
        ...state,
        loading: true,
        books: [],
      };
    });

    builder.addCase(queryBooks.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        books: action.payload.items,
        pagingInfo: {
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
          currentPage: action.payload.currentPage,
          limit: action.payload.limit,
          pageCount: action.payload.pageCount,
        },
      };
    });

    builder.addCase(queryBooks.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: action.payload,
      };
    });

    builder.addCase(loadBookByBarcode.pending, (state) => {
      return {
        ...state,
        loading: true,
        currentBook: undefined,
      };
    });

    builder.addCase(checkoutBook.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(checkinBook.pending, (state) => {
      return {
        ...state,
        loading: true,
      };
    });

    builder.addCase(checkoutBook.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        books: state.books.map((book) => {
          if (book._id === action.payload.item) {
            return {
              ...book,
              records: [action.payload._id, ...book.records],
              status: "LOANED",
            };
          } else return book;
        }),
      };
    });

    builder.addCase(checkinBook.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        books: state.books.map((book) => {
          if (book._id === action.payload.item) {
            return { ...book, status: "AVAILABLE" };
          } else return book;
        }),
      };
    });

    builder.addCase(loadBookByBarcode.fulfilled, (state, action) => {
      return {
        ...state,
        loading: false,
        currentBook: action.payload.book,
        currentBookLoanRecord: action.payload.bookLoanRecord,
      };
    });

    builder.addCase(loadBookByBarcode.rejected, (state, action) => {
      return {
        ...state,
        loading: false,
        error: true,
        errorDetail: action.payload,
      };
    });
  },
});

export const { setCurrentBook } = BookSlice.actions;

export default BookSlice.reducer;
