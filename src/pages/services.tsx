/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Label,
  Modal,
  Textarea,
  TextInput,
  Select,
} from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiTrash, HiUpload } from "react-icons/hi";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Pagination } from "../components/Pagination";
import { MyTable } from "../components/MyTableCatAndServ";
const apiUrl = process.env["API_URL"];
const ServicesPage: FC = function () {
  const [catList, setCatList] = useState([]);
  const [typeQuery, setTypeQuery] = useState("type");
  const [servList, setServList] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState(" ");
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(0);

  const header = [
    "ID",
    "Image du service",
    "Nom du service",
    "Catégorie du service",
    "Description du service",
    "Actions",
  ];
  const deletedSelected = async function () {
    await Promise.all(
      checkedRow.map((id) => fetch(apiUrl + "admin/supprimerService/" + id))
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        console.log(res);

        fetchData();
      });
  };

  const fetchData = async function () {
    const fetchData1 = fetch(apiUrl + "admin/getCategories/");
    const urlForService =
      apiUrl +
      (typeQuery == "type" ? "admin/getServices/" : "admin/getServicesByCat/");
    const fetchData2 = fetch(
      urlForService + (query == "" ? " " : query) + "/" + skip
    );

    Promise.all([fetchData1, fetchData2])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const data1 = data[0];
        const data2 = data[1];
        // Faites quelque chose avec les données obtenues
        setCatList(data1.categories);
        setServList(data2.services);
        setSize(data2.services.length);
        setTotal(data2.total);
        setCheckedRow([]);
        console.log(data);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données :", error)
      );
  };

  const updateSkip = (value) => {
    setSkip(value);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [query, typeQuery]);
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Gestion des services
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchCategories
              setQuery={setQuery}
              refresh={fetchData}
              typeQuery={typeQuery}
              catList={catList}
            />
            <Select
              id="catName"
              onChange={(e) => {
                setTypeQuery(e.target.value);
                typeQuery != "type" ? setQuery(" ") : setQuery(catList[0]._id);
              }}
              name="nomDeLaCat"
              className="mt-1"
            >
              <option value="type">En fonction du nom</option>
              <option value="select">En fonction de la catégorie</option>
            </Select>
            <div className="flex w-full items-center sm:justify-end">
              <div className="mr-5 hidden space-x-1 pl-2 dark:border-gray-700 md:flex">
                <a
                  href="#"
                  className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <span className="sr-only">Supprimer</span>
                  <HiTrash className="text-2xl" onClick={deletedSelected} />
                </a>
              </div>
              <AddServiceModal refresh={fetchData} cat={catList} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <MyTable
                catList={servList}
                categories={catList}
                refresh={fetchData}
                checkedRow={checkedRow}
                setCheckedRow={setCheckedRow}
                header={header}
                delUrl={apiUrl + "admin/supprimerService/"}
                updateUrl={apiUrl + "admin/updateService"}
                type={"Service"}
              />
            </div>
          </div>
        </div>
      </div>
      <Pagination total={total} skip={skip} setSkip={updateSkip} size={size} />
    </NavbarSidebarLayout>
  );
};

const SearchCategories: FC = function ({ setQuery, typeQuery, catList }) {
  console.log(typeQuery);
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Rechercher
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        {typeQuery == "type" ? (
          <TextInput
            id="products-search"
            name="products-search"
            placeholder="Rechercher un service"
            onChange={async (e) => {
              await new Promise((resolve) => setTimeout(resolve, 700));
              console.log("Valeur = " + e.target.value);
              if (e.target.value == "") setQuery(" ");
              else setQuery(e.target.value);
            }}
          />
        ) : (
          <Select
            id="catName"
            name="nomDeLaCat"
            className="mt-1"
            onChange={(e) => setQuery(e.target.value)}
          >
            {catList.map((e) => (
              <option key={e._id} value={e._id}>
                {e.nom}
              </option>
            ))}
          </Select>
        )}
      </div>
    </form>
  );
};

const AddServiceModal: FC = function ({ refresh, cat }) {
  const [isOpen, setOpen] = useState(false);
  const [nom, setNom] = useState("");
  const [serviceCat, setServiceCat] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const addService = () => {
    const formData = new FormData();

    formData.append("nom", nom);
    formData.append("cat_id", serviceCat ? serviceCat : cat[0]._id);
    formData.append("description", description);
    formData.append("image", image);
    console.log(formData.get("nom"));
    fetch(apiUrl + "admin/createService", {
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
        Ajouter un service
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Ajouter un service</strong>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <Label htmlFor="catName">Catégorie du service</Label>
                <Select
                  onChange={(e) => setServiceCat(e.target.value)}
                  id="catName"
                  name="nomDeLaCat"
                  className="mt-1"
                >
                  {cat.map((e) =>
                    e.actif ? (
                      <option key={e._id} value={e._id}>
                        {e.nom}
                      </option>
                    ) : null
                  )}
                </Select>
              </div>
              <div className="lg:col-span-2">
                <Label htmlFor="catName">Nom du service</Label>
                <TextInput
                  onChange={(e) => setNom(e.target.value)}
                  id="catName"
                  name="nomDeLaCat"
                  placeholder="Reparer une ampoules.."
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
          <Button color="primary" onClick={addService}>
            Ajouter le service
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServicesPage;
