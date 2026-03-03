import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 1d945139
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [r objects = t mass, find mass of 146r objects]
 * - Difficulty factors: [Proportional reasoning with algebraic expressions]
 * - Distractor patterns: [A: 146-t (subtraction), B: 146+t (addition), C: t/146 (division)]
 * - Constraints: [Must scale proportionally]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1d945139 = {
  metadata: {
    // id: "1d945139",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: r objects = t, 146r objects = 146t
    const multiplier = getRandomInt(50, 200); // like 146
    
    // STEP 2: Correct answer
    const correctAnswer = `${multiplier}t`;
    
    // STEP 3: Create distractors
    const optionsData = [
      { text: `${multiplier}-t`, isCorrect: false, reason: "represents subtraction, which is incorrect for scaling quantities" },
      { text: `${multiplier}+t`, isCorrect: false, reason: "represents addition, which is incorrect for scaling quantities" },
      { text: `\\frac{t}{${multiplier}}`, isCorrect: false, reason: "represents dividing the original mass by ${multiplier}, which would be the mass if we had $\\frac{r}{${multiplier}}$ objects" },
      { text: correctAnswer, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The total mass, in kilograms, of $r$ identical objects is $t$. Which expression represents the total mass, in kilograms, of $${multiplier}r$ of these objects?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctLetter} is correct. The mass of one single object is $\\frac{t}{r}$. For $${multiplier}r$ objects: $\\text{Total mass} = (${multiplier}r) \\times \\left(\\frac{t}{r}\\right) = ${multiplier}t$. Alternatively, since $${multiplier}r$ represents ${multiplier} times as many objects, the total mass must be ${multiplier} times the original mass $t$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7e6c745f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Egg: 6g protein, $0.36 | Milk: 8g protein, $0.24]
 * - Difficulty factors: [Cost per unit calculation, ratio of ratios]
 * - Distractor patterns: [A: 1:2, B: 2:3, C: 3:4 (various ratio miscalculations)]
 * - Constraints: [Must calculate cost per gram first]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/7e6c745f.ts