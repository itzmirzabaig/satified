import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 113b938e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation context: speed y, time x after brakes]
 * - Difficulty factors: [Interpreting x-intercept in context]
 * - Distractor patterns: [A = y-intercept interpretation, B = slope interpretation, D = distance confusion]
 * - Constraints: [None - conceptual interpretation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_113b938e = {
  metadata: {
    // id: "113b938e",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (for context, though not used in calculations)
    // These create plausible context
    const initialSpeed = getRandomInt(40, 70);
    const decelRate = getRandomInt(5, 15);
    const stopTime = initialSpeed / decelRate;
    
    // STEP 2: Create options
    const correctText = "The number of seconds it took from the time Sheila began applying the brakes until the bicycle came to a complete stop";
    const optionsData = [
      { text: "The speed of Sheila's bicycle, in feet per second, before Sheila applied the brakes", isCorrect: false, reason: "describes the y-intercept, not the x-intercept" },
      { text: "The number of feet per second the speed of Sheila's bicycle decreased each second after Sheila applied the brakes", isCorrect: false, reason: "describes the slope, not the x-intercept" },
      { text: correctText, isCorrect: true },
      { text: "The number of feet Sheila's bicycle traveled from the time she began applying the brakes until the bicycle came to a complete stop", isCorrect: false, reason: "confuses time with distance" }
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
      questionText: `The equation $y = ${initialSpeed} - ${decelRate}x$ represents the speed $y$, in feet per second, of Sheila's bicycle $x$ seconds after she applied the brakes at the end of a ride. If the equation is graphed in the xy-plane, which of the following is the best interpretation of the x-coordinate of the line's x-intercept in the context of the problem?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The x-intercept occurs where $y = 0$, meaning speed is 0 (complete stop). The x-coordinate represents the time to stop: $0 = ${initialSpeed} - ${decelRate}x$, so $x = ${stopTime.toFixed(1)}$ seconds. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 295a41f0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [graph of y = f(x) - 11 with points (-1,-2) and (0,-4), slope=-2, f(x)=-2x+7]
 * - Difficulty factors: [Finding f(x) from transformed graph]
 * - Distractor patterns: [A = wrong slope and intercept, C = wrong slope, D = no adjustment for -11]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph]
 */