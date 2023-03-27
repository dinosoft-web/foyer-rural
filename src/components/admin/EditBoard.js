import { useState, useEffect } from 'react'
import { doc, updateDoc, getDoc } from 'firebase/firestore'

import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { db } from '../../firestore.config'

import Card from '../shared/Card'
import classes from './EditBoard.module.css'

function EditBoard() {
	const [checkedPres, setCheckedPres] = useState(true)
	const [checkedVP, setCheckedVP] = useState(true)
	const [checkedSec, setCheckedSec] = useState(true)
	const [checkedSecAdj, setCheckedSecAdj] = useState(true)
	const [checkedTres, setCheckedTres] = useState(true)
	const [checkedTresAdj, setCheckedTresAdj] = useState(true)

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
		image: {},
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
		image,
	} = formData

	const navigate = useNavigate()

	useEffect(() => {
		const fetchBoard = async () => {
			const docRef = doc(db, 'board', 'board')
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const data = docSnap.data()
				setFormData(data)
				setCheckedPres(data.presidentIsFemale)
				setCheckedVP(data.vicePresidentIsFemale)
				setCheckedSec(data.secretaireIsFemale)
				setCheckedSecAdj(data.secretaireAdjointIsFemale)
				setCheckedTres(data.tresorierIsFemale)
				setCheckedTresAdj(data.tresorierAdjointIsFemale)
			}
		}
		fetchBoard()
	}, [])

	const submitHandler = async (e) => {
		e.preventDefault()

		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				const storage = getStorage()

				const storageRef = ref(storage, 'imageBoard/' + image.name)
				const uploadTask = uploadBytesResumable(storageRef, image)

				uploadTask.on(
					'state_changed',
					(snapshot) => {
						const progress =
							(snapshot.bytesTransferred / snapshot.totalBytes) * 100
						console.log('Upload is ' + progress + '% done')
						switch (snapshot.state) {
							case 'paused':
								toast.success('Chargement en pause')
								break
							case 'running':
								toast.success('Chargement en cours')
								break
							default:
								toast("Pas d'image à charger")
						}
					},
					(error) => {
						switch (error.code) {
							case 'storage/unauthorized':
								break
							case 'storage/canceled':
								break
							case 'storage/unknown':
								break
							default:
								console.log('error')
						}
					},
					() => {
						getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
							resolve(downloadURL)
						})
					}
				)
			})
		}

		let imageUrl = formData.imageUrl

		if (image) {
			console.log('first')
			imageUrl = await Promise.resolve(storeImage(image[0])).catch((error) => {
				toast.error("L'image n'a pas pu être modifiée")
				return
			})
		}

		const formDataCopy = {
			...formData,
			imageUrl,
		}

		delete formDataCopy.image

		const docRef = doc(db, 'board', 'board')
		await updateDoc(docRef, formDataCopy)
		navigate('/association')
		toast.success('Bureau modifié avec succès !')
	}

	const changeHandler = (e) => {
		if (e.target.files) {
			setFormData((prevState) => ({
				...prevState,
				image: e.target.files,
			}))
		} else {
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
			}))
		}
	}

	const cancelHandler = () => {
		navigate('..')
	}

	const handlerClick = (e) => {
		console.log(e.target.id)
		if (e.target.id === 'presidentIsFemale') {
			console.log('first')
			setCheckedPres(!checkedPres)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedPres,
			}))
		} else if (e.target.id === 'vicePresidentIsFemale') {
			setCheckedVP(!checkedVP)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedVP,
			}))
		} else if (e.target.id === 'secretaireIsFemale') {
			setCheckedSec(!checkedSec)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedSec,
			}))
		} else if (e.target.id === 'secretaireAdjointIsFemale') {
			setCheckedSecAdj(!checkedSecAdj)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedSecAdj,
			}))
		} else if (e.target.id === 'tresorierIsFemale') {
			setCheckedTres(!checkedTres)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedTres,
			}))
		} else if (e.target.id === 'tresorierAdjointIsFemale') {
			setCheckedTresAdj(!checkedTresAdj)
			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: !checkedTresAdj,
			}))
		}
	}
	return (
		<Card>
			<h2>Modifier Bureau</h2>
			<form onSubmit={submitHandler} className={classes.form}>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="president">Président</label>
						<input
							id="presidentName"
							type="text"
							name="president"
							required
							value={presidentName}
							onChange={changeHandler}
						/>
					</p>
					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							type="checkbox"
							name="checkbox"
							id="presidentIsFemale"
							checked={presidentIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="vicePresident">Vice-Président</label>
						<input
							id="vicePresidentName"
							type="text"
							name="vicePresident"
							required
							value={vicePresidentName}
							onChange={changeHandler}
						/>
					</p>

					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							id="vicePresidentIsFemale"
							type="checkbox"
							name="checkbox"
							checked={vicePresidentIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="secretaire">Secrétaire</label>
						<input
							id="secretaireName"
							type="text"
							name="secretaire"
							required
							value={secretaireName}
							onChange={changeHandler}
						/>
					</p>
					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							id="secretaireIsFemale"
							type="checkbox"
							name="checkbox"
							checked={secretaireIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="secretaireAdjoint">Secrétaire Adjoint</label>
						<input
							id="secretaireAdjointName"
							type="text"
							name="secretaireAdjoint"
							required
							value={secretaireAdjointName}
							onChange={changeHandler}
						/>
					</p>
					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							id="secretaireAdjointIsFemale"
							type="checkbox"
							name="checkbox"
							checked={secretaireAdjointIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="tresorier">Trésorier</label>
						<input
							id="tresorierName"
							type="text"
							name="tresorier"
							required
							value={tresorierName}
							onChange={changeHandler}
						/>
					</p>
					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							id="tresorierIsFemale"
							type="checkbox"
							name="checkbox"
							checked={tresorierIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>
				<div className={classes.id}>
					<p className={classes.input}>
						<label htmlFor="tresorierAdjoint">Trésorier Adjoint</label>
						<input
							id="tresorierAdjointName"
							type="text"
							name="tresorierAdjoint"
							required
							value={tresorierAdjointName}
							onChange={changeHandler}
						/>
					</p>
					<p className={classes.checkbox}>
						<label htmlFor="checkbox">Féminiser</label>
						<input
							id="tresorierAdjointIsFemale"
							type="checkbox"
							name="checkbox"
							checked={tresorierAdjointIsFemale}
							onChange={handlerClick}
						/>
					</p>
				</div>

				<p className={classes.image}>
					<label htmlFor="image">Image</label>
					<input
						className={classes.file}
						id="image"
						type="file"
						name="image"
						accept="image/**"
						onChange={changeHandler}
					/>
				</p>

				<div className={classes.actions}>
					<button type="button" onClick={cancelHandler}>
						Annuler
					</button>
					<button>Modifier</button>
				</div>
			</form>
		</Card>
	)
}
export default EditBoard
