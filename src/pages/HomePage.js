import React from 'react';
import Page from '../components/Page';
import styles from "./HomePage.module.css";
import BlueButton from '../components/BlueButton';
import GreenButton from '../components/GreenButton';

function HomePage() {
  return (
    <Page title="Create What-if Scenario">
      <p className={styles.p}>
        <h1 className={styles.h1}>Create What-if Scenario</h1>
        <h4 className={styles.h4}>
          You may be thinking of changing your program of study or taking
          certain courses. Using this page, you can set up a what-if scenario
          based on different academic programs or courses. Select the Submit
          Request button to request a degree progress report based on your
          what-if information.
        </h4>
        <div className="align-right">
          <BlueButton>Return To Report Selection</BlueButton>
        </div>
      </p>
      <p className={styles.p}>
        <h2 className={styles.h2}>Career Scenario</h2>
        <h4 className={styles.h4}>
          &ensp;Select a career for which you want the change to take place.
        </h4>
        <br />
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.th}>Institution</th>
              <th className={styles.th}>Program</th>
              <th className={styles.th}>Requirement Term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.td}>NUS</td>
              <td className={styles.td}>Bachelor of Computing</td>
              <td className={styles.td}>2019/2020 Semester 1</td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="align-right">
          <GreenButton>Submit Request</GreenButton>
        </div>
      </p>
      <p className={styles.p}>
        <h2 className={styles.h2}>Program Scenario</h2>
        <table className={styles.table}>
          <tr className={styles.trcol}>
            <td className={styles.td1}>Program: Bachelor of Computing</td>
            <td className={styles.td2}></td>
            <td className={styles.td3}>NUS | Undergraduate</td>
            <td className={styles.td4}>
              Degree: BComp (Computer Science)
              <br />
              &emsp;&emsp;Honors: Computer Science (Hons)
              <br />
              Minor: Interactive Media Dev (Minor)
            </td>
          </tr>
        </table>
      </p>
    </Page>
  );
}

export default HomePage