import classes from './Info.module.css'

function Info() {
	return (
		<div>
			<div className={classes.infos}>
				<h1>Bienvenue sur le site du foyer rural de Graye-et-Charnay (Jura)</h1>
				<div className={classes.text}>
					<div className={classes.description}>
						<p>
							Fondé en décembre 1963, le foyer Rural de Graye-et-Charnay,
							association loi 1901, propose aux habitants des villages de Graye,
							Charnay, des Carrats et des communues environnantes des activités
							culturelles et récréatives, à travers ses différentes sections
							régulières ou événements ponctuels ouverts à tous.
						</p>
						<p>
							Le FOYER RURAL de GRAYE-ET-CHARNAY est géré et animé par des
							bénévoles engagés et se veut être un élément important d'animation
							et de développement de la vie en société et favoriser toute
							initiative collective visant à créer des liens avec les habitants.
						</p>

						<p>
							Notre but est de susciter, de promouvoir et de développer les
							activités de temps libre et les activités concernant la vie
							locale.
						</p>
					</div>
					<div className={classes.img}></div>
				</div>
			</div>
		</div>
	)
}
export default Info
