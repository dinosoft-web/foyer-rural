import Card from './shared/Card'

import classes from './FrontEvent.module.css'
import { dateHandler } from '../util/date'

function FrontEvent(events) {
	const date = dateHandler(events.events.date)
	return (
		<>
			<Card events={events}>
				<div className={classes.event}>
					<h1
						className={classes.title}
					>{`${date.capitalizedDay} ${date.number} ${date.capitalizedMonth} à ${events.events.startingHour}`}</h1>
					<h2 className={classes.type}>{events.events.title}</h2>
					<p className={classes.details}>{events.events.abstract}</p>
					<p
						className={classes.location}
					>{`${events.events.room} à ${events.events.location}`}</p>
				</div>
			</Card>
		</>
	)
}
export default FrontEvent
