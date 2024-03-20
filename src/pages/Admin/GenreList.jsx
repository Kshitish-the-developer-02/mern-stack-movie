import React, { useState } from "react";
import GenreForm from "../../components/GenreForm";
import { useCreateGenreMutation } from "../../redux/api/genre";
import { toast } from "react-toastify";

const GenreList = () => {
  // const{dat;genre}
  const [name, setName] = useState("");

  const [creategenre] = useCreateGenreMutation();

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
        // refetch()
      }
    } catch (error) {
      console.log(error);
      toast.error("creating genre failed,try again.");
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
      </div>
    </div>
  );
};

export default GenreList;
