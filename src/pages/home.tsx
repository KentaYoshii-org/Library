import { Link } from "react-router-dom";
import Logo from "../components/logo";
import { StarBG } from "../components/stars";
import { motion } from "framer-motion";

const Home = (props: { mode: boolean }) => {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="flex flex-col w-screen h-screen">
        <div className="relative w-full h-full overflow-auto">
          <Logo />
        </div>
        <button className="absolute text-center left-1/2 bottom-16 -translate-x-1/2 text-[2rem] md:text-[2.5rem] lg:text-[3.0rem] rounded-md pl-5 pr-5 hover:bg-gray-400 transition-colors z-10 bg-bkg/80">
          <Link to={"/bookshelf"}>Enter</Link>
        </button>
        <StarBG mode={props.mode} />
      </div>
    </motion.div>
  );
};

export default Home;
