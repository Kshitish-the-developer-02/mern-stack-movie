import React, { useEffect, useState } from "react";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movie";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "genre") {
      const selectedGenre = genres.find((genre) => genre.name === value);
      setMovieData((prevData) => ({
        ...prevData,
        genre: selectedGenre ? selectedGenre._id : "",
      }));
    } else {
      setMovieData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast ||
        !selectedImage
      ) {
        toast.error("please fill all required fields");
        return;
      }
      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);
        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("failed to uplod image:", uploadImageErrorDetail);
          toast.error("failed to upload image");
          return;
        }

        await CreateMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        navigate("/admin/movies-list");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          rating: 0,
          image: null,
          genre: "",
        });

        toast.success("movie added to database");
      }
    } catch (error) {
      console.error("failed to create movie: ", createMovieErrorDetail);
      toast.error(`failed to create movie:${createMovieErrorDetail?.message}`);
    }
  };

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
              {isLoadingGenres ? (
                <option>Loading genres...</option>
              ) : (
                genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))
              )}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label
            style={
              !selectedImage
                ? {
                    border: "1px solid #888",
                    borderRadius: "5px",
                    padding: "8px",
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
          className="bg-teal-500 text-white px-4 py-2 rounded"
          disabled={isCreatingMovie || isUploadingImage}
          onClick={handleCreateMovie}
        >
          {isCreatingMovie || isUploadingImage ? "Creating..." : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;


