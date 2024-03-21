import React, { useEffect, useState } from "react";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const CreateMovie = () => {
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const [
    CreateMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetail },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
      console.log(genres[0]?._id);
    }
  }, [genres]);

  const handleChange = () => {};
  return (
    <div className="container flex justify-center items-center mt-4">
      {" "}
      <form>
        <p className=" text-green-200 w-[50rem] text-2xl mb-4">Create Movie</p>
        <div className="mb-4">
          <label className="block">
            Name:
            <input
              type="text"
              name="name"
              className="border px-2 py-1 w-full"
              value={movieData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block">
            Year:
            <input
              type="number"
              name="year"
              className="border px-2 py-1 w-full"
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
            ></textarea>
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

        <div className="mb-4">
          <label className="block">
            Genre:
            <select
              name="genre"
              value={movieData.genre}
              onChange={handleChange}
              className="border px-2 py-1 w-full"
            >
              {isLoadingGenres ?(
                <option>Loading genres...</option>
              ):(
                genres.map((genre)=>(
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>

        <div className="mb-4">
          <label>
            <input type="file" accept="image/*" />
          </label>
        </div>
        <button
          type="button"
          className="bg-teal-500 text-white px-4 py-2 rounded"
        >
          create Movie
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
