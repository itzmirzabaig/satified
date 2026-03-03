import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 441558e7
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [y = 0.67x + 2.6, x = 58, y ≈ 41]
 * - Difficulty factors: [Linear model evaluation with decimals]
 * - Distractor patterns: [B = wrong calculation, C = swapped, D = way off]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_441558e7 = {
  metadata: {
    // id: "441558e7",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: 0.5-0.9
    const m = Math.round((Math.random() * 0.4 + 0.5) * 100) / 100;
    // Intercept: 1-4
    const b = Math.round((Math.random() * 3 + 1) * 10) / 10;
    // x value: 40-80
    const x = getRandomInt(40, 80);
    
    // STEP 2: Calculate
    const y = m * x + b;
    const roundedY = Math.round(y);
    
    // STEP 3: Create options
    const optionsData = [
      { text: roundedY.toString(), isCorrect: true },
      { text: (roundedY + 20).toString(), isCorrect: false, reason: "results from calculation error" },
      { text: (roundedY + 40).toString(), isCorrect: false, reason: "results from conceptual error" },
      { text: (roundedY + 150).toString(), isCorrect: false, reason: "results from major calculation error" }
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
      questionText: `Scientists collected data on ant colonies. For any colony with $x$ worker ants, the equation $y = ${m}x + ${b}$, where $${getRandomInt(20, 100)} \\leq x \\leq ${getRandomInt(100, 150)}$, gives the predicted number of larvae, $y$, in the colony. If a colony has ${x} worker ants, which of the following is closest to the predicted number of larvae in the colony?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedY.toString(),
      explanation: `Choice ${correctLetter} is correct. Substituting ${x} for $x$: $y = ${m}(${x}) + ${b} = ${(m * x).toFixed(1)} + ${b} = ${y.toFixed(1)}$, which rounds to ${roundedY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: f0773a55
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [graph: y = 20x + 50, slope interpretation]
 * - Difficulty factors: [Interpreting slope in cost context]
 * - Distractor patterns: [B = y-intercept, C = wrong values, D = total cost]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph]
 */