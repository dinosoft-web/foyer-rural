import { getAuth } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import Card from '../shared/Card'

import { db } from '../../firestore.config'

import classes from './UserInfo.module.css'

function UserInfo() {
	const auth = getAuth()
	const [userInfo, setUserinfo] = useState({
		name: '',
		surname: '',
		email: '',
	})

	const { name, surname, email } = userInfo

	useEffect(() => {
		const fetchUserInfo = async () => {
			const docRef = doc(db, 'users', auth.currentUser.uid)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const info = docSnap.data()

				setUserinfo(info)
			}
		}
		fetchUserInfo()
	}, [auth.currentUser.uid])

	const navigate = useNavigate()
	const cancelHandler = () => {
		navigate('..')
	}
	return (
		<div className={classes.container}>
			<div></div>
			<Card>
				<div className={classes.details}>
					<span>{surname}</span>
					<span>{name}</span>
					<span>{email}</span>
				</div>
			</Card>

			<div className={classes.actions}>
				<button onClick={cancelHandler}>Retour</button>
			</div>
		</div>
	)
}
export default UserInfo
