import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 993000da
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [230%, 60% (medium percentages)]
 * - Difficulty factors: [Chained percentage relationships, algebraic manipulation]
 * - Distractor patterns: [Multiplying percentages directly, wrong variable relationship]
 * - Constraints: [Must chain a→b→c relationships correctly]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */

export const generator_993000da = {
  metadata: {
    // id: "993000da",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random percentages in original ranges
    const P1 = getRandomInt(180, 280); // a is P1% of b
    const P2 = getRandomInt(50, 80);   // a is P2% of c
    
    // STEP 2: Calculate relationship
    // a = (P1/100) * b, so b = (100/P1) * a
    // a = (P2/100) * c, so c = (100/P2) * a
    // c as % of b = (c/b) * 100 = [(100/P2) / (100/P1)] * 100 = (P1/P2) * 100
    
    const cAsPctOfB = (P1 / P2) * 100;
    const roundedResult = Math.round(cAsPctOfB);
    
    // STEP 3: Create distractors
    const multipliedPcts = Math.round((P1 / 100) * (P2 / 100) * 100); // Wrong: multiply decimals
    const wrongOrder = Math.round((P2 / P1) * 100); // Wrong: inverted
    const sumPcts = P1 + P2; // Wrong: simple addition
    
    const optionsData = [
      { text: multipliedPcts.toString(), isCorrect: false, reason: "results from incorrectly multiplying percentage decimals" },
      { text: wrongOrder.toString(), isCorrect: false, reason: "results from inverting the ratio" },
      { text: roundedResult.toString(), isCorrect: true, reason: "" },
      { text: sumPcts.toString(), isCorrect: false, reason: "results from adding percentages" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'C';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `The positive number $a$ is ${P1}% of the number $b$, and $a$ is ${P2}% of the number $c$. If $c$ is $p% of $b$, which of the following is closest to the value of $p$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: roundedResult.toString(),
      explanation: `Choice ${correctLetter} is correct. From the given: $a = ${P1/100}b$ and $a = ${P2/100}c$. Setting equal: ${P1/100}b = ${P2/100}c$. Solving for $c$: $c = \\frac{${P1/100}}{${P2/100}}b = \\frac{${P1}}{${P2}}b \\approx ${(P1/P2).toFixed(3)}b$. As a percentage: $${(P1/P2).toFixed(3)} \\times 100 \\approx ${roundedResult}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 1fbd3b67
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [190%, 80%, 24 (single/two-digit)]
 * - Difficulty factors: ["Percent greater than" vs "percent of", chained calculations]
 * - Distractor patterns: [Forgetting to add original amount, sign errors]
 * - Constraints: [190% greater means multiply by 2.9, 80% less means multiply by 0.2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - algebraic percentage problem]
 */