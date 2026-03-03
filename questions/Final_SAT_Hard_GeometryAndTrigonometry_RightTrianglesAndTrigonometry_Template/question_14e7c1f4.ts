import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 14e7c1f4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Q = x+61, R = 4x+4]
 * - Difficulty factors: [Cofunction identity, complementary angles, solving linear equation]
 * - Constraints: [cos(Q) = sin(R) implies Q + R = 90°]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_14e7c1f4 = {
  metadata: {
    // id: "14e7c1f4",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Original: cos(Q) = sin(R), so Q + R = 90°
    // (x + 61) + (4x + 4) = 90
    // 5x + 65 = 90
    // 5x = 25, x = 5
    
    // Generate different equation
    const solution = getRandomInt(3, 10);
    const coeff1 = getRandomInt(1, 3);
    const coeff2 = getRandomInt(3, 6);
    const const1 = getRandomInt(50, 70);
    const const2 = getRandomInt(1, 10);
    
    // Ensure: coeff1*x + const1 + coeff2*x + const2 = 90
    // (coeff1 + coeff2)*solution + const1 + const2 = 90
    // Adjust const1 to make it work
    const sumConst = const1 + const2;
    const sumCoeff = coeff1 + coeff2;
    const adjustedConst1 = 90 - sumCoeff * solution - const2;
    
    const angleQ = `${coeff1}x + ${adjustedConst1}`;
    const angleR = `${coeff2}x + ${const2}`;

    const optionsData = [
      { text: solution.toString(), isCorrect: true, reason: "correct: cofunction identity implies angles sum to 90°" },
      { text: (solution + 14).toString(), isCorrect: false, reason: "arithmetic error in solving" },
      { text: (solution + 18).toString(), isCorrect: false, reason: "makes angles non-acute or non-complementary" },
      { text: (solution + 24).toString(), isCorrect: false, reason: "makes one angle non-acute" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The problem involves the cofunction identity for sine and cosine, which states that $\\\\sin(R) = \\\\cos(90^{\\\\circ} - R)$. Thus, if $\\\\cos(Q) = \\\\sin(R)$, then the angles Q and R are complementary. This means their sum must be equal to $90^{\\\\circ}$. Given: $\\\\angle Q = ${angleQ}$ and $\\\\angle R = ${angleR}$. Substituting: $(${angleQ}) + (${angleR}) = 90$. This gives ${coeff1 + coeff2}x + ${adjustedConst1 + const2} = 90$, so ${coeff1 + coeff2}x = ${90 - adjustedConst1 - const2}$, and $x = ${solution}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    return {
      questionText: `For two acute angles, $\\\\angle Q$ and $\\\\angle R$, $\\\\cos(Q) = \\\\sin(R)$. The measures, in degrees, of $\\\\angle Q$ and $\\\\angle R$ are $${angleQ}$ and $${angleR}$, respectively. What is the value of $x$?`,
      figureCode: null, // No figure
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: solution.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: 25da87f8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [perimeter: 18 + 6√3]
 * - Difficulty factors: [30-60-90 triangle ratios, perimeter formula with radicals]
 * - Constraints: [Sides are x, x√3, 2x; perimeter = x(3 + √3)]
 * - Question type: [Figure→Fill in the blank]
 * - Figure generation: [30-60-90 triangle]
 */