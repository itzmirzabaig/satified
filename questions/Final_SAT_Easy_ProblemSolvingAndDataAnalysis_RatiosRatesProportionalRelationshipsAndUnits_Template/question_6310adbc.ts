import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 6310adbc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [ratio t:u = 1:2, t = 10, answer: 20]
* - Difficulty factors: [Basic proportion, solving for unknown]
* - Distractor patterns: [A: 2 (ratio part), B: 5 (if ratio reversed 2:1), C: 10 (value of t), D: 20 (correct)]
* - Constraints: [Simple integer ratio, clean multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_6310adbc = {
  metadata: {
    // id: "6310adbc",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const ratioT = 1;
    const ratioU = getRandomInt(2, 4);
    const tValue = getRandomInt(5, 15) * ratioT;
    const uValue = tValue * ratioU;

    const distractor1 = ratioU;
    const distractor2 = tValue / ratioU;
    const distractor3 = tValue;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "This is the second number in the ratio, not the value of $u$. It would be the answer if $t=${ratioT}$." },
      { text: distractor2.toString(), isCorrect: false, reason: "This would be the answer if the ratio was $t$ to $u$ is $${ratioU}$ to $1$ (i.e., $u$ is half of $t$). Here, $u$ is ${ratioU} times $t$." },
      { text: distractor3.toString(), isCorrect: false, reason: "This is the value of $t$, not $u$." },
      { text: uValue.toString(), isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The problem states that the ratio of $t$ to $u$ is $${ratioT}$ to $${ratioU}$. This can be written as the fraction $\\frac{t}{u} = \\frac{${ratioT}}{${ratioU}}$. We are also given that $t = ${tValue}$. We can substitute this value into the proportion: $\\frac{${tValue}}{u} = \\frac{${ratioT}}{${ratioU}}$. To solve for $u$, we can cross-multiply: $${ratioT} \\cdot u = ${tValue} \\cdot ${ratioU}$, $u = ${uValue}$. Therefore, the value of $u$ is $${uValue}$. Why other options are incorrect: Choice ${incorrectOptions[0].letter}: ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter}: ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter}: ${incorrectOptions[2].reason}`;

    return {
      questionText: `The ratio of $t$ to $u$ is $${ratioT}$ to $${ratioU}$, and $t=${tValue}$. What is the value of $u$?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: uValue.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 2d16d62c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [depth: 58 fathoms (double-digit), conversion: 6 feet/fathom, answer: 348]
* - Difficulty factors: [Unit conversion, multiplication]
* - Distractor patterns: [None - fill in blank, common errors: 3480 (extra 0), 64 (added), 52 (subtracted), 348 (correct)]
* - Constraints: [Simple multiplication, double-digit × single-digit]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
