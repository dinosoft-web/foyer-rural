import EventBanner from './EventBanner'
import Agenda from './Agenda'

import classes from './PageContent.module.css'

function PageContent() {
	return (
		<>
			<div className={classes.banner}>
				<h2 className={classes.title}>Foyer Rural de Graye-et-Charnay</h2>
			</div>
			<EventBanner />
			<h1 className={classes.infos}>
				Retrouvez toute l'actualité de l'association sur notre site
			</h1>
			<Agenda />
		</>
	)
}

export default PageContent
