import { useState, useEffect } from 'react'
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	where,
} from 'firebase/firestore'
import { Link } from 'react-router-dom'

import { db } from '../firestore.config'

import FrontEvent from './FrontEvent'

import classes from './Agenda.module.css'

function Agenda() {
	const [events, setEvents] = useState([])

	useEffect(() => {
		const currentDate = new Date()
		currentDate.setHours(0, 0, 0, 0)
		const date = Date.parse(currentDate)

		const fetchEvents = async () => {
			try {
				const eventsRef = collection(db, 'events')

				const q = query(
					eventsRef,
					where('dateNumber', '>=', date),
					orderBy('dateNumber', 'asc'),
					limit(3)
				)

				const querySnap = await getDocs(q)

				const events = []

				querySnap.forEach((doc) => {
					return events.push({
						id: doc.id,
						data: doc.data(),
					})
				})
				setEvents(events)
			} catch (error) {}
		}
		fetchEvents()
	}, [])

	return (
		<div className={classes.events}>
			{events.map((event) => (
				<Link key={event.id} to={`/evenements/${event.id}`}>
					<FrontEvent key={event.id} id={event.id} events={event.data} />
				</Link>
			))}
		</div>
	)
}
export default Agenda
