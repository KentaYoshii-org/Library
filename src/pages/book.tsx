import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../util/util";
import { BookDetail } from "../util/types";
import no_image from "../assets/no_image.png";

const Book = () => {
  let { book } = useParams();
  const [detail, setDetail] = useState<BookDetail>();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    getBook(book!)
      .then((data) => {
        if (!data) {
          return;
        }
        setDetail(data);
        setLoad(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div
      id="content"
      className="relative flex justify-center min-h-screen pt-[6rem] md:pt-[8rem]"
    >
      {load || !detail ? (
        <div className="container w-full h-full mx-auto mb-5 bg-bkg animate-pulse min-h-[60%]">
          <div
            id="image"
            className="flex items-center justify-center"
          >
            <img className=" w-[100px] h-[150px] bg-slate-400" />
          </div>
          <div className="m-1 text-center h-[300px]">
            <h2 className="text-[1.75rem] white-space-normal bg-slate-400"></h2>
            <p className="mt-1 bg-slate-400"></p>
            <div className="flex flex-wrap items-center justify-center gap-2 mt-1">
              <div className="flex flex-col justify-center divide-y-2">
                <p className="bg-slate-400"></p>
                <p className="bg-slate-400"></p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="bg-slate-400"></p>
                <p className="bg-slate-400"></p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="bg-slate-400"></p>
                <p className="bg-slate-400"></p>
              </div>
            </div>
            <div className="pt-10 mt-5 bg-slate-400"></div>
          </div>
        </div>
      ) : (
        <div className="container w-full h-full mx-auto mb-5 bg-bkg">
          <div id="image" className="flex items-center justify-center">
            {detail.thumbnail === "" ? (
              <img src={no_image} className="w-1/3 m-5" />
            ) : (
              <img src={detail.thumbnail} className="m-5" />
            )}
          </div>
          <div className="m-1 text-center">
            <h2 className="text-[1.75rem] white-space-normal">
              {detail.title}
            </h2>
            {detail.subtitle !== "" && (
              <h3 className="text-[1.5rem] inline"> - {detail.subtitle} </h3>
            )}
            <p>{detail.authors.join(",")}</p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-5">
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">{detail.pageCount}</p>
                <p>pages</p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">{detail.publishedDate}</p>
                <p>published</p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">{detail.isbn}</p>
                <p>ISBN-10</p>
              </div>
            </div>
            <div
              className="pt-10 pb-5"
              dangerouslySetInnerHTML={{ __html: detail.description }}
            ></div>
          </div>
          <div className="flex justify-center pb-5">
            <Link
              to="/bookshelf"
              className="p-1 pl-2 pr-2 transition-colors border-2 rounded-md hover:bg-gray-400"
            >
              Back
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
