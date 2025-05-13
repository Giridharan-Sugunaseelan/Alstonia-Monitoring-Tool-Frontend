import React from "react";
import styles from "./StatusComponent.module.css";

function StatusComponent({ data, metricKey, title }) {
  const sortedData =
    data.length > 1 ? data.sort((a, b) => b[metricKey] - a[metricKey]) : data;

  return (
    <div className={styles.statusContainer}>
      <table className={styles.statusTable}>
        <thead className={styles.statusTableHeader}>
          <tr>
            <th className={styles.statusTableHeaderCell}>Server IP</th>
            <th className={styles.statusTableHeaderCell}>{title} (%)</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.length > 0 ? (
            sortedData.map((item, index) => {
              const cpuIdle = item[metricKey];
              let cpuClass =
                metricKey !== "cpuIdle"
                  ? styles.cpuIdleGreen
                  : styles.cpuIdleRed;

              if (cpuIdle > 80) {
                cpuClass =
                  metricKey !== "cpuIdle"
                    ? styles.cpuIdleRed
                    : styles.cpuIdleGreen;
              } else if (cpuIdle > 70) {
                cpuClass = styles.cpuIdleOrange;
              }

              return (
                <tr key={index} className={styles.statusTableRow}>
                  <td className={styles.statusTableCell}>{item.serverIP}</td>
                  <td className={`${styles.statusTableCell} ${cpuClass}`}>
                    {cpuIdle}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="2" className={styles.noData}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StatusComponent;

// import React from "react";
// import styles from "./StatusComponent.module.css";

// function StatusComponent({ data, metricKey, title }) {
//   const cpuIdle = data[metricKey];
//   console.log(metricKey, cpuIdle);

//   let cpuClass = styles.cpuIdleGreen;

//   if (cpuIdle > 80) {
//     cpuClass = styles.cpuIdleRed;
//   } else if (cpuIdle > 70) {
//     cpuClass = styles.cpuIdleOrange;
//   }

//   return (
//     <div className={styles.statusContainer}>
//       <table className={styles.statusTable}>
//         <thead className={styles.statusTableHeader}>
//           <tr>
//             <th className={styles.statusTableHeaderCell}>Server IP</th>
//             <th className={styles.statusTableHeaderCell}>{title} (%)</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data ? (
//             <tr className={styles.statusTableRow}>
//               <td className={styles.statusTableCell}>{data.serverIP}</td>
//               <td className={`${styles.statusTableCell} ${cpuClass}`}>
//                 {cpuIdle}
//               </td>
//             </tr>
//           ) : (
//             <tr>
//               <td colSpan="2" className={styles.noData}>
//                 No data available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StatusComponent;
