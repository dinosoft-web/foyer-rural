import { useState, useEffect } from 'react'
import { doc, getDoc } from 'firebase/firestore'

import Card from './shared/Card'

import { db } from '../firestore.config'

import classes from './Board.module.css'

function Board() {
	const [formData, setFormData] = useState({
		presidentName: '',
		presidentIsFemale: false,
		vicePresidentName: '',
		vicePresidentIsFemale: false,
		secretaireName: '',
		secretaireIsFemale: false,
		secretaireAdjointName: '',
		secretaireAdjointIsFemale: false,
		tresorierName: '',
		tresorierIsFemale: false,
		tresorierAdjointName: '',
		tresorierAdjointIsFemale: false,
		imageUrl: '',
	})

	const {
		presidentName,
		presidentIsFemale,
		vicePresidentName,
		vicePresidentIsFemale,
		secretaireName,
		secretaireIsFemale,
		secretaireAdjointName,
		secretaireAdjointIsFemale,
		tresorierName,
		tresorierIsFemale,
		tresorierAdjointName,
		tresorierAdjointIsFemale,
		imageUrl,
	} = formData

	useEffect(() => {
		const fetchMainEvent = async () => {
			const docRef = doc(db, 'board', 'board')
			const docSnap = await getDoc(docRef)
			if (docSnap.exists()) {
				setFormData(docSnap.data())
			}
		}
		fetchMainEvent()
	}, [])

	return (
		<div className={classes.container}>
			<div className={classes.mapContainer}>
				<h2>Nous Trouver</h2>
				<div className={classes.img}></div>
			</div>
			<Card>
				<div className={classes.boardContainer}>
					<div
						className={classes.img}
						style={{ backgroundImage: `url('${imageUrl}')` }}
					></div>

					<div className={classes.boardList}>
						<h2>Le Bureau</h2>
						<ul>
							<li>{`${
								presidentIsFemale ? 'Présidente' : 'Président'
							} : ${presidentName}`}</li>
							<li>{`${
								vicePresidentIsFemale ? 'Vice-Présidente' : 'Vice-Président'
							} : ${vicePresidentName}`}</li>
							<li>{`${
								secretaireIsFemale ? 'Secrétaire' : 'Secrétaire'
							} : ${secretaireName}`}</li>
							<li>{`${
								secretaireAdjointIsFemale
									? 'Secrétaire Adjointe'
									: 'Secrétaire Adjoint'
							} : ${secretaireAdjointName}`}</li>
							<li>{`${
								tresorierIsFemale ? 'Trésorière' : 'Trésorier'
							} : ${tresorierName}`}</li>
							<li>
								{`${
									tresorierAdjointIsFemale
										? 'Trésorière Adjointe'
										: 'Trésorier Adjoint'
								} : ${tresorierAdjointName}`}
							</li>
						</ul>
					</div>
				</div>
			</Card>
		</div>
	)
}
export default Board
