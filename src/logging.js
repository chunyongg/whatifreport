// Adapted from http://web.mit.edu/6.813/www/sp18/assignments/as1-implementation/logging.js
// A simple Google-spreadsheet-based event logging framework.


var ENABLE_NETWORK_LOGGING = true; // Controls network logging.
var ENABLE_CONSOLE_LOGGING = true; // Controls console logging.
var FILTERNG_TECHNIQUE = 'Alphabetical';
var NUMBER_OF_MODULES_SELECTED = 'Single';
var PRESENCE_OF_MODULE_CART_IN_CATALOG = 'False';
var PARTICIPANT_ID = '';


var loggingjs = (function() { // Immediately-Invoked Function Expression (IIFE); ref: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
// Log the given event.
function initialize(participantId) {
  PARTICIPANT_ID = participantId;
}
function logEvent(event, eventCount) {
  var time = (new Date).getTime();
  sendNetworkLog(PARTICIPANT_ID, time, FILTERNG_TECHNIQUE, NUMBER_OF_MODULES_SELECTED, PRESENCE_OF_MODULE_CART_IN_CATALOG, event, eventCount);
}
// module pattern to allow some key functions to be "public"
return {
	logEvent
};

}());

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
for (key in data) {
  params.push(key + "=" + encodeURIComponent(data[key]));
}
// Submit the form using an image to avoid CORS warnings; warning may still happen, but log will be sent. Go check result in Google Form
(new Image).src = "https://docs.google.com/forms/d/" + formid +
   "/formResponse?" + params.join("&");
}
