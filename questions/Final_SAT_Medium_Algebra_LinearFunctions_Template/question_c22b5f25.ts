import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c22b5f25
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-2,3) and (4,-5), slope: -4/3, intercept: 1/3]
 * - Difficulty factors: [Finding equation from two points with negative slope]
 * - Distractor patterns: [A = wrong slope, B = wrong slope, D = wrong slope]
 * - Constraints: [Points must give clean fractional slope]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_c22b5f25 = {
  metadata: {
    // id: "c22b5f25",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Slope: fraction a/b where a=2-4, b=2-4
    const num = getRandomInt(2, 4);
    const denom = getRandomInt(2, 4);
    const m = num / denom;
    // Random sign for slope
    const slopeSign = Math.random() > 0.5 ? 1 : -1;
    const actualSlope = m * slopeSign;
    
    // Point 1: x1 negative, y1 positive
    const x1 = -getRandomInt(1, 4);
    const y1 = getRandomInt(2, 6);
    // Calculate intercept
    const b = y1 - actualSlope * x1;
    
    // Point 2: x2 positive, calculate y2
    const x2 = getRandomInt(3, 6);
    const y2 = actualSlope * x2 + b;
    
    // STEP 2: Format slope string
    const slopeStr = actualSlope < 0 ? `-\\frac{${num}}{${denom}}` : `\\frac{${num}}{${denom}}`;
    
    // STEP 3: Build distractors
    const distA = `f(x)=x+${Math.abs(Math.round(b)) + 2}`;
    const distB = `f(x)=\\frac{1}{${num}}x+${Math.abs(Math.round(b)) + 1}`;
    const distC = `f(x)=${slopeStr}x+${b < 0 ? '-' : ''}${Math.abs(b) < 1 ? '\\frac{' + Math.round(Math.abs(b) * denom) + '}{' + denom + '}' : Math.round(b)}`;
    const distD = `f(x)=-\\frac{${denom}}{${num}}x+${Math.abs(Math.round(b))}`;
    
    const optionsData = [
      { text: distA, isCorrect: false, reason: "incorrect slope" },
      { text: distB, isCorrect: false, reason: "incorrect slope" },
      { text: distC, isCorrect: true },
      { text: distD, isCorrect: false, reason: "inverted slope fraction" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `In the xy-plane, the points $(${x1}, ${y1})$ and (${x2}, ${Math.round(y2)}) lie on the graph of which of the following linear functions?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: distC,
      explanation: `Choice ${correctLetter} is correct. The slope is $m = \\frac{${Math.round(y2)} - ${y1}}{${x2} - (${x1})} = \\frac{${Math.round(y2) - y1}}{${x2 - x1}} = ${slopeStr}$. Only choice ${correctLetter} has this slope. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 11e1ab81
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [graph shows line through origin with slope 2, d = 2m]
 * - Difficulty factors: [Reading graph, finding equation]
 * - Distractor patterns: [B = wrong sign, C = wrong intercept, D = wrong intercept]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph]
 */