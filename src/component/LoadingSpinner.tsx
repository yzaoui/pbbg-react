import React from "react";
import styles from "./LoadingSpinner.module.scss";

interface Props {
    animationDuration?: string;
}

const LoadingSpinner: React.FC<Props> = (props) => <div
    className={styles.spinner}
    style={{ animationDuration: props.animationDuration }}
/>;

export default LoadingSpinner;
