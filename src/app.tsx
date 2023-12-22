import Home from "./pages/home";
import Shelf from "./pages/shelf";
import { Link, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Book from "./pages/book";

const App = () => {
  const storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  const [darkMode, setDarkMode] = useState(storedTheme === "dark");
  document.documentElement.setAttribute("data-theme", storedTheme);

  const toggleMode = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const targetTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", targetTheme);
    localStorage.setItem("theme", targetTheme);
    setDarkMode((prev) => !prev);
  };

  const [scrollToTopVis, setScrollToTopVis] = useState(false);
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

  return (
    <div className="text-content bg-bkg bgTheme">
      <h1 className="absolute top-5 left-5 z-10 text-center text-[2.5rem] md:text-[3rem] lg:text-[3.rem]  rounded-md pl-3 pr-3 -translate-x-5 -translate-y-5 m-2 hover:bg-gray-400 transition-colors bg-bkg/80">
        <Link to={"/"}>Kenbrary</Link>
      </h1>
      <button
        className="absolute z-20 w-10 h-10 rounded-full md:w-12 md:h-12 lg:w-14 lg:h-14 top-3 right-3 bg-bkg/80"
        onClick={toggleMode}
        aria-label="Toggle Mode"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="absolute top-0 right-0 w-full h-full p-1 z-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d={
              darkMode
                ? "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                : "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            }
          />
        </svg>
      </button>
      <AnimatePresence>
        <Routes>
          <Route path="/" element={<Home mode={darkMode} />} />
          <Route path="/bookshelf" element={<Shelf />} />
          <Route path="/bookshelf/:book" element={<Book />} />
        </Routes>
      </AnimatePresence>
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
  );
};

export default App;
