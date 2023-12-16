import Logo from "../components/logo";

const Home = () => {
  return (
    <>
      <div className="flex flex-col w-screen h-screen">
        <h1 className="absolute w-screen top-[20%] z-10 text-center text-[2rem] md:text-[4rem] lg:text-[6rem]">
          Kenbrary
        </h1>
        <div className="w-full h-full overflow-auto">
          <Logo />
        </div>
      </div>
    </>
  );
};

export default Home;
