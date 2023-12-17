import { useState, useEffect } from "react";
import { getReadBooks } from "../util/util";
import { Book } from "../util/types";
import { motion } from "framer-motion";

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

  return (
    <motion.div
      key="shelf"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {load ? (
        <div className="min-h-screen">loading</div>
      ) : (
        <div className="min-h-screen">
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
      )}
    </motion.div>
  );
};

export default Shelf;
