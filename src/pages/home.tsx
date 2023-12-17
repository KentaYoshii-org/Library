import { Link } from "react-router-dom";
import Logo from "../components/logo";
import { StarBG } from "../components/stars";

const Home = (props: {mode: boolean}) => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <div className="relative w-full h-full overflow-auto">
          <Logo />
        </div>
        <button className="absolute text-center left-1/2 bottom-16 -translate-x-1/2 text-[2rem] md:text-[2.5rem] lg:text-[3.0rem] rounded-full p-5 hover:bg-gray-400 transition-colors duration-100 z-10 backdrop-blur-[3px]">
          <Link to={"/bookshelf"}>Enter</Link>
          </button>
        <StarBG mode={props.mode} />
      </div>
    </>
  );
};

export default Home;
