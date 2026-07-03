import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 835
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius A: 16, height: 50, increase: 25%]
 * - Difficulty factors: [Percentage increase, cylinder volume with scaled radius]
 * - Distractor patterns: [A: volume A, C: calculation error, D: 25²×50]
 * - Constraints: [25% increase gives clean numbers: 16→20]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_835 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Random values.
    // radiusA is a multiple of 4 so a 25% increase is EXACT: radiusB = 5*radiusA/4
    // is an integer (no rounding, no float artifact). {8,12,16} -> radiusB {10,15,20}.
    // 20 is excluded because it would make radiusB = 25, colliding with the
    // "used 25 as the radius" distractor (25^2*h). height is any integer in [40,60];
    // all volumes stay integers.
    const radiusA = getRandomInt(2, 4) * 4; // 8, 12, or 16
    const height = getRandomInt(40, 60);

    // STEP 2: Derived values (all exact integers).
    const radiusB = (radiusA * 5) / 4;           // 25% longer, exact
    const volumeA = radiusA * radiusA * height;  // V/pi for container A
    const volumeB = radiusB * radiusB * height;  // V/pi for container B (correct)

    // STEP 3: Options — coefficients of pi, wrapped in $...$ per house style.
    const correctVal = volumeB;
    const distAVal = volumeA;                 // forgot to scale the radius
    const distCVal = (radiusA * radiusA * 5 / 4) * height; // scaled volume 25% instead of radius = 1.25*volumeA
    const distDVal = 25 * 25 * height;        // used "25" from 25% as the radius

    const correctText = `$${correctVal}\\pi$`;
    const distractorA = `$${distAVal}\\pi$`;
    const distractorC = `$${distCVal}\\pi$`;
    const distractorD = `$${distDVal}\\pi$`;

    const optionsData = [
      { text: distractorA, isCorrect: false, val: distAVal },
      { text: correctText, isCorrect: true, val: correctVal },
      { text: distractorC, isCorrect: false, val: distCVal },
      { text: distractorD, isCorrect: false, val: distDVal }
    ];

    // STEP 4: Shuffle and assign letters (letters meaningful only post-shuffle).
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrect = shuffledOptions.filter(o => !o.isCorrect);
    const letterOf = (v: number) => incorrect.find(o => o.val === v)!.letter;

    // STEP 5: Explanation — every $...$ segment opens with a letter/backslash so
    // no bare "$<digit>" appears (keeps currency/math heuristics clean).
    const explanation = `Choice ${correctLetter} is correct. A 25% increase multiplies the radius by $\\tfrac{5}{4}$, so the radius of container B is $r_B = \\tfrac{5}{4}\\times ${radiusA} = ${radiusB}$ cm. The volume of a cylinder is $V = \\pi r^{2} h$, so container B has volume $V = \\pi (${radiusB})^{2}(${height}) = \\pi \\cdot ${radiusB * radiusB} \\cdot ${height} = ${volumeB}\\pi$ cubic centimeters. Choice ${letterOf(distAVal)} is incorrect; it uses radius ${radiusA} (container A), giving $V = \\pi (${radiusA})^{2}(${height}) = ${volumeA}\\pi$. Choice ${letterOf(distCVal)} is incorrect; it enlarges the volume of container A by 25% instead of the radius, giving $\\tfrac{5}{4}\\times ${volumeA} = ${distCVal}$ as the coefficient of $\\pi$. Choice ${letterOf(distDVal)} is incorrect; it uses 25 (from "25%") as the radius, giving $\\pi (25)^{2}(${height}) = ${distDVal}\\pi$.`;

    return {
      questionText: `A manufacturing company produces two sizes of cylindrical containers that each have a height of ${height} centimeters. The radius of container A is ${radiusA} centimeters, and the radius of container B is 25% longer than the radius of container A. What is the volume, in cubic centimeters, of container B?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};