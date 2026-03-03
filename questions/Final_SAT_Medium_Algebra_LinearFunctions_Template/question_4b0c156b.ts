import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4b0c156b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(28)=15, h(26)=22, slope=-7/2, intercept=113]
 * - Difficulty factors: [Finding equation from two points with negative slope]
 * - Distractor patterns: [A = wrong slope fraction, B = wrong slope and wrong intercept, C = correct slope wrong intercept]
 * - Constraints: [Points must give clean fractional slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_4b0c156b = {
  metadata: {
    // id: "4b0c156b",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // x values close together: diff of 2
    const x1 = getRandomInt(20, 30);
    const x2 = x1 - 2;
    // y values with difference creating fraction
    const yDiff = getRandomInt(5, 9);
    const y1 = getRandomInt(10, 25);
    const y2 = y1 + yDiff;
    // Slope = -yDiff/2 (negative)
    const slopeNum = yDiff;
    const slopeDenom = 2;
    
    // Calculate intercept using point (x2, y2)
    const b = y2 - (-slopeNum / slopeDenom) * x2;
    
    // STEP 2: Build equations
    const correctEq = `h(x) = -\\frac{${slopeNum}}{${slopeDenom}}x + ${b}`;
    const distA = `h(x) = -\\frac{${slopeDenom}}{${slopeNum}}x + ${Math.floor(b / 5)}`;
    const distB = `h(x) = -\\frac{${slopeDenom}}{${slopeNum}}x + ${b + 20}`;
    const distC = `h(x) = -\\frac{${slopeNum}}{${slopeDenom}}x + ${Math.floor(b / 2)}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "has incorrect slope fraction and incorrect y-intercept" },
      { text: distB, isCorrect: false, reason: "has incorrect slope fraction" },
      { text: distC, isCorrect: false, reason: "has correct slope but incorrect y-intercept" },
      { text: correctEq, isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `In the linear function $h$, $h(${x1}) = ${y1}$ and $h(${x2}) = ${y2}$. Which equation defines $h$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEq,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${y2} - ${y1}}{${x2} - ${x1}} = \\frac{${yDiff}}{-2} = -\\frac{${slopeNum}}{${slopeDenom}}$. Using point (${x2}, ${y2}): ${y2} = -\\frac{${slopeNum}}{${slopeDenom}}(${x2}) + b, so $b = ${y2} + \\frac{${slopeNum * x2}}{${slopeDenom}} = ${b}$. Thus $h(x) = -\\frac{${slopeNum}}{${slopeDenom}}x + ${b}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 868fc236
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [protein: 4.0 cal = 16.7 kJ, ratio ~4.175]
 * - Difficulty factors: [Finding proportional relationship from table]
 * - Distractor patterns: [A = inverted ratio, C = inverted variables, D = product relationship]
 * - Constraints: [Table data must be consistent]
 * - Question type: [Table in Question→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */