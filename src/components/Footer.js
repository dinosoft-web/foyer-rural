import { Link } from 'react-router-dom'

import { ReactComponent as Planet } from '../assets/svg/planet.svg'
import { ReactComponent as Facebook } from '../assets/svg/facebook.svg'
import { ReactComponent as Mail } from '../assets/svg/mail.svg'
import { ReactComponent as Instagram } from '../assets/svg/instagram.svg'

import classes from './Footer.module.css'

function Footer() {
	return (
		<>
			<footer className={classes.footer}>
				<ul className={classes.list}>
					<li className={classes.button}>
						<Mail width="22px" height="22px" />
						<Link
							target="_blank"
							to="mailto:foyer.rural.graye.et.charnay@outlook.fr"
						>
							Nous contacter
						</Link>
					</li>
					<li className={classes.social}>
						<Link
							target="_blank"
							to="https://www.facebook.com/profile.php?id=100090138450793"
						>
							<Facebook width="38px" height="38px" />
						</Link>
					</li>

					<li className={classes.social}>
						<Link
							target="_blank"
							to="https://www.instagram.com/foyer_rural_graye_et_charnay/"
						>
							<Instagram width="36px" height="36px" />
						</Link>
					</li>

					<li className={classes.button}>
						<Planet width="22px" height="22px" />
						<Link
							target="_blank"
							to="https://www.helloasso.com/associations/foyer-rural-de-graye-et-charnay"
						>
							Hello Asso
						</Link>
					</li>
				</ul>
				<div className={classes.infos}>
					<Link to="/mentions-legales">
						<span>Mentions Légales</span>
					</Link>
					<span>&copy; 2023 Dinosoft.</span>
				</div>
			</footer>
		</>
	)
}
export default Footer
