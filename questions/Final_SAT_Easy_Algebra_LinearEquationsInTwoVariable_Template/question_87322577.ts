import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 87322577
 *
 * ORIGINAL ANALYSIS: [Constant meaning in context]
 */

export const generator_87322577 = {
  metadata: {
    // id: "87322577",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const total = getRandomInt(60, 120);
    const activity1 = "running";
    const activity2 = "biking";

    const optionsData = [
      { text: `The total number of minutes spent ${activity1} and ${activity2} each day`, isCorrect: true },
      { text: `The number of minutes spent ${activity1} each day`, isCorrect: false, reason: "describes variable x" },
      { text: `The number of minutes spent ${activity2} each day`, isCorrect: false, reason: "describes variable y" },
      { text: `The ratio of minutes spent`, isCorrect: false, reason: "suggests a non-existent relationship" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;

    return {
      questionText: `The equation $x+y=${total}$ relates minutes Maria spends ${activity1} ($x$) and ${activity2} ($y$) daily. What does ${total} represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: shuffledOptions.find(o => o.isCorrect)!.text,
      explanation: `Choice ${correctLetter} is correct. ${total} is the sum of both activities.`
    };
  }
};

/**
 * Question ID: ebf8d2b7
 *
 * ORIGINAL ANALYSIS: [Linear equation word problem setup]
 */