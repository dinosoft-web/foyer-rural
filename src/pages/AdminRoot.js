import { Outlet } from 'react-router-dom'
import { getAuth } from 'firebase/auth'
import LoginForm from '../components/admin/LoginForm'

function AdminRoot() {
	const auth = getAuth()
	const user = auth.currentUser

	console.log(user)
	return user ? <Outlet /> : <LoginForm />
}
export default AdminRoot
