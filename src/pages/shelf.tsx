import { useState, useEffect } from "react";
import { getReadBooks } from "../util/util";
import { Book } from "../util/types";
import { motion } from "framer-motion";
import { BOOKS_PER_PAGE } from "../util/const";
import { Card, PulseCard } from "../components/card";

const pCards = Array(BOOKS_PER_PAGE).fill(0);

const Shelf = () => {
  const storedPage = localStorage.getItem("page") || 0;

  const [load, setLoad] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState(Number(storedPage));
  const [reachEnd, setReachEnd] = useState(false);
  const [scrollToTopVis, setScrollToTopVis] = useState(false);

  useEffect(() => {
    // Initial Load
    getReadBooks(page)
      .then((data) => {
        if (!data) {
          // If request errored
          return;
        }
        console.log(data);
        setBooks(data);
        setLoad(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setScrollToTopVis(true);
    } else {
      setScrollToTopVis(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onPageChange = (isNext: boolean) => {
    const pageToLoad = isNext ? page + 1 : page - 1;
    setLoad(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    localStorage.setItem("page", String(pageToLoad));
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
      {/* main content */}
      <div className="min-h-screen">
        {/* cards */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 pt-[6rem] md:pt-[8rem] lg:pt-[10rem] md:justify-items-center gap-2">
          {!load
            ? books.map((book, idx) => (
                <Card
                  key={idx}
                  id={book.id}
                  title={book.title}
                  authors={book.authors}
                  imageURL={book.imageURL}
                  categories={book.categories}
                />
              ))
            : pCards.map((_, idx) => <PulseCard key={idx} />)}
        </div>
        {!load && books.length === 0 && (
          <div className="relative flex justify-center text-center -translate-x-1/2 left-1/2">
            <p className="p-2 bg-bkg">You have reached the end!</p>
          </div>
        )}
        {/* pagination */}
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
        {scrollToTopVis && (
          <button
            id="to-top-button"
            className="fixed z-20 w-10 h-10 border-0 rounded-full bottom-5 right-5 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-bkg/90"
            onClick={() => {
              window.scroll({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-full h-full p-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Shelf;
