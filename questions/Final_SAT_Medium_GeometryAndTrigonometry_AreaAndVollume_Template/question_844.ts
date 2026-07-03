import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 844
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius K: 4, area L: 100π]
 * - Difficulty factors: [Circle area, sum of areas]
 * - Distractor patterns: [A: sum of radii ×π, B: sum of diameters ×π, C: area of L only]
 * - Constraints: [Should produce clean answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_844 = {
  metadata: {
    id: "844",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radiusK = getRandomInt(3, 6);
    const radiusL = getRandomInt(8, 12);

    // STEP 2: Derived values. Each circle's area is pi*r^2, reported as a
    // coefficient of pi. The question gives K's radius and L's area directly.
    const areaK = radiusK * radiusK;       // coefficient of pi for circle K
    const areaL = radiusL * radiusL;       // coefficient of pi for circle L
    const totalArea = areaK + areaL;       // coefficient of pi for the total

    // STEP 3: Distractors as coefficients of pi, each with its own reason.
    // A: sum of the radii (added radii instead of areas).
    // B: sum of the diameters (doubled and added radii).
    // C: area of circle L only (forgot to add circle K).
    // Across radiusK in [3,6] and radiusL in [8,12] these four coefficients are
    // always distinct: total = rK^2 + rL^2 >= 73 dwarfs A (<=18) and B (<=36);
    // C = rL^2 in [64,144] never equals total (differs by rK^2 >= 9), and never
    // equals A or B (both <= 36). Verified by exhaustive check over the range.
    const sumRadii = radiusK + radiusL;
    const sumDiameters = 2 * radiusK + 2 * radiusL;

    const optionsData = [
      {
        text: `${totalArea}\\pi`,
        isCorrect: true,
        reason: ''
      },
      {
        text: `${sumRadii}\\pi`,
        isCorrect: false,
        reason: `this adds the radii, $${radiusK} + ${radiusL} = ${sumRadii}$, instead of the areas`
      },
      {
        text: `${sumDiameters}\\pi`,
        isCorrect: false,
        reason: `this adds the diameters, $${2 * radiusK} + ${2 * radiusL} = ${sumDiameters}$, instead of the areas`
      },
      {
        text: `${areaL}\\pi`,
        isCorrect: false,
        reason: `this is the area of circle $L$ alone, leaving out circle $K$`
      }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctText = correctOption.text;
    const distractorNotes = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');

    // STEP 5: Build explanation from the same live variables.
    const explanation = `Choice ${correctOption.letter} is correct. The area of circle $K$ is $\\pi(${radiusK})^2 = ${areaK}\\pi$ mm$^2$. Circle $L$ has area $${areaL}\\pi$ mm$^2$. The total area is $${areaK}\\pi + ${areaL}\\pi = ${totalArea}\\pi$ mm$^2$. ${distractorNotes}`;

    return {
      questionText: `Circle $K$ has a radius of $${radiusK}$ millimeters (mm). Circle $L$ has an area of $${areaL}\\pi$ mm$^2$. What is the total area, in mm$^2$, of circles $K$ and $L$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
