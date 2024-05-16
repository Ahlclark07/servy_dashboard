import { Button, Label, Modal, TextInput, Textarea } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { apiUrl } from "../pages/categories";
import { FaRegEye } from "react-icons/fa";

export const VoirLeServicePresta: FC = function ({ service, refresh }) {
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const changerEtat = function (decision) {
    if (!decision && !message) {
      alert("Ewo chef, met un message au moins ?");
      return;
    }
    const formData = new FormData();
    formData.append("id", service._id);
    formData.append("decision", decision);
    formData.append("message", message);
    console.log(formData.get("id"));
    console.log(formData.get("message"));
    console.log(formData.get("decision"));
    fetch(apiUrl + "admin/updateServicePrestataireState/", {
      method: "post",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        refresh();
      })
      .catch((err) => console.log(err + " " + " " + service._id));
  };
  return (
    <>
      <Button color={"primary"} onClick={() => setOpen(!isOpen)}>
        <FaRegEye className="mr-2 text-lg" />
        Voir la demande
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>
            Voir le service {service.service.nom} de{" "}
            {service.vendeur.nom_complet}
          </strong>
        </Modal.Header>
        <Modal.Body>
          <div className="w-full mt-6">
            <Label htmlFor="firstName">Role actuel du vendeur : </Label>
            <div className="mt-1">
              <TextInput
                value={service.vendeur.role}
                disabled={true}
                className="w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="mt-6 flex justify-center items-center">
              Médias (images et audio) :
            </div>
            <div className="mt-6">
              {service.audio ? (
                <a
                  target="about:blank"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/audios/servicesprestataires/" +
                    service.audio
                  }
                >
                  Lien de la photo de profil
                </a>
              ) : null}

              {service.images
                ? service.images.map((image, key) => (
                    <a
                      key={key}
                      target="about:blank"
                      className="underline text-blue-600 block"
                      href={
                        apiUrl + "uploads/images/servicesprestataires/" + image
                      }
                    >
                      Lien de l'image {key + 1}
                    </a>
                  ))
                : null}
            </div>
          </div>
          <Label className="my-6">
            Description du service
            <Textarea disabled={true} value={service.description}></Textarea>
          </Label>
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
              Désactiver le service
            </Button>
            <Button color="success" onClick={() => changerEtat(1)}>
              Accepter le service
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
