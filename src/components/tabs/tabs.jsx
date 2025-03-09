import { useSelector, useDispatch } from 'react-redux'
import classes from "./tabs.module.scss";
import "@fontsource/open-sans";
import { filterChangeFaster, filterChangeLowCost, filterChangeOptimal } from '../../store/aviasalesSlice'

export default function Tabs() {
	const ticketsData = useSelector((store) => store.aviasales)
	const dispatch = useDispatch()
	const { filter } = ticketsData

	const clazzLowcost = filter === 'lowCost' ? classes.focused : classes.container
	const clazzFaster = filter === 'faster' ? classes.focused : classes.container
	const clazzOptimal = filter === 'optimal' ? classes.focused : classes.container

	return (
		<>
			<div className={classes["wrapper-tabs"]}>
				<div
					className={clazzLowcost}
					onClick={() => dispatch(filterChangeLowCost())}
				>
					<p className={classes.p}>САМЫЙ ДЕШЕВЫЙ</p>
				</div>

				<div
					className={clazzFaster}
					onClick={() => dispatch(filterChangeFaster())}>
					<p className={classes.p}>САМЫЙ БЫСТРЫЙ</p>
				</div>

				<div
					className={clazzOptimal}
					onClick={() => dispatch(filterChangeOptimal())}>
					<p className={classes.p}>ОПТИМАЛЬНЫЙ</p>
				</div>
			</div >
		</>
	);
}
