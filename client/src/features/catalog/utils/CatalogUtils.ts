import { Book } from "../../../models/Book";
import { PageInfo } from "../../../models/Page";

export const generateRandomGenres = (): string[] => {
  let genres = [
    "Non-Fiction",
    "Children",
    "Fantasy",
    "Fiction",
    "Biography",
    "Romance",
    "Science Fiction",
    "Young Adult",
  ];
  let chosen: string[] = [];
  while (chosen.length < 5) {
    let ind = Math.floor(Math.random() * 8);
    if (!chosen.includes(genres[ind])) chosen.push(genres[ind]);
  }
  return chosen;
};

export const getRandomBooksByGenre = (genre: string, books: Book[]): Book[] => {
  let filteredBooks = books.filter((book) => book.genre === genre);
  let randomBooks: Book[] = [];
  const len = filteredBooks.length;
  if (filteredBooks.length < 10) return filteredBooks;

  while (randomBooks.length < 10) {
    let ind = Math.floor(Math.random() * len);
    if (!randomBooks.some((b) => b["barcode"] === filteredBooks[ind].barcode))
      randomBooks.push(filteredBooks[ind]);
  }
  return randomBooks;
};

export const calculatePaging = (pageInfo: PageInfo): string[] => {
  let pageArr: string[] = [];

  if (pageInfo) {
    let total = pageInfo.totalPages;
    let current = pageInfo.currentPage;
    if (total <= 10) {
      for (let i = 1; i <= total; i++) pageArr.push(`${i}`);
    } else if (total > 10) {
      if (current <= 7) {
        // 1,2,3,4,5,6,7,8.. 14,15

        for (let i = 1; i <= 8; i++) pageArr.push(`${i}`);
        pageArr.push("..");
        pageArr.push(`${total - 1}`);
        pageArr.push(`${total}`);
      } else if (current > total - 7) {
        // 1,2,..,8,9,10,11,12,13,14,15
        pageArr.push(...["1", "2", ".."]);
        for (let i = total - 8; i <= total; i++) pageArr.push(`${i}`);
      } else {
        // 1,2,3 .. 6,7,8, .. ,14,15
        pageArr.push(...["1", "2", "3", ".."]);
        pageArr.push(
          ...[`${current - 1}`, `${current}`, `${current + 1}`, ".."]
        );
        pageArr.push(...[`..`, `${total - 1}`, `${total}`]);
      }
    }
  }
  return pageArr;
};
