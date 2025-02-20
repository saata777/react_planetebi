import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import data from "../data.json";
import planetColors from "../PlanetColors";
import planetSizes from "../planetSizes";

function PlanetPage() {
  const { name } = useParams();
  const planet = data.find((p) => p.name.toLowerCase() === name?.toLowerCase());
  const [selectedTab, setSelectedTab] = useState("overview");

  if (!planet)
    return (
      <div className="text-center text-white text-2xl">Planet not found</div>
    );

  const planetColor = planetColors[planet.name.toLowerCase()] || "gray";
  const planetSize = planetSizes[planet.name.toLowerCase()] || "w-48 h-48";

  return (
    <div className="min-h-[100vh] bg-[#070724] text-white pb-6 overflow-hidden font-sans">
      <nav className="flex justify-between space-x-6 text-gray-400 uppercase h-[60px] pl-9 pr-9 border-b-1 tracking-wide">
        <h1 className="text-base flex items-center text-white font-antonio">
          THE PLANETS
        </h1>
        <div className="space-x-6 flex flex-row text-gray-400 uppercase tracking-wide">
          {data.map((p) => (
            <Link
              key={p.name}
              to={`/planet/${p.name.toLowerCase()}`}
              className="hover:text-white hover:border-t-6 flex items-center hover:border-[#419EBB]"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className="max-h-screen bg-[#070724] text-white pl-40 pr-40"> 
        <div className="flex flex-col md:flex-row items-center md:items-center mt-12">
          <div className="flex-1 flex justify-center relative">
            {selectedTab === "overview" && (
              <img
              src={planet.images.planet}
              alt={planet.name}
              className={` ${planetSize}`}
             
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
                className={` w ${planetSize}`}
                
              />
            )}
          </div>
          <div className="flex-1 max-w-lg">
            <h1 className="text-6xl font-bold font-antonio">{planet.name}</h1>
            <p className="mt-4 text-gray-300">
              {selectedTab === "overview" && planet.overview.content}
              {selectedTab === "structure" && planet.structure.content}
              {selectedTab === "geology" && planet.geology.content}
            </p>
            <p className="mt-4 text-gray-400 text-sm">
              Source:{" "}
              <a href={planet.overview.source} className="underline">
                Wikipedia
              </a>
            </p>
            <div className="mt-6  space-y-2">
              <button
                className={`w-full pl-9 p-3 text-left cursor-pointer border border-gray-500 uppercase hover:bg-[#8080802b]`}
                style={{
                  backgroundColor:
                    selectedTab === "overview" ? planetColor : " "  ,
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
                  backgroundColor:
                    selectedTab === "geology" ? planetColor : "",
                }}
                onClick={() => setSelectedTab("geology")}
              >
                0 3 <span className="ml-[35px]">Surface Geology</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-wrap justify-between border-gray-500 pt-6">
          <div className="h-[128px] w-[255px] p-6 text-start flex flex-col justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase">Rotation Time</p>
            <p className="text-4xl font-antonio ">{planet.rotation}</p>
          </div>
          <div className="h-[128px] w-[255px] p-6 text-start flex flex-col justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase text-sm">Revolution Time</p>
            <p className="text-4xl font-antonio ">{planet.revolution}</p>
          </div>
          <div className="h-[128px] w-[255px] p-6 text-start flex flex-col justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase text-sm">Radius</p>
            <p className="text-4xl font-antonio ">{planet.radius}</p>
          </div>
          <div className="h-[128px] w-[255px] p-6 text-start flex flex-col justify-between border border-gray-500 rounded-lg">
            <p className="text-gray-400 uppercase text-sm">Average Temp.</p>
            <p className="text-4xl font-antonio ">{planet.temperature}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanetPage;
