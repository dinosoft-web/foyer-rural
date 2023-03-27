import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'

import Card from '../shared/Card'

import classes from './LoginForm.module.css'

function LoginForm() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const { email, password } = formData

	const navigate = useNavigate()

	function cancelHandler() {
		navigate('..')
	}

	const changeHandler = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		try {
			const auth = getAuth()

			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			)

			if (userCredential.user) {
				navigate('/')
				toast.success('Identification réussie')
			}
		} catch (error) {
			toast.error('Mot de passe invalide')
		}
	}

	return (
		<Card>
			<form onSubmit={submitHandler} className={classes.form}>
				<h2>Connexion</h2>
				<div className={classes.id}>
					<p>
						<label htmlFor="email">Identifiant</label>
						<input
							id="email"
							type="email"
							name="email"
							required
							value={email}
							onChange={changeHandler}
						/>
					</p>
					<p>
						<label htmlFor="password">Mot de Passe</label>
						<input
							id="password"
							type="password"
							name="password"
							required
							value={password}
							onChange={changeHandler}
						/>
					</p>
				</div>

				<div className={classes.actions}>
					<button type="button" onClick={cancelHandler}>
						Annuler
					</button>
					<button>Connexion</button>
				</div>
			</form>
		</Card>
	)
}
export default LoginForm
