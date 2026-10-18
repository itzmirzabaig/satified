import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 111
*
* ORIGINAL ANALYSIS:
* - Number ranges: [initial: 50-150, daily: 5-20, days: 3-8]
* - Difficulty factors: [Word problem, arithmetic sequence]
* - Distractor patterns: [new members only, adding the number of days, initial count]
* - Constraints: [Clean integer result; redraw if the new-member count collides]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* The stem ended "How many members after 5 days?" and one distractor was
* initial * days - daily, labeled "multiplication error", which no real
* mistake produces. It is now the new-member count alone, every reason says
* what the error is, and the explanation is typeset.
*/

export const generator_111 = {
  metadata: {
    id: "111",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Redraw until the new-member count differs from the other choices
    let initial = 50, daily = 5, days = 3;
    do {
      initial = getRandomInt(50, 150);
      daily = getRandomInt(5, 20);
      days = getRandomInt(3, 8);
    } while (daily * days === initial || daily * days === initial + days);
    const added = daily * days;
    const result = initial + added;

    const optionsData = [
      { text: added.toString(), isCorrect: false, reason: `this is the number of new members who join in ${days} days, not the total number of members in the club` },
      { text: result.toString(), isCorrect: true, reason: '' },
      { text: (initial + days).toString(), isCorrect: false, reason: `this results from adding the number of days, ${days}, to ${initial} instead of adding the ${added} new members` },
      { text: initial.toString(), isCorrect: false, reason: `this is the number of members the club has before any new members join` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A club has ${initial} members. Each day, ${daily} new members join the club, and no members leave. How many members will the club have after ${days} days?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: result.toString(),
      explanation: `Choice ${correctLetter} is correct. In ${days} days, $${daily}(${days}) = ${added}$ new members join the club. So after ${days} days, the club will have $${initial} + ${added} = ${result}$ members. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
