import React from "react";
import styles from "./HeaderComponent.module.css";
export default function HeaderComponent({ onClick }) {
  return (
    <>
      <div className={styles.componentDiv} onClick={() => onClick()}>
        <img
          src="https://logoipsum.com/artwork/376"
          alt="Logo"
          className="w-20 h-auto"
        />
      </div>
    </>
  );
}
