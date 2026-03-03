import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 800e71b8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc lengths: double-digit (39) and triple-digit (195)]
 * - Difficulty factors: [Understanding minor/major arcs, circumference concept]
 * - Distractor patterns: [A=just minor arc, B=difference of arcs, C=just major arc, D=correct sum]
 * - Constraints: [Minor arc + Major arc = Circumference]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_800e71b8 = {
  metadata: {
    // id: "800e71b8",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random arc lengths (maintaining double/triple digit ranges)
    // Minor arc: 20-80 range (double digit)
    // Major arc: 100-250 range (triple digit)
    const minorArc = getRandomInt(20, 80);
    const majorArc = getRandomInt(100, 250);
    
    // STEP 2: Calculate circumference
    const circumference = minorArc + majorArc;
    
    // STEP 3: Create options with SAT distractor patterns
    const optionsData = [
      { text: minorArc.toString(), isCorrect: false, reason: "This is just the length of the minor arc, not the full circumference" },
      { text: (majorArc - minorArc).toString(), isCorrect: false, reason: "This is the difference between the major and minor arcs, which has no geometric significance here" },
      { text: majorArc.toString(), isCorrect: false, reason: "This is just the length of the major arc, not the full circumference" },
      { text: circumference.toString(), isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `Points $M, N,$ and $P$ lie on the circle shown. On this circle, minor arc $MN$ has a length of $${minorArc}$ centimeters and major arc $MPN$ has a length of $${majorArc}$ centimeters. What is the circumference, in centimeters, of the circle shown?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: circumference.toString(),
      explanation: `Choice ${correctLetter} is correct. The circumference of a circle is the total distance around the circle. Together, the minor arc $MN$ and the major arc $MPN$ make up the entire circle. Therefore, the circumference is the sum of these two arcs: $${minorArc} + ${majorArc} = ${circumference}$ centimeters. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: ee540927
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficient: 58 (double-digit, even number)]
 * - Difficulty factors: [Completing the square, circle equation standard form]
 * - Distractor patterns: [A=swapped coords and wrong sign, B=wrong variable assignment, C=wrong sign only, D=correct]
 * - Constraints: [Must complete square properly, center is (-h, -k) from equation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/Circles/ee540927.ts