import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 51c9d65f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ratio 35:10, width increase by 7]
 * - Difficulty factors: [Proportional change, multiplication vs addition]
 * - Distractor patterns: [A: decrease by 24.5, C: decrease by 7, D: increase by 7]
 * - Constraints: [Must multiply ratio by change, not add]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_51c9d65f = {
  metadata: {
    // id: "51c9d65f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: ratio 35:10, width +7, length +24.5 (35/10 * 7)
    const lengthRatio = getRandomInt(20, 50);
    const widthRatio = getRandomInt(5, 15);
    const widthIncrease = getRandomInt(3, 12);
    
    // STEP 2: Calculate required length change
    const ratio = lengthRatio / widthRatio;
    const lengthIncrease = ratio * widthIncrease;
    
    // Format as fraction if needed
    const [intPart, fracPart] = lengthIncrease.toString().split('.');
    const formattedIncrease = fracPart 
      ? lengthIncrease.toFixed(1).replace(/\.0$/, '')
      : lengthIncrease.toString();
    
    // STEP 3: Create options
    const decreaseOption = `It must decrease by $${formattedIncrease}$ units.`;
    const increaseOption = `It must increase by $${formattedIncrease}$ units.`;
    const wrongDecrease = `It must decrease by $${widthIncrease}$ units.`;
    const wrongIncrease = `It must increase by $${widthIncrease}$ units.`;
    
    const optionsData = [
      { text: decreaseOption, isCorrect: false, reason: "suggests a decrease, but the length must increase to match the increase in width" },
      { text: increaseOption, isCorrect: true },
      { text: wrongDecrease, isCorrect: false, reason: "suggests a decrease instead of an increase" },
      { text: wrongIncrease, isCorrect: false, reason: "incorrectly assumes the length increases by the same amount as the width, which would only be true if the ratio was 1:1" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `For a certain rectangular region, the ratio of its length to its width is $${lengthRatio}$ to $${widthRatio}$. If the width of the rectangular region increases by $${widthIncrease}$ units, how must the length change to maintain this ratio?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: increaseOption,
      explanation: `Choice ${correctLetter} is correct. The ratio of length to width is $\\frac{${lengthRatio}}{${widthRatio}} = ${ratio}$. If the width increases by $${widthIncrease}$, the length must increase by $${ratio} \\times ${widthIncrease} = ${formattedIncrease}$ to maintain the same ratio. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};