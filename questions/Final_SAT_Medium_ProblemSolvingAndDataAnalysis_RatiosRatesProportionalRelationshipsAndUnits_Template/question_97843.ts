import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 97843
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 1:26, x coaches, find athletes]
 * - Difficulty factors: [Ratio application, algebraic expression]
 * - Distractor patterns: [A: x/26 (division), C: x+26 (addition), D: 26/x (inverted)]
 * - Constraints: [Maintaining ratio when scaling]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_97843 = {
  metadata: {
    // id: "97843",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: ratio 1:26 (coaches:athletes)
    const coachRatio = 1;
    const athleteRatio = getRandomInt(10, 40); // like 26
    const coachVar = 'x';
    
    // STEP 2: Correct answer is athleteRatio * x
    const correctExpression = `${athleteRatio}x`;
    
    // STEP 3: Create distractors
    const optionsData = [
      { text: `\\frac{x}{${athleteRatio}}`, isCorrect: false, reason: "may result from conceptual or calculation errors" }, // division
      { text: correctExpression, isCorrect: true }, // correct: multiplication
      { text: `x + ${athleteRatio}`, isCorrect: false, reason: "may result from conceptual or calculation errors" }, // addition
      { text: `\\frac{${athleteRatio}}{x}`, isCorrect: false, reason: "may result from conceptual or calculation errors" } // inverted
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `At a particular track meet, the ratio of coaches to athletes is $${coachRatio}$ to $${athleteRatio}$. If there are $x$ coaches at the track meet, which of the following expressions represents the number of athletes at the track meet?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctExpression,
      explanation: `Choice ${correctLetter} is correct. It's given that at a particular track meet, the ratio of coaches to athletes is $${coachRatio}$ to $${athleteRatio}$. If one number in a ratio is multiplied by a value, the other number must be multiplied by the same value in order to maintain the same ratio. If there are $x$ coaches at the track meet, multiplying both numbers in the ratio by $x$ yields $${coachRatio}(x)$ to $${athleteRatio}(x)$, or $x$ to $${athleteRatio}x$. Therefore, the expression $${athleteRatio}x$ represents the number of athletes at the track meet.\n\nChoice ${incorrectOptions[0].letter} is incorrect and ${incorrectOptions[0].reason}.\n\nChoice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason}.\n\nChoice ${incorrectOptions[2].letter} is incorrect and ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: fea831fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [distance: 11 miles, time: 26 minutes]
 * - Difficulty factors: [Speed calculation, minutes to hours conversion]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Round to nearest tenth]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: [None]
 */

// File: generators/ratios-rates-proportional-relationships-and-units/fea831fc.ts