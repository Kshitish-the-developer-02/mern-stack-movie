import React, { useState } from "react";
import {
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
} from "../../redux/api/movie";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const MovieUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const { data: initialMovieData } = useGetSpecificMovieQuery(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className=" container flex justify-center items-center mt-4">
      <form>
        <p className=" text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>

        <div className=" m-4">
          <label className=" block">
            Name:
            <input
              type="text"
              name="name"
              className=" border ps-2 py-1 w-full"
              value={movieData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className=" m-4">
          <label className=" block">
            Year:
            <input
              type="number"
              name="year"
              className=" border ps-2 py-1 w-full"
              value={movieData.year}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Detail:
            <textarea
              name="detail"
              className="border px-2 py-1 w-full"
              value={movieData.detail}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Cast (comma-separated):
            <input
              type="text"
              name="cast"
              className="border px-2 py-1 w-full"
              value={movieData.cast.join(",")}
              onChange={(e) =>
                setMovieData({ ...movieData, cast: e.target.value.split(",") })
              }
            />
          </label>
        </div>
        <div className=" mb-5">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "10px",
                    // backgroundColor:"#90EE90"
                  }
                : {
                    border: "0",
                    borderRadius: "0",
                    padding: "0",
                  }
            }
          >
            {!selectedImage && "Upload image"}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: !selectedImage ? "none" : "block" }}
            />
          </label>
        </div>
        <button
          type="button"
          className=" bg-teal-500 text-white px-4 py-2 rounded font-semibold"
        >
          Update
        </button>
        <button
          type="button"
          className=" bg-red-500 text-white px-4 py-2 rounded ml-2 font-semibold"
        >
          Delete
        </button>
      </form>
    </div>
  );
};

export default MovieUpdate;
