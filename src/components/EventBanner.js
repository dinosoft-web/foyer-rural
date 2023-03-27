import { useState, useEffect } from 'react'

import { doc, getDoc } from 'firebase/firestore'

import { db } from '../firestore.config'

import classes from './EventBanner.module.css'

function EventBanner() {
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	})

	const { title, description } = formData

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

	return (
		<div className={classes.event}>
			<h2>{title}</h2>
			<p>{description}</p>
		</div>
	)
}
export default EventBanner
