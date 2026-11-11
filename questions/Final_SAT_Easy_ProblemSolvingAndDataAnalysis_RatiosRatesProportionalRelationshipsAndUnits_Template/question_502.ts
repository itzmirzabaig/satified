import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 502
*
* ORIGINAL ANALYSIS:
* - Number ranges: [room: 5400 sq ft, space per person: 8 sq ft, answer: 675 people]
* - Difficulty factors: [Division with larger numbers, integer constraint (floor)]
* - Distractor patterns: [A: 588 (random/estimation), B: 675 (correct), C: 15274 (random), D: 43200 (5400×8)]
* - Constraints: [Area must be divisible by space per person for integer result]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_502 = {
  metadata: {
    id: "502",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const maxPeople = getRandomInt(500, 800);
    const spacePerPerson = getRandomInt(6, 10);
    const totalArea = maxPeople * spacePerPerson;
    const correctMaxPeople = totalArea / spacePerPerson;

    // Before: two wrong choices were random ("a random number", "a value that
    // is much too large"), the stem used the hyphenated "square-foot room", the
    // comma in the area sat bare inside math, and the explanation format was
    // nonstandard. Every wrong choice is now a real slip with exact value.
    const fmt = (n: number) => n.toLocaleString('en-US');
    const mfmt = (n: number) => fmt(n).replace(/,/g, '{,}');
    const distractor1 = totalArea - spacePerPerson;
    const distractor2 = totalArea + spacePerPerson;
    const distractor3 = totalArea * spacePerPerson;

    const optionsData = [
      { text: fmt(distractor1), isCorrect: false, reason: `${fmt(distractor1)} is the result of subtracting ${spacePerPerson} from ${fmt(totalArea)} instead of dividing` },
      { text: correctMaxPeople.toString(), isCorrect: true, reason: '' },
      { text: fmt(distractor2), isCorrect: false, reason: `${fmt(distractor2)} is the result of adding ${spacePerPerson} to ${fmt(totalArea)} instead of dividing` },
      { text: fmt(distractor3), isCorrect: false, reason: `${fmt(distractor3)} is the result of multiplying ${fmt(totalArea)} by ${spacePerPerson} instead of dividing` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Each person needs at least ${spacePerPerson} square feet, so the maximum number of people is the total area divided by the area for each person: $${mfmt(totalArea)} \\div ${spacePerPerson} = ${correctMaxPeople}$. So at most ${correctMaxPeople} people could attend. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `Makayla is planning an event in a room with an area of ${fmt(totalArea)} square feet. If there should be at least ${spacePerPerson} square feet per person, what is the maximum number of people who could attend this event?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctMaxPeople.toString(),
      explanation: explanation
    };
  }
};
