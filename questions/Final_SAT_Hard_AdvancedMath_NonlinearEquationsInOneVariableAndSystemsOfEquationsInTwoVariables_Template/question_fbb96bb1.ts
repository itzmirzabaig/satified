import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: fbb96bb1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [(x-a)(x-29)=x-29, a>30, solutions are a and 30]
 * - Difficulty factors: [Factor out common term, don't divide by zero, zero product property]
 * - Distractor patterns: [A: I and II, B: I and III, C: II and III/correct, D: all]
 * - Constraints: [Solutions are 29 and a+1, not a]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_fbb96bb1 = {
  metadata: {
    // id: "fbb96bb1",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: (x-a)(x-b) = x-b where a > b+1, find solutions
    
    const b = getRandomInt(20, 40); // The repeated root (like 29)
    const a = b + getRandomInt(5, 15); // a > b, actually a > b+1 for distinct solutions
    
    // (x-a)(x-b) = x-b
    // (x-a)(x-b) - (x-b) = 0
    // (x-b)(x-a-1) = 0
    // Solutions: x = b and x = a+1
    
    // Roman numerals: I. a (incorrect), II. a+1 (correct), III. b (correct)
    // Answer: II and III only
    
    // STEP 2: Create options
    const optionsData = [
      { text: `I and II only`, isCorrect: false, reason: "incorrectly includes I (a is not a solution)" },
      { text: `I and III only`, isCorrect: false, reason: "incorrectly includes I and excludes II" },
      { text: `II and III only`, isCorrect: true },
      { text: `I, II, and III`, isCorrect: false, reason: "incorrectly includes I" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Rearranging: $(x-${a})(x-${b})-(x-${b})=0$, which factors as $(x-${b})(x-${a}-1)=0$. Solutions are $x=${b}$ (III) and $x=${a+1}$ (II). Note $x=${a}$ is NOT a solution.
Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$(x-${a})(x-${b})=x-${b}$\n\nWhich of the following are solutions to the given equation, where $a$ is a constant and $a>${b}$?\n\nI. $a$\nII. $${a+1}$\nIII. $${b}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 77c0cced
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system y=2x²-21x+64 and y=3x+a, one intersection, find x]
 * - Difficulty factors: [System with parabola and line, discriminant=0, solve for x]
 * - Distractor patterns: [A: -8, B: -6, C: 6/correct, D: 8]
 * - Constraints: [Discriminant=0 gives condition on a, then solve for x]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/77c0cced.ts