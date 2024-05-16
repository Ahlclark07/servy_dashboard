import { Button, Label, Modal, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useState } from "react";
import { HiOutlineExclamationCircle, HiOutlinePencilAlt } from "react-icons/hi";
import { apiUrl } from "../pages/categories";
import { FaRegEye } from "react-icons/fa";

export const VoirLeClient: FC = function ({ user, refresh }) {
  const [isOpen, setOpen] = useState(false);
  const changerEtat = function () {
    fetch(apiUrl + "admin/updateUserState/" + user._id)
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
      <Button color={"success"} onClick={() => setOpen(!isOpen)}>
        <FaRegEye className="mr-2 text-lg" />
        Voir le compte
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
          <strong>Voir les infos de {user.nom_complet}</strong>
        </Modal.Header>
        <Modal.Body>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="firstName">Nom de l'utilisateur</Label>
              <div className="mt-1">
                <TextInput
                  id="firstName"
                  name="firstName"
                  value={user.nom}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="lastName">Prénom de l'utilisateur</Label>
              <div className="mt-1">
                <TextInput
                  id="lastName"
                  name="lastName"
                  value={user.prenoms}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="mt-1">
                <TextInput
                  id="email"
                  name="email"
                  value={user.email}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <div className="mt-1">
                <TextInput
                  id="phone"
                  name="phone"
                  value={user.telephone}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="department">Date de naissance</Label>
              <div className="mt-1">
                <TextInput
                  id="department"
                  value={user.date_de_naissance}
                  disabled={true}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="company">Date de création</Label>
              <div className="mt-1">
                <TextInput value={user.date_de_creation} disabled={true} />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordCurrent">
                Role actuel de l'utilisateur
              </Label>
              <div className="mt-1">
                <TextInput value={user.role} disabled={true} />
              </div>
            </div>
            <div>
              <Label htmlFor="passwordNew">Localisation maps du domicile</Label>
              <div className="mt-1">
                <TextInput
                  value={user.adresses[0].localisationMap}
                  disabled={true}
                  className="cursor-copy"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      user.adresses[0].localisationMap
                    )
                  }
                />
              </div>
            </div>
          </div>
          {user.adresses.map((adresse, index) => (
            <div className="w-full mt-6" key={adresse._id}>
              <Label htmlFor="firstName">Adresse {index + 1}</Label>
              <div className="mt-1">
                <TextInput
                  value={adresse.show_address}
                  disabled={true}
                  className="w-full"
                />
              </div>
            </div>
          ))}
          {user.role !== "client" && (
            <div className="w-full mt-6">
              <Label htmlFor="firstName">Profession</Label>
              <div className="mt-1">
                <TextInput
                  value={user.profession}
                  disabled={true}
                  className="w-full"
                />
              </div>
              {user.photoDeProfil && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/photodeprofils/" +
                    user.photoDeProfil
                  }
                >
                  Lien de la photo de profil
                </a>
              )}
              {user.carteIdentite && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/carteidentites/" +
                    user.carteIdentite
                  }
                >
                  Lien de la carte d'identité
                </a>
              )}
              {user.attestationProfession && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 block"
                  href={
                    apiUrl +
                    "uploads/images/attestationprofessionss/" +
                    user.attestationProfession
                  }
                >
                  Lien de l'attestation de profession
                </a>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            color={user.actif ? "failure" : "success"}
            onClick={changerEtat}
          >
            {user.actif ? "Désactiver" : "Activer"} l'utilisateur
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
