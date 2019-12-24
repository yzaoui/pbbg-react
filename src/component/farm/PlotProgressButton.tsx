import React from "react";
import styles from "./PlotProgressButton.module.scss";

type Props = {
    percentage: number;
    label: string;
    disabled?: boolean;
};

const PlotProgressButton: React.FC<Props> = ({ percentage, label, disabled }) => <button className={styles.PlotProgressButton} disabled={disabled}>
    <div className={styles.inner} style={{ width: percentage * 100 + "%"}} />
    <span className={styles.label}>{label}</span>
</button>;

export default PlotProgressButton;
