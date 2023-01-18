import React, { useState, Fragment, useContext } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import clientAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

function CreateRealState(props) {
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  // verificar si el usuario esta autenticado o no
  if (!auth.auth) {
    navigate("/login");
  }
  const [realState, saveRealState] = useState({
    description: "",
    field: "",
    construction: "",
    address: "",
    contactPhone: "",
    contactMail: "",
    bathrooms: "",
    bedrooms: "",
    parkingLots: "",
  });

  // almacena el nuevo producto en la base de datos.
  const addRealState = async (e) => {
    e.preventDefault();

    clientAxios.post("/real-state", realState, {
      headers: {
          Authorization : `Bearer ${auth.token}`
      }
  }).then((res) => {
      if (res.data.code === 11000) {
        Swal.fire({
          type: "error",
          title: "There was a mistake",
          text: "Try again",
        });
      } else {
        Swal.fire("Added Successfully", "Added a new property", "success");
      }
      // Redireccionar
      navigate("/real-state/list");
    });
  };

  const validateProperty = () => {
    // Destructuring
    const { description, field, construction, address, contactPhone } =
      realState;

    // revisar que las propiedades del state tengan contenido
    let valid =
      !description.length ||
      !field.length ||
      !construction.length ||
      !address.length ||
      !contactPhone.length;

    // return true o false
    return valid;
  };

  // leer los datos del formulario
  const readRealStateInformation = (e) => {
    saveRealState({
      // obtener una copia del state y agregar el nuevo
      ...realState,
      [e.target.name]: e.target.value,
    });
  };
  if (!auth.auth) {
    navigate("/login");
  }
  return (
    <Fragment>
      <h2>New Real State</h2>

      <form onSubmit={addRealState}>
        <legend>Fill all the fields</legend>

        <div className="campo">
          <label>Description:</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={readRealStateInformation}
          />
        </div>
        <div className="campo">
          <label>Field:</label>
          <input
            type="number"
            name="field"
            min="0.00"
            step="0.01"
            placeholder="Field"
            onChange={readRealStateInformation}
          />
        </div>
        <div className="campo">
          <label>Construction:</label>
          <input
            type="number"
            name="construction"
            min="0.00"
            step="0.01"
            placeholder="Construction"
            onChange={readRealStateInformation}
          />
        </div>
        <div className="campo">
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={readRealStateInformation}
          />
        </div>

        <div className="campo">
          <label>Contact Phone:</label>
          <input
            type="text"
            placeholder="Contact Phone"
            name="contactPhone"
            onChange={readRealStateInformation}
          />
        </div>

        <div className="campo">
          <label>Contact Mail:</label>
          <input
            type="text"
            placeholder="Contact Mail"
            name="contactMail"
            onChange={readRealStateInformation}
          />
        </div>
        <div className="campo">
          <label>Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            min="0.00"
            step="0.5"
            placeholder="Bathrooms"
            onChange={readRealStateInformation}
          />
        </div>
        <div className="campo">
          <label>Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            min="0.00"
            step="0.5"
            placeholder="Bedrooms"
            onChange={readRealStateInformation}
          />
        </div>

        <div className="campo">
          <label>ParkingLots:</label>
          <input
            type="number"
            name="parkingLots"
            min="0.00"
            step="1"
            placeholder="ParkingLots"
            onChange={readRealStateInformation}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Create Real State"
            disabled={validateProperty()}
          />
        </div>
      </form>
    </Fragment>
  );
}
export default CreateRealState;
