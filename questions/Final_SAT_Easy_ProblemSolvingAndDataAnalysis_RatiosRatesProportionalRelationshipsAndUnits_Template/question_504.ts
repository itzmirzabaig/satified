import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 504
*
* ORIGINAL ANALYSIS:
* - Number ranges: [28 kg (double-digit), conversion: 1000 g/kg, answer: 28000]
* - Difficulty factors: [Metric conversion, multiplication by 1000]
* - Distractor patterns: [A: 28000 (correct), B: 1028 (added), C: 972 (subtracted), D: 784 (random)]
* - Constraints: [Simple multiplication by 1000]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_504 = {
  metadata: {
    id: "504",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const massKg = getRandomInt(15, 40);
    const gramsPerKg = 1000;
    const massGrams = massKg * gramsPerKg;

    // Before: one wrong choice was massKg squared (a "seemingly random number"),
    // the reasons were "This answer is incorrect..." sentences, 1,031 style
    // choices had no comma, the explanation had a bare × outside math and a
    // nonstandard format, and correctAnswer ("31000") did not match the choice
    // text ("31,000"). The squared value is replaced by the real slip of
    // dividing by 1,000.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const distractor1 = gramsPerKg + massKg;
    const distractor2 = gramsPerKg - massKg;
    const distractor3 = massKg / gramsPerKg;

    const optionsData = [
      { text: fmt(massGrams), isCorrect: true, reason: '' },
      { text: fmt(distractor1), isCorrect: false, reason: `${fmt(distractor1)} is the result of adding ${massKg} to ${fmt(gramsPerKg)} instead of multiplying` },
      { text: distractor2.toString(), isCorrect: false, reason: `${distractor2} is the result of subtracting ${massKg} from ${fmt(gramsPerKg)} instead of multiplying` },
      { text: distractor3.toString(), isCorrect: false, reason: `${distractor3} is the result of dividing ${massKg} by ${fmt(gramsPerKg)} instead of multiplying, which converts in the wrong direction` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Since 1 kilogram is ${fmt(gramsPerKg)} grams, multiply the mass in kilograms by ${fmt(gramsPerKg)} to convert to grams: $${massKg} \\times 1{,}000 = ${fmt(massGrams).replace(/,/g, '{,}')}$. So the kangaroo's mass is ${fmt(massGrams)} grams. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A kangaroo has a mass of ${massKg} kilograms. What is the kangaroo's mass, in grams? (1 kilogram = ${fmt(gramsPerKg)} grams)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: fmt(massGrams),
      explanation: explanation
    };
  }
};
