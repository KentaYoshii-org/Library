import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="fixed flex flex-row items-center justify-center w-screen bg-blue-200 h-[5vh]">
      <Link to={"/"} className="m-2 bg-green-200">Kenbrary</Link>
    </div>
  );
};

export default Navbar;
