import React, { useEffect, useState } from "react";
import {
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetSpecificMovieQuery,
  useUploadImageMutation,
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
  const { data: initialMovieData, refetch: refetchMovie } =
    useGetSpecificMovieQuery(id);

  useEffect(() => {
    if (initialMovieData) {
      setMovieData(initialMovieData);
    }
  }, [initialMovieData]);

  const [updateMovie, { isLoading: isupdatingMovie }] =
    useUpdateMovieMutation();
  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const [deleteMovie] = useDeleteMovieMutation();
  // function part
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

  const handleUpdateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast
      ) {
        toast.error("please fill all required filled");
        return;
      }

      let uploadedImagePath = movieData.image;
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image:", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }
      }

      await updateMovie({
        id: id,
        updatedMovie: {
          ...movieData,
          image: uploadedImagePath,
        },
      });

      // Refetch movie data to ensure it's up-to-date
      refetchMovie();
      toast.success("movie update successfully");
      navigate("/admin/movies-list");
    } catch (error) {
      console.error("failed to updat movie:", error);
    }
  };

  const handleDeleteMovie = async () => {
    try {
      toast.success("movie deleted successfully");
      await deleteMovie(id);
      navigate("/admin/movies-list");
      refetchMovie()
    } catch (error) {
      console.error("failed to delete movie", error);
      toast.error(`failed to delete movie:${error?.message}`);
    }
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
          onClick={handleUpdateMovie}
          className=" bg-teal-500 text-white px-4 py-2 rounded font-semibold"
          disabled={isupdatingMovie || isUploadingImage}
        >
          {isupdatingMovie || isUploadingImage ? "updating..." : "update Movie"}
        </button>
        <button
          type="button"
          onClick={handleDeleteMovie}
          disabled={isupdatingMovie || isUploadingImage}
          className=" bg-red-500 text-white px-4 py-2 rounded ml-2 font-semibold"
        >
          {isupdatingMovie || isUploadingImage ? "deleting..." : "Delete Movie"}{" "}
        </button>
      </form>
    </div>
  );
};

export default MovieUpdate;
