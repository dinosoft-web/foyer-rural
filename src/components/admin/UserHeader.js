import { NavLink } from 'react-router-dom'

import classes from './UserHeader.module.css'

function UserHeader() {
	return (
		<div className={classes.actions}>
			<NavLink
				to="add"
				className={({ isActive }) => (isActive ? classes.active : undefined)}
			>
				<button>Ajouter Utilisateur</button>
			</NavLink>
			<NavLink
				to="edit"
				className={({ isActive }) => (isActive ? classes.active : undefined)}
			>
				<button>Modifier Utilisateur</button>
			</NavLink>
		</div>
	)
}
export default UserHeader
