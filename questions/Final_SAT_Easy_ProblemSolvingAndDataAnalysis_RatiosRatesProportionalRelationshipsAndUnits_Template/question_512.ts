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

    const correctRatio = `${simplifiedRed} to ${simplifiedBlue}`;
    const reversedRatio = `${simplifiedBlue} to ${simplifiedRed}`;
    const rawUnsimplified = `${redCards} to ${blueCards}`;
    const rawReversed = `${blueCards} to ${redCards}`;

    const optionsData = [
      { text: correctRatio, isCorrect: true, reason: null },
      { text: reversedRatio, isCorrect: false, reason: "This is the ratio of blue cards to red cards. The question asks for red to blue, so the order is reversed." },
      { text: rawUnsimplified, isCorrect: false, reason: "This is the ratio of the actual counts, but it has not been reduced to lowest terms." },
      { text: rawReversed, isCorrect: false, reason: "This uses the actual counts and also reverses the order, giving blue to red instead of the reduced red to blue." }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `The ratio of red cards to blue cards compares the number of red cards to the number of blue cards. There are $${redCards}$ red cards and $${blueCards}$ blue cards, so the ratio is $${redCards}$ to $${blueCards}$. Both numbers share the common factor $${multiplier}$: $${redCards} \\div ${multiplier} = ${simplifiedRed}$ and $${blueCards} \\div ${multiplier} = ${simplifiedBlue}$. The simplified ratio is $${simplifiedRed}$ to $${simplifiedBlue}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason} Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason} Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}`;

    return {
      questionText: `A student has $${redCards}$ red cards and $${blueCards}$ blue cards. What is the ratio of red cards to blue cards that the student has?`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: correctRatio,
      explanation: explanation
    };
  }
};
