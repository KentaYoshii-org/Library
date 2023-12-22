import { BOOKS_API_BASE_URL, BOOKS_PER_PAGE, HAVE_READ } from "./const";
import config from "../config/config";
import axios from "axios";

export const getBook = async (forBook: string) => {
  const endpoint = BOOKS_API_BASE_URL + "volumes/" + forBook;
  try {
    const res = await axios.get(endpoint, {
      params: {
        key: config.GAPI_KEY,
        projection: "lite",
      },
    });
    console.log(res);
    return res.data;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export const getReadBooks = async (forPage: number) => {
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
        fields:
          "items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks/smallThumbnail, volumeInfo/categories)",
        maxResults: BOOKS_PER_PAGE,
        startIndex: forPage * BOOKS_PER_PAGE,
      },
    });
    if (res.status === 200 && Object.keys(res.data).length === 0) {
      // reach the end
      return [];
    }
    return res.data.items.map((item: any) => {
      const id = item.id;
      const title = item.volumeInfo.title;
      const imageURL =
        item.volumeInfo.imageLinks === undefined
          ? ""
          : item.volumeInfo.imageLinks.smallThumbnail;
      const authors = item.volumeInfo.authors;
      const categories = item.volumeInfo.categories;
      return {
        id,
        title,
        imageURL,
        authors,
        categories,
      };
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};
