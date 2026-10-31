import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 491
*
* ORIGINAL ANALYSIS:
* - Number ranges: [2300 cm, conversion: 100 cm/meter, answer: 23 meters]
* - Difficulty factors: [Metric conversion, division by 100]
* - Distractor patterns: [A: 0.043 (inverted), B: 23 (correct), C: 2400 (2300+100), D: 230000 (2300×100)]
* - Constraints: [Simple division by 100]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_491 = {
  metadata: {
    id: "491",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const meters = getRandomInt(15, 35);
    const cmPerMeter = 100;
    const centimeters = meters * cmPerMeter;
    const correctMeters = centimeters / cmPerMeter;
    const fmt = (n: number) => n.toLocaleString('en-US');
    const m = (n: number) => fmt(n).replace(/,/g, '{,}');

    // Wrong choices are real slips: multiplying by 100, adding 100, and
    // dividing by 1,000 (the conversion for millimeters). The last replaced
    // 100 divided by the centimeters, explained only as "incorrect
    // calculation." Large numbers now have commas.
    const optionsData = [
      { text: `${centimeters / 1000}`, isCorrect: false, reason: `${centimeters / 1000} results from dividing ${fmt(centimeters)} by 1,000 instead of by ${cmPerMeter}` },
      { text: `${correctMeters}`, isCorrect: true, reason: '' },
      { text: fmt(centimeters + cmPerMeter), isCorrect: false, reason: `${fmt(centimeters + cmPerMeter)} results from adding ${cmPerMeter} to ${fmt(centimeters)} instead of dividing` },
      { text: fmt(centimeters * cmPerMeter), isCorrect: false, reason: `${fmt(centimeters * cmPerMeter)} results from multiplying ${fmt(centimeters)} by ${cmPerMeter} instead of dividing; a meter is longer than a centimeter, so the number of meters must be less than ${fmt(centimeters)}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // The division is inside $...$; a bare "\div" used to turn the whole
    // explanation into one italic math line.
    const explanation = `Choice ${correctOption.letter} is correct. Since ${cmPerMeter} centimeters is equivalent to 1 meter, divide the number of centimeters by ${cmPerMeter}: $${m(centimeters)} \\div ${cmPerMeter} = ${correctMeters}$. So ${fmt(centimeters)} centimeters is equivalent to ${correctMeters} meters. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `How many meters are equivalent to ${fmt(centimeters)} centimeters? (${cmPerMeter} centimeters = 1 meter)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: `${correctMeters}`,
      explanation: explanation
    };
  }
};
