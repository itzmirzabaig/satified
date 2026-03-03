import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 20113
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [capacity: 1800, base price: $4, decrease: 100 per $1 increase]
 * - Difficulty factors: [Quadratic modeling, vertex of parabola, word problem to equation]
 * - Distractor patterns: [A: 4 (current price), B: 7 (correct), C: 14 (2×7), D: 18 (max decrease before zero sales)]
 * - Constraints: [Quadratic revenue model, find vertex x-coordinate]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_20113 = {
  metadata: {
    // id: "20113",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Revenue = (price) × (quantity)
    // Price = basePrice + x, Quantity = capacity - decreaseRate·x
    // Revenue = (basePrice+x)(capacity-decreaseRate·x)
    
    const basePrice = getRandomInt(3, 6);
    const capacity = getRandomInt(12, 20) * 100;
    const decreaseRate = getRandomInt(80, 120);
    
    const a = -decreaseRate;
    const b_coeff = capacity - basePrice * decreaseRate;
    
    // Vertex at x = -b/(2a)
    const vertexX = -b_coeff / (2 * a);
    
    // Distractors
    const distractor1 = basePrice;
    const distractor2 = vertexX;
    const distractor3 = 2 * vertexX;
    const distractor4 = Math.floor(capacity / decreaseRate);
    
    const optionsData = [
      { text: `$${distractor1}$`, isCorrect: false },
      { text: `$${distractor2}$`, isCorrect: true },
      { text: `$${distractor3}$`, isCorrect: false },
      { text: `$${distractor4}$`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    
    return {
      // Fixed: Use plain text for dollar amounts, $...$ only for math variables
      questionText: `An auditorium has seats for ${capacity} people. Tickets to attend a show at the auditorium currently cost $${basePrice}.00. For each $1.00 increase to the ticket price, ${decreaseRate} fewer tickets will be sold. This situation can be modeled by a quadratic equation where $x$ represents the increase in ticket price, in dollars, and $y$ represents the revenue. If this equation is graphed in the $xy$-plane, at what value of $x$ is the maximum of the graph?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: vertexX.toString(),
      // Fixed: Proper LaTeX formatting for math expressions
      explanation: `Choice ${correctLetter} is correct. Revenue $R = (${basePrice}+x)(${capacity}-${decreaseRate}x) = -${decreaseRate}x^2 + ${b_coeff}x + ${basePrice * capacity}$. The maximum occurs at $x = \\frac{-${b_coeff}}{2(-${decreaseRate})} = ${vertexX}$.`
    };
  }
};

/**
 * Question ID: a9084ca4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [P0: 9000, decay factor: 0.66]
 * - Difficulty factors: [Exponential decay, y-intercept interpretation, context]
 * - Distractor patterns: [A/B: minimum (nonsense), C: wrong calculation, D: 9000 correct]
 * - Constraints: [Exponential model, t=0 gives initial value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */