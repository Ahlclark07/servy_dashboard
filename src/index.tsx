import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import CategoriesPage from "./pages/categories";
import UserListPage from "./pages/users/list";
import ServicesPage from "./pages/services";
import UtilsateursEnTransition from "./pages/utilisateurs_en_transition";
import ServicesPrestatairesPage from "./pages/services_prestataires";
import Clients from "./pages/clients";
import Vendeurs from "./pages/vendeurs";

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
  <StrictMode>
    <Flowbite theme={{ theme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route path="/categories-de-services" element={<CategoriesPage />} />
          <Route path="/liste-de-services" element={<ServicesPage />} />
          <Route
            path="/gestion-des-utilisateurs-en-transition"
            element={<UtilsateursEnTransition />}
          />
          <Route path="/gestion-des-clients" element={<Clients />} />
          <Route path="/gestion-des-vendeurs" element={<Vendeurs />} />
          <Route
            path="/liste-de-services-prestataires"
            element={<ServicesPrestatairesPage />}
          />
          <Route path="/gestion-des-retraits" element={<UserListPage />} />
        </Routes>
      </BrowserRouter>
    </Flowbite>
  </StrictMode>
);
