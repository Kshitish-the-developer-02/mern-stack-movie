import React from "react";
import { useGetAllMoviesQuery } from "../../redux/api/movie";
import { Link } from "react-router-dom";

const AdminMoviesList = () => {
  const { data: movies } = useGetAllMoviesQuery();
  return (
    <div className=" container mx-[9rem]">
      <div className=" flex flex-col md:flex">
        <div className=" p-3">
          <div className=" ml-[2rem] text-xl font-bold h-12">
            All Movies ({movies?.length})
          </div>
          <div className=" flex flex-wrap">
            {movies?.map((movie) => (
              <Link
                key={movie._id}
                to={`/admin/movies/update/${movie._id}`}
                className=" block mb-4 overflow-hidden"
              >
                <div className=" flex flex-row">
                  <div
                    key={movie._id}
                    className="max-w-sm  m-[2rem] rounded overflow-hidden shadow-lg"
                  >
                    <img
                      src={movie.image}
                      alt={movie.name}
                      className="w-[300px] h-[400px] object-cover"
                    />

                    <div className="px-6 py-4 border border-gray-400">
                      <div className="font-bold text-xl mb-2">{movie.name}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMoviesList;
