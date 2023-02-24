import React from 'react';
import Page from '../components/Page';
import styles from "./HomePage.module.css";
import BlueButton from '../components/BlueButton';
import GreenButton from '../components/GreenButton';
import LongYellowButton from '../components/LongYellowButton';
import ShortYellowButton from '../components/ShortYellowButton';

function HomePage() {
  return (
    <Page title="Create What-if Scenario">
      <h1>Create What-if Scenario</h1>
      <h4>
        You may be thinking of changing your program of study or taking certain
        courses. Using this page, you can set up a what-if scenario based on
        different academic programs or courses. Select the Submit Request button
        to request a degree progress report based on your what-if information.
      </h4>
      <BlueButton>Return To Report Selection</BlueButton>
      <GreenButton>Submit Request</GreenButton>
      <LongYellowButton>Expand all</LongYellowButton>
      <ShortYellowButton>Cancel</ShortYellowButton>
    </Page>
  );
}

export default HomePage