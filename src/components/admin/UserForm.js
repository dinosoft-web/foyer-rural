import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth'
import { setDoc, doc, getDoc, updateDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../../firestore.config'

import classes from './UserForm.module.css'

function UserForm({ method }) {
	const [patch, setPatch] = useState(false)
	const [formData, setFormData] = useState({
		name: '',
		surname: '',
		email: '',
		password: '',
	})

	const { name, surname, email, password } = formData

	const navigate = useNavigate()

	const cancelHandler = () => {
		navigate('..')
	}

	const auth = getAuth()

	useEffect(() => {
		if (method === 'PATCH') {
			setPatch(true)
			const fetchUserInfo = async () => {
				const docRef = doc(db, 'users', auth.currentUser.uid)
				const docSnap = await getDoc(docRef)

				if (docSnap.exists()) {
					const info = docSnap.data()

					setFormData((prevState) => ({
						...prevState,
						name: info.name,
						surname: info.surname,
						email: info.email,
					}))
				}
			}
			fetchUserInfo()
		}
	}, [auth.currentUser.uid, method])

	const changeHandler = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const submitHandler = async (e) => {
		e.preventDefault()

		if (method === 'POST') {
			try {
				const auth = getAuth()
				const userCredentials = await createUserWithEmailAndPassword(
					auth,
					email,
					password
				)
				const user = userCredentials.user

				updateProfile(auth.currentUser, {
					displayName: name,
				})

				const formDataCopy = { ...formData }
				delete formDataCopy.password

				await setDoc(doc(db, 'users', user.uid), formDataCopy)

				navigate('/admin')
				toast.success('Utilisateur créé')
			} catch (error) {
				toast.error("L'utilisateur n'a pas pu être crée")
			}
		} else if (method === 'PATCH') {
			try {
				if (auth.currentUser.displayName !== name) {
					await updateProfile(auth.currentUser, {
						displayName: name,
					})

					const formDataCopy = { ...formData }
					delete formDataCopy.password
					console.log(formDataCopy)

					const userRef = doc(db, 'users', auth.currentUser.uid)
					await updateDoc(userRef, formDataCopy)
				}
				navigate('/admin')
				toast.success('Utilisateur modifié')
			} catch (error) {
				toast.error("L'Utilisateur n'a pas pu être modifié")
			}
		}
	}

	return (
		<form onSubmit={submitHandler} className={classes.form}>
			<div className={classes.id}>
				<p>
					<label htmlFor="surname">Nom</label>
					<input
						id="surname"
						type="text"
						name="surname"
						required
						value={surname}
						onChange={changeHandler}
					/>
				</p>
				<p>
					<label htmlFor="name">Prénom</label>
					<input
						id="name"
						type="text"
						name="name"
						required
						value={name}
						onChange={changeHandler}
					/>
				</p>
				<p>
					<label htmlFor="email">Email</label>
					<input
						id="email"
						type="email"
						name="email"
						required
						value={email}
						disabled={patch}
						onChange={changeHandler}
					/>
				</p>
				{!patch && (
					<p>
						<label htmlFor="password">Mot de Passe</label>
						<input
							id="password"
							type="text"
							name="password"
							required
							defaultValue=""
							onChange={changeHandler}
						/>
					</p>
				)}
			</div>

			<div className={classes.actions}>
				<button type="button" onClick={cancelHandler}>
					Annuler
				</button>
				<button>{patch ? 'Sauvegarder' : 'Créer'}</button>
			</div>
		</form>
	)
}
export default UserForm
