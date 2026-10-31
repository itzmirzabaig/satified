import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 495
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio x:y = r:t, x = r*m, answer: y = m*t]
* - Difficulty factors: [Proportion with variables, solving for expression]
* - Distractor patterns: [correct m*t; r*t (used numerator directly); r*m*t (no division); (m+r)*t (added instead)]
* - Constraints: [x = r*m so x/r = m is a clean integer coefficient]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/

export const generator_495 = {
  metadata: {
    id: "495",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // r is the ratio's first term and m the answer's coefficient; they must
    // differ so the "first term" choice differs from the answer.
    let ratioFirst = 0, multiplier = 0;
    do {
      ratioFirst = getRandomInt(10, 16);
      multiplier = getRandomInt(11, 16);
    } while (ratioFirst === multiplier);
    const xValue = ratioFirst * multiplier;
    const m = multiplier;

    // Wrong choices: the first term of the ratio, x without dividing, and
    // the ratio used upside down (y/x = r/t gives y = t/m). The old third
    // choice, m + r, was explained as "adding the two given numbers," but m
    // is the answer, not a given number, and backfilled values were
    // explained only as "a computational error."
    const optionsData = [
      { text: `${m}t`, isCorrect: true, reason: '' },
      { text: `${ratioFirst}t`, isCorrect: false, reason: `$${ratioFirst}t$ uses the first term of the ratio, ${ratioFirst}, as the coefficient instead of dividing ${xValue} by ${ratioFirst}` },
      { text: `${xValue}t`, isCorrect: false, reason: `$${xValue}t$ uses the value of $x$ as the coefficient without dividing by ${ratioFirst}` },
      { text: `\\frac{t}{${m}}`, isCorrect: false, reason: `$\\frac{t}{${m}}$ results from writing the ratio upside down, $\\frac{y}{x} = \\frac{${ratioFirst}}{t}$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The ratio of $x$ to $y$ is ${ratioFirst} to $t$, so $\\frac{x}{y} = \\frac{${ratioFirst}}{t}$. Substituting $x = ${xValue}$ gives $\\frac{${xValue}}{y} = \\frac{${ratioFirst}}{t}$. Multiplying both sides by $yt$ gives $${xValue}t = ${ratioFirst}y$, and dividing both sides by ${ratioFirst} gives $y = ${m}t$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The ratio $x$ to $y$ is equivalent to the ratio ${ratioFirst} to $t$. When $x = ${xValue}$, what is the value of $y$ in terms of $t$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${m}t`,
      explanation: explanation
    };
  }
};
