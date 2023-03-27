import { useState, useEffect } from 'react'
import { getAuth } from 'firebase/auth'
import { NavLink, Link, useParams, useNavigate } from 'react-router-dom'
import { ReactComponent as Edit } from '../../assets/svg/edit.svg'
import { ReactComponent as Delete } from '../../assets/svg/trash.svg'
import { ReactComponent as File } from '../../assets/svg/file.svg'
import { doc, getDoc, deleteDoc } from 'firebase/firestore'
import { toast } from 'react-toastify'

import { db } from '../../firestore.config'

import Card from '../shared/Card'

import classes from './NewsDetails.module.css'
import { dateHandler } from '../../util/date'

function NewsDetails() {
	const auth = getAuth()

	const [news, setNews] = useState({})
	const [date, setDate] = useState({})

	const { author, title, imageUrl, description, file, fileUrl } = news
	const { capitalizedMonth, year, number } = date

	const navigate = useNavigate()
	const params = useParams()

	const user = auth.currentUser

	useEffect(() => {
		const fetchNews = async () => {
			const docRef = doc(db, 'news', params.newsId)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const data = docSnap.data()
				const newDate = dateHandler(data.date)

				setNews(data)
				setDate(newDate)
			}
		}
		fetchNews()
	}, [params.newsId])

	const deleteHandler = async () => {
		await deleteDoc(doc(db, 'news', params.newsId))
		navigate('..')
		toast.success('Actualité suprimée !')
	}

	return (
		<Card>
			<div className={classes.container}>
				<div
					className={classes.img}
					style={{ backgroundImage: `url('${imageUrl}')` }}
				></div>
				<div className={classes.text}>
					<div className={classes.titleContainer}>
						<div className={classes.title}>
							<h2>{title}</h2>
							<p>{`${author} le ${number} ${capitalizedMonth} ${year}`}</p>
						</div>
						<div className={classes.buttons}>
							{file && (
								<Link to={fileUrl} target="_blank">
									<File width="22px" height="22px" />
								</Link>
							)}

							{user && (
								<>
									<Link to="edit">
										<Edit width="22px" height="22px" />
									</Link>
									<Delete onClick={deleteHandler} width="22px" height="22px" />
								</>
							)}
						</div>
					</div>
					<p>{description}</p>
				</div>
				<div className={classes.actions}>
					<NavLink to="/actualites">Fermer</NavLink>
				</div>
			</div>
		</Card>
	)
}
export default NewsDetails
