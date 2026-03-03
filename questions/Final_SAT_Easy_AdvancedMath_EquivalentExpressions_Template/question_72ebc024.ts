import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 72ebc024
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 16, 14, GCF: 2]
 * - Difficulty factors: [Finding GCF, factoring out common factors]
 * - Distractor patterns: [A: factoring x incorrectly, C: using 14 as GCF, D: using 14 and wrong factor]
 * - Constraints: [Must have common factor > 1]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_72ebc024 = {
  metadata: {
    // id: "72ebc024",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const gcf = getRandomInt(2, 4);
    const a = gcf * getRandomInt(3, 6);
    const b = gcf * getRandomInt(2, 5);
    const x1 = getRandomInt(2, 4);
    const x2 = 1;
    const y1 = getRandomInt(2, 3);
    const y2 = 1;

    const remA = a / gcf;
    const remB = b / gcf;
    const remX1 = x1 - 1;
    const remY1 = y1 - 1;

    let correctInner = '';
    if (remX1 > 0 && remY1 > 0) {
      correctInner = `${remA}x^{${remX1}}y^{${remY1}} + ${remB}`;
    } else if (remX1 > 0) {
      correctInner = `${remA}x^{${remX1}}y + ${remB}`;
    } else if (remY1 > 0) {
      correctInner = `${remA}xy^{${remY1}} + ${remB}`;
    } else {
      correctInner = `${remA}xy + ${remB}`;
    }

    const correctText = `$${gcf}xy(${correctInner})$`;
    const distractorA = `$${gcf}xy(${remA}x^{${remX1}}y + ${remB})$`;
    const distractorC = `$${b}xy(${Math.floor(a/b)}x^{${remX1}}y^{${remY1}} + 1)$`;
    const distractorD = `$${b}xy(${a}x^{${x1}}y^{${y1}} + 1)$`;

    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    return {
      questionText: `Which expression is equivalent to $${a}x^{${x1}}y^{${y1}} + ${b}xy$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The greatest common factor of $${a}$ and $${b}$ is $${gcf}$. The GCF of the variables is $xy$ (lowest power of each). Factoring out $${gcf}xy$ gives $${correctText.replace(/\$/g, '')}$. Other options either use incorrect GCFs or wrong exponents after factoring.`
    };
  }
};

/**
 * Question ID: e312081b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-5, constants: -6 to 8]
 * - Difficulty factors: [Combining like terms with linear expressions]
 * - Distractor patterns: [Sign errors on constants, treating first constant as negative]
 */