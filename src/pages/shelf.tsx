import { useState, useEffect } from "react";
import { getReadBooks } from "../util/util";
import { Book } from "../util/types";
import { motion } from "framer-motion";
import { BOOKS_PER_PAGE } from "../util/const";
import { Card, PulseCard } from "../components/card";

const pCards = Array(BOOKS_PER_PAGE).fill(0);

const Shelf = () => {
  const [load, setLoad] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(0);
  const [reachEnd, setReachEnd] = useState(false);

  useEffect(() => {
    // Initial Load
    getReadBooks(page)
      .then((data) => {
        if (!data) {
          // If request errored
          return;
        }
        setBooks(data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onPageChange = (isNext: boolean) => {
    const pageToLoad = isNext ? page + 1 : page - 1;
    setLoad(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getReadBooks(pageToLoad)
      .then((data) => {
        if (!data) {
          return;
        }
        setPage(pageToLoad);
        if (data.length < BOOKS_PER_PAGE) {
          // Reach the end of bookshelf
          setReachEnd(true);
        } else {
          setReachEnd(false);
        }
        setBooks(data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <motion.div
      key="shelf"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="min-h-screen">
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-[6rem] md:pt-[8rem] lg:pt-[10rem] md:justify-items-center gap-2">
          {!load
            ? books.map((book, idx) => (
                <Card
                  key={idx}
                  title={book.title}
                  authors={book.authors}
                  imageURL={book.imageURL}
                />
              ))
            : pCards.map((_, idx) => <PulseCard key={idx} />)}
        </div>
        <div className="flex justify-center pt-5 pb-5 ">
          {page !== 0 && (
            <button
              onClick={() => {
                onPageChange(false);
              }}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium border rounded-lg me-3 bg-bkg hover:bg-gray-400 border-content"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Previous
            </button>
          )}
          {!reachEnd && (
            <button
              onClick={() => {
                onPageChange(true);
              }}
              className="flex items-center justify-center h-8 px-3 text-sm font-medium border rounded-lg bg-bkg hover:bg-gray-400 border-content"
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Shelf;
