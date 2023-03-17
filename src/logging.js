// Adapted from http://web.mit.edu/6.813/www/sp18/assignments/as1-implementation/logging.js
// A simple Google-spreadsheet-based event logging framework.

// Call loggingjs.initialize() and pass in the participant ID
// Call loggingjs.logEvent() with the following params: 'START', '1' 
// Check https://docs.google.com/spreadsheets/d/11xAgg8_D9qaoKgkyHCbb88NgPFO0z3WqPhBT4Cw1H2A/edit?resourcekey#gid=114586490 to ensure your log is done

const { IVs } = require("./constants");

var FILTERNG_TECHNIQUE = IVs.IV1;
var NUMBER_OF_MODULES_SELECTED = IVs.IV2;
var PRESENCE_OF_MODULE_CART_IN_CATALOG = IVs.IV3;
var PARTICIPANT_ID = '';

function initialize(participantId) {
  PARTICIPANT_ID = participantId;
}

function logEvent(event, eventCount) {
  console.log(event, eventCount, PARTICIPANT_ID);
  var time = new Date().getTime();
  sendNetworkLog(PARTICIPANT_ID, time, FILTERNG_TECHNIQUE, NUMBER_OF_MODULES_SELECTED, PRESENCE_OF_MODULE_CART_IN_CATALOG, event, eventCount);
}

var loggingjs = {
  initialize,
  logEvent,
}

export default loggingjs;

function sendNetworkLog(
  participantId,
  timestamp,
  filteringTechnique,
  numberOfModulesSelected,
  presenceOfModuleCartInTheCourseCatalogPage,
  event,
  eventCount) {
var formid = "e/1FAIpQLSexFUmCsIMIUmaT_WoGWYMcIKHYGtHrwa48dJ2IJFLxAxpTow";
var data = {
  "entry.1975908755": participantId,
  "entry.323372540": timestamp,
  "entry.1958558495": filteringTechnique,
  "entry.1679647821": numberOfModulesSelected,
  "entry.41007459": presenceOfModuleCartInTheCourseCatalogPage,
  "entry.1249253118": event,
  "entry.976565873": eventCount
};
var params = [];
for (const key in data) {
  params.push(key + "=" + encodeURIComponent(data[key]));
}
// Submit the form using an image to avoid CORS warnings; warning may still happen, but log will be sent. Go check result in Google Form
(new Image).src = "https://docs.google.com/forms/d/" + formid +
   "/formResponse?" + params.join("&");
}