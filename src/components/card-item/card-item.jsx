import classes from "./card-item.module.scss";
import s7logo from "../../assets/S7logo.svg";
import "@fontsource/open-sans";
import FlyInfo from "../fly-info/fly-info";

export default function CardItem({ onTicket }) {
	const { price, carrier, segments } = onTicket
	const imageURL = !carrier ? s7logo : `https://pics.avs.io/99/36/${carrier}.png`
	const num = price.toLocaleString("ru-RU")
	return (
		<div className={classes["wrapper-card-item"]}>
			<div className={classes["price-block"]}>
				<div className={classes.price}>{num} Р</div>
				<img src={imageURL} alt={carrier} />
			</div>
			<FlyInfo onSegments={segments} />
		</div>
	);
}
