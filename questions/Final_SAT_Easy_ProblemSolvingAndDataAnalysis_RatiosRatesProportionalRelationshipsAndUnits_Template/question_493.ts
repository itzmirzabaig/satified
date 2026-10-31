import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 493
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio t:u = 1:ratioU, t = tValue, answer: u = t * ratioU]
* - Difficulty factors: [Basic proportion, solving for unknown]
* - Distractor patterns: [second ratio term, added instead of multiplied, value of t]
* - Constraints: [Simple integer ratio, clean multiplication, all distractors distinct integers]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_493 = {
  metadata: {
    id: "493",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioT = 1;
    // t is a multiple of the u part, so the upside down answer t / ratioU is
    // a whole number; skip t = ratioU^2, where it would equal ratioU.
    let ratioU = 0, tValue = 0;
    do {
      ratioU = getRandomInt(2, 4);
      tValue = ratioU * getRandomInt(2, 5);
    } while (tValue === ratioU * ratioU || tValue < 5);
    const uValue = tValue * ratioU;

    // Wrong choices: the u part of the ratio, t plus the u part, and the
    // ratio used upside down (u as t divided by the u part). The last
    // replaced the given value of t.
    const upside = tValue / ratioU;
    const optionsData = [
      { text: `${uValue}`, isCorrect: true, reason: '' },
      { text: `${ratioU}`, isCorrect: false, reason: `${ratioU} is the second number in the ratio, not the value of $u$` },
      { text: `${tValue + ratioU}`, isCorrect: false, reason: `${tValue + ratioU} results from adding ${ratioU} to ${tValue} instead of multiplying` },
      { text: `${upside}`, isCorrect: false, reason: `${upside} results from using the ratio upside down, as if the ratio of $u$ to $t$ were ${ratioT} to ${ratioU}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The ratio of $t$ to $u$ is ${ratioT} to ${ratioU}, which can be written as $\\frac{t}{u} = \\frac{${ratioT}}{${ratioU}}$. Substituting $t = ${tValue}$ gives $\\frac{${tValue}}{u} = \\frac{${ratioT}}{${ratioU}}$. Multiplying both sides by $${ratioU}u$ gives $${tValue} \\cdot ${ratioU} = u$, so $u = ${uValue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The ratio of $t$ to $u$ is ${ratioT} to ${ratioU}, and $t = ${tValue}$. What is the value of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${uValue}`,
      explanation: explanation
    };
  }
};
