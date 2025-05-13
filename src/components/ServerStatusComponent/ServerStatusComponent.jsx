import React from "react";
import styles from "./ServerStatusComponent.module.css";

export default function ServerStatusComponent({ name, getServers }) {
  return (
    <>
      <div className={styles.componentDiv} onClick={() => getServers()}>
        <p>{name}</p>
      </div>
    </>
  );
}
