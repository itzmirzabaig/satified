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
    const ratioU = getRandomInt(2, 4);
    const tValue = getRandomInt(5, 15);
    const uValue = tValue * ratioU;

    // Distractors, all integers and provably distinct from each other and the
    // answer across tValue in [5,15], ratioU in [2,4]:
    //  - ratioU: the second number in the ratio (<= 4, never equals t >= 5 or u >= 10)
    //  - tValue + ratioU: added instead of multiplied
    //  - tValue: just the value of t
    const distractor1 = ratioU;
    const distractor2 = tValue + ratioU;
    const distractor3 = tValue;

    const optionsData = [
      { text: uValue.toString(), isCorrect: true, reason: null },
      { text: distractor1.toString(), isCorrect: false, reason: "This is the second number in the ratio, not the value of $u$." },
      { text: distractor2.toString(), isCorrect: false, reason: "This results from adding the two numbers instead of multiplying, which does not follow the proportion." },
      { text: distractor3.toString(), isCorrect: false, reason: "This is the given value of $t$, not the value of $u$." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The ratio of $t$ to $u$ is $${ratioT}$ to $${ratioU}$, which can be written as $\\frac{t}{u} = \\frac{${ratioT}}{${ratioU}}$. Because $t = ${tValue}$, substitute to get $\\frac{${tValue}}{u} = \\frac{${ratioT}}{${ratioU}}$. Cross-multiplying gives $${ratioT} \\cdot u = ${tValue} \\cdot ${ratioU}$, so $u = ${uValue}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      questionText: `The ratio of $t$ to $u$ is $${ratioT}$ to $${ratioU}$, and $t=${tValue}$. What is the value of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: uValue.toString(),
      explanation: explanation
    };
  }
};
