import React, { useState } from "react";
import styles from "./ServiceNodeComponent.module.css";
import ServerStatusComponent from "../ServerStatusComponent/ServerStatusComponent";
import VerticalDropdownComponent from "../ApplicationStatusComponent/VerticalDropDownComponent";
import { useDispatch } from "react-redux";
import { fetchServers } from "../../redux/Features/Servers/ServerAction/ServerAction";
import { fetchServiceNodeHealth } from "../../redux/Features/ServiceNodes/ServiceNodeAction/serviceNodeActions";
import { useNavigate } from "react-router-dom";
// import { updateServerHealth } from "../../redux/Features/Servers/ServerSlice";

export default function ServiceNodeComponent({ service }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatcher = useDispatch();
  const navigator = useNavigate();
  function getServers() {
    dispatcher(fetchServers(service.serviceNodeId));
    navigator(`/servers/${service.serviceName}`);
  }

  function getServiceHealth() {
    dispatcher(fetchServiceNodeHealth(service.serviceNodeId));
  }

  return (
    <>
      <div className={isOpen ? styles.componentActiveDiv : styles.componentDiv}>
        <div
          className={styles.componentTile}
          onClick={() => setIsOpen((i) => !i)}
        >
          <div>{service.serviceName}</div>
          <p>{isOpen ? "up" : "down"}</p>
        </div>
        <div
          className={`${styles.subComponentDiv} ${isOpen ? styles.open : ""}`}
        >
          <ul className={styles.subcomponentList}>
            <li>
              {/* <ServerStatusComponent
                name={"Server stats"}
                getServers={getServers}
              /> */}
              <VerticalDropdownComponent
                name={"Server Stats"}
                stateKey={"servers"}
                serviceNode={service.serviceName}
                onClick={getServers}
              />
            </li>
            <li>
              <VerticalDropdownComponent
                name={"Application status"}
                stateKey={"serviceNodeHealth"}
                serviceNode={service.serviceName}
                onClick={getServiceHealth}
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
