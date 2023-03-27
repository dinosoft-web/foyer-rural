import { Outlet } from 'react-router-dom'

function NewsRoot() {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	)
}
export default NewsRoot
