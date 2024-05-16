import { Sidebar } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiChartPie } from "react-icons/hi";
import {
  MdAttachMoney,
  MdCategory,
  MdDesignServices,
  MdDriveFileMove,
  MdSell,
  MdWork,
} from "react-icons/md";
import { Link } from "react-router-dom";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");

  const servicesLinks = [
    {
      nom: "Catégories de services",
      url: "/categories-de-services",
      icon: MdCategory,
    },
    {
      nom: "Liste de services",
      url: "/liste-de-services",
      icon: MdDesignServices,
    },
    {
      nom: "Services des prestataires",
      url: "/liste-de-services-prestataires",
      icon: MdWork,
    },
  ];
  const usersLinks = [
    {
      nom: "Gestion des acheteurs",
      url: "/gestion-des-clients",
      icon: FaUser,
    },
    {
      nom: "Gestion des vendeurs",
      url: "/gestion-des-vendeurs",
      icon: MdSell,
    },
    {
      nom: "Utilisateurs en transition",
      url: "/gestion-des-utilisateurs-en-transition",
      icon: MdDriveFileMove,
    },
    {
      nom: "Gestion des retraits",
      url: "/gestion-des-retraits",
      icon: MdAttachMoney,
    },
  ];
  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                as={Link}
                to="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Statistiques
              </Sidebar.Item>
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {servicesLinks.map((link) => (
                <Sidebar.Item
                  key={link.nom}
                  as={Link}
                  to={link.url}
                  icon={link.icon}
                  className={
                    link.url === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  {link.nom}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>

            <Sidebar.ItemGroup>
              {usersLinks.map((link) => (
                <Sidebar.Item
                  key={link.nom}
                  as={Link}
                  to={link.url}
                  icon={link.icon}
                  className={
                    link.url === currentPage
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }
                >
                  {link.nom}
                </Sidebar.Item>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;
