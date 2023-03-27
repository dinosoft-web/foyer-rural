import Card from '../shared/Card'

import { dateHandler } from '../../util/date'

import classes from './Event.module.css'

function Event(event) {
	const date = dateHandler(event.event.date)
	return (
		<Card>
			<div className={classes.eventContainer}>
				<div className={classes.dateContainer}>
					<span>{date.trimedMonth}</span>
					<span>{date.number}</span>
					<span>{date.year}</span>
				</div>
				<div className={classes.detailsContainer}>
					<p>{`${date.number} ${date.uppercaseMonth} ${date.year} | ${event.event.startingHour} à ${event.event.endingHour}`}</p>
					<h3>{event.event.title}</h3>
					<p>{`${event.event.room} à ${event.event.location}`}</p>
				</div>
			</div>
		</Card>
	)
}
export default Event
