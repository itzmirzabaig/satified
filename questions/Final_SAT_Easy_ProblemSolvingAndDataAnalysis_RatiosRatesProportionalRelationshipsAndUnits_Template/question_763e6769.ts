import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 763e6769
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio x:y = 12:t, x=156, answer: y=13t]
* - Difficulty factors: [Proportion with variables, solving for expression]
* - Distractor patterns: [A: 13t (correct), B: 12t (no division), C: 144t (156-12), D: 168t (156+12)]
* - Constraints: [156/12 = 13 must be integer]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_763e6769 = {
  metadata: {
    // id: "763e6769",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioFirst = getRandomInt(10, 16);
    const multiplier = getRandomInt(11, 16);
    const xValue = ratioFirst * multiplier;
    const correctCoefficient = multiplier;
    const correctAnswer = `${correctCoefficient}t`;

    const distractor1 = `${ratioFirst}t`;
    const distractor2 = `${ratioFirst * ratioFirst}t`;
    const distractor3 = `${(xValue + ratioFirst)}t`;

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: null },
      { text: distractor1, isCorrect: false, reason: "ignoring the division" },
      { text: distractor2, isCorrect: false, reason: "incorrect operation" },
      { text: distractor3, isCorrect: false, reason: "addition" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Given $x/y = ${ratioFirst}/t$ and $x = ${xValue}$, we have $${xValue}/y = ${ratioFirst}/t$, so $y = ${xValue}t / ${ratioFirst} = ${correctCoefficient}t$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `The ratio x to y is equivalent to the ratio ${ratioFirst} to t. When x=${xValue}, what is the value of y in terms of t?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
* Question ID: 4e375d1f
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2300 cm, conversion: 100 cm/meter, answer: 23 meters]
* - Difficulty factors: [Metric conversion, division by 100]
* - Distractor patterns: [A: 0.043 (inverted), B: 23 (correct), C: 2400 (2300+100), D: 230000 (2300×100)]
* - Constraints: [Simple division by 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/
