import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 4becad44
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 3, 36, 45, fractions with 12, 4]
 * - Difficulty factors: [Parallel lines condition, slope comparison from different forms]
 * - Distractor patterns: [Wrong slope, same line (infinite solutions), wrong manipulation]
 * - Constraints: [Slope must equal 1/12, y-intercept must differ from 5/4]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_4becad44 = {
  metadata: {
    // id: "4becad44",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;
      
      const slopeBase = getRandomInt(3, 6); // 3, 4, 5, or 6
      
      const a_base = getRandomInt(2, 5);
      const b_base = a_base * slopeBase; // slope = 1/slopeBase
      const c_base = getRandomInt(20, 50);
      
      const actualSlope = a_base / b_base;
      
      // Option A: wrong slope
      const optA_slope = getRandomInt(2, 8, [slopeBase]);
      const optA_text = `x = ${optA_slope}y`;
      
      // Option B: same slope (correct for no solution)
      const factor1 = getRandomInt(2, slopeBase - 1);
      const factor2 = slopeBase / factor1;
      
      if (factor2 !== Math.floor(factor2) || factor2 <= 0) {
        continue;
      }
      
      const optB_text = `\\frac{1}{${factor1}}x = ${factor2}y`;
      
      // Option C: same line (infinite solutions)
      const c_same_line = Math.round(slopeBase * c_base / b_base);
      const optC_text = `x = ${slopeBase}y ${c_same_line >= 0 ? '-' : '+'} ${Math.abs(c_same_line)}`;
      
      // Option D: different slope
      const optD_slope = getRandomInt(2, 8, [slopeBase]);
      const optD_text = `\\frac{1}{${getRandomInt(2, 4)}}x = ${optD_slope}y ${getRandomElement(['-', '+'])} ${getRandomInt(10, 30)}`;
      
      const questionText = `One of the two equations in a system of linear equations is ${a_base}x = ${b_base}y ${c_base >= 0 ? '-' : '+'} ${Math.abs(c_base)}. The system has no solution. Which equation could be the second equation in this system?`;
      
      const optionsData = [
        { text: optA_text, isCorrect: false, reason: "has a different slope, so the system would have exactly one solution" },
        { text: optB_text, isCorrect: true },
        { text: optC_text, isCorrect: false, reason: "has the same slope and same y-intercept as the given equation, so the system would have infinitely many solutions" },
        { text: optD_text, isCorrect: false, reason: "has a different slope, so the system would have exactly one solution" }
      ];
      
      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));
      
      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
      
      result = {
        questionText: questionText,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: optB_text,
        explanation: `Choice ${correctLetter} is correct. A system has no solution when the lines are parallel and distinct (same slope, different y-intercepts). The given equation can be rewritten as y = \\frac{${a_base}}{${b_base}}x + \\frac{${c_base}}{${b_base}}, which has slope \\frac{1}{${slopeBase}}. Choice ${correctLetter} has the same slope but a different y-intercept. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};

/**
 * Question ID: d1b66ae6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: -1, 1, 3, constants: -3.5, 9.5 (decimals)]
 * - Difficulty factors: [Elimination method with decimals, solving for specific variable]
 * - Distractor patterns: [None - fill in blank]
 * - Constraints: [Solution must be clean decimal or fraction]
 * - Question type: [Text→Fill in blank]
 * - Figure generation: null
 */