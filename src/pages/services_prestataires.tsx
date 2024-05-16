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

import { HiTrash } from "react-icons/hi";
import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Pagination } from "../components/Pagination";
import { MyTable } from "../components/MyTableServPresta";

export const apiUrl = "http://localhost:300/";
const ServicesPrestatairesPage: FC = function () {
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
    "Photo principale du service",
    "Nom du client",
    "Nom du service",
    "En service",
    "Actions",
  ];
  const deletedSelected = async function () {
    await Promise.all(
      checkedRow.map((id) =>
        fetch(apiUrl + "admin/supprimerServicePrestataire/" + id)
      )
    )
      .then((responses) => Promise.all(responses.map((res) => res.json())))
      .then((res) => {
        console.log(res);

        fetchData();
      });
  };

  const fetchData = async function () {
    const fetchData1 = fetch(apiUrl + "admin/getServices/");
    let theQuery, firstArgument;
    switch (typeQuery) {
      case "type":
        theQuery = "admin/getServicesPrestataire/";
        firstArgument =
          query == "" || catList.map((cat) => cat._id).includes(query)
            ? " "
            : query;
        break;
      case "service":
        theQuery = "admin/getServicesPrestataireByServ/";
        firstArgument = !catList.map((cat) => cat._id).includes(query)
          ? catList[0]._id
          : query;
        break;
      case "vendeur":
        theQuery = "admin/getServicesPrestataireByUser/";
        firstArgument =
          query == "" || catList.map((cat) => cat._id).includes(query)
            ? " "
            : query;
        break;
    }

    const urlForService = apiUrl + theQuery;
    const fetchData2 = fetch(urlForService + firstArgument + "/" + skip);

    Promise.all([fetchData1, fetchData2])
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        const data1 = data[0];
        const data2 = data[1];
        // Faites quelque chose avec les données obtenues
        setCatList(data1.services);
        setServList(data2.servicesPrestataires);
        setSize(data2.servicesPrestataires.length);
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
                typeQuery != "type" && typeQuery != "vendeur"
                  ? setQuery(catList[0]._id)
                  : setQuery(" ");
              }}
              name="nomDeLaCat"
              className="mt-1"
            >
              <option value="type">En fonction du nom</option>
              <option value="service">En fonction du service</option>
              <option value="vendeur">En fonction du vendeur</option>
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
                type={"ServicePrestataire"}
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
        ) : typeQuery == "service" ? (
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
        ) : (
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
        )}
      </div>
    </form>
  );
};

export default ServicesPrestatairesPage;
