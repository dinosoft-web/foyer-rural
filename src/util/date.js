export const dateHandler = (props) => {
	const date = Date.parse(props)
	const newDate = new Date(date)
	const number = newDate.getDate()
	const day = Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(newDate)
	const capitalizedDay = capitalizeFirstLetter(day)
	const month = Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(newDate)
	const capitalizedMonth = capitalizeFirstLetter(month)
	const uppercaseMonth = month.toUpperCase()
	const year = newDate.getFullYear()
	const trimedMonth = month.slice(0, 3)

	const formatedDate = {
		number,
		capitalizedDay,
		capitalizedMonth,
		year,
		trimedMonth,
		uppercaseMonth,
	}

	return formatedDate
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1)
}
