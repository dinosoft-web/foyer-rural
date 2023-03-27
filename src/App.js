import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import RootLayout from './pages/Root'
import HomePage from './pages/Home'
import Association from './pages/Association'
import NewsPage from './pages/News'
import Events from './pages/Events'
import NewsRoot from './pages/NewsRoot'
import EventRoot from './pages/EventsRoot'
import NewsDetails from './components/news/NewsDetails'
import EventDetails from './components/events/EventDetails'
import EditEventPage from './pages/EditEvent'
import EventDetailsRoot from './pages/EventDetailsRoot'
import NewsDetailsRoot from './pages/NewsDetailsRoot'
import EditNewsPage from './pages/EditNews'
import NewEventPage from './pages/NewEventPage'
import NewNewsPage from './pages/NewNewsPage'
import AdminRoot from './pages/AdminRoot'
import AdminDesk from './components/admin/AdminDesk'
import Users from './pages/Users'
import AddUser from './pages/AddUser'
import EditUser from './pages/EditUser'
import EditMainEventPage from './pages/EditMainEventPage'
import EditBoardPage from './pages/EditBoardPage'
import UserInfo from './pages/UserInfo'
import LoginForm from './components/admin/LoginForm'
import Mentions from './components/Mentions'

import 'react-toastify/dist/ReactToastify.css'

// console.log('')

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: '/admin',
				element: <AdminRoot />,
				children: [
					{ index: true, element: <AdminDesk /> },
					{
						path: 'users',
						element: <Users />,
						children: [
							{ index: true, element: <UserInfo /> },
							{ path: 'add', element: <AddUser /> },
							{ path: 'edit', element: <EditUser /> },
						],
					},
					{ path: 'edit-event', element: <EditMainEventPage /> },
					{ path: 'edit-board', element: <EditBoardPage /> },
					{ path: 'login', element: <LoginForm /> },
				],
			},
			{ path: '/association', element: <Association /> },
			{
				path: '/actualites',
				element: <NewsRoot />,
				children: [
					{
						index: true,
						element: <NewsPage />,
					},
					{
						path: ':newsId',
						id: 'news-detail',
						element: <NewsDetailsRoot />,
						children: [
							{ index: true, element: <NewsDetails /> },
							{ path: 'edit', element: <EditNewsPage /> },
						],
					},
					{
						path: 'new',
						element: <NewNewsPage />,
					},
				],
			},
			{
				path: '/evenements',
				element: <EventRoot />,
				children: [
					{ index: true, element: <Events /> },
					{
						path: ':eventId',
						id: 'event-detail',
						element: <EventDetailsRoot />,

						children: [
							{ index: true, element: <EventDetails /> },
							{ path: 'edit', element: <EditEventPage /> },
						],
					},
					{ path: 'new', element: <NewEventPage /> },
				],
			},
			{ path: '/mentions-legales', element: <Mentions /> },
		],
	},
])

function App() {
	return (
		<>
			<ToastContainer />
			<RouterProvider router={router} />
		</>
	)
}

export default App
