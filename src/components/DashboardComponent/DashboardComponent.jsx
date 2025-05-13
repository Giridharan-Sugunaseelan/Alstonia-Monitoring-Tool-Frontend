import React from "react";
import { useSelector } from "react-redux";
import StatusComponent from "../StatusComponent/StatusComponent";
import TableComponent from "../TableComponent/TableComponent";
import styles from "./DashboardComponent.module.css";
import { useParams } from "react-router-dom";
import { LineGraphComponent } from "../LineGraphComponent/LineGraphComponent";

export default function DashboardComponent() {
  const { serviceNode } = useParams();
  console.log(serviceNode);
  const servers = useSelector(
    (state) => state?.serverHealth?.realTime[serviceNode]
  );

  const keys = servers ? Object.keys(servers) : [];

  function getItems(objects, keys, metricKey1 = "", metricKey2 = "") {
    const result = [];
    keys.forEach((key) => {
      if (!metricKey1 && !metricKey2) {
        result.push(objects[key]);
      } else {
        result.push({
          [metricKey1]: objects[key][metricKey1],
          [metricKey2]: parseFloat(objects[key][metricKey2]),
        });
      }
    });
    return result;
  }

  const serverHealths = getItems(servers, keys);

  const cpuUsage = getItems(servers, keys, "serverIP", "cpuIdle");

  const memoryConsumption = getItems(servers, keys, "serverIP", "memoryUsage");

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.dashboardTitle}>Server Dashboard</div>

      <div className={styles.dashboardGrid}>
        <div className={styles.dashboardCard}>
          <LineGraphComponent
            data={cpuUsage}
            metricKey="cpuIdle"
            title="CPU Usage"
          />
        </div>

        <div className={styles.dashboardStatus}>
          <div className={styles.statusHalf}>
            <StatusComponent
              data={cpuUsage}
              metricKey="cpuIdle"
              title={"CPU_Idle"}
            />
          </div>
          <div className={`${styles.statusHalf} ${styles.borderLeft}`}>
            <StatusComponent
              data={memoryConsumption}
              metricKey="memoryUsage"
              title={"MEM_COMP"}
            />
          </div>
        </div>

        <div className={styles.dashboardCard}>
          <LineGraphComponent
            data={memoryConsumption}
            metricKey="memoryUsage"
            title="Memory Consumption"
          />
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <TableComponent data={serverHealths} />
      </div>
    </div>
  );
}
