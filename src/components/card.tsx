import { Link } from "react-router-dom";
import no_image from "../assets/no_image.png";

interface CardProps {
  id: string;
  imageURL: string;
  authors: string[];
  title: string;
  categories: string[];
}

export const Card = (props: CardProps) => {
  return (
    <div className="relative flex p-2 sm:p-4 bg-bkg w-[100%] gap-1 shadow-xl">
      <div className="flex items-center justify-center basis-4/12 min-h-[140px]">
        {props.imageURL === "" ? (
          <img src={no_image} className="w-4/5" />
        ) : (
          <img src={props.imageURL} />
        )}
      </div>
      <div className="relative text-right basis-8/12 min-h-[140px]">
        <Link to={"/bookshelf/" + props.id} className="text-[1rem] md:text-[1.25rem] underline underline-offset-4">
          {props.title}
        </Link>
        <p className="text-[1rem] pt-2">{props.authors.join(",")}</p>
        <div className="text-[1rem] absolute right-0 bottom-1 flex">
          {props.categories &&
            props.categories.map((c, idx) => <p key={idx} className="underline underline-offset-4 decoration-purple-400 decoration-4">{c}</p>)}
        </div>
      </div>
    </div>
  );
};

export const PulseCard = () => {
  return (
    <div className="animate-pulse relative flex p-2 sm:p-4 bg-bkg w-[100%]">
      <div className="flex items-center justify-center basis-4/12">
        <div className="w-[100px] h-[150px] bg-slate-400"></div>
      </div>
      <div className="text-right basis-8/12">
        <h2 className="text-[1rem] h-[1rem] md:text-[1.25rem] underline bg-slate-400"></h2>
        <p className="text-[1rem] pt-2 bg-slate-400 h-[1rem]"></p>
      </div>
    </div>
  );
};
