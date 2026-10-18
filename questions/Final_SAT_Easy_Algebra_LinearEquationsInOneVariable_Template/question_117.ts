import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 117
*
* ORIGINAL ANALYSIS:
* - Number ranges: [perChild: 2-5, numChildren: 10-30, leftover: 2-10 (a multiple of perChild)]
* - Difficulty factors: [Word problem, setting up equation]
* - Distractor patterns: [books given out (stops before dividing), dividing the total
*   without subtracting the leftover, adding the leftover instead of subtracting it]
* - Constraints: [leftover is a multiple of perChild so every distractor is an
*   integer; redraw if the books-given count equals another choice]
* - Question type: [Multiple Choice]
* - Figure generation: [None]
*
* FIX NOTES:
* The stem ended "How many children?" and the distractors were fixed offsets
* (n - 3, n + 7, n + 11) with reasons like "way too many" and "wrong
* calculation". Each distractor now comes from a real error, the stem is a
* full question, and the explanation is typeset.
*/

export const generator_117 = {
  metadata: {
    id: "117",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let perChild = 2, numChildren = 10, j = 1;
    do {
      perChild = getRandomInt(2, 5);
      numChildren = getRandomInt(10, 30);
      j = getRandomInt(1, Math.floor(10 / perChild));
    } while (perChild * numChildren === numChildren + 2 * j);
    const leftover = perChild * j;
    const total = perChild * numChildren + leftover;

    const optionsData = [
      { text: numChildren.toString(), isCorrect: true, reason: '' },
      { text: (total - leftover).toString(), isCorrect: false, reason: `this is the number of books the librarian gives to the children, not the number of children` },
      { text: (numChildren + j).toString(), isCorrect: false, reason: `this results from dividing ${total} by ${perChild} without first subtracting the ${leftover} books left over` },
      { text: (numChildren + 2 * j).toString(), isCorrect: false, reason: `this results from adding ${leftover} to ${total} instead of subtracting it` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `A librarian has ${total} books. The librarian gives ${perChild} books to each child in a group and has ${leftover} books left over. How many children are in the group?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: numChildren.toString(),
      explanation: `Choice ${correctLetter} is correct. Let $c$ be the number of children in the group. The librarian gives away $${perChild}c$ books and has ${leftover} books left over, so $${perChild}c + ${leftover} = ${total}$. Subtracting ${leftover} from both sides yields $${perChild}c = ${total - leftover}$, and dividing both sides by ${perChild} yields $c = ${numChildren}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
