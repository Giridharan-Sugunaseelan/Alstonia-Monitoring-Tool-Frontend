import React from "react";
import styles from "./TableComponent.module.css";

export default function TableComponent({ data }) {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Server IP</th>
            <th className={styles.tableHeader}>Host Name</th>
            <th className={styles.tableHeader}>CPU Idle (%)</th>
            <th className={styles.tableHeader}>Memory Consumption (%)</th>
            <th className={styles.tableHeader}>Paging</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            let cpuIdleClass = styles.cpuIdleRed;
            if (parseFloat(item.cpuIdle) > 80) {
              cpuIdleClass = styles.cpuIdleGreen;
            } else if (parseFloat(item.cpuIdle) > 70) {
              cpuIdleClass = styles.cpuIdleOrange;
            }

            let memoryConsumptionClass = styles.memoryConsumptionGreen;
            if (parseFloat(item.memoryUsage) > 80) {
              memoryConsumptionClass = styles.memoryConsumptionRed;
            } else if (parseFloat(item.memoryUsage) > 70) {
              memoryConsumptionClass = styles.memoryConsumptionOrange;
            }

            return (
              <tr key={index} className={styles.tableRow}>
                <td className={styles.tableCell}>{item.serverIP}</td>
                <td className={styles.tableCell}>{item.hostName}</td>
                <td className={`${styles.tableCell} ${cpuIdleClass}`}>
                  {item.cpuIdle}
                </td>
                <td className={`${styles.tableCell} ${memoryConsumptionClass}`}>
                  {item.memoryUsage}
                </td>
                <td className={styles.tableCell}>{item.paging}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// import React from "react";
// import styles from "./TableComponent.module.css";

// export default function TableComponent({ data }) {
//   let cpuIdleClass = styles?.cpuIdleGreen;
//   if (parseFloat(data?.cpuIdle) > 80) {
//     cpuIdleClass = styles?.cpuIdleRed;
//   } else if (parseFloat(data?.cpuIdle) > 70) {
//     cpuIdleClass = styles?.cpuIdleOrange;
//   }

//   let memoryConsumptionClass = styles.memoryConsumptionGreen;
//   if (parseFloat(data?.memoryConsumption) > 80) {
//     memoryConsumptionClass = styles.memoryConsumptionRed;
//   } else if (parseFloat(data?.memoryConsumption) > 70) {
//     memoryConsumptionClass = styles.memoryConsumptionOrange;
//   }

//   return (
//     <div className={styles.tableContainer}>
//       <table className={styles.table}>
//         <thead>
//           <tr>
//             <th className={styles.tableHeader}>Server IP</th>
//             <th className={styles.tableHeader}>Host Name</th>
//             <th className={styles.tableHeader}>CPU Idle (%)</th>
//             <th className={styles.tableHeader}>Memory Consumption (%)</th>
//             <th className={styles.tableHeader}>Paging</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data ? (
//             <tr className={styles.tableRow}>
//               <td className={styles.tableCell}>{data?.serverIp}</td>
//               <td className={styles.tableCell}>{data?.hostName}</td>
//               <td className={`${styles.tableCell} ${cpuIdleClass}`}>
//                 {data?.cpuIdle}
//               </td>
//               <td className={`${styles.tableCell} ${memoryConsumptionClass}`}>
//                 {data?.memoryUsage}
//               </td>
//               <td className={styles.tableCell}>{data.paging}</td>
//             </tr>
//           ) : (
//             <tr>
//               <td colSpan="5" className={styles.noData}>
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }
