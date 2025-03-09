import { addMinutes, format } from 'date-fns'
import classes from "./fly-info.module.scss";
import "@fontsource/open-sans";

export default function FlyInfo({ onSegments }) {
	if (!Array.isArray(onSegments)) {
		return null
	}
	const elementsFly = onSegments.map((el) => {
		const id = Math.random() * 100
		const { origin, destination, date, duration, stops } = el
		const stopPoint = stops ? stops.map(el => `${el} `) : null
		const fn = function (n) {
			switch (n) {
				case 0:
					return 'БЕЗ ПЕРЕСАДОК'
					break
				case 1:
					return '1 ПЕРЕСАДКА'
					break
				case 2:
					return '2 ПЕРЕСАДКИ'
					break
				case 3:
					return '3 ПЕРЕСАДКИ'
					break
				default: 'БЕЗ ПЕРЕСАДОК'
			}
		}
		const dates = new Date(date)
		const arrivalDate = addMinutes(dates, duration)
		const departureTime = format(dates, 'HH:mm')
		const arrivalTime = format(arrivalDate, 'HH:mm')

		const durationHours = Math.floor(duration / 60)
		const durationMin = duration % 60 < 10 ? `0${duration % 60}` : duration % 60
		const durationTime = `${durationHours}ч ${durationMin}м`
		return (
			<div key={id} className={classes["wrapper-fly-info"]}>
				<div className={classes["wrapper-title"]}>
					<p className={classes.title}>{origin} - {destination}</p>
					<p className={classes["title-value"]}>{departureTime} - {arrivalTime}</p>
				</div>
				<div className={classes["wrapper-title"]}>
					<p className={classes.title}>В ПУТИ</p>
					<p className={classes["title-value"]}>{durationTime}</p>
				</div>
				<div className={classes["wrapper-title"]}>
					<p className={classes.title}>{fn(stops.length)}</p>
					<p className={classes["title-value"]}>{stopPoint}</p>
				</div>
			</div>
		)
	})

	return (
		<div>
			{elementsFly}
		</div>
	);
}
