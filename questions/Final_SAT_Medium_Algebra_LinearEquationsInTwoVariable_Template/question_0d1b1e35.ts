import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 0d1b1e35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cups ice cream: 4, bananas: 2, total calcium: 1114, per cup: 276]
 * - Difficulty factors: [Setting up linear equation, solving for unknown]
 * - Distractor patterns: [A: correct, B: forgot to divide by 2, C/D: calculation errors]
 * - Constraints: [Clean integer answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_0d1b1e35 = {
  metadata: {
    // id: "0d1b1e35",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const cupsIceCream = getRandomInt(3, 6);
    const bananas = getRandomInt(2, 4);
    const calciumPerCup = getRandomInt(100, 400);
    const calciumFromIceCream = cupsIceCream * calciumPerCup;
    const bananaCalcium = getRandomInt(3, 15);
    const totalCalcium = calciumFromIceCream + bananas * bananaCalcium;
    
    // STEP 2: Create options
    const wrong1 = bananas * bananaCalcium; // Total for all bananas
    const wrong2 = getRandomInt(200, 500); // Random
    const wrong3 = totalCalcium - calciumPerCup; // Wrong calculation
    
    const optionsData = [
      { text: `$${bananaCalcium}$`, isCorrect: true, reason: "" },
      { text: `$${wrong1}$`, isCorrect: false, reason: "This is the total calcium in ${bananas} bananas, not 1 banana." },
      { text: `$${wrong2}$`, isCorrect: false, reason: "This results from a miscalculation." },
      { text: `$${wrong3}$`, isCorrect: false, reason: "This is the total calcium minus one cup of ice cream, which is meaningless." }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `A batch of banana milkshakes consists of ${cupsIceCream} cups of ice cream and ${bananas} bananas and has ${totalCalcium} milligrams of calcium. There is ${calciumPerCup} mg of calcium in 1 cup of the ice cream used to make this batch of milkshakes. How much calcium, in mg, is in 1 banana?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Let $b$ be the amount of calcium in 1 banana. We know:\n- Total calcium = ${totalCalcium} mg\n- Calcium in 1 cup of ice cream = ${calciumPerCup} mg\n- Recipe uses ${cupsIceCream} cups of ice cream and ${bananas} bananas.\n\nEquation: $${cupsIceCream}(${calciumPerCup}) + ${bananas}b = ${totalCalcium}$\n\n${cupsIceCream * calciumPerCup} + ${bananas}b = ${totalCalcium}\n${bananas}b = ${totalCalcium - calciumFromIceCream}\nb = ${bananaCalcium}. ${incorrectOptions.map(opt => `Choice ${opt.letter} is incorrect; ${opt.reason}`).join(' ')}`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-d62ad380.ts
/**
 * Question ID: d62ad380
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [s: 3,6,9, P: 8,18,28, slope: 10/3, intercept: -2]
 * - Difficulty factors: [Finding linear equation from table data]
 * - Distractor patterns: [A: wrong slope, B: wrong intercept, C: correct, D: inverted slope]
 * - Constraints: [Clean fraction slope]
 * - Question type: [Table+Figure→Multiple Choice Text]
 * - Figure generation: [Mafs plot with points]
 */
