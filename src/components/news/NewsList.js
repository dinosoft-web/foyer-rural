import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
	collection,
	getDocs,
	query,
	orderBy,
	limit,
	startAfter,
} from 'firebase/firestore'
import { db } from '../../firestore.config'
import { getAuth } from 'firebase/auth'

import News from './News'

import classes from './NewsList.module.css'

function NewsList() {
	const [news, setNews] = useState([])
	const [lastFetchedNews, setLastFetchedNews] = useState(null)

	const auth = getAuth()

	const user = auth.currentUser

	useEffect(() => {
		const fetchNews = async () => {
			try {
				const newsRef = collection(db, 'news')

				const q = query(newsRef, orderBy('date', 'desc'), limit(3))
				const querySnap = await getDocs(q)

				const lastVisible = querySnap.docs[querySnap.docs.length - 1]
				setLastFetchedNews(lastVisible)

				const news = []

				querySnap.forEach((doc) => {
					return news.push({
						id: doc.id,
						data: doc.data(),
					})
				})

				setNews(news)
			} catch (error) {
				console.log(error)
			}
		}
		fetchNews()
	}, [])

	const fetchMoreNewsHandler = async () => {
		try {
			const newsRef = collection(db, 'news')

			const q = query(
				newsRef,
				orderBy('date', 'asc'),
				startAfter(lastFetchedNews),
				limit(3)
			)
			const querySnap = await getDocs(q)

			const lastVisible = querySnap.docs[querySnap.docs.length - 1]
			setLastFetchedNews(lastVisible)

			const news = []

			querySnap.forEach((doc) => {
				return news.push({
					id: doc.id,
					data: doc.data(),
				})
			})

			setNews((prevState) => [...prevState, ...news])
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className={classes.newsList}>
			{news.map((news) => (
				<News key={news.id} id={news.id} news={news.data} />
			))}

			<div className={classes.actions}>
				<button onClick={fetchMoreNewsHandler}>
					Afficher plus d'actualités
				</button>
				{user && <Link to="new">Ajouter Actualité</Link>}
			</div>
		</div>
	)
}
export default NewsList
