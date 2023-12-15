import { useState, useEffect } from "react";
import { getReadBooks } from "../util/util";
import { Book } from "../util/types";

const Shelf = () => {
  const [load, setLoad] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    // Initial Load
    getReadBooks()
      .then((data) => {
        if (!data) {
          return;
        }
        setBooks(data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (load) {
    return <div>loading</div>;
  }

  return (
    <div>
      {books.map((book, idx) => (
        <div key={idx}>
          <h2>{book.title}</h2>
          <ul>
            <li>{book.pageCount}</li>
            <li>{book.publishedDate}</li>
          </ul>
          <p>{book.authors.join(",")}</p>
          <img src={book.imageURL} />
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Shelf;
