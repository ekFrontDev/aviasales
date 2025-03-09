import { useSelector, useDispatch } from "react-redux";
import { checkedStatusAll, checkedStatusWithout, checkedStatusOne, checkedStatusTwo, checkedStatusThree } from '../../store/aviasalesSlice'
import classes from "./filter.module.scss";
import "@fontsource/open-sans";

export default function Filter() {
	const ticketsData = useSelector((store) => store.aviasales)
	const dispatch = useDispatch()
	const { transferAll, transferWithout, transferOne, transferTwo, transferThree } = ticketsData
	const checkboxStatusWithout = transferWithout ? true : false
	const checkboxStatusOne = transferOne ? true : false
	const checkboxStatusTwo = transferTwo ? true : false
	const checkboxtatusThree = transferThree ? true : false

	return (
		<div className={classes.wrapper}>
			<form>
				<span className={classes.span}>Количество пересадок</span>
				<div className={classes["filter-wrapper"]}>
					<div className={classes["wrapper-checkbox"]}>
						<input
							className={classes["checkbox-input"]}
							type="checkbox"
							name="contact"
							value="Все"
							checked={transferAll}
							onChange={() => dispatch(checkedStatusAll())}
						/>
						<label htmlFor="contactChoice1">Все</label>
					</div>

					<div className={classes["wrapper-checkbox"]}>
						<input
							className={classes["checkbox-input"]}
							type="checkbox"
							name="contact"
							value="Без пересадок"
							checked={checkboxStatusWithout}
							onChange={() => dispatch(checkedStatusWithout())}
						/>
						<label htmlFor="contactChoice2">Без пересадок</label>
					</div>

					<div className={classes["wrapper-checkbox"]}>
						<input
							className={classes["checkbox-input"]}
							type="checkbox"
							name="contact"
							value="1 пересадка"
							checked={checkboxStatusOne}
							onChange={() => dispatch(checkedStatusOne())}
						/>
						<label htmlFor="contactChoice3">1 пересадка</label>
					</div>

					<div className={classes["wrapper-checkbox"]}>
						<input
							className={classes["checkbox-input"]}
							type="checkbox"
							name="contact"
							value="2 пересадки"
							checked={checkboxStatusTwo}
							onChange={() => dispatch(checkedStatusTwo())}
						/>
						<label htmlFor="contactChoice3">2 пересадки</label>
					</div>

					<div className={classes["wrapper-checkbox"]}>
						<input
							className={classes["checkbox-input"]}
							type="checkbox"
							name="contact"
							value="3 пересадки"
							checked={checkboxtatusThree}
							onChange={() => dispatch(checkedStatusThree())}
						/>
						<label htmlFor="contactChoice3">3 пересадки</label>
					</div>
				</div>
			</form>
		</div>
	);
}
