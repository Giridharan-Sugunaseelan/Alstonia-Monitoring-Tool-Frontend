import React, { useEffect } from "react";
import styles from "./NavigationbarComponent.module.css";
import ServiceNodeComponent from "../ServiceNodeComponent/ServiceNodeComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchServiceNodes } from "../../redux/Features/ServiceNodes/ServiceNodeAction/serviceNodeActions";
function NavigationbarComponent() {
  const serviceNodes = useSelector(
    (state) => state?.serviceNodes?.serviceNodes
  );
  const dispatcher = useDispatch();

  useEffect(() => {
    dispatcher(fetchServiceNodes());
  }, []);

  return (
    <>
      <div className={styles.componentDiv}>
        <ul>
          {serviceNodes?.map((serviceNode) => {
            return (
              <li>
                <ServiceNodeComponent service={serviceNode} />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default NavigationbarComponent;
