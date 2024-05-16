import { Checkbox, Table } from "flowbite-react";
import type { FC } from "react";
import { apiUrl } from "../pages/categories";
import { EditCategorie } from "./EditCategorie";
import { DeleteButton, DeleteCategorie } from "./DeleteButton";
import { EtatButton } from "./EtatButton";
import { EditService } from "./EditService";

export const MyTable: FC = function ({
  catList,
  refresh,
  setCheckedRow,
  header,
  delUrl,
  updateUrl,
  type,
  categories,
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
        {catList.length > 0 ? (
          catList.map((cat, index) => (
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
                  src={apiUrl + "uploads/images/" + type + "s/" + cat.image}
                  alt={cat.nom}
                />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white">
                {cat.nom}
              </Table.Cell>
              {cat.categorie ? (
                <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                  {cat.categorie.nom}
                </Table.Cell>
              ) : null}

              <Table.Cell className="p-4 text-base font-medium text-gray-900 dark:text-white">
                {cat.description}
              </Table.Cell>
              <Table.Cell className="space-x-2 whitespace-nowrap p-4">
                <div className="flex items-center gap-x-3">
                  {type == "Service" || type == "Categorie" ? (
                    <EtatButton
                      id={cat._id}
                      refresh={refresh}
                      type={type}
                      etat={cat.actif}
                    />
                  ) : null}

                  {type == "Categorie" ? (
                    <EditCategorie
                      data={cat}
                      refresh={refresh}
                      updateUrl={updateUrl}
                    />
                  ) : null}
                  {type == "Service" ? (
                    <EditService
                      data={cat}
                      catList={categories}
                      refresh={refresh}
                      updateUrl={updateUrl}
                    />
                  ) : null}
                  <DeleteButton
                    id={cat._id}
                    refresh={refresh}
                    delUrl={delUrl}
                  />
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
