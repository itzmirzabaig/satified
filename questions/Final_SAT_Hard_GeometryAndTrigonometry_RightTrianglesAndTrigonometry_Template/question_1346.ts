import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1346
 * 
 * FIXES:
 * - Fixed LaTeX formatting: `^\\\\circ` changed to `^{\\circ}` to prevent "missing open brace" errors.
 * - Fixed options return type: Now returns `string[]` instead of `object[]`.
 * - Logic: Ensures angles A and B are complementary (sum to 90), making the identity valid.
 */

export const generator_1346 = {
  metadata: {
    id: "1346",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Generate complementary angles
    const angleA = getRandomInt(15, 40);
    const angleB = 90 - angleA;
    
    // The expression sin(A)cos(B) + cos(A)sin(B) is the expansion of sin(A+B)
    // Since A+B=90, sin(90)=1.
    // We look for an option that also equals 1.
    // Option C: cos^2(B) + cos^2(A)
    // Since A and B are complementary, cos(A) = sin(B).
    // So cos^2(B) + sin^2(B) = 1. Correct.

    const optionsData = [
      { 
        text: `2(\\cos ${angleB}^{\\circ})(\\sin ${angleA}^{\\circ})`, 
        isCorrect: false 
      },
      { 
        text: `2(\\cos ${angleB}^{\\circ}) + 2(\\cos ${angleA}^{\\circ})`, 
        isCorrect: false 
      },
      { 
        text: `(\\cos ${angleB}^{\\circ})^2 + (\\cos ${angleA}^{\\circ})^2`, 
        isCorrect: true 
      },
      { 
        text: `(\\cos ${angleB}^{\\circ})^2 + (\\sin ${angleA}^{\\circ})^2`, 
        isCorrect: false 
      }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;

    return {
      questionText: `Which of the following expressions is equivalent to $(\\sin ${angleA}^{\\circ})(\\cos ${angleB}^{\\circ}) + (\\cos ${angleA}^{\\circ})(\\sin ${angleB}^{\\circ})$?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. 
      
First, evaluate the given expression using the sine addition formula $\\sin(x+y) = \\sin x \\cos y + \\cos x \\sin y$:
$(\\sin ${angleA}^{\\circ})(\\cos ${angleB}^{\\circ}) + (\\cos ${angleA}^{\\circ})(\\sin ${angleB}^{\\circ}) = \\sin(${angleA}^{\\circ} + ${angleB}^{\\circ}) = \\sin(90^{\\circ}) = 1$.

Now, evaluate the correct choice:
The expression is $(\\cos ${angleB}^{\\circ})^2 + (\\cos ${angleA}^{\\circ})^2$.
Since angles ${angleA}^{\\circ} and ${angleB}^{\\circ} are complementary ($90 - ${angleB} = ${angleA}$), we know that $\\cos ${angleA}^{\\circ} = \\sin ${angleB}^{\\circ}$.
Substituting this into the expression gives:
$(\\cos ${angleB}^{\\circ})^2 + (\\sin ${angleB}^{\\circ})^2$
By the Pythagorean identity $\\sin^2 \\theta + \\cos^2 \\theta = 1$, this equals 1.

Therefore, the expressions are equivalent.`
    };
  }
};
