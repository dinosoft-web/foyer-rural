import { useState } from 'react'

import { NavLink, Link } from 'react-router-dom'

import classes from './MainNavigation.module.css'

function MainNavigation() {
	const [showNavbar, setShowNavbar] = useState(false)

	const handleShowNavbar = () => {
		setShowNavbar(!showNavbar)
	}

	return (
		<header className={classes.header}>
			<nav>
				<div className={classes.logo}></div>
				<ul className={`${classes.list} ${showNavbar ? classes.active : ''}`}>
					<ul className={classes.lists}>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								onClick={handleShowNavbar}
								to="/"
							>
								Accueil
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								onClick={handleShowNavbar}
								to="/association"
							>
								Association
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								onClick={handleShowNavbar}
								to="/actualites"
							>
								Actualités
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								onClick={handleShowNavbar}
								to="/evenements"
							>
								Evénements
							</NavLink>
						</li>

						<li>
							<NavLink
								className={({ isActive }) =>
									isActive ? classes.active : undefined
								}
								onClick={handleShowNavbar}
								to="/admin"
							>
								Administration
							</NavLink>
						</li>
					</ul>

					<ul className={classes.lists}>
						<li>
							<Link
								target="_blank"
								to="https://www.helloasso.com/associations/foyer-rural-de-graye-et-charnay/adhesions/adhesion/widget"
							>
								<button>Nous rejoindre</button>
							</Link>
						</li>
						<li>
							<Link
								target="_blank"
								to="https://www.helloasso.com/associations/foyer-rural-de-graye-et-charnay/formulaires/1/widget"
							>
								<button>Faire un don</button>
							</Link>
						</li>
					</ul>
				</ul>
				<div className={classes.mobileMenu}>
					<button
						id="menu-btn"
						type="button "
						class={classes.hamburger}
						onClick={handleShowNavbar}
					>
						<span
							className={`${classes.hamburgerTop} ${
								showNavbar ? classes.open : ''
							}`}
						></span>
						<span
							className={`${classes.hamburgerMiddle} ${
								showNavbar ? classes.open : ''
							}`}
						></span>
						<span
							className={`${classes.hamburgerBottom} ${
								showNavbar ? classes.open : ''
							}`}
						></span>
					</button>
				</div>
			</nav>
		</header>
	)
}
export default MainNavigation
