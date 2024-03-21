import React, { useState } from "react";
import GenreForm from "../../components/GenreForm";
import {
  useCreateGenreMutation,
  useFetchGenresQuery,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} from "../../redux/api/genre";
import { toast } from "react-toastify";
import Modal from "../../components/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [creategenre] = useCreateGenreMutation();
  const [updategenre] = useUpdateGenreMutation();
  const [deltegenere] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await creategenre({ name }).unwrap();
      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created`);
        refetch();
      }
    } catch (error) {
      console.log(error);
      toast.error("creating genre failed,try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updategenre) {
      toast.error("Genre name is required");
      return;
    }
    try {
      const result = await updategenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name}is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async (e) => {
    e.preventDefault();

    try {
      const result = await deltegenere(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("gener deletion failed. try again.");
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className="md:w-3/4 p-3">
        {" "}
        <h1 className=" h-12">Manage Genres</h1>
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />
        <br />
        <div className=" flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 font-semibold"
                onClick={() => {
                  {
                    setModalVisible(true);
                    setSelectedGenre(genre);
                    setUpdatingName(genre.name);
                  }
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
