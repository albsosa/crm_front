import React from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';

function RealState({realState}) {


    // elimina un producto
    const deleteRealState = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "A deleted property cannot be recovered",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete',
            cancelButtonText : 'No, Cancel'
        }).then((result) => {
            if (result.value) {
              // eliminar en la rest api
              clienteAxios.delete(`/real-state/${id}`)
                .then(res => {
                    if(res.status === 200) {
                        Swal.fire(
                            'Removed',
                            'The property has been removed',
                            'success'
                        )
                    }
                })
            }
        })
    }

    const { id, description, field, construction, address, contactPhone, contactMail, bathrooms, bedrooms, parkingLots } = realState;

    return (
        <li className="producto">
            <div className="info-producto">
                <p className="nombre"><i class="fas fa-home fa-lg"></i> Description: {description}</p>
                <p className="nombre"><i class="fas fa-arrows-alt-h fa-lg"></i> Field: {field}</p>
                <p className="nombre"><i class="fas fa-pencil-ruler fa-lg"></i> Construction: {construction}</p>
                <p className="nombre"><i class="fas fa-location-arrow fa-lg"></i>Address: {address}</p>
                <p className="nombre"><i class="fas fa-phone fa-lg"></i> ContactPhone: {contactPhone}</p>
                <p className="nombre"><i class="fas fa-envelope-open-text fa-lg"></i> ContactMail: {contactMail}</p>
                <p className="nombre"><i class="fas fa-bath fa-lg"></i> Bathrooms: {bathrooms}</p>
                <p className="nombre"><i class="fas fa-person-booth fa-lg"></i> Bedrooms: {bedrooms}</p>
                <p className="nombre"><i class="fas fa-parking fa-lg"></i> ParkingLots: {parkingLots}</p>
            </div>
            <div className="acciones">
                <Link to={`/real-state/edit/${id}`} className="btn btn-azul">
                    <i className="fas fa-pen-alt"></i>
                    Edit Real State
                </Link>

                <button 
                    type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={() => deleteRealState(id) }
                >
                    <i className="fas fa-times"></i>
                    Delete Real Cliente
                </button>
            </div>
        </li>
    )
}
export default RealState;