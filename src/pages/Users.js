import { Outlet } from 'react-router-dom'
import UserHeader from '../components/admin/UserHeader'

import Card from '../components/shared/Card'

function Users() {
	return (
		<Card>
			<UserHeader />
			<Outlet />
		</Card>
	)
}
export default Users
