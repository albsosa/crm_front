import React, {useContext} from 'react';

import { CRMContext } from '../../context/CRMContext';

const Header = (props) => {

    const [auth, saveAuth] = useContext(CRMContext);

    const signOff = () => {
        // auth.auth = false y el token se remueve
        saveAuth({
            token: '',
            auth: false
        });

        localStorage.setItem('token', '');

        // redireccionar
        props.history.push('/login');
    }

    return (
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                <img src="https://uploads-ssl.webflow.com/62d8384c01caeb7947cb2b38/63504638ef0e7c5463701494_logo_pink%402x.svg" loading="lazy" width="173" alt="Logotipo Roddo svg" />
                    <h1>CRM - Property Manager</h1>


                    { auth.auth ? (
                        <button 
                            type="button"
                            className="btn btn-rojo"
                            onClick={signOff}
                        >
                            <i className="far fa-times-circle"></i>
                            Sign off
                        </button>
                    ) : null }
                    
                
                </div>
                
            </div>
        </header>
    )

}

export default Header;