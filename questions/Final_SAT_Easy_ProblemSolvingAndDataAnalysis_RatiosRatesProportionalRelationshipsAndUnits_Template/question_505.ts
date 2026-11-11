import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 505
*
* ORIGINAL ANALYSIS:
* - Number ranges: [revolutions: 900 (triple-digit), minutes: 50 (double-digit), answer: 18 (double-digit)]
* - Difficulty factors: [Rate calculation, division]
* - Distractor patterns: [A: 18 (correct), B: 850 (900-50, subtraction), C: 950 (900+50, addition), D: 1400 (random)]
* - Constraints: [revolutions divisible by minutes for integer rate]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_505 = {
  metadata: {
    id: "505",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const rate = getRandomInt(12, 25);
    const minutes = getRandomInt(30, 60);
    const totalRevolutions = rate * minutes;
    const correctRate = totalRevolutions / minutes;

    // Before: the explanation was full of literal "\n" text and $$ display
    // blocks (it rendered as one italic math line), one wrong choice was a
    // random offset ("might result from a multiplication error"), and 4 digit
    // numbers had no commas. The random choice is now the real slip of
    // multiplying instead of dividing.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const mfmt = (n: number) => fmt(n).replace(/,/g, '{,}');
    const distractorSubtract = totalRevolutions - minutes;
    const distractorAdd = totalRevolutions + minutes;
    const distractorMultiply = totalRevolutions * minutes;

    const optionsData = [
      { text: correctRate.toString(), isCorrect: true, reason: '' },
      { text: fmt(distractorSubtract), isCorrect: false, reason: `${fmt(distractorSubtract)} is the result of subtracting ${minutes} from ${fmt(totalRevolutions)} instead of dividing` },
      { text: fmt(distractorAdd), isCorrect: false, reason: `${fmt(distractorAdd)} is the result of adding ${minutes} to ${fmt(totalRevolutions)} instead of dividing` },
      { text: fmt(distractorMultiply), isCorrect: false, reason: `${fmt(distractorMultiply)} is the result of multiplying ${fmt(totalRevolutions)} by ${minutes} instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. To find the number of revolutions per minute, divide the total number of revolutions by the number of minutes: $${mfmt(totalRevolutions)} \\div ${minutes} = ${correctRate}$. So the turbine completes ${correctRate} revolutions per minute. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A wind turbine completes ${fmt(totalRevolutions)} revolutions in ${minutes} minutes. At this rate, how many revolutions per minute does this turbine complete?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctRate.toString(),
      explanation: explanation
    };
  }
};
