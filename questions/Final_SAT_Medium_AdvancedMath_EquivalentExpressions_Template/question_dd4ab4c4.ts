import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: dd4ab4c4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 4, 20, 25 creating perfect square pattern]
 * - Difficulty factors: [Recognizing perfect square trinomial pattern, factoring with coefficients]
 * - Distractor patterns: [A: incorrectly factored, C: divided GCF instead of factoring, D: didn't factor coefficients]
 * - Constraints: [Must generate perfect square trinomial a²x² + 2abxy + b²y² = (ax + by)²]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_dd4ab4c4 = {
  metadata: {
    // id: "dd4ab4c4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base coefficients for perfect square pattern (ax + by)²
    // Original uses 2 and 5, giving (2a + 5b)² = 4a² + 20ab + 25b²
    // Generate new values in similar range (2-6) to preserve difficulty
    const coefA = getRandomInt(2, 5);  // Will be squared for first term
    const coefB = getRandomInt(2, 5);  // Will be squared for last term
    
    // STEP 2: Calculate perfect square trinomial coefficients
    const firstTermCoeff = coefA * coefA;      // a²
    const lastTermCoeff = coefB * coefB;       // b²
    const middleTermCoeff = 2 * coefA * coefB; // 2ab
    
    // STEP 3: Format the polynomial expression with proper LaTeX
    // Handle coefficient 1 omission for cleaner display
    const firstTermDisplay = firstTermCoeff === 1 ? "a^2" : `${firstTermCoeff}a^2`;
    const lastTermDisplay = lastTermCoeff === 1 ? "b^2" : `${lastTermCoeff}b^2`;
    
    // Format middle term with proper sign handling
    const middleTermDisplay = `${middleTermCoeff}ab`;
    
    const polynomial = `${firstTermDisplay} + ${middleTermDisplay} + ${lastTermDisplay}`;
    
    // STEP 4: Create correct answer and distractors
    // Correct factor: (coefA * a + coefB * b)
    const correctFactor = `(${coefA}a + ${coefB}b)`;
    
    // DISTRACTOR ANALYSIS (SAT patterns):
    // A: (a + b) - Generic factor, ignores coefficients completely
    // C: (4a + 5b) - Divides middle and last terms by GCF instead of factoring properly
    //    (e.g., takes 20ab/5 = 4ab, 25b²/5 = 5b, then combines with a)
    // D: (4a + 25b) - Squares coefficients but doesn't take square roots
    
    // Generate distractor C coefficients (dividing approach pattern)
    const distractorCA = coefA * 2;  // Pattern: doubles first coefficient
    const distractorCB = coefB;      // Keeps second coefficient
    
    // Create options with tracking
    const optionsData = [
      { 
        text: "(a + b)", 
        isCorrect: false, 
        reason: "may be the result of incorrectly factoring the polynomial without considering the coefficients" 
      },
      { 
        text: `(${coefA}a + ${coefB}b)`, 
        isCorrect: true
      },
      { 
        text: `(${distractorCA}a + ${distractorCB}b)`, 
        isCorrect: false,
        reason: "may be the result of dividing the second and third terms of the polynomial by their greatest common factor"
      },
      { 
        text: `(${firstTermCoeff}a + ${lastTermCoeff}b)`, 
        isCorrect: false,
        reason: "may be the result of not factoring the coefficients (using squared values instead of square roots)"
      }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Build explanation with dynamic letters
    const explanation = `Choice ${correctLetter} is correct. The first and last terms of the polynomial are both squares such that $${firstTermCoeff}a^{2}=(${coefA}a)^{2}$ and $${lastTermCoeff}b^{2}=(${coefB}b)^{2}$. The second term is twice the product of the square root of the first and last terms: $${middleTermCoeff}ab=2(${coefA}a)(${coefB}b)$. Therefore, the polynomial is the square of a binomial such that $${polynomial}=(${coefA}a+${coefB}b)^{2}$, and $(${coefA}a+${coefB}b)$ is a factor.\n\nChoice ${incorrectOptions[0].letter} is incorrect and ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect and ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `Which of the following is a factor of the polynomial $${polynomial}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctFactor,
      explanation: explanation
    };
  }
};

/**
 * Question ID: b8caaf84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [p coefficient: 3, p constant: 4, v coefficient: 1, v constant: 5]
 * - Difficulty factors: [Substituting expressions, expanding products, combining like terms, distributing negatives]
 * - Distractor patterns: [A: calculation error in combining terms, C: only calculated pv without rest, D: added instead of subtracting 2p]
 * - Constraints: [Must ensure clean integer arithmetic throughout]
 * - Question type: [Substitution→Multiple Choice Text]
 * - Figure generation: [None - algebraic manipulation question]
 */

// Helper function to format quadratic expressions properly
function formatQuadratic(a: number, b: number, c: number): string {
  const aTerm = a === 1 ? "x^2" : a === -1 ? "-x^2" : `${a}x^2`;
  
  let bTerm = "";
  if (b === 1) bTerm = " + x";
  else if (b === -1) bTerm = " - x";
  else if (b > 0) bTerm = ` + ${b}x`;
  else if (b < 0) bTerm = ` - ${Math.abs(b)}x`;
  
  let cTerm = "";
  if (c > 0) cTerm = ` + ${c}`;
  else if (c < 0) cTerm = ` - ${Math.abs(c)}`;
  
  return `${aTerm}${bTerm}${cTerm}`;
}

// File: generators/equivalent-expressions/b8caaf84.ts