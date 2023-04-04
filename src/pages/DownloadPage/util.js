import { IVConditions } from "../../data/data";

// For reference
// const OBJECT_STRUCTURE = {
//   participantId: "",
//   timestamp: "",
//   filteringTechnique: "",
//   numberOfModulesSelected: "",
//   presenceOfModuleCart: "",
//   event: "",
//   eventCount: "",
// };

function splitIntoTrialTasks(participantEntries) {
  const returnValue = [];
  let entries = [];
  for (let i = 0; i < participantEntries.length; i++) {
    const entry = participantEntries[i];
    entries.push(entry);
    const type = entry.event;
    if (type === "COMPLETE") {
      returnValue.push(entries);
      entries = [];
    }
  }
  return returnValue;
}

function getParticipantProcessedData(allParticipantArrangements) {
  const mapped = allParticipantArrangements.map((participantArrangements) => {
    const participantEntriesMapped = participantArrangements.map(
      (participantEntries) => {
        const participantId = participantEntries[0].participantId;
        const IV1 = participantEntries[0].filteringTechnique;
        const IV2 = participantEntries[0].numberOfModulesSelected;
        const IV3 = participantEntries[0].presenceOfModuleCart;
        const entriesSplitByTrialTask = splitIntoTrialTasks(participantEntries);
        const mappedPerTrialTask = entriesSplitByTrialTask.map(
          (participantEntriesTrialTask) => {
            const timeTaken = getTimeTakenToSucceed(
              participantEntriesTrialTask
            );
            const timeTakenFirstMod = getTimeTakenToAddFirstModule(
              participantEntriesTrialTask,);
            const timeTakenSecondMod = getTimeTakenToAddSubsequentModule(
              participantEntriesTrialTask,
              "SUCCESS_ADD_SECOND_MODULE",
              "SUCCESS_ADD_FIRST_MODULE"
            );
            const timeTakenThirdMod = getTimeTakenToAddSubsequentModule(
              participantEntriesTrialTask,
              "SUCCESS_ADD_THIRD_MODULE",
              "SUCCESS_ADD_SECOND_MODULE",
            );
            const firstClickAccuracy = getFirstClickSucceedOrNot(
              participantEntriesTrialTask
            );
            const duplicateErrors = getNumberOfDuplicateErrors(
              participantEntriesTrialTask
            );
            const missingErrors = getNumberOfMissingModErrors(
              participantEntriesTrialTask
            );
            return [
              participantId,
              IV1,
              IV2,
              IV3,
              timeTaken,
              timeTakenFirstMod,
              timeTakenSecondMod,
              timeTakenThirdMod,
              firstClickAccuracy,
              duplicateErrors,
              missingErrors,
            ];
          }
        );
        return mappedPerTrialTask;
      }
    );
    return participantEntriesMapped;
  });
  return mapped;
}

function checkIsParticipantEntriesValid(participantArrangements) {
  const compulsoryFields = [
    "START",
    "COMPLETE",
    "SUCCESS_ADD_FIRST_MODULE",
    "SUCCESS_ADD_SECOND_MODULE",
    "SUCCESS_ADD_THIRD_MODULE",
    "FIRST_CLICK_SUCCESS",
  ];
  for (const participantEntries of participantArrangements) {
    for (const field of compulsoryFields) {
      const existsInArray = participantEntries.find(
        (entry) => entry.event === field
      );
      if (!existsInArray) {
        const participantId = participantEntries[0].participantId;
        return `Participant ${participantId} missing ${field}`;
      }
    }
  }
}

function convertToObject(row) {
  return {
    participantId: row[1],
    timestamp: row[2],
    filteringTechnique: row[3],
    numberOfModulesSelected: row[4],
    presenceOfModuleCart: row[5],
    event: row[6],
    eventCount: row[7],
  };
}

function groupByParticipants(rows) {
  const obj = {};
  for (const row of rows) {
    const participantId = row.participantId;
    const value = obj[participantId];
    if (value === undefined) {
      obj[participantId] = [row];
    } else {
      value.push(row);
      obj[participantId] = value;
    }
  }
  return Object.values(obj);
}

export default function getProcessedData(data, participantId) {
  const rows = data.data;
  let filtered = rows;
  if (participantId) {
    filtered = rows.filter((row) => row[1] === participantId);
  }
  filtered = filtered.filter((row) => {
    const notTest = !row[1].includes("test");
    const dateStarted = new Date("2023-04-02T16:00:00Z").getTime();
    return parseInt(row[2]) > dateStarted && notTest;
  });
  return convertToObjects(filtered);
}

function getTimeTakenToSucceed(participantEntries) {
  // Returns time taken to succeed. If restarts found, takes timestamp value of latest restart
  const start = participantEntries.find((entries) => entries.event === "FIND_MODULES_START");
  const restart = participantEntries
    .filter((entries) => entries.event === "FIND_MODULES_START")
    .sort((a, b) => a.timestamp - b.timestamp);
  const end = participantEntries.find(
    (entries) => entries.event === "COMPLETE"
  );
  let base = start;
  if (restart.length > 0) {
    base = restart[restart.length - 1];
  }
  const diff = end.timestamp - base.timestamp;
  const diffInSeconds = diff / 1000;
  return diffInSeconds;
}

function getNumberOfMissingModErrors(participantEntries) {
  // Returns number of duplicate errors
  const duplicates = participantEntries.filter(
    (entries) => entries.event === "MISSING_MODULES"
  );
  return duplicates.reduce((a, b) => {
    try {
      const bEventCount = b.eventCount.split(",").length;
      return a + bEventCount;
    } catch (e) {
      throw new Error(e);
    }
  }, 0);
}

function getNumberOfDuplicateErrors(participantEntries) {
  // Returns number of duplicate errors
  const duplicates = participantEntries.filter(
    (entries) => entries.event === "DUPLICATE_MODS"
  );
  return duplicates.reduce((a, b) => a + b.eventCount, 0);
}

function getFirstClickSucceedOrNot(participantEntries) {
  // Returns true if first click fail and first click fail happened before first click success
  const pass = participantEntries.filter(
    (entries) => entries.event === "FIRST_CLICK_SUCCESS"
  );
  const fail = participantEntries.filter(
    (entries) => entries.event === "FIRST_CLICK_FAIL"
  );
  if (fail.length > 0) {
    if (pass.length > 0) {
      const passTimestamp = pass[pass.length - 1].timestamp;
      return (
        fail.filter((failEvent) => failEvent.timestamp < passTimestamp).length >
        0
      );
    }
    return false;
  }
  return pass.length > 0;
}

function getTimeTakenToAddSubsequentModule(participantEntries, key, base) {
    // Get the longest time taken
    let addMods = participantEntries
      .filter((entries) => entries.event === key)
      .sort((a, b) => a.timestamp - b.timestamp);

    let startTimes = participantEntries
      .filter(
        (entries) =>
          entries.event === base
      )
      .sort((a, b) => a.timestamp - b.timestamp);

    let currHighest;

    const addFiltered = addMods.filter((addModEvent) => {
        const timestamp = addModEvent.timestamp;
        const hasStartBeforeIt = startTimes.find((startEvent)  => startEvent.timestamp < timestamp);
        if (!hasStartBeforeIt) {
            return false;
        }
        return true;
    })
  
    for (let i = 0; i < addFiltered.length; i++) {
     if (i + 1 > startTimes.length) {
        // user added subsequent mod more than once, just track first value
        continue;
     }
      const addMod = addFiltered[i];
      const start = startTimes[i];
      const diff = addMod.timestamp - start.timestamp;
      if (!currHighest || currHighest < diff) {
        currHighest = diff;
      }
    }
    return currHighest / 1000;
  }

function getTimeTakenToAddFirstModule(participantEntries) {
  // Get the longest time taken
  const addMods = participantEntries
    .filter((entries) => entries.event === 'SUCCESS_ADD_FIRST_MODULE')
    .sort((a, b) => a.timestamp - b.timestamp);
  const startTimes = participantEntries
    .filter(
      (entries) =>
        entries.event === "FIND_MODULES_START"
    )
    .sort((a, b) => a.timestamp - b.timestamp);
  let currHighest;
  for (let i = 0; i < addMods.length; i++) {
    const addMod = addMods[i];
    const start = startTimes[i];
    const diff = addMod.timestamp - start.timestamp;
    if (!currHighest || currHighest < diff) {
      currHighest = diff;
    }
  }
  return currHighest / 1000;
}

function groupParticipantEntryByArrangements(participants) {
  const mapped = participants.map((participantEntries) => {
    const object = {};
    for (const entry of participantEntries) {
      const IV1 = entry.filteringTechnique;
      const IV2 = entry.numberOfModulesSelected;
      const IV3 = entry.presenceOfModuleCart;
      const id = entry.participantId;
      const key = `${IV1}${IV2}${IV3}${id}`;
      const value = object[key];
      if (value === undefined) {
        object[key] = [entry];
      } else {
        value.push(entry);
        object[key] = value;
      }
    }
    return Object.values(object);
  });

  return mapped;
}

function flatten(rows) {
  const returnValue = [];
  for (const participantArrangements of rows) {
    for (const participantArrangement of participantArrangements) {
      for (const trial of participantArrangement) {
        returnValue.push(trial);
      }
    }
  }
  return returnValue;
}

function convertOutputToObject(input) {
  const mapped = input.map((res) => ({
    participantId: res[0],
    filteringTechnique: res[1],
    numberOfModulesAdded: res[2],
    presenceOfModuleCart: res[3],
    timeTaken: res[4],
    firstModuleTimeTaken: res[5],
    secondModuleTimeTaken: res[6],
    thirdModuleTimeTaken: res[7],
    firstClickCorrect: res[8],
    numberDuplicates: res[9],
    numberMissing: res[10],
  }));
  return mapped;
}

function convertToObjects(rows) {
  const filtered = rows.filter((row) => isAllDataValidForRow(row));
  const mappedToObjects = filtered.map((row) => convertToObject(row));
  const groupedByParticipantID = groupByParticipants(mappedToObjects);
  const groupedByArrangement = groupParticipantEntryByArrangements(
    groupedByParticipantID
  );
  const filteredAndGroupedByArrangement = groupedByArrangement.filter(
    (participantEntries) => {
      const error = checkIsParticipantEntriesValid(participantEntries);
      return error === undefined;
    }
  );
  const data = getParticipantProcessedData(filteredAndGroupedByArrangement);
  const flattened = flatten(data);
  const convertedToObject = convertOutputToObject(flattened);
  return convertedToObject;
}

function isAllDataValidForRow(row) {
  return (
    isParticipantIdValid(row) &&
    isTimestampValid(row) &&
    isIVsValid(row) &&
    isEventValid(row)
  );
}

function isEventValid(row) {
  const event = row[6];
  const eventCount = row[7];
  const possibleEvents = [
    "START",
    "FIRST_CLICK_FAIL",
    "FIRST_CLICK_SUCCESS",
    "SUCCESS_ADD_FIRST_MODULE",
    "SUCCESS_ADD_SECOND_MODULE",
    "SUCCESS_ADD_THIRD_MODULE",
    "FIND_MODULES_START",
    "DUPLICATE_MODS",
    "COMPLETE",
    "MISSING_MODULES",
    "ALL_MODULES",
    "FAIL",
  ];
  return possibleEvents.includes(event) && eventCount !== undefined;
}

function isParticipantIdValid(row) {
  return row[1] !== undefined;
}

function isIVsValid(row) {
  const filteringTechnique = row[3];
  const numberModulesSelected = row[4];
  const presenceOfModuleCart = row[5];
  const values = Object.values(IVConditions);
  const filtered = values.filter((value) => {
    return (
      value.IV1 === filteringTechnique &&
      value.IV2 === numberModulesSelected &&
      value.IV3 === presenceOfModuleCart
    );
  });
  return filtered.length > 0;
}

function isTimestampValid(row) {
  return row[2] !== undefined && Number.isInteger(parseInt(row[2]));
}
