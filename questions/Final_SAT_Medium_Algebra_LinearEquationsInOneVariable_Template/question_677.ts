import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 677
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 9, 8, constants: 2, 18]
 * - Difficulty factors: [Solving for expression 4-3x]
 * - Distractor patterns: [A is sign error, B is value of x, C is too small]
 * - Constraints: [Let u = 4-3x, solve 9u+2=8u+18]
 * - Question type: [Multiple Choice Text]
 */

export const generator_677 = {
  metadata: {
    id: "677",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate equation: a(expr) + b = c(expr) + d
    // With u = expr, this rearranges to (a-c)*u = d-b, so u = (d-b)/(a-c).
    // Pick the answer (targetValue) FIRST, then derive d so the value is
    // an exact integer for every draw regardless of the (a-c) coefficient.
    const a = getRandomInt(5, 10);
    const c = getRandomInt(3, a - 1); // c < a, so a-c >= 1
    const b = getRandomInt(1, 5);

    const targetValue = getRandomInt(4, 12); // the value of the expression u
    const d = b + (a - c) * targetValue; // guarantees (d-b)/(a-c) === targetValue exactly

    // Expression: (e - f*x)
    const e = getRandomInt(3, 6);
    const f = getRandomInt(2, 5);

    // Distractors (each a plausible mistake), derived from the live answer.
    const distractorA = -targetValue;              // sign error
    const distractorB = d - b;                      // forgetting to divide by (a-c)
    const distractorC = targetValue + getRandomInt(1, 3); // off-by-a-few slip

    const correctText = `$${targetValue}$`;
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false },
      { text: `$${distractorB}$`, isCorrect: false },
      { text: `$${distractorC}$`, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];

    // Guard: ensure no distractor collides with the correct answer or each other
    // (e.g. when a-c === 1, d-b === targetValue). Nudge collisions apart.
    const seen = new Set<number>([targetValue]);
    const distractorValues = [distractorA, distractorB, distractorC];
    for (let i = 0; i < distractorValues.length; i++) {
      let v = distractorValues[i];
      let guard = 0;
      while (seen.has(v) && guard++ < 50) v += 1;
      seen.add(v);
      distractorValues[i] = v;
    }
    optionsData[0].text = `$${distractorValues[0]}$`;
    optionsData[1].text = `$${distractorValues[1]}$`;
    optionsData[2].text = `$${distractorValues[2]}$`;
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    const coeff = a - c;
    // Division step is only shown when the coefficient is not 1.
    const divisionStep = coeff === 1
      ? `So $u=${targetValue}$.`
      : `Dividing both sides by ${coeff}: $u=\\frac{${d - b}}{${coeff}}=${targetValue}$.`;

    return {
      questionText: `If $${a}(${e}-${f}x)+${b}=${c}(${e}-${f}x)+${d}$, what is the value of $${e}-${f}x$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let $u = ${e}-${f}x$. Then $${a}u+${b}=${c}u+${d}$. Subtracting $${c}u$ from both sides gives $${coeff}u+${b}=${d}$. Subtracting ${b} from both sides gives $${coeff}u=${d - b}$. ${divisionStep} The other choices result from common errors, such as a sign error, an arithmetic mistake, or stopping before fully isolating $u$.`
    };
  }
};
