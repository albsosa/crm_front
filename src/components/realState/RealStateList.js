import React, { useEffect, useState, useContext, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
// importar cliente axios
import clientAxios from "../../config/axios";
import RealState from "./RealState";
import { CRMContext } from "../../context/CRMContext";

function RealStateList(props) {
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [realStateList, saveRealStateList] = useState([]);

  // useEffect para consultar api cuando cargue
  useEffect(() => {
    const queryPI = async () => {
      const getRealStateList = await clientAxios.get("/real-state", {
        headers: {
            Authorization : `Bearer ${auth.token}`
        }
    })
      saveRealStateList(getRealStateList.data);
    };
    // llamado a la api
    queryPI();
  }, []);

  // verificar si el usuario esta autenticado o no
  if (!auth.auth) {
    navigate("/login");
  }

  return (
    <Fragment>
      <h2>Real State List</h2>

      <Link to={"/real-state/new"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Create a real estate
      </Link>

      <ul className="listado-productos">
        {realStateList.map((realState) => (
          <RealState key={realState.id} realState={realState} />
        ))}
      </ul>
    </Fragment>
  );
}
export default RealStateList;
