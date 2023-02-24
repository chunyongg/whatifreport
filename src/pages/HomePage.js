import React from 'react';
import Page from '../components/Page';
import styles from "./HomePage.module.css";
import BlueButton from '../components/BlueButton';
import GreenButton from '../components/GreenButton';

function HomePage() {
  return (
    <Page title="Create What-if Scenario">
      <p>
        <h1>Create What-if Scenario</h1>
        <h4>
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
      <p>
        <h2>Career Scenario</h2>
        <h4>
          &nbsp;Select a career for which you want the change to take place.
        </h4>
        <table>
          <thead>
            <tr>
              <th>Institution</th>
              <th>Program</th>
              <th>Requirement Term</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>NUS</td>
              <td>Bachelor of Computing</td>
              <td>2019/2020 Semester 1</td>
            </tr>
          </tbody>
        </table>
      </p>
      <GreenButton>Submit Request</GreenButton>
    </Page>
  );
}

export default HomePage