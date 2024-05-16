import { Checkbox, Table } from "flowbite-react";
import type { FC } from "react";
import { apiUrl } from "../pages/categories";
import { VoirLaDemande } from "./VoirLaDemande";
import { VoirLeClient } from "./VoirLeClient";

export const MyTable: FC = function ({
  clientListe,
  refresh,
  setCheckedRow,
  header,
  type,
}) {
  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell>
          <span className="sr-only">Toggle selected</span>
        </Table.HeadCell>
        {header.map((h) => (
          <Table.HeadCell key={h}>{h}</Table.HeadCell>
        ))}
      </Table.Head>

      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {clientListe.length > 0 ? (
          clientListe.map((cat, index) => (
            <Table.Row
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
              key={cat._id}
            >
              <Table.Cell className="w-4 p-4">
                <Checkbox
                  // checked={checkboxState[cat._id]}
                  onClick={(e) => {
                    e.target.checked
                      ? setCheckedRow((checkedRow) => {
                          checkedRow.push(cat._id);
                          e.target.checked = true;
                          return checkedRow;
                        })
                      : setCheckedRow((checkedRow) => {
                          checkedRow.pop(cat._id);
                          e.target.checked = false;
                          return checkedRow;
                        });
                  }}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400">
                <div className="text-base font-semibold text-gray-900 dark:text-white">
                  {index + 1}
                </div>
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                <img
                  className="h-20"
                  src={
                    apiUrl +
                    "uploads/images/photodeprofils/" +
                    cat.photoDeProfil
                  }
                  alt={cat.nom}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {cat.nom_complet}
              </Table.Cell>

              {type == "clients" ? (
                <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                  {cat.profession}
                </Table.Cell>
              ) : null}
              <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                {cat.role}
              </Table.Cell>
              <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white uppercase">
                {cat.actif ? "actif" : "non actif"}
              </Table.Cell>
              <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  {type == "client-en-transition" ? (
                    <VoirLaDemande user={cat} refresh={refresh} />
                  ) : null}
                  <VoirLeClient user={cat} refresh={refresh} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell>Rien trouvé oh</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  );
};
