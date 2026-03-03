import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 1a2b3c4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (16, 17), radius: 7k]
 * - Difficulty factors: [Symbolic radius, squaring coefficient]
 * - Distractor patterns: [Forgetting to square k, wrong coefficient]
 * - Constraints: [(7k)² = 49k²]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1a2b3c4d = {
  metadata: {
    // id: "1a2b3c4d",
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
    
    // STEP 4: Generate distractors
    const distractorA = `${coeff * coeff}k`; // Forgot to square k
    const distractorC = `${coeff}k`; // Linear
    const distractorD = `${coeff}k^{2}`; // Wrong coefficient
    
    const correctText = rSquared;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$ and has a radius of $${coeff}k$. Which equation represents this circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The standard form is $(x-h)^{2}+(y-k)^{2}=r^{2}$. Substituting the center $(${h}, ${k})$ and radius $${coeff}k$: $(x-${h})^{2}+(y-${k})^{2}=(${coeff}k)^{2}=${coeff * coeff}k^{2}$. Choice ${incorrectOptions[0].letter} is incorrect; this forgets to square $k$. Choice ${incorrectOptions[1].letter} is incorrect; this doesn't square the coefficient. Choice ${incorrectOptions[2].letter} is incorrect; this squares $k$ but not the coefficient properly.`
    };
  }
};

/**
 * Question ID: 1b2b20b9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius²: 7, shift: 96 units]
 * - Difficulty factors: [Translation doesn't change radius]
 * - Distractor patterns: [Thinking radius changes with translation]
 * - Constraints: [Radius constant under translation]
 * - Question type: [Figure→Fill in blank]
 * - Figure generation: [Two circles, original and translated - requires Mafs]
 */