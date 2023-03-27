import { useEffect, useState } from 'react'
import { Link, NavLink, useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as Edit } from '../../assets/svg/edit.svg'
import { ReactComponent as Delete } from '../../assets/svg/trash.svg'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../../firestore.config'
import { toast } from 'react-toastify'

import Card from '../shared/Card'

import classes from './EventDetails.module.css'
import { dateHandler } from '../../util/date'

function EventDetails() {
	const [event, setEvent] = useState({})
	const [date, setDate] = useState({})

	const { startingHour, endingHour, title, link, description, room, location } =
		event

	const { number, uppercaseMonth, year } = date

	const auth = getAuth()

	const user = auth.currentUser

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		const fetchEvent = async () => {
			const docRef = doc(db, 'events', params.eventId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const data = docSnap.data()
				const newDate = dateHandler(data.date)

				setEvent(data)
				setDate(newDate)
			}
		}

		fetchEvent()
	}, [params.eventId])

	const deleteHandler = async () => {
		await deleteDoc(doc(db, 'events', params.eventId))
		navigate('..')
		toast.success('Evénement supprimé !')
	}

	return (
		<Card>
			{user && (
				<div className={classes.buttons}>
					<Link to="edit">
						<Edit width="22px" height="22px" />
					</Link>
					<Delete
						className={classes.delete}
						onClick={deleteHandler}
						width="22px"
						height="22px"
					/>
				</div>
			)}

			<div className={classes.eventContainer}>
				<div className={classes.text}>
					<div className={classes.detailsContainer}>
						{endingHour ? (
							<p>{`${number} ${uppercaseMonth} ${year} | ${startingHour} à ${endingHour}`}</p>
						) : (
							<p>{`${number} ${uppercaseMonth} ${year} | ${startingHour} `}</p>
						)}

						<h3>{title}</h3>
						<p>{`${room} à ${location}`}</p>
					</div>
					<p className={description}>{description}</p>
					{link ? (
						<Link to={link} target="_blank">
							S'inscrire
						</Link>
					) : (
						<Link
							target="_blank"
							to="mailto:foyer.rural.graye.et.charnay@outlook.fr"
						>
							Nous contacter
						</Link>
					)}
				</div>

				<NavLink to="/evenements">Fermer</NavLink>
			</div>
		</Card>
	)
}
export default EventDetails
