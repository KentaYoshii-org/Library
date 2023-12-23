import { BOOKS_API_BASE_URL, BOOKS_PER_PAGE, HAVE_READ } from "./const";
import config from "../config/config";
import axios from "axios";

export const getBook = async (forBook: string) => {
  const endpoint = BOOKS_API_BASE_URL + "volumes/" + forBook;
  try {
    const res = await axios.get(endpoint, {
      params: {
        key: config.GAPI_KEY,
      },
    });
    const isbn = res.data.volumeInfo.industryIdentifiers[0].identifier;
    const title = res.data.volumeInfo.title;
    const subtitle =
      res.data.volumeInfo.subtitle === undefined
        ? ""
        : res.data.volumeInfo.subtitle;
    const thumbnail =
      res.data.volumeInfo.imageLinks === undefined
        ? ""
        : res.data.volumeInfo.imageLinks.thumbnail;
    const authors = res.data.volumeInfo.authors;
    const description = res.data.volumeInfo.description;
    const publishedDate = res.data.volumeInfo.publishedDate;
    const pageCount = res.data.volumeInfo.pageCount;
    return {
      isbn,
      title,
      subtitle,
      thumbnail,
      authors,
      description,
      publishedDate,
      pageCount,
    };
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
          "items(id, volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks/thumbnail, volumeInfo/categories)",
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
          : item.volumeInfo.imageLinks.thumbnail;
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
