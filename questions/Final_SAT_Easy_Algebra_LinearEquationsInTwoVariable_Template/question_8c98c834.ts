import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 8c98c834
 *
 * ORIGINAL ANALYSIS: [Substitution into decimal linear model]
 */

export const generator_8c98c834 = {
  metadata: {
    // id: "8c98c834",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = parseFloat((getRandomInt(1, 3) / 10).toFixed(1));
    const time = getRandomInt(20, 60);
    const result = Math.round(rate * time);

    const optionsData = [
      { text: result.toString(), isCorrect: true },
      { text: (result - 1).toString(), isCorrect: false, reason: "calculation error" },
      { text: Math.round(time / rate).toString(), isCorrect: false, reason: "dividing instead of multiplying" },
      { text: time.toString(), isCorrect: false, reason: "input instead of output" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `$y=${rate}x$ models pieces practiced ($y$) in $x$ minutes. How many pieces in ${time} minutes?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. $y = ${rate} \\times ${time} = ${result}$.`
    };
  }
};

/**
 * Question ID: b2845d88
 *
 * ORIGINAL ANALYSIS: [Equation from graph with negative fractional slope]
 */