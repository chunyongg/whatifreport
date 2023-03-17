const ALPHABETICAL = 'Alphabetical';
const RELEVANCE = 'Relevance';
const SEARCH = 'Search';

const ONE = 'One';
const MULTIPLE = 'Multiple';

const PRESENT = 'Present';
const ABSENT = 'Absent';

export const allLevels = {
    ALPHABETICAL, 
    RELEVANCE,
    SEARCH,
    ONE,
    MULTIPLE,
    PRESENT,
    ABSENT
}

// Manipulate this for different combinations
export const IVs = {
    IV1: ALPHABETICAL, //ALPHABETICAL, RELEVANCE OR SEARCH
    IV2: ONE, // ONE OR MULTIPLE
    IV3: ABSENT, //PRESENT OR ABSENT
    TRIAL: 1, //1,2, OR 3
}

export const values = {
    [ALPHABETICAL]: 2,
    [RELEVANCE]: 5,
    [SEARCH]: 8,
    [ONE]: 3,
    [MULTIPLE]: 6,
    [PRESENT]: 7,
    [ABSENT]: 4
}

export const getSuccessCode = () => {
    const IV1_VALUE = values[IVs.IV1];
    const IV2_VALUE = values[IVs.IV2];
    const IV3_VALUE = values[IVs.IV3];
    const multiplied = IV1_VALUE * IV2_VALUE * IV3_VALUE;
    const trial = IVs.TRIAL;
    if (trial === 1) {
        return multiplied;
    } else if (trial === 2) {
        return multiplied * multiplied;
    } else if (trial === 3) {
        return multiplied * 3;
    }
}