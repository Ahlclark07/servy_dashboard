import { Button, Modal } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlinePencilAlt } from "react-icons/hi";
const apiUrl = process.env["API_URL"];

export const EtatButton: FC = function ({ id, refresh, type, etat }) {
  const [isOpen, setOpen] = useState(false);
  const changerEtat = function () {
    fetch(apiUrl + "admin/update" + type + "State/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        refresh();
      })
      .catch((err) => console.log(err + " " + etatUrl + " " + id));
  };
  return (
    <>
      <Button
        color={etat ? "failure" : "success"}
        onClick={() => setOpen(!isOpen)}
      >
        <HiOutlinePencilAlt className="mr-2 text-lg" />
        {etat ? "Désactiver" : "Activer"}
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">{etat ? "Désactiver" : "Activer"}</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle
              className={
                "text-7xl " + (etat ? "text-red-600" : "text-green-500")
              }
            />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Vous voulez vraiment {etat ? "désactiver" : "activer"} cet élément
              ?
            </p>
            <div className="flex items-center gap-x-3">
              <Button
                color={etat ? "failure" : "success"}
                onClick={changerEtat}
              >
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
