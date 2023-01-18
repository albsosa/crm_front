import React, { useContext } from "react";

import { Link } from "react-router-dom";
import { CRMContext } from "../../context/CRMContext";

const Navegation = () => {
  const [auth, saveAuth] = useContext(CRMContext);
  if (!auth.auth) return null;
  return (
    <aside className="sidebar col-3">
      <h2>Admin</h2>

      <nav className="navegacion">
        <Link to={"/"} className="clientes">
          Users
        </Link>
        <Link to={"/real-state/list"} className="productos">
          Real State List
        </Link>
      </nav>
    </aside>
  );
};

export default Navegation;
