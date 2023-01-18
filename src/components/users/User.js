import React from 'react';
import { Link } from 'react-router-dom';
function User({ user }) {
	const { userName } = user;
  
	return (
		<li className="cliente">
			<div className="info-cliente">
				<p className="nombre">
					{userName}
				</p>
				<p className="rol">admin</p>
				<p>example@example.com</p>
			</div>
			<div className="acciones">
				<Link className="btn btn-azul">
					<i className="fas fa-pen-alt" />
					Edit User
				</Link>
			</div>
		</li>
	);
}
export default User;