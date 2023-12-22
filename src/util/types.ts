export type Book = {
  id: string;
  title: string;
  imageURL: string;
  authors: string[];
  categories: string[];
};

export type BookDetail = {
    isbn: string;
    title: string;
    subtitle: string;
    thumbnail: string;
    authors: string[];
    description: string;
    publishedDate: string;
    pageCount: number;
}
