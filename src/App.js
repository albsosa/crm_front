import React, { Fragment, useState } from "react";

// Routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import Header from "./components/layout/Header";
import Navegation from "./components/layout/Navegation";

// Components
import Users from "./components/users/Users";
import RealStateList from "./components/realState/RealStateList";
import CreateRealState from "./components/realState/CreateRealState";
import EditRealState from "./components/realState/EditRealState";
import Login from "./components/auth/Login";

import { CRMContext } from "./context/CRMContext";

function App() {
  // const [auth, saveAuth] = useContext(CRMContext);
  const [auth, saveAuth ] = useState({
    token: '',
    auth: false
});

  return (
    <Router>
      <Fragment>
        <CRMContext.Provider value={[ auth, saveAuth ]}>
          <Header />
          <div className="grid contenedor contenido-principal">
            <Navegation />
            <main className="caja-contenido col-9">
              <Routes>
                <Route exact path="/" element={<Login />} />
                <Route
                  exact
                  path="/real-state/list"
                  element={<RealStateList />}
                />
                <Route exact path="/users" element={<Users />} />
                <Route
                  exact
                  path="/real-state/list"
                  element={<RealStateList />}
                />
                <Route
                  exact
                  path="/real-state/new"
                  element={<CreateRealState />}
                />
                <Route
                  exact
                  path="/real-state/edit/:id"
                  element={<EditRealState />}
                />
                <Route exact path="/login" element={<Login />} />
              </Routes>
            </main>
          </div>
        </CRMContext.Provider>
      </Fragment>
    </Router>
  );
}

export default App;
