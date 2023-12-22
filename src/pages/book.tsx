import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getBook } from "../util/util";

const mockD = {
  title: "mock",
  authors: ["mock mock"],
  thumbnail:
    "http://books.google.com/books/content?id=v-JNfZOfYOwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE71N0oEmqVThRnkSFgcmVtaFZgLEIgYzV3aO-gORfjE52ksBPHZnHJPPGNvjOCI_2qHRvhS1xHQGL1nzJOpus3ef2pXm5K6FjvhIofEzmxYK2Ov7GWfoGXZbPl94je6ZkPaIGpec&source=gbs_api",
};

const Book = () => {
  let { book } = useParams();
  const [load, setLoad] = useState(true);
  useEffect(() => {
    //
    setLoad(false);
    //

    // getBook(book!)
    //   .then(() => {
    //     setLoad(false);
    //   })
    //   .catch((e) => console.log(e));
  }, []);

  return (
    <div id="content" className="relative flex justify-center min-h-screen pt-[25%] md:pt-[0%] md:items-center">
      {load ? (
        <div>Loading</div>
      ) : (
        <div className="container w-full h-full mx-auto bg-bkg">
          <div id="image" className="flex items-center justify-center">
            <img src={mockD.thumbnail} className="m-5" />
          </div>
          <div className="m-1 text-center">
            <h2 className="text-[1.75rem] white-space-normal">Botchan</h2>
            <h3 className="text-[1.5rem] inline"> - a novel </h3>
            <p> Soseki Natsume</p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-5">
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">300</p>
                <p>pages</p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">1928-10-01</p>
                <p>published</p>
              </div>
              <div className="flex flex-col justify-center divide-y-2">
                <p className="font-bold">3r29r4380r90</p>
                <p>ISBN-10</p>
              </div>
            </div>
            <div className="pt-10 pb-5">
              "The long-awaited magnum opus from Haruki Murakami, in which this
              revered and bestselling author gives us his hypnotically
              addictive, mind-bending ode to George Orwell's 1984. The year is
              1984. Aomame is riding in a taxi on the expressway, in a ..."
            </div>
          </div>
          <div className="flex justify-center pb-5">
            <Link to="/bookshelf" className="p-1 pl-2 pr-2 transition-colors border-2 rounded-md hover:bg-gray-400">Back</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Book;
