import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firestore.config'

import { getAuth } from 'firebase/auth'

import Event from './Event'

import classes from './EventsList.module.css'

function EventsList() {
	const [events, setEvents] = useState([])

	const auth = getAuth()

	const user = auth.currentUser

	useEffect(() => {
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0)
		const date = Date.parse(currentDate)

		const fetchEvents = async () => {
			try {
				const docRef = collection(db, 'events')
				const q = query(docRef, where('dateNumber', '>=', date))
				const querySnap = await getDocs(q)

				const events = []

				querySnap.forEach((doc) => {
					return events.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setEvents(events)
			} catch (error) {
				console.log(error)
			}
		}
		fetchEvents()
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.titleContainer}>
				<h1>Calendrier des évènements</h1>
			</div>
			<div className={classes.eventContainer}>
				{events.map((event) => (
					<Link key={event.id} to={`/evenements/${event.id}`}>
						<Event key={event.id} id={event.id} event={event.data} />
					</Link>
				))}
			</div>
			{user && (
				<div className={classes.actions}>
					<Link to="new">Ajouter Evènement</Link>
				</div>
			)}
		</div>
	)
}
export default EventsList
