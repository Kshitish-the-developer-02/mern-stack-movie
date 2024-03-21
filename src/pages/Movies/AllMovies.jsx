import React from "react";
import banner from "../../assets/banner.jpg";
import { useFetchGenresQuery } from "../../redux/api/genre";
const AllMovies = () => {
  const { data: genres } = useFetchGenresQuery();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem]">
      {" "}
      <>
        <section>
          <div
            className="relative h-[50rem] w-screen mb-5 flex items-center justify-center bg-cover"
            style={{ backgroundImage: `url(${banner})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>

            <div className="relative z-10 text-center text-white mt-[10rem]">
              <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
              <p className="text-2xl">
                Cinematic Odyssey: Unveiling the Magic of Movies
              </p>
            </div>
            <section className="absolute -bottom-[5rem]">
              <input
                type="text"
                className="w-[100%] h-[5rem] border px-10 outline-none rounded"
                placeholder="Search Movie"
              />
              <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
                <select className="border p-2 rounded text-black">
                  <option>genre</option>
                  {genres?.map((genre) => (
                    <option key={genre._id} value={genre._id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
                <select className="border p-2 rounded ml-4 text-black">
                  <option value="">Year</option>
                </select>
                <select
                  className="border p-2 rounded ml-4 text-black"
           
                >
                  <option value="">Sort By</option>
                  <option value="new">New Movies</option>
                  <option value="top">Top Movies</option>
                  <option value="random">Random Movies</option>
                </select>
              </section>
            </section>
          </div>
        </section>
      </>
    </div>
  );
};

export default AllMovies;
