import React from "react";
import styles from "./InstanceComponent.module.css";

function InstanceComponent({ name, status }) {
  return (
    <>
      <div className={styles.instanceDiv}>
        <div
          className={
            status === "up" ? styles.instanceActive : styles.instanceInactive
          }
        ></div>
        <div className="instance-name">{name}</div>
      </div>
    </>
  );
}

export default InstanceComponent;
