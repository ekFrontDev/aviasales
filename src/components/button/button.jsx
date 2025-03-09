import classes from "./button.module.scss";
import "@fontsource/open-sans";

export default function Button({ onCounter }) {
	return <button
		className={classes.button}
		onClick={onCounter}
	>
		Показать еще 5 билетов!
	</button>;
}
