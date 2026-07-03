import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 184
 *
 * ORIGINAL ANALYSIS: [Constant meaning in context]
 */

export const generator_184 = {
  metadata: {
    id: "184",
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

    const correctText = shuffledOptions.find(o => o.isCorrect)!.text;

    return {
      questionText: `A student tracks their daily exercise. The equation $x+y=${total}$ relates the minutes they spend ${activity1} ($x$) and ${activity2} ($y$) each day. In this context, what does ${total} represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. In the equation $x+y=${total}$, the variable $x$ is the minutes spent ${activity1} and $y$ is the minutes spent ${activity2}, so their sum ${total} is the total number of minutes spent ${activity1} and ${activity2} each day.`
    };
  }
};
