import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyB8jzwAc_sUjW-54WZNjGzfDY--eQPmmGA',
	authDomain: 'foyer-rural-graye.firebaseapp.com',
	projectId: 'foyer-rural-graye',
	storageBucket: 'foyer-rural-graye.appspot.com',
	messagingSenderId: '818431285305',
	appId: '1:818431285305:web:bfa6a5d674a92a68efd5e8',
}

initializeApp(firebaseConfig)
export const db = getFirestore()
