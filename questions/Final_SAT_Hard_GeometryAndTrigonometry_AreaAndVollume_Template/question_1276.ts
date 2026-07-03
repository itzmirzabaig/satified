import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1276
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: (1/3)π, height: 9]
 * - Difficulty factors: [Solving cone volume for radius, algebraic manipulation]
 * - Distractor patterns: [A: 1/3 (correct), B: 1/√3 (wrong algebra), C: √3 (confused), D: r^2 not r]
 * - Constraints: [Clean fractional answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1276 = {
  metadata: {
    id: "1276",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Cone volume V = (1/3)π r^2 h. We pick the answer r = 1/d first so the
    // radius is always a clean unit fraction, then derive the volume that the
    // question states. With r^2 = 1/d^2, the coefficient of π in the volume is
    //   V = (1/3) * (1/d^2) * h = h / (3 d^2).
    const height = getRandomInt(4, 16);
    const rDenominator = getRandomInt(2, 5); // d: radius is 1/d
    const dSquared = rDenominator * rDenominator;

    // Volume coefficient of π as an exact fraction, then simplify.
    const volumeNumerator = height;
    const volumeDenominator = 3 * dSquared;
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const commonDivisor = gcd(volumeNumerator, volumeDenominator);
    const simplifiedNum = volumeNumerator / commonDivisor;
    const simplifiedDen = volumeDenominator / commonDivisor;

    // Display string for the volume coefficient (drops a leading "1").
    const volumeString =
      simplifiedDen === 1
        ? (simplifiedNum === 1 ? "" : simplifiedNum.toString())
        : `\\frac{${simplifiedNum}}{${simplifiedDen}}`;

    // Distractors (all exact form, guaranteed distinct from the answer and
    // from each other for every d in {2,3,4,5}):
    //   correct = 1/d
    //   B = 1/sqrt(d)  -> solved r^2 = 1/d (missed the square on d)
    //   C = sqrt(d)    -> inverted the ratio, solved r^2 = d
    //   D = 1/d^2      -> stopped at r^2 without taking the square root
    const correctText = `\\frac{1}{${rDenominator}}`;
    const distractorB = `\\frac{1}{\\sqrt{${rDenominator}}}`;
    const distractorC = `\\sqrt{${rDenominator}}`;
    const distractorD = `\\frac{1}{${dSquared}}`;

    const optionsData = [
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: distractorB, isCorrect: false, kind: 'wrongRoot' },
      { text: distractorC, isCorrect: false, kind: 'inverted' },
      { text: distractorD, isCorrect: false, kind: 'rSquared' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `A right circular cone has a volume of $${volumeString}\\pi$ cubic feet and a height of $${height}$ feet. What is the radius, in feet, of the base of the cone?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume of a cone is $V = \\frac{1}{3}\\pi r^2 h$. Dividing the given volume by $\\pi$ and substituting $h = ${height}$ gives $${volumeString || "1"} = \\frac{1}{3}(${height})r^2$. Solving for $r^2$ gives $r^2 = \\frac{1}{${dSquared}}$, so $r = \\frac{1}{${rDenominator}}$. Choice ${letterOf('wrongRoot')} is incorrect because it solves $r^2 = \\frac{1}{${rDenominator}}$, missing the square on the denominator. Choice ${letterOf('inverted')} is incorrect because it inverts the ratio and solves $r^2 = ${rDenominator}$. Choice ${letterOf('rSquared')} is incorrect because it stops at $r^2 = \\frac{1}{${dSquared}}$ without taking the square root.`
    };
  }
};
