import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 290132
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth model creation
 * - Number ranges: Initial 2000, growth 3%, years 1998-2010
 * - Difficulty: Medium - building exponential growth equation
 */

export const generator_290132 = {
  metadata: {
    // id: "290132",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const initialPop = getRandomInt(1000, 5000);
    const growthPercent = getRandomInt(2, 6);
    const growthFactor = 1 + (growthPercent / 100);
    const startYear = 1998;
    
    const questionText = `A function $p$ estimates that there were $${initialPop.toLocaleString()}$ animals in a population in $${startYear}$. Each year from $${startYear}$ to $${startYear + 12}$, the function estimates that the number of animals in this population increased by $${growthPercent}% of the number of animals in the population the previous year. Which equation defines this function, where $p(x)$ is the estimated number of animals in the population $x$ years after $${startYear}$?`;
    
    const correctAnswer = `p(x) = ${initialPop.toLocaleString()}(${growthFactor.toFixed(2)})^x`;
    
    const optionsData = [
      { text: `p(x) = ${initialPop.toLocaleString()}(${growthPercent})^x`, isCorrect: false, reason: "uses percentage as base instead of growth factor" },
      { text: `p(x) = ${initialPop.toLocaleString()}(${growthFactor.toFixed(2)})^x`, isCorrect: true },
      { text: `p(x) = ${initialPop.toLocaleString()}(${growthPercent})^{${startYear}}`, isCorrect: false, reason: "uses wrong base and constant exponent" },
      { text: `p(x) = ${initialPop.toLocaleString()}(${growthFactor.toFixed(2)})^{${startYear}}`, isCorrect: false, reason: "uses constant year as exponent instead of variable x" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The initial population is $${initialPop.toLocaleString()}, and a $${growthPercent}% increase means multiplying by $1.${growthPercent.toString().padStart(2, '0')} = ${growthFactor.toFixed(2)}$ each year. So $p(x) = ${initialPop.toLocaleString()}(${growthFactor.toFixed(2)})^x$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};

/**
 * Question ID: 5c00c2c1
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Exponential growth from percentage rate
 * - Number ranges: Initial 24, growth 16.2%, target 10 billion by 1920
 * - Difficulty: Medium - creating exponential model from percentage
 */