import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: e635aede
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [14%, 4% (small percentages)]
 * - Difficulty factors: [Compound percentage growth, multiplicative vs additive thinking]
 * - Distractor patterns: [Adding percentages, multiplying percentages incorrectly]
 * - Constraints: [Must compound correctly: 1.14 * 1.04]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - compound percentage problem]
 */

export const generator_e635aede = {
  metadata: {
    // id: "e635aede",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random percentages
    const P1 = getRandomInt(8, 20); // First year increase
    const P2 = getRandomInt(3, 12); // Second year increase
    
    // STEP 2: Calculate compound multiplier
    const multiplier1 = 1 + P1 / 100;
    const multiplier2 = 1 + P2 / 100;
    const totalMultiplier = Math.round(multiplier1 * multiplier2 * 10000) / 10000;
    
    // STEP 3: Create distractors
    const additiveError = Math.round((1 + (P1 + P2) / 100) * 10000) / 10000; // Wrong: additive
    const multiplyPcts = Math.round((1 + (P1 * P2) / 10000) * 10000) / 10000; // Wrong: multiply pcts
    const smallError = Math.round((1 + (P1 * P2) / 100) * 10000) / 10000; // Wrong calculation
    
    const optionsData = [
      { text: smallError.toString(), isCorrect: false, reason: "results from incorrect multiplication" },
      { text: multiplyPcts.toString(), isCorrect: false, reason: "results from multiplying percentages directly" },
      { text: additiveError.toString(), isCorrect: false, reason: "results from adding percentages instead of compounding" },
      { text: totalMultiplier.toString(), isCorrect: true, reason: "" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'D';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `In $2008$, Zinah earned ${P1}% more than in $2007$, and in $2009$ Zinah earned ${P2}% more than in $2008$. If Zinah earned $y$ times as much in $2009$ as in $2007$, what is the value of $y$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: totalMultiplier.toString(),
      explanation: `Choice ${correctLetter} is correct. Let earnings in 2007 be $x$. Then 2008 earnings = ${multiplier1}x$, and 2009 earnings = ${multiplier2}(${multiplier1}x) = ${totalMultiplier}x$. Thus $y = ${totalMultiplier}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 67c0200a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [70%, 80% (medium-high percentages)]
 * - Difficulty factors: [Sequential percentage changes, "less than" vs "greater than"]
 * - Distractor patterns: [Sign errors in final calculation, order of operations]
 * - Constraints: [a = 0.3b, c = 1.8a, so c = 0.54b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */