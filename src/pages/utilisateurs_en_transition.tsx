/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Label, Modal, Textarea, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiTrash, HiUpload } from "react-icons/hi";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Pagination } from "../components/Pagination";
import { MyTable } from "../components/MyTableClient";
const apiUrl = process.env["API_URL"];
const UtilsateursEnTransition: FC = function () {
  const [clientListe, setclientListe] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState(" ");
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(0);

  const header = [
    "ID",
    "Photo du client",
    "Nom du client",
    "Titre actuel du client",
    "Etat actuel du client",
    "Actions",
  ];
  const deletedSelected = async function () {
    await Promise.all(
      checkedRow.map((id) => fetch(apiUrl + "admin/supprimerCategorie/" + id))
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        console.log(res);

        fetchData();
      });
  };

  const fetchData = async function () {
    console.log(query == "" ? " " : query);
    await fetch(
      apiUrl +
        "admin/getClientsEnTransition/" +
        (query == "" ? " " : query) +
        "/" +
        skip
    )
      .then((response) => response.json())
      .then((data) => {
        setclientListe(data.clients);
        setTotal(data.total);
        setSize(data.clients.length);
        setCheckedRow([]);
        console.log(data);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    fetchData();
    console.log("Test");
  }, [query]);

  const updateSkip = (value) => {
    setSkip(value);
    fetchData();
  };

  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Gestion des clients en transition
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchClients setQuery={setQuery} refresh={fetchData} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <MyTable
                clientListe={clientListe}
                refresh={fetchData}
                checkedRow={checkedRow}
                setCheckedRow={setCheckedRow}
                header={header}
                desacUrl={apiUrl + "admin/supprimerCategorie/"}
                updateUrl={apiUrl + "admin/updateCategorie"}
                type={"client-en-transition"}
              />
            </div>
          </div>
        </div>
      </div>
      <Pagination total={total} skip={skip} setSkip={updateSkip} size={size} />
    </NavbarSidebarLayout>
  );
};

const SearchClients: FC = function ({ setQuery, refresh }) {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Rechercher
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Rechercher un client"
          onChange={async (e) => {
            await new Promise((resolve) => setTimeout(resolve, 700));
            console.log("Valeur = " + e.target.value);
            if (e.target.value == "") setQuery(" ");
            else setQuery(e.target.value);
          }}
        />
      </div>
    </form>
  );
};

const AddCatModal: FC = function ({ refresh }) {
  const [isOpen, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const addCategorie = () => {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);
    fetch(apiUrl + "admin/createCategorie", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(!isOpen);
        refresh();
      })
      .catch((error) => console.error("Error posting data:", error));
  };
  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Ajouter une catégorie
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Ajouter une catégorie</strong>
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
                  placeholder="Menuserie.."
                  className="mt-1"
                />
              </div>

              <div className="lg:col-span-2">
                <Label htmlFor="catDesc">Description de la catégorie</Label>
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
          <Button color="primary" onClick={addCategorie}>
            Ajouter la catégorie
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UtilsateursEnTransition;
