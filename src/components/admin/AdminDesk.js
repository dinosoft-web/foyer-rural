import { Link, useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import Card from '../shared/Card'
import classes from './AdminDesk.module.css'

function AdminDesk() {
	const auth = getAuth()
	const navigate = useNavigate()
	const logoutHandler = () => {
		auth.signOut()
		navigate('/')
	}
	return (
		<>
			<div className={classes.titleContainer}>
				<h1>Tableau de bord d'administration</h1>
			</div>
			<div className={classes.deskContainer}>
				<Card>
					<Link to="users">
						<span className={classes.title}>Gestion Utilisateur</span>
					</Link>
				</Card>

				<Card>
					<Link to="edit-event">
						<span className={classes.title}>
							Modifier Evénement Première Page
						</span>
					</Link>
				</Card>
				<Card>
					<Link to="edit-board">
						<span className={classes.title}>Modifier Bureau</span>
					</Link>
				</Card>

				<Card>
					<span onClick={logoutHandler} className={classes.title}>
						Déconnexion
					</span>
				</Card>
			</div>
		</>
	)
}
export default AdminDesk
