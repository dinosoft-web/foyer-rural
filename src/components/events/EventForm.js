import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, addDoc, updateDoc, getDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../../firestore.config'

import Card from '../shared/Card'

import classes from './EventForm.module.css'

function EventForm({ method }) {
	const [formData, setFormData] = useState({
		date: '',
		dateNumber: '',
		startingHour: '',
		endingHour: '',
		title: '',
		abstract: '',
		link: '',
		description: '',
		room: '',
		location: '',
	})

	const {
		date,
		startingHour,
		endingHour,
		title,
		abstract,
		link,
		description,
		room,
		location,
	} = formData

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		if (method === 'PATCH') {
			const fetchEvent = async () => {
				const docRef = doc(db, 'events', params.eventId)
				const docSnap = await getDoc(docRef)
				if (docSnap.exists()) {
					setFormData(docSnap.data())
				}
			}
			fetchEvent()
		}
	}, [navigate, params.eventId, method])

	const submitHandler = async (e) => {
		e.preventDefault()

		if (method === 'PATCH') {
			const docRef = doc(db, 'events', params.eventId)
			await updateDoc(docRef, formData)
			navigate(`/evenements/${docRef.id}`)
			toast.success('Evénement modifié avec succès')
		} else if (method === 'GET') {
			const docRef = await addDoc(collection(db, 'events'), formData)
			navigate(`/evenements/${docRef.id}`)
			toast.success('Evénement créé avec succès')
		}
	}

	const mutateHandler = (e) => {
		if (e.target.id === 'date') {
			const dateNumber = Date.parse(e.target.value)

			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
				dateNumber: dateNumber,
			}))
		} else {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}))
		}
	}

	const cancelHandler = () => {
		navigate('..')
	}

	return (
		<Card>
			<form onSubmit={submitHandler} className={classes.form}>
				<div className={classes.date}>
					<p>
						<label htmlFor="date">Date</label>
						<input
							id="date"
							type="date"
							name="date"
							required
							defaultValue={method ? date : ''}
							onChange={mutateHandler}
						/>
					</p>
					<p>
						<label htmlFor="startingHour">Heure de Début</label>
						<input
							id="startingHour"
							type="time"
							name="startingHour"
							required
							defaultValue={method ? startingHour : ''}
							onChange={mutateHandler}
						/>
					</p>
					<p>
						<label htmlFor="endingHour">Heure de Fin</label>
						<input
							id="endingHour"
							type="time"
							name="endingHour"
							defaultValue={method ? endingHour : ''}
							onChange={mutateHandler}
						/>
					</p>
				</div>
				<div className={classes.date}>
					<p>
						<label htmlFor="room">Salle</label>
						<input
							id="room"
							type="text"
							name="room"
							required
							defaultValue={method ? room : ''}
							onChange={mutateHandler}
						/>
					</p>
					<p>
						<label htmlFor="location">Village</label>
						<input
							id="location"
							type="text"
							name="location"
							required
							defaultValue={method ? location : ''}
							onChange={mutateHandler}
						/>
					</p>
				</div>

				<p>
					<label htmlFor="title">Titre</label>
					<input
						id="title"
						type="text"
						name="title"
						required
						defaultValue={method ? title : ''}
						onChange={mutateHandler}
					/>
				</p>
				<p>
					<label htmlFor="abstract">Résumé</label>
					<input
						id="abstract"
						type="text"
						name="abstract"
						required
						defaultValue={method ? abstract : ''}
						onChange={mutateHandler}
					/>
				</p>
				<p>
					<label htmlFor="link">Lien Hello Asso</label>
					<input
						id="link"
						type="text"
						name="link"
						defaultValue={method ? link : ''}
						onChange={mutateHandler}
					/>
				</p>
				<p>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="5"
						required
						defaultValue={method ? description : ''}
						onChange={mutateHandler}
					></textarea>
				</p>
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
export default EventForm
