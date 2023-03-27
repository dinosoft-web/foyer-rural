import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, addDoc, updateDoc, getDoc, collection } from 'firebase/firestore'
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from 'firebase/storage'
import { toast } from 'react-toastify'

import { db } from '../../firestore.config'

import Card from '../shared/Card'

import classes from './NewsForm.module.css'
import ToggleSwitch from '../shared/ToggleSwitch'

function NewsForm({ method }) {
	const [submitting, setSubmitting] = useState(false)
	const [checked, setChecked] = useState(false)
	const [formData, setFormData] = useState({
		date: '',
		author: '',
		title: '',
		abstract: '',
		description: '',
		image: {},
		file: false,
		attachment: {},
	})

	const { date, author, title, abstract, description, image, attachment } =
		formData

	const navigate = useNavigate()
	const params = useParams()

	useEffect(() => {
		if (method === 'PATCH') {
			const fetchNews = async () => {
				const docRef = doc(db, 'news', params.newsId)
				const docSnap = await getDoc(docRef)
				console.log('pouet')
				if (docSnap.exists()) {
					console.log(docSnap.data())
					setFormData(docSnap.data())
				} else {
					navigate('/')
				}
			}
			fetchNews()
		}
	}, [params.newsId, method, navigate])

	const submitHandler = async (e) => {
		e.preventDefault()

		const storeImage = async (image) => {
			return new Promise((resolve, reject) => {
				setSubmitting(true)
				const storage = getStorage()

				const storageRef = ref(storage, 'images/' + image.name)
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

		const storeFile = async (file) => {
			if (checked) {
				return new Promise((resolve, reject) => {
					const storage = getStorage()

					const storageRef = ref(storage, 'files/' + file.name)
					const uploadTask = uploadBytesResumable(storageRef, file)

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
									toast.error('Pas de fichier à charger')
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
								setSubmitting(false)
							})
						}
					)
				})
			} else {
				return
			}
		}

		let imageUrl =
			'https://firebasestorage.googleapis.com/v0/b/foyer-rural-graye.appspot.com/o/imagesSite%2FLogo_Placeholder1.png?alt=media&token=25c056c5-af6e-4373-9fd2-d10428b5a99f'
		let fileUrl = ''

		if (image.length > 0) {
			imageUrl = await Promise.resolve(storeImage(image[0])).catch((error) => {
				toast.error("L'image n'a pas pu être chargé")
				return
			})
		}

		if (checked) {
			fileUrl = await Promise.resolve(storeFile(attachment[0])).catch(
				(error) => {
					toast.error("Le fichier n'a pas pu être chargé")
					return
				}
			)
		}

		const formDataCopy = {
			...formData,
			imageUrl,
			fileUrl,
		}

		delete formDataCopy.image
		delete formDataCopy.attachment

		// const docRef = await addDoc(collection(db, 'news'), formDataCopy)
		// navigate(`/actualites/${docRef.id}`)

		if (method === 'GET') {
			console.log('GET')
			const docRef = await addDoc(collection(db, 'news'), formDataCopy)
			navigate(`/actualites/${docRef.id}`)
			toast.success('Actualité créée avec succès !')
		} else if (method === 'PATCH') {
			const docRef = doc(db, 'news', params.newsId)
			await updateDoc(docRef, formDataCopy)
			navigate(`/actualites/${docRef.id}`)
			toast.success('Actualité modifiée avec succès !')
		}
	}

	const mutateHandler = (e) => {
		if (e.target.files && e.target.id === 'image') {
			setFormData((prevState) => ({
				...prevState,
				image: e.target.files,
			}))
		} else if (e.target.files && e.target.id === 'attachment') {
			setFormData((prevState) => ({
				...prevState,
				attachment: e.target.files,
			}))
		} else if (e.target.id === 'date') {
			const dateNumber = Date.parse(e.target.value)

			setFormData((prevState) => ({
				...prevState,
				[e.target.id]: e.target.value,
				dateNumber: dateNumber,
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

	const handleClick = () => {
		setChecked(!checked)
		setFormData((prevState) => ({
			...prevState,
			file: !prevState.file,
		}))
	}

	return (
		<Card>
			<form onSubmit={submitHandler} className={classes.form}>
				<div className={classes.date}>
					<p>
						<label htmlFor="date">Date</label>
						<input
							id="date"
							type="date"
							name="date"
							required
							defaultValue={method ? date : ''}
							onChange={mutateHandler}
						/>
					</p>
					<p>
						<label htmlFor="author">Auteur</label>
						<input
							id="author"
							type="text"
							name="author"
							required
							defaultValue={method ? author : ''}
							onChange={mutateHandler}
						/>
					</p>
				</div>

				<p>
					<label htmlFor="title">Titre</label>
					<input
						id="title"
						type="text"
						name="title"
						required
						defaultValue={method ? title : ''}
						onChange={mutateHandler}
					/>
				</p>
				<p>
					<label htmlFor="abstract">Résumé</label>
					<input
						id="abstract"
						type="text"
						name="abstract"
						required
						defaultValue={method ? abstract : ''}
						onChange={mutateHandler}
					/>
				</p>

				<p>
					<label htmlFor="description">Description</label>
					<textarea
						name="description"
						id="description"
						cols="30"
						rows="5"
						required
						defaultValue={method ? description : ''}
						onChange={mutateHandler}
					></textarea>
				</p>
				<p>
					<label htmlFor="image">Image</label>
					<input
						className={classes.file}
						id="image"
						type="file"
						name="image"
						accept="image/**"
						onChange={mutateHandler}
					/>
				</p>
				<div className={classes.date}>
					<ToggleSwitch
						handleClick={handleClick}
						label={'Pièce jointe'}
						checked={checked}
					/>
					{checked && (
						<p>
							<input
								className={classes.file}
								id="attachment"
								type="file"
								name="attachment"
								accept=".pdf"
								onChange={mutateHandler}
							/>
						</p>
					)}
				</div>

				<div className={classes.actions}>
					<button type="button" onClick={cancelHandler}>
						Annuler
					</button>
					<button>{submitting ? 'Enregistrement...' : 'Sauvegarder'}</button>
				</div>
			</form>
		</Card>
	)
}
export default NewsForm
