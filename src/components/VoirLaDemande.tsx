import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
const apiUrl = process.env["API_URL"];
import { FaRegEye } from "react-icons/fa";

export const VoirLaDemande: FC = function ({ user, refresh }) {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const changerEtat = function (decision) {
    if (!decision && !message) {
      alert("Ewo chef, met un message au moins ?");
      return;
    }
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("decision", decision);
    formData.append("message", message);
    console.log(formData.get("id"));
    console.log(formData.get("message"));
    console.log(formData.get("decision"));
    fetch(apiUrl + "admin/updateDemandeState", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        refresh();
      })
      .catch((err) => console.log(err + " " + " " + user.id));
  };
  return (
    <>
      <Button color={"primary"} onClick={() => setOpen(!isOpen)}>
        <FaRegEye className="mr-2 text-lg" />
        Voir la demande
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Voir la demande de {user.nom_complet}</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full mt-6">
            <Label htmlFor="firstName">Role actuel : </Label>
            <div className="mt-1">
              <TextInput value={user.role} disabled={true} className="w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="mt-6 flex justify-center items-center">
              Documents présentés :
            </div>
            <div className="mt-6">
              {user.photoDeProfil ? (
                <a
                  target="about:blank"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/photodeprofils/" +
                    user.photoDeProfil
                  }
                >
                  Lien de la photo de profil
                </a>
              ) : null}

              {user.carteIdentite ? (
                <a
                  target="about:blank"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/carteidentites/" +
                    user.carteIdentite
                  }
                >
                  Lien de la carte d'identité
                </a>
              ) : null}
              {user.attestationProfession ? (
                <a
                  target="about:blank"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/attestationprofessionss/" +
                    user.attestationProfession
                  }
                >
                  Lien de l'attestation de profession
                </a>
              ) : null}
            </div>
          </div>
          <Label className="my-6">
            Entrez un message :
            <Textarea
              onChange={(e) => {
                console.log(e.target.value);
                setMessage(e.target.value);
              }}
            ></Textarea>
          </Label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
            <Button color="failure" onClick={() => changerEtat(0)}>
              Refuser la demande
            </Button>
            <Button color="success" onClick={() => changerEtat(1)}>
              Accepter la demande
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
