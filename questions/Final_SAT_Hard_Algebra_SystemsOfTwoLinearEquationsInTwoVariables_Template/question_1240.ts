import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1240
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [two-line system + third equation x+4y=c, answer: A (zero)]
 * - Difficulty factors: [Three equations, checking consistency]
 * - Distractor patterns: [One solution, two solutions, infinite]
 * - Constraints: [First two must intersect at a single point not on the third line]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null
 */

export const generator_1240 = {
  metadata: {
    id: "1240",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    let attempts = 0;
    const maxAttempts = 100;
    let result: QuestionData | null = null;
    
    while (attempts < maxAttempts && !result) {
      attempts++;

      // Build a genuine two-equation system that meets at a single integer
      // point (px, py), then add a third line x + 4y = c_third that this point
      // does NOT lie on. The two lines share exactly one point, and that point
      // fails the third equation, so all three equations have NO common
      // solution -> "Zero".
      const px = getRandomInt(-4, 4);
      const py = getRandomInt(-4, 4);

      // Two distinct slopes so the first two lines meet at exactly one point.
      const m1 = getRandomInt(-3, -1);
      const m2 = getRandomInt(1, 3);

      // y = m*x + b through (px, py)  =>  b = py - m*px  (integer).
      const b1 = py - m1 * px;
      const b2 = py - m2 * px;

      // Third line: x + 4y = c_third. The intersection point (px, py) must NOT
      // satisfy it, so the three-equation system has no common solution.
      const onThird = px + 4 * py;
      let c_third = getRandomInt(-20, 20);
      if (c_third === onThird) {
        continue;
      }

      // Render each shown line in slope-intercept form with clean signs.
      const fmtLine = (m: number, b: number) => {
        const slopeTerm = m === 1 ? 'x' : m === -1 ? '-x' : `${m}x`;
        if (b === 0) return `y = ${slopeTerm}`;
        return `y = ${slopeTerm} ${b > 0 ? '+' : '-'} ${Math.abs(b)}`;
      };
      const eq1 = fmtLine(m1, b1);
      const eq2 = fmtLine(m2, b2);
      const thirdEq = `x + 4y = ${c_third}`;

      const optionsData = [
        { text: "Zero", isCorrect: true, reason: "is correct because the first two equations meet at only one point, and that point does not satisfy the third equation" },
        { text: "Exactly one", isCorrect: false, reason: "would require the intersection point of the first two lines to also lie on the third line, which it does not" },
        { text: "Exactly two", isCorrect: false, reason: "is impossible for a system of linear equations, which can have zero, one, or infinitely many solutions" },
        { text: "Infinitely many", isCorrect: false, reason: "would require all three equations to represent the same line" }
      ];

      const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
        ...opt,
        letter: String.fromCharCode(65 + index)
      }));

      const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
      const correctLetter = correctOption.letter;
      const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

      result = {
        questionText: `A system of two linear equations is given. $$${eq1}$$ $$${eq2}$$ If a new system of three linear equations is created using the system shown and the equation $${thirdEq}$, how many solutions $(x, y)$ will the resulting system of three equations have?`,
        figureCode: null,
        options: shuffledOptions.map(o => ({ text: o.text })),
        correctAnswer: "Zero",
        explanation: `Choice ${correctLetter} is correct. The two given equations have different slopes ($${m1}$ and $${m2}$), so they intersect at exactly one point, $(${px}, ${py})$. Substituting this point into the third equation gives $${px} + 4(${py}) = ${onThird}$, which is not equal to ${c_third}, so the point does not lie on the line $${thirdEq}$. Because the only point common to the first two lines fails the third equation, the three equations have no common solution. Choice ${incorrectOptions[0].letter} is incorrect; this ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; this ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; this ${incorrectOptions[2].reason}.`
      };
    }
    
    if (!result) {
      throw new Error('Failed to generate valid question after max attempts');
    }
    
    return result;
  }
};
