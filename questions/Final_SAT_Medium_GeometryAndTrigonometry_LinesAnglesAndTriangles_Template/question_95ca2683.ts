import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 95ca2683
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [angles: 45-65 degrees]
 * - Difficulty factors: [Triangle sum, solving for variable in angle expression]
 * - Distractor patterns: [A: value of k/2, B: unrelated, D: doubled incorrectly]
 * - Constraints: [Sum = 180, solve for k]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */

export const generator_95ca2683 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values ensuring k is even and clean
    const angleA = getRandomInt(45, 65);
    const halfK = 90 - angleA;
    const k = halfK * 2;
    
    // STEP 2: Create options
    const optionsData = [
      { text: halfK.toString(), isCorrect: false, reason: "is the value of k/2 (angle C), not k" },
      { text: "45", isCorrect: false, reason: "results from conceptual or calculation errors" },
      { text: k.toString(), isCorrect: true },
      { text: Math.round(k * 1.5).toString(), isCorrect: false, reason: "results from conceptual or calculation errors" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      // FIXED: Changed all \\\\ to \\ for LaTeX commands
      questionText: `In triangle $ABC$, the measure of angle $A$ is $${angleA}^{\\circ}$, the measure of angle $B$ is $90^{\\circ}$, and the measure of angle $C$ is $\\left(\\frac{k}{2}\\right)^{\\circ}$. What is the value of $k$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: k.toString(),
      // FIXED: Changed all \\\\ to \\ for LaTeX commands
      explanation: `Choice ${correctOption.letter} is correct. The sum of the interior angles of a triangle is 180°. It's given that the interior angles of triangle $ABC$ are $${angleA}^{\\circ}$, $90^{\\circ}$, and $\\left(\\frac{k}{2}\\right)^{\\circ}$. It follows that $${angleA}+90+\\frac{k}{2}=180$, or ${angleA + 90}+\\frac{k}{2}=180$. Subtracting ${angleA + 90} from each side of this equation yields $\\frac{k}{2}=${halfK}$. Multiplying each side of this equation by 2 yields $k=${k}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};