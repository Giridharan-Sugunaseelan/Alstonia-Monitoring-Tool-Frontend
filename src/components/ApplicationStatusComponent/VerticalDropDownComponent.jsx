import React, { useState } from "react";
import { useSelector } from "react-redux";
import styles from "./VerticalDropDownComponent.module.css";
import InstanceComponent from "../InstanceComponent/InstanceComponent";

export default function VerticalDropdownComponent({
  name,
  stateKey,
  serviceNode,
  onClick,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const componentState = useSelector((state) => state[stateKey][stateKey]);

  return (
    <>
      <div
        className={isOpen ? styles.componentActiveDiv : styles.componentDiv}
        onClick={() => onClick()}
      >
        <div className={styles.componentTile}>
          <div>{name}</div>
          <p onClick={() => setIsOpen((i) => !i)}>{isOpen ? "up" : "down"}</p>
        </div>

        <div
          className={`${styles.subComponentDiv} ${isOpen ? styles.open : ""}`}
        >
          <ul className={styles.subcomponentList}>
            {componentState[serviceNode]?.map((component, idx) => (
              <li key={idx}>
                <InstanceComponent status={"up"} name={component["serverIP"]} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
