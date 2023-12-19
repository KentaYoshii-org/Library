import { BOOKS_API_BASE_URL, BOOKS_PER_PAGE, HAVE_READ } from "./const";
import config from "../config/config";
import axios from "axios";

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
        fields: "items(volumeInfo/title, volumeInfo/authors, volumeInfo/imageLinks/smallThumbnail)",
        maxResults: BOOKS_PER_PAGE,
        startIndex: forPage * BOOKS_PER_PAGE,
      },
    });
    return res.data.items.map((item: any) => {
      return {
        title: item.volumeInfo.title,
        // description: item.volumeInfo.description,
        imageURL: item.volumeInfo.imageLinks.smallThumbnail,
        authors: item.volumeInfo.authors,
        // publishedDate: item.volumeInfo.publishedDate,
        // pageCount: item.volumeInfo.pageCount,
      };
    });
  } catch (e) {
    console.log(e);
    return null;
  }
};
