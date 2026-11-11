import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 512
*
* ORIGINAL ANALYSIS:
* - Number ranges: [red = simplifiedRed * multiplier, blue = simplifiedBlue * multiplier; ratio simplifiedRed:simplifiedBlue]
* - Difficulty factors: [Simplifying ratios, order matters (red to blue)]
* - Distractor patterns: [reversed (blue to red), raw unsimplified counts, raw counts reversed]
* - Constraints: [simplifiedRed and simplifiedBlue coprime so the reduced ratio is truly simplified; multiplier >= 2 so raw counts differ from the reduced ratio]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

// Greatest common divisor, used to guarantee the reduced ratio is in lowest terms.
function gcd(a: number, b: number): number {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export const generator_512 = {
  metadata: {
    id: "512",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Pick a reduced ratio simplifiedRed : simplifiedBlue in lowest terms
    // (coprime, red < blue) so the "simplified ratio" is genuinely simplified.
    let simplifiedRed = getRandomInt(1, 3);
    let simplifiedBlue = getRandomInt(simplifiedRed + 1, 6);
    let tries = 0;
    while (gcd(simplifiedRed, simplifiedBlue) !== 1 && tries++ < 50) {
      simplifiedRed = getRandomInt(1, 3);
      simplifiedBlue = getRandomInt(simplifiedRed + 1, 6);
    }
    // Fallback to a guaranteed-coprime pair if the loop never found one.
    if (gcd(simplifiedRed, simplifiedBlue) !== 1) {
      simplifiedRed = 2;
      simplifiedBlue = 3;
    }

    // multiplier >= 2 guarantees the raw counts do not already equal the
    // reduced ratio, so the raw-count distractors are always distinct strings.
    const multiplier = getRandomInt(2, 7);
    const redCards = simplifiedRed * multiplier;
    const blueCards = simplifiedBlue * multiplier;

    // Before: one choice was the raw counts (e.g. 6 to 15), which is EQUAL in
    // value to the correct 2 to 5, so two choices were correct. Its partner
    // (raw counts reversed) is just the reversed ratio again. They are
    // replaced by the part-to-whole slips (red to total, blue to total), all
    // reduced like the answer; gcd(r, b) = 1 keeps every choice distinct.
    const total = simplifiedRed + simplifiedBlue;
    const correctRatio = `${simplifiedRed} to ${simplifiedBlue}`;
    const reversedRatio = `${simplifiedBlue} to ${simplifiedRed}`;
    const redToTotal = `${simplifiedRed} to ${total}`;
    const blueToTotal = `${simplifiedBlue} to ${total}`;

    const optionsData = [
      { text: correctRatio, isCorrect: true, reason: '' },
      { text: reversedRatio, isCorrect: false, reason: `${reversedRatio} is the ratio of blue cards to red cards, which reverses the order the question asks for` },
      { text: redToTotal, isCorrect: false, reason: `${redToTotal} is the ratio of red cards to all $${redCards + blueCards}$ cards, not to the blue cards` },
      { text: blueToTotal, isCorrect: false, reason: `${blueToTotal} is the ratio of blue cards to all $${redCards + blueCards}$ cards, not red cards to blue cards` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. There are $${redCards}$ red cards and $${blueCards}$ blue cards, so the ratio of red cards to blue cards is $${redCards}$ to $${blueCards}$. Both numbers share the common factor $${multiplier}$: $${redCards} \\div ${multiplier} = ${simplifiedRed}$ and $${blueCards} \\div ${multiplier} = ${simplifiedBlue}$. So the ratio is equivalent to $${simplifiedRed}$ to $${simplifiedBlue}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A student has $${redCards}$ red cards and $${blueCards}$ blue cards. What is the ratio of red cards to blue cards that the student has?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctRatio,
      explanation: explanation
    };
  }
};
