import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 3e9eaffc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = -5x + 30]
 * - Difficulty factors: [Interpreting y-intercept in context]
 * - Distractor patterns: [A = slope interpretation, B = conceptual error, D = conceptual error]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_3e9eaffc = {
  metadata: {
    // id: "3e9eaffc",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Rate (negative): -3 to -8
    const rate = -getRandomInt(3, 8);
    // Initial amount: 20-50
    const initial = getRandomInt(20, 50);
    
    // STEP 2: Create options
    const correctText = `Caleb had approximately ${initial} fluid ounces of juice when he began to make the popsicles.`;
    const optionsData = [
      { text: `Caleb used approximately ${Math.abs(rate)} fluid ounces of juice for each popsicle.`, isCorrect: false, reason: "interprets the slope rather than the y-intercept" },
      { text: `Caleb had approximately ${initial + 10} fluid ounces of juice when he began to make the popsicles.`, isCorrect: false, reason: "conceptual error with incorrect initial amount" },
      { text: correctText, isCorrect: true },
      { text: `Caleb used approximately ${initial} fluid ounces of juice for each popsicle.`, isCorrect: false, reason: "confuses the initial amount with the rate of use" }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `Caleb used juice to make popsicles. The function $f(x)=${rate}x+${initial}$ approximates the volume, in fluid ounces, of juice Caleb had remaining after making $x$ popsicles. Which statement is the best interpretation of the y-intercept of the graph of $y=f(x)$ in the xy-plane in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The y-intercept is at $(0, ${initial})$, which represents the volume remaining after making 0 popsicles, i.e., the initial amount. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: a775af14
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (0,2) and (8,34), slope: 4, intercept: 2]
 * - Difficulty factors: [Finding equation from two points]
 * - Distractor patterns: [A = wrong slope/intercept, B = wrong slope/intercept, D = x-coord as slope]
 * - Constraints: [Points must give integer slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */