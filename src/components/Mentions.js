import Card from './shared/Card'

import classes from './Mentions.module.css'

function Mentions() {
	return (
		<Card>
			<div className={classes.container}>
				<h2>Mentions Légales</h2>
				<div className={classes.block}>
					<h3>Editeur</h3>
					<p>
						Le site www.foyer-rural-graye-et-charnay.fr est édité par le Foyer
						Rural de Graye-et-Charnay, association déclarée à Lons-le-Saunier
						(39) et immatriculée sous le numéro W392000082.
					</p>
					<div className={classes.lists}>
						<span>Siège social :</span>
						<span>8 place de la Mairie</span>
						<span>39320 GRAYE-ET-CHARNAY</span>
					</div>
					<span>E-mail : foyer.rural.graye.et.charnay@outlook.fr</span>
					<span>Directeur de publication : Patrick Gradon</span>
				</div>
				<div className={classes.block}>
					<h3>Hébergeur</h3>
					<div className={classes.lists}>
						<span>OVH</span>
						<span>2 rue Kellerman</span>
						<span>59100 ROUBAIX</span>
					</div>
				</div>
				<div className={classes.block}>
					<h3>Crédits</h3>
					<p>Conception et réalisation du site : DINOSOFT SAS</p>
				</div>
				<div className={classes.block}>
					<h3>Propriété Intellectuelle</h3>
					<p>
						L’ensemble du site, y compris sa structure et son contenu (textes,
						tableaux, graphiques, images, photographies, vidéos, sons, bases de
						données, applications et logiciels), est protégé par le droit
						d’auteur et de propriété intellectuelle de Foyer Rural de
						Graye-et-Charnay ou de ses fournisseurs et prestataires.S
					</p>
					<p>
						Toute utilisation, reproduction, diffusion, commercialisation,
						modification de toute ou partie du Site, sans autorisation de
						l’Editeur est prohibée et pourra entraîner des actions et poursuites
						judiciaires telles que notamment prévues par le Code de la propriété
						intellectuelle et le Code civil.
					</p>
				</div>
				<div className={classes.block}>
					<h3>Données Personnelles</h3>
					<p>
						Le Foyer Rural de Graye-et-Charnay ne collecte aucune donnée sur les
						utilisateurs du site.
					</p>
				</div>
				<div className={classes.block}>
					<h3>Cookies</h3>
					<p>
						Le Foyer Rural de Graye-et-Charnay utilise des cookies et autres
						traceurs ayant pour finalité exclusive de permettre ou faciliter une
						communication par voie électronique ou strictement nécessaires au
						bon fonctionnement du site.
					</p>
				</div>
			</div>
		</Card>
	)
}
export default Mentions
