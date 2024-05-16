import {
  Button,
  Label,
  Modal,
  Select,
  Textarea,
  TextInput,
} from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiUpload } from "react-icons/hi";

export const EditService: FC = function ({
  data,
  refresh,
  updateUrl,
  catList,
}) {
  const [isOpen, setOpen] = useState(false);
  const [nom, setNom] = useState(data.nom);
  const [cat, setCat] = useState(data.categorie.nom);
  const _id = data._id;
  const [description, setDescription] = useState(data.description);
  const [image, setImage] = useState(null);

  const updateService = () => {
    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("categorie", cat);
    formData.append("id", _id);
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
        <FaPlus className="mr-3 text-sm" />
        Modifier le service
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong> Modifier le service</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <Label htmlFor="catName">Nom du service</Label>
                <Select
                  onChange={(e) => setCat(e.target.value)}
                  id="catName"
                  name="nomDeLaCat"
                  className="mt-1"
                >
                  {catList.map((e) => (
                    <option key={e._id} value={e._id}>
                      {e.nom}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="catName">Nom du service</Label>
                <TextInput
                  onChange={(e) => setNom(e.target.value)}
                  id="catName"
                  name="nomDeLaCat"
                  placeholder="Menuserie.."
                  className="mt-1"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="catDesc">Description du service</Label>
                <Textarea
                  onChange={(e) => setDescription(e.target.value)}
                  id="catDesc"
                  name="catDesc"
                  placeholder="Ajouter une description claire et succinte"
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
                        Uploader l'image du service
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
          <Button color="primary" onClick={updateService}>
            Modifier le service
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
