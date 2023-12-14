import { BOOKS_API_BASE_URL, HAVE_READ } from "./const";
import config from "../config/config";
import axios from "axios";

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
    console.log(res.data)
  } catch (e) {
    console.log(e)
  }
};
