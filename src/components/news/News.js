import { Link } from 'react-router-dom'
import classes from './News.module.css'

import { dateHandler } from '../../util/date'

function News(news) {
	const { date, author, title, abstract, imageUrl } = news.news

	const formatedDate = dateHandler(date)

	const { capitalizedMonth, year, number } = formatedDate

	return (
		<div className={classes.container}>
			<div
				className={classes.img}
				style={{ backgroundImage: `url('${imageUrl}')` }}
			></div>
			<div className={classes.text}>
				<div>
					<h2>{title}</h2>
					<p
						className={classes.infos}
					>{`écrit par ${author} le ${number} ${capitalizedMonth} ${year}`}</p>
				</div>
				<p className={classes.abstract}>{abstract}</p>
				<Link to={`/actualites/${news.id}`}>En Savoir Plus</Link>
			</div>
		</div>
	)
}
export default News
