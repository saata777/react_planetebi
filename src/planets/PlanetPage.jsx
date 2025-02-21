import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";
import planetColors from "../PlanetColors";
import planetSizes from "../planetSizes";
import { ChevronDown } from "lucide-react";

function PlanetPage() {
  const { name } = useParams();
  const planet = data.find((p) => p.name.toLowerCase() === name?.toLowerCase());
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!planet)
    return (
      <div className="text-center text-white text-2xl">Planet not found</div>
    );

  const planetColor = planetColors[planet.name.toLowerCase()] || "gray";
  const planetSize = planetSizes[planet.name.toLowerCase()] || "w-48 h-48";

  return (
    <div className=" h-[100vh] w-[100%] bg-[#070724] text-white pb-0 sm:pb-6 md:overflow-hidden font-sans">
      <nav className="flex flex-row sm:flex-col pt-8 pb-7 md:pb-0 md:pt-0 md:flex-row justify-between items-center space-x-6 text-gray-400 uppercase h-[70px] sm:h-[160px] md:h-[45px] pl-[24px] pr-[24px]  sm:pl-9 sm:pr-9 border-b-1 tracking-wide">
        <h1 className="text-base flex items-center justify-center text-white font-antonio">
          THE PLANETS
        </h1>
        <div className="space-x-6 flex flex-row text-gray-400 uppercase tracking-wide">
          <button
            className=" sm:hidden md:hidden flex items-center text-gray-400 uppercase"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-align-justify"
            >
              <path d="M3 12h18" />
              <path d="M3 18h18" />
              <path d="M3 6h18" />
            </svg>{" "}
          </button>

          <div className="hidden sm:flex md:flex space-x-6 text-gray-400  tracking-wide">
            {data.map((p) => (
              <Link
                key={p.name}
                to={`/planet/${p.name.toLowerCase()}`}
                className="hover:text-white hover:uppercase hover:border-t-6 flex items-center hover:border-[#419EBB]"
              >
                {p.name}
              </Link>
            ))}
          </div>

          {isMenuOpen && (
            <div className="md:hidden sm:hidden absolute items-center justify-center left-0 top-[69px] w-full bg-gray-900 shadow-lg  z-10">
              {data.map((p) => (
                <Link
                  key={p.name}
                  to={`/planet/${p.name.toLowerCase()}`}
                  className=" flex px-4 py-2  items-center justify-between flex-row border-t-[#80808067] border-t-[1px]  h-13 text-gray-300 hover:bg-gray-700 hover:text-white transition-all"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center flex-row gap-4">
                    {" "}
                    <div
                      className="w-5 flex items-center justify-center h-5 rounded-full "
                      style={{
                        backgroundColor: planetColors[p.name.toLowerCase()],
                      }}
                    ></div>
                    {p.name}
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-chevron-right"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </nav>
      <div className="max-h-screen bg-[#070724] text-white pl-[35px] pr-[35px] md:pl-40 md:pr-40">
        <div className="flex flex-col md:flex md:flex-row md:justify-between md:w-full items-center sm:mt-12 md:mt-12">



        <div className="flex md:hidden sm:hidden mb-22  flex-row    gap-6 justify-between w-full  ">
              <button
                className={`w-full p-3  cursor-pointer  uppercase `}
                style={{
                  borderBottom: `4px solid ${selectedTab === "overview" ? planetColor : "transparent"}`,
                }}
                onClick={() => setSelectedTab("overview")}
              >
                {" "}
                <span className="">Overview</span>
              </button>
              <button
                className={`w-full p-3 cursor-pointer   uppercase `}
                style={{
                  borderBottom: `4px solid ${selectedTab === "structure" ? planetColor : "transparent"}`,
                }}
                onClick={() => setSelectedTab("structure")}
              >
                <span className=" ">Structure </span>
              </button>
              <button
                className={`w-full  p-3  cursor-pointer uppercase `}
                style={{
                  borderBottom: `4px solid ${selectedTab === "geology" ? planetColor : "transparent"}`,
                }}
                onClick={() => setSelectedTab("geology")}
              >
                 <span className="">Surface</span>
              </button>
            </div>



          <div className="md:flex-1 w-[100%] flex justify-center ">
            {selectedTab === "overview" && (
              <img
                src={planet.images.planet}
                alt={planet.name}
                className={`${planetSize}`}
              />
            )}
            {selectedTab === "structure" && (
              <img
                src={planet.images.internal}
                alt={`Internal structure of ${planet.name}`}
                className={` ${planetSize}`}
              />
            )}

            {selectedTab === "geology" && (
              <img
                src={planet.images.geology}
                alt={`Geology of ${planet.name}`}
                className={` ${planetSize}`}
              />
            )}
          </div>
          <div className="flex-1 flex flex-row w-full md:items-end sm:justify-between md:flex-col items-center justify-center md:max-w-lg">
            <div className="w-[339px]">
              <h1 className="md:text-6xl sm:text-6xl text-4xl text-center sm:text-start font-bold font-antonio">{planet.name}</h1>
              <p className="mt-4 sm:text-start text-center text-gray-300">
                {selectedTab === "overview" && planet.overview.content}
                {selectedTab === "structure" && planet.structure.content}
                {selectedTab === "geology" && planet.geology.content}
              </p>
              <p className="mt-4 sm:text-start text-center text-gray-400 text-sm">
                Source:{" "}
                <a href={planet.overview.source} className="underline">
                  Wikipedia
                </a>
              </p>
            </div>
            <div className="hidden md:flex sm:flex mt-6 w-[281px]  flex-col gap-2 justify-center md:gap-0 md:w-[350px] space-y-2">
              <button
                className={`w-full pl-9 p-3 text-left cursor-pointer border border-gray-500 uppercase hover:bg-[#8080802b]`}
                style={{
                  backgroundColor:
                    selectedTab === "overview" ? planetColor : " ",
                }}
                onClick={() => setSelectedTab("overview")}
              >
                {" "}
                0 1 <span className="ml-[35px]">Overview</span>
              </button>
              <button
                className={`w-full pl-9 p-3 text-left cursor-pointer border border-gray-500 uppercase hover:bg-[#8080802b]`}
                style={{
                  backgroundColor:
                    selectedTab === "structure" ? planetColor : "",
                }}
                onClick={() => setSelectedTab("structure")}
              >
                0 2 <span className="ml-[35px] "> Internal Structure </span>
              </button>
              <button
                className={`w-full pl-9 p-3 text-left cursor-pointer border border-gray-500 uppercase hover:bg-[#8080802b]`}
                style={{
                  backgroundColor: selectedTab === "geology" ? planetColor : "",
                }}
                onClick={() => setSelectedTab("geology")}
              >
                0 3 <span className="ml-[35px]">Surface Geology</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row sm:justify-between border-gray-500 pt-6">
          <div className="md:h-[110px] md:w-[255px] sm:h-[88px] sm:w-[168px] p-3 md:p-6 text-start flex sm:flex-col flex-row justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase">Rotation Time</p>
            <p className="text-2xl  md:text-4xl font-antonio ">
              {planet.rotation}
            </p>
          </div>
          <div className="md:h-[110px] md:w-[255px] sm:h-[88px] sm:w-[168px]  p-3 md:p-6 text-start flex sm:flex-col flex-row justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase text-sm">Revolution Time</p>
            <p className="text-2xl  md:text-4xl font-antonio ">
              {planet.revolution}
            </p>
          </div>
          <div className="md:h-[110px] md:w-[255px] sm:h-[88px] sm:w-[168px]  p-3 md:p-6 text-start flex sm:flex-col flex-row justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase text-sm">Radius</p>
            <p className="text-2xl  md:text-4xl font-antonio ">
              {planet.radius}
            </p>
          </div>
          <div className="md:h-[110px] md:w-[255px] sm:h-[88px] sm:w-[168px]  p-3 md:p-6 text-start flex sm:flex-col flex-row justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400  uppercase text-sm">Average Temp.</p>
            <p className="text-2xl  md:text-4xl font-antonio ">
              {planet.temperature}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetPage;
