import classes from "./head.module.scss";
import aviasalesLogo from "../../assets/aviasalesLogo.svg";

export default function Head() {
  return (
    <div className={classes.headLogo}>
      <img
        className={classes.img}
        src={aviasalesLogo}
        alt={"Logo"}
        width={"60px"}
        height={"60px"}
      />
    </div>
  );
}
