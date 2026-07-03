import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 860
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 45π, height: 5 (single-digit)]
 * - Difficulty factors: [Cylinder volume formula manipulation, solving for radius]
 * - Distractor patterns: [B: diameter 2r (radius/diameter confusion), C: r² (forgot square root), D: coeff-height (subtraction error)]
 * - Constraints: [Volume coefficient = r²h so radius is always a clean integer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_860 = {
  metadata: {
    id: "860",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate radius and height first, then derive the volume
    // coefficient so the radius is always a clean integer (V = pi*r^2*h,
    // coefficient = r^2*h). Re-roll (bounded) if any distractor collides with
    // the correct answer or another distractor.
    let radius = getRandomInt(2, 6);
    let height = getRandomInt(3, 8);
    let volumeCoeff = radius * radius * height; // coefficient of pi in V
    let rSquared = radius * radius;

    // Distractor definitions (all clean integers):
    //   B = 2r            -> reported the diameter instead of the radius
    //   C = r^2           -> stopped at r^2 and forgot the square root
    //   D = coeff - height-> subtracted the height instead of dividing
    const buildDistractors = () => [2 * radius, radius * radius, radius * radius * height - height];

    let tries = 0;
    while (tries++ < 50) {
      const [b, c, d] = buildDistractors();
      const set = new Set([radius, b, c, d]);
      if (set.size === 4) break; // all four options distinct
      radius = getRandomInt(2, 6);
      height = getRandomInt(3, 8);
    }
    volumeCoeff = radius * radius * height;
    rSquared = radius * radius;

    // STEP 2: Create options with tracking
    const correctText = radius.toString();
    const distractorB = (2 * radius).toString();               // diameter
    const distractorC = rSquared.toString();                   // forgot sqrt
    const distractorD = (volumeCoeff - height).toString();     // subtraction error

    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: distractorD, isCorrect: false }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // Map each incorrect option to the reason that matches its actual value,
    // so the explanation stays correct regardless of the shuffle.
    const reasonFor = (text: string): string => {
      if (text === distractorB) return `it is the diameter (twice the radius), not the radius itself`;
      if (text === distractorC) return `it is the value of $r^2$ before taking the square root`;
      return `it results from subtracting ${height} from ${volumeCoeff} rather than dividing by the height`;
    };

    // STEP 4: Build explanation (numbers derived from the same live variables)
    const explanation = `Choice ${correctLetter} is correct. The volume of a cylinder is $V = \\pi r^2 h$. Substituting $V = ${volumeCoeff}\\pi$ and $h = ${height}$ gives the equation $\\pi r^2 (${height}) = ${volumeCoeff}\\pi$. Dividing both sides by $\\pi$ and then by ${height} yields $r^2 = ${rSquared}$, so $r = ${radius}$. Choice ${incorrectOptions[0].letter} is incorrect; ${reasonFor(incorrectOptions[0].text)}. Choice ${incorrectOptions[1].letter} is incorrect; ${reasonFor(incorrectOptions[1].text)}. Choice ${incorrectOptions[2].letter} is incorrect; ${reasonFor(incorrectOptions[2].text)}.`;

    return {
      questionText: `A right circular cylinder has a volume of $${volumeCoeff}\\pi$. If the height of the cylinder is $${height}$, what is the radius of the cylinder?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
