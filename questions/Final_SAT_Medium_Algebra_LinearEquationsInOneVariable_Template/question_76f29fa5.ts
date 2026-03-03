import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 76f29fa5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base cost: 950, hourly rate: 50, hours threshold: 2, total: 1100]
 * - Difficulty factors: [Piecewise cost modeling, correct equation setup]
 * - Distractor patterns: [A multiplies base by (t-2), B uses 2t, D uses 2t in wrong place]
 * - Constraints: [Total = Base + Rate×(t - 2) for t > 2]
 * - Question type: [Multiple Choice Text]
 */

export const generator_76f29fa5 = {
  metadata: {
    // id: "76f29fa5",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const baseCost = getRandomInt(500, 1200);
    const hourlyRate = getRandomInt(30, 80);
    const thresholdHours = getRandomInt(2, 4);
    const extraHours = getRandomInt(2, 6);
    const totalHours = thresholdHours + extraHours;
    const totalCost = baseCost + hourlyRate * extraHours;
    
    const correctText = `$${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}$`;
    const optionsData = [
      { text: `$${baseCost}(t - ${thresholdHours}) + ${hourlyRate}t = ${totalCost}$`, isCorrect: false },
      { text: `$${baseCost}(${thresholdHours}t) + ${hourlyRate}t = ${totalCost}$`, isCorrect: false },
      { text: `$${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}$`, isCorrect: true },
      { text: `$${baseCost} + ${hourlyRate}(${thresholdHours}t) = ${totalCost}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // Context
    const contexts = [
      ["fishing boat", "rent", "hours"],
      ["construction equipment", "rent", "hours"],
      ["party venue", "rent", "hours"]
    ];
    const [item, verb, timeUnit] = getRandomElement(contexts);
    
    return {
      questionText: `The cost to ${verb} a ${item} from a certain company is ${baseCost} for the first ${thresholdHours} ${timeUnit} and an additional ${hourlyRate} per ${timeUnit} for each ${timeUnit} after the first ${thresholdHours} ${timeUnit}. If the total cost to ${verb} the ${item} from the company for $t$ ${timeUnit}, where $t > ${thresholdHours}$, is $${totalCost}, which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The cost consists of a flat fee of $${baseCost} for the first ${thresholdHours} ${timeUnit} plus $${hourlyRate} for each additional ${timeUnit}. If $t$ represents total ${timeUnit}, then $(t - ${thresholdHours})$ represents the number of additional ${timeUnit}. Therefore, the total cost equation is $${baseCost} + ${hourlyRate}(t - ${thresholdHours}) = ${totalCost}$.`
    };
  }
};

/**
 * Question ID: d0a2fed5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [fraction coefficient: 6/7, constant: 18, result: 54, answer: 294]
 * - Difficulty factors: [Working with fractions, solving for coefficient×variable]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Target 7p requires multiplying by 7 after finding p]
 * - Question type: [Fill-in-the-blank]
 */