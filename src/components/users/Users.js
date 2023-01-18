import React, { useEffect, useState, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clientAxios from "../../config/axios";
import User from './User';
import { CRMContext } from "../../context/CRMContext";

function Users() {
  const navigate = useNavigate();
  const [auth] = useContext(CRMContext);
  const [users, saveUsers] = useState([]);
  const API = async () => {
    try {
      const users = await clientAxios.get("/user", {
        headers: {
            Authorization : `Bearer ${auth.token}`
        }
    });
      saveUsers(users?.data ?? []);
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    API();
  }, []);

   // verificar si el usuario esta autenticado o no
   if (!auth.auth) {
    navigate("/login");
  }

  return (
    <Fragment>
      <h2>Users</h2>

      <ul className="listado-clientes">
        {users?.map(user => (
            <User 
                key={user?.id}
                user={user}
            />
        ))}
      </ul>
    </Fragment>
  );
}

export default Users;
