import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 2f34cd1c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = 55.20 - 0.16x, evaluate at x = 326]
 * - Difficulty factors: [Decimal arithmetic, function evaluation]
 * - Distractor patterns: [A = initial value, C = rate only, D = wrong calculation]
 * - Constraints: [None - straightforward evaluation]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_2f34cd1c = {
  metadata: {
    // id: "2f34cd1c",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Initial value: 50-60
    const initial = Math.round((Math.random() * 10 + 50) * 100) / 100;
    // Rate: 0.10-0.25
    const rate = Math.round((Math.random() * 0.15 + 0.10) * 100) / 100;
    // Evaluation point: 300-350
    const x = getRandomInt(300, 350);
    
    // STEP 2: Calculate answer
    const result = Math.round((initial - rate * x) * 100) / 100;
    
    // STEP 3: Create options
    const optionsData = [
      { text: initial.toFixed(2), isCorrect: false, reason: "just gives the initial value without applying the rate" },
      { text: result.toFixed(2), isCorrect: true },
      { text: (-rate).toFixed(2), isCorrect: false, reason: "gives the rate of change instead of the function value" },
      { text: (initial - rate * 400).toFixed(2), isCorrect: false, reason: "results from using wrong x value or calculation error" }
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
      questionText: `The function $f(x) = ${initial.toFixed(2)} - ${rate.toFixed(2)}x$ gives the estimated surface water temperature $f(x)$, in degrees Celsius, of a body of water on the $x$th day of the year. Based on the model, what is the estimated surface water temperature, in degrees Celsius, of this body of water on the ${x}th day of the year?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: result.toFixed(2),
      explanation: `Choice ${correctLetter} is correct. Substituting ${x} for $x$: $f(${x}) = ${initial.toFixed(2)} - ${rate.toFixed(2)}(${x}) = ${initial.toFixed(2)} - ${(rate * x).toFixed(2)} = ${result.toFixed(2)}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 3122fc7b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [1991: 57, 2011: 224, find 2015]
 * - Difficulty factors: [Linear extrapolation over time]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [None - multi-step calculation]
 * - Question type: [Text→Fill in Blank]
 * - Figure generation: [None]
 */