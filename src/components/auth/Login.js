import React, {useState, useContext} from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import clientAxios from '../../config/axios';

// Context
import { CRMContext } from '../../context/CRMContext';

function Login(props){
  const navigate = useNavigate();

    // Auth y token
    const [auth, saveAuth] = useContext(CRMContext);


    // State con los datos del formulario
    const [ credentials, saveCredentials] = useState({});


    // iniciar sesión en el servidor
    const login = async e => {
        e.preventDefault();

        // autenticar al usuario

        try {
            const response = await clientAxios.post('/user/auth', credentials);
            
            // extraer el token y colocarlo en localstorage
            const { token } = response.data;
            console.log(token, 'token')
            localStorage.setItem('token', token);

            // colocarlo en el state
            saveAuth({
                token, 
                auth: true
            })

            // alerta
            Swal.fire(
                'Correct login',
                'You are logged in',
                'success'
            )

            // redireccionar
           navigate("/real-state/list");

            
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'There was a mistake',
                text: error.response.data.mensaje
            })
        }
    }

    // almacenar lo que el usuario escribe en el state
    const reedData = e => {
        saveCredentials({
            ...credentials,
            [e.target.name] : e.target.value
        })
    }

    return(

        <div className="login">
            <h2>Login</h2>

            <div className="contenedor-formulario">
                <form
                    onSubmit={login}
                >

                    <div className="campo">
                        <label>User name</label>
                        <input 
                            type="text"
                            name="userName"
                            placeholder="Username"
                            required
                            onChange={reedData}
                        />
                    </div>

                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            onChange={reedData}
                        />
                    </div>

                    <input type="submit" value="Login" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}

export default Login;