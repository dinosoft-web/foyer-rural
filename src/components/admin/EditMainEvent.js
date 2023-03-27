import { updateDoc, getDoc, doc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import Card from '../shared/Card'

import { db } from '../../firestore.config'

import classes from './EditMainEvent.module.css'

function EditMainEvent() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	})

	const { title, description } = formData

	const navigate = useNavigate()

	useEffect(() => {
		const fetchMainEvent = async () => {
			const docRef = doc(db, 'mainEvent', 'MainEvent')
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				setFormData(docSnap.data())
			}
		}
		fetchMainEvent()
	}, [])

	const submitHandler = async (e) => {
		e.preventDefault()

		const docRef = doc(db, 'mainEvent', 'MainEvent')

		await updateDoc(docRef, formData)
		navigate('/')
		toast.success('Evénement première page modifié')
	}

	const mutateHandler = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}))
	}

	const cancelHandler = () => {
		navigate('..')
	}
	return (
		<Card>
			<h2>Modifier évènement principal</h2>
			<form onSubmit={submitHandler} className={classes.form}>
				<div className={classes.container}>
					<p>
						<label htmlFor="title">Titre</label>
						<input
							id="title"
							type="text"
							name="title"
							required
							value={title}
							onChange={mutateHandler}
						/>
					</p>

					<p>
						<label htmlFor="description">Description</label>
						<textarea
							name="description"
							id="description"
							cols="30"
							rows="4"
							value={description}
							required
							onChange={mutateHandler}
						></textarea>
					</p>
				</div>

				<div className={classes.actions}>
					<button type="button" onClick={cancelHandler}>
						Annuler
					</button>
					<button>Sauvegarder</button>
				</div>
			</form>
		</Card>
	)
}
export default EditMainEvent
