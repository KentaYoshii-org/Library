import { BOOKS_API_BASE_URL, HAVE_READ } from "./const";
import config from "../config/config";
import axios from "axios";

// https://www.googleapis.com/books/v1/users/104441398805365912831/bookshelves/4/volumes?key=AIzaSyCHZwbkQlV_KbeKYncevlYlih_fLXBPORw
// https://www.googleapis.com/books/v1/users/104441398805365912831/bookshelves/5/volumes?key=AIzaSyCHZwbkQlV_KbeKYncevlYlih_fLXBPORw
export const getReadBooks = async () => {
  const endpoint =
    BOOKS_API_BASE_URL +
    "users/" +
    config.BUID +
    "/bookshelves/" +
    HAVE_READ +
    "/volumes";
  try {
    const res = await axios.get(endpoint, {
      params: {
        key: config.GAPI_KEY,
      },
    });
    return res.data.items.map((item: any) => {
      return {
        title: item.volumeInfo.title,
        description: item.volumeInfo.description,
        imageURL: item.volumeInfo.imageLinks.smallThumbnail,
        authors: item.volumeInfo.authors,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
      };
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};
