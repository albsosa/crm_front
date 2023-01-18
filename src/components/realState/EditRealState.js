import React, { Fragment, useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import clientAxios from "../../config/axios";
import { CRMContext } from "../../context/CRMContext";

function EditRealState(props) {
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);

  // obtener el ID
  const { id } = useParams();

  const [realState, dataRealState] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  // Query a la API
  useEffect(() => {
    const queryPI = async () => {
      const realState = await clientAxios.get(`/real-state/${id}`);
      console.log(realState, "realState");
      dataRealState(realState.data);
    };
    // llamado a la api
    queryPI();
  }, [id]);

  // leer los datos del formulario
  const updateState = (e) => {
    // Almacenar lo que el usuario escribe en el state
    dataRealState({
      // obtener una copia del state actual
      ...realState,
      [e.target.name]: e.target.value,
    });
  };

  // Envia una petición por axios para actualizar el cliente
  const updateRealState = (e) => {
    e.preventDefault();
    console.log(realState.description, "realState");
    if (
      !realState.description ||
      !realState.field ||
      !realState.construction ||
      !realState.address ||
      !realState.contactPhone
    ) {
      Swal.fire({
        type: "error",
        title: "Incomplete record",
        text: "All fields are required",
      });
    } else {
      clientAxios.put(`/real-state/${realState.id}`, realState).then((res) => {
        // validar si hay errores de mongo
        if (res.data.code === 11000) {
          Swal.fire({
            type: "error",
            title: "There was a mistake",
            text: "The property is already registered",
          });
        } else {
          Swal.fire("Correct", "Updated Successfully", "success");
        }
        // redireccionar
        navigate("/real-state/list");
      });
    }
  };

  // verificar si el usuario esta autenticado o no
  if (!auth.auth) {
    navigate("/login");
  }

  return (
    <Fragment>
      <h2>Edit property</h2>

      <form onSubmit={updateRealState}>
        <legend>Fill all the fields</legend>
        <div className="campo">
          <label>Description:</label>
          <input
            type="text"
            placeholder="Description"
            name="description"
            onChange={updateState}
            value={realState.description}
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
            onChange={updateState}
            value={realState.field}
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
            onChange={updateState}
            value={realState.construction}
          />
        </div>
        <div className="campo">
          <label>Address:</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={updateState}
            value={realState.address}
          />
        </div>
        <div className="campo">
          <label>Contact Phone:</label>
          <input
            type="tel"
            placeholder="Contact Phone"
            name="contactPhone"
            onChange={updateState}
            value={realState.contactPhone}
          />
        </div>
        <div className="campo">
          <label>Contact Mail:</label>
          <input
            type="text"
            placeholder="Contact Mail"
            name="contactMail"
            onChange={updateState}
            value={realState.contactMail}
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
            onChange={updateState}
            value={realState.bathrooms}
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
            onChange={updateState}
            value={realState.bedrooms}
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
            onChange={updateState}
            value={realState.parkingLots}
          />
        </div>
        <div className="enviar">
          <input type="submit" className="btn btn-azul" value="Save Changes" />
        </div>
      </form>
    </Fragment>
  );
}

// HOC, es una función que toma un componente y retorna un nuevo componente
export default EditRealState;
