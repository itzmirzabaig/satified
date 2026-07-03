import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 693
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hiking: 200/30min, biking: 150/30min, total: 1900]
 * - Difficulty factors: [Unit conversion, setting up linear equation]
 * - Distractor patterns: [A: not converting the hiking rate to hourly (counts
 *   30-min periods), B: not converting either rate (total 30-min periods),
 *   C: adding the bicycling hours to the hiking hours]
 * - Constraints: [Answer must be integer hours]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_693 = {
  metadata: {
    id: "693",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate parameters (calories are per 30 minutes).
    const calHike30 = getRandomInt(150, 250);
    const calBike30 = getRandomInt(100, 200);
    const calHikeHour = calHike30 * 2;
    const calBikeHour = calBike30 * 2;
    const weight = getRandomInt(140, 180); // single, consistent body weight

    // Pick the bicycling time and the hiking answer. The only way any two of the
    // four option values below can coincide is hikeHours === bikeHours (which
    // makes wrongPeriods === wrongAddHours), so re-roll (bounded) to exclude it;
    // every other pair differs by construction (see the distinctness note).
    let bikeHours = 0;
    let hikeHours = 0;
    let tries = 0;
    do {
      bikeHours = getRandomInt(1, 3);
      hikeHours = getRandomInt(2, 6);
      tries++;
    } while (tries < 50 && hikeHours === bikeHours);

    const bikeCal = calBikeHour * bikeHours;
    const totalCal = bikeCal + calHikeHour * hikeHours;

    // Distractor values (all clean positive integers; reasons in the explanation):
    const wrongPeriods = 2 * hikeHours;               // did not convert the hiking rate to hourly
    const wrongTotalPeriods = 2 * (hikeHours + bikeHours); // did not convert either rate
    const wrongAddHours = hikeHours + bikeHours;      // added the bicycling hours to the answer

    // STEP 2: Create options (all plain integers).
    const optionsData = [
      { text: `$${wrongPeriods}$`, isCorrect: false },
      { text: `$${wrongTotalPeriods}$`, isCorrect: false },
      { text: `$${wrongAddHours}$`, isCorrect: false },
      { text: `$${hikeHours}$`, isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `In an article about exercise, it is estimated that a ${weight}-pound adult uses ${calHike30} calories for every 30 minutes of hiking and ${calBike30} calories for every 30 minutes of bicycling. A ${weight}-pound adult has completed ${bikeHours} hour${bikeHours > 1 ? 's' : ''} of bicycling. Based on the article, how many hours should the adult hike to use a total of ${totalCal} calories from bicycling and hiking?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. First convert each 30-minute rate to an hourly rate by multiplying by 2. Hiking uses ${calHike30} calories per 30 minutes, so ${calHikeHour} calories per hour. Bicycling uses ${calBike30} calories per 30 minutes, so ${calBikeHour} calories per hour.\n\nThe adult has already bicycled for ${bikeHours} hour${bikeHours > 1 ? 's' : ''}, using ${calBikeHour} times ${bikeHours}, which is ${bikeCal} calories. Let h be the number of hours of hiking needed to reach ${totalCal} total calories. Then ${calHikeHour}h + ${bikeCal} = ${totalCal}. Subtracting ${bikeCal} from both sides gives ${calHikeHour}h = ${totalCal - bikeCal}, and dividing by ${calHikeHour} gives h = ${hikeHours}.\n\nThe distractor ${wrongPeriods} comes from treating the 30-minute hiking rate as an hourly rate, so it counts half-hour periods of hiking instead of hours. The distractor ${wrongTotalPeriods} comes from doing that for both activities, counting the total number of half-hour periods. The distractor ${wrongAddHours} comes from adding the ${bikeHours} bicycling hour${bikeHours > 1 ? 's' : ''} to the hiking hours.`
    };
  }
};
