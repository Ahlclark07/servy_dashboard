/* eslint-disable jsx-a11y/anchor-is-valid */
import { Label, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import NavbarSidebarLayout from "../layouts/navbar-sidebar";
import { Pagination } from "../components/Pagination";
import { MyTable } from "../components/MyTableClient";
const apiUrl = process.env["API_URL"];
console.log(apiUrl);
const Vendeurs: FC = function () {
  const [clientListe, setclientListe] = useState([]);
  const [checkedRow, setCheckedRow] = useState([]);
  const [skip, setSkip] = useState(0);
  const [query, setQuery] = useState(" ");
  const [total, setTotal] = useState(0);
  const [size, setSize] = useState(0);

  const header = [
    "ID",
    "Photo du vendeur",
    "Nom du vendeur",
    "Profession du vendeur",
    "Titre actuel du vendeur",
    "Etat actuel du vendeur",
    "Actions",
  ];

  const fetchData = async function () {
    console.log(query == "" ? " " : query);
    await fetch(
      apiUrl +
        "admin/getUsers/vendeur/" +
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
    console.log(
      apiUrl +
        "admin/getUsers/vendeur/" +
        (query == "" ? " " : query) +
        "/" +
        skip
    );
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
                type={"clients"}
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

export default Vendeurs;
