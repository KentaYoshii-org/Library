import { useState, useEffect } from "react";
import { getReadBooks } from "../util/util";
import { Book } from "../util/types";
import { motion } from "framer-motion";

const Shelf = () => {
  const [load, setLoad] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Initial Load
    getReadBooks(page)
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
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-[6rem] md:pt-[8rem] lg:pt-[10rem] md:justify-items-center gap-2">
            {books.map((book, idx) => (
              <div key={idx} className="relative flex p-2 sm:p-4 backdrop-blur-[3px] w-[100%] h-[100%]">
                <img src={book.imageURL} className="basis-3/12" />
                <div className="text-right basis-9/12">
                  <h2 className="text-[1rem] sm:text-[1.25rem] underline w-[100%]">
                    {book.title}
                  </h2>
                  <p className="text-[1rem] pt-2">
                    {book.authors.join(",")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Shelf;
