import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1292
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (16, 17), radius: 7k]
 * - Difficulty factors: [Symbolic radius, squaring coefficient]
 * - Distractor patterns: [Forgetting to square k, wrong coefficient]
 * - Constraints: [(7k)² = 49k²]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1292 = {
  metadata: {
    id: "1292",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center (larger numbers)
    const h = getRandomInt(10, 20);
    const k = getRandomInt(10, 20);
    
    // STEP 2: Generate coefficient for radius
    const coeff = getRandomInt(3, 9);
    
    // STEP 3: Calculate r²
    const rSquared = `${coeff * coeff}k^{2}`;
    
    // STEP 4: Generate distractors. r = coeff·k, so r² = coeff²·k².
    // Each distractor represents a specific squaring error, tracked by identity
    // so its explanation reason follows the value (not the shuffled slot).
    const distractorLinear = `${coeff}k`;          // used r itself, never squared
    const distractorKonly = `${coeff}k^{2}`;       // squared k but not the coefficient
    const distractorCoeffOnly = `${coeff * coeff}k`; // squared the coefficient but not k

    const correctText = rSquared;

    const optionsData = [
      { text: distractorCoeffOnly, isCorrect: false, reason: `squares the coefficient but leaves $k$ to the first power instead of squaring it` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: distractorLinear, isCorrect: false, reason: `uses the radius itself instead of its square` },
      { text: distractorKonly, isCorrect: false, reason: `squares $k$ but forgets to square the coefficient` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    // Look up each distractor's letter by its identity so the reason matches the value.
    const letterOf = (text: string) => shuffledOptions.find(o => o.text === text)!.letter;

    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$ and has a radius of $${coeff}k$. Which equation represents this circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The standard form is $(x-h)^{2}+(y-k)^{2}=r^{2}$. Substituting the center $(${h}, ${k})$ and radius $${coeff}k$: $(x-${h})^{2}+(y-${k})^{2}=(${coeff}k)^{2}=${coeff * coeff}k^{2}$. Choice ${letterOf(distractorLinear)} ($${coeff}k$) is incorrect; it ${optionsData[2].reason}. Choice ${letterOf(distractorKonly)} ($${coeff}k^{2}$) is incorrect; it ${optionsData[3].reason}. Choice ${letterOf(distractorCoeffOnly)} ($${coeff * coeff}k$) is incorrect; it ${optionsData[0].reason}.`
    };
  }
};
