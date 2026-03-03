import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import { getRandomInt, shuffle } from '../../utils/math';

/**
* Question ID: 99550621
*
* ORIGINAL ANALYSIS:
* - Number ranges: [room: 5400 sq ft, space per person: 8 sq ft, answer: 675 people]
* - Difficulty factors: [Division with larger numbers, integer constraint (floor)]
* - Distractor patterns: [A: 588 (random/estimation), B: 675 (correct), C: 15274 (random), D: 43200 (5400×8)]
* - Constraints: [Area must be divisible by space per person for integer result]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_99550621 = {
  metadata: {
    // id: "99550621",
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

    const distractor1 = correctMaxPeople - getRandomInt(50, 100);
    const distractor2 = correctMaxPeople * 20 + getRandomInt(1000, 3000);
    const distractor3 = totalArea * spacePerPerson;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "a random number" },
      { text: correctMaxPeople.toString(), isCorrect: true, reason: null },
      { text: distractor2.toString(), isCorrect: false, reason: "a value that is much too large" },
      { text: distractor3.toString(), isCorrect: false, reason: "multiplying instead of dividing" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `To find the maximum number of people, divide the total area by the area required per person: $${totalArea.toLocaleString()} \\div ${spacePerPerson} = ${correctMaxPeople}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it represents ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it represents ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      questionText: `Makayla is planning an event in a $${totalArea.toLocaleString()}$-square-foot room. If there should be at least $${spacePerPerson}$ square feet per person, what is the maximum number of people that could attend this event?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctMaxPeople.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 3318d37b
*
* ORIGINAL ANALYSIS:
* - Number ranges: [cost: $11.00/pound, amount: 6 pounds, answer: $66]
* - Difficulty factors: [Unit rate multiplication, decimal handling]
* - Distractor patterns: [None - fill in blank, common errors: 17 (added), 66 (correct), 660 (extra 0), 5 (subtracted)]
* - Constraints: [Simple multiplication]
* - Question type: [Fill-in-the-blank]
* - Figure generation: [None]
*/
