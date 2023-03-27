import classes from './ToggleSwitch.module.css'

function ToggleSwitch({ label, handleClick, checked }) {
	return (
		<div className={classes.toggleButtonCover}>
			<label htmlFor="checkbox">{label}</label>
			<div className={`${classes.button} ${classes.r}`} id={classes.button1}>
				<input
					type="checkbox"
					className={classes.checkbox}
					name="checkbox"
					onChange={handleClick}
					checked={checked}
				/>
				<div className={classes.knobs}></div>
				<div className={classes.layer}></div>
			</div>
		</div>
	)
}
export default ToggleSwitch
