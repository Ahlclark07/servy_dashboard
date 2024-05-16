import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { HiOutlinePencilAlt, HiUpload } from "react-icons/hi";
import { apiUrl } from "../pages/categories";

export const EditCategorie: FC = function ({ data, refresh, updateUrl }) {
  const [isOpen, setOpen] = useState(false);
  const [nom, setNom] = useState(data.nom);
  const [_id, setId] = useState(data._id);
  const [description, setDescription] = useState(data.description);
  const [image, setImage] = useState(null);

  const updateCategorie = () => {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("_id", _id);
    fetch(updateUrl, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(!isOpen);
        refresh();
      })
      .catch((error) =>
        console.error("Error posting data at : ", updateUrl, " ", error)
      );
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <HiOutlinePencilAlt className="text-lg" />
        Modifier la catégorie
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Modifier la catégorie</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <Label htmlFor="catName">Nom de la catégorie</Label>
                <TextInput
                  onChange={(e) => setNom(e.target.value)}
                  id="catName"
                  name="nomDeLaCat"
                  placeholder={nom}
                  className="mt-1"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="catDesc">Description de la catégorie</Label>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="catDesc"
                  name="catDesc"
                  placeholder={description}
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="lg:col-span-2">
                <div className="flex w-full items-center justify-center">
                  <label className="flex h-32 w-full cursor-pointer flex-col rounded border-2 border-dashed border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-700">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <HiUpload className="text-4xl text-gray-300" />
                      <p className="py-1 text-sm text-gray-600 dark:text-gray-500">
                        Uploader l'image de la catégorie
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      name="catImg"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </label>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="primary" onClick={updateCategorie}>
            Modifier
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
