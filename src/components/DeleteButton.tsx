import { Button, Modal } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiTrash } from "react-icons/hi";

export const DeleteButton: FC = function ({ id, refresh, delUrl }) {
  const [isOpen, setOpen] = useState(false);
  const deleteCat = function () {
    fetch(delUrl + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        refresh();
      })
      .catch((err) => console.log(err + " " + deleteUrl + " " + id));
  };
  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Supprimer
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Supprimer</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Vous voulez vraiment supprimer cette catégorie ?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={deleteCat}>
                Oui je suis sûr
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                Non je suis pas sûr
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
