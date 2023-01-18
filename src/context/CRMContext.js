import React from 'react';

const CRMContext = React.createContext(null);

// const CRMProvider = props => {

//     // definir el state inicial
//     const [auth, saveAuth ] = useState({
//         token: '',
//         auth: false
//     });

//     return (
//         <CRMContext.Provider value={[auth, saveAuth]}>
//             {props.children}
//         </CRMContext.Provider> 
//     );
// }

 export { CRMContext };