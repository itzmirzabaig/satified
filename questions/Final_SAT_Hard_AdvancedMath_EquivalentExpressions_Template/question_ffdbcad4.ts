import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: ffdbcad4
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic with integer constraints]
 * - Difficulty factors: [Factoring constraints, divisibility reasoning, systematic elimination]
 * - Distractor patterns: [Assuming divisibility without checking, calculation errors]
 * - Constraints: [h, k, j are integers, so kj = -45 means k divides 45]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_ffdbcad4 = {
  metadata: {
    // id: "ffdbcad4",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate the quadratic
    const h = getRandomInt(2, 6);
    const c = -1 * getRandomElement([30, 36, 40, 42, 45, 48, 50, 54, 60]);
    
    // Find factor pairs of |c|
    const absC = Math.abs(c);
    const factors: number[] = [];
    for (let i = 1; i <= Math.sqrt(absC); i++) {
      if (absC % i === 0) {
        factors.push(i);
        if (i !== absC / i) factors.push(absC / i);
      }
    }
    
    const k = getRandomElement(factors);
    const j = c / k;
    
    // Calculate b = h*j + k
    const b = h * j + k;
    
    // STEP 2: Determine correct answer
    const correctAnswer = `$\\frac{${absC}}{k}$`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `$\\frac{b}{h}$`, isCorrect: false, reason: `this equals $\\frac{${b}}{${h}} = ${(b/h).toFixed(2)}$, which is not necessarily an integer since $k = ${k}$ is not divisible by ${h}` },
      { text: `$\\frac{b}{k}$`, isCorrect: false, reason: "this equals $\\frac{hj+k}{k} = \\frac{hj}{k} + 1$, which requires $hj$ to be divisible by $k$, not guaranteed" },
      { text: `$\\frac{${absC}}{h}$`, isCorrect: false, reason: `this equals $\\frac{${absC}}{${h}} = ${absC/h}$, which is not an integer` },
      { text: correctAnswer, isCorrect: true }
    ];
    
    // STEP 4: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Question text
    const questionText = `The expression $${h}x^{2} + ${b}x ${c}$, where $b$ is a constant, can be rewritten as $(hx + k)(x + j)$, where $h, k$, and $j$ are integer constants. Which of the following must be an integer?`;
    
    // STEP 6: Explanation
    const explanation = `Choice ${correctLetter} is correct. Expanding $(hx + k)(x + j)$:
$$hx^{2} + hjx + kx + kj = hx^{2} + (hj + k)x + kj$$

Comparing with $${h}x^{2} + ${b}x ${c}$:
- $h = ${h}$
- $kj = ${c}$ (so $k \\cdot j = ${c}$)
- $b = hj + k = ${h}(${j}) + ${k} = ${b}$

Since $k \\cdot j = ${c}$, we know $k$ is a factor of ${absC}. Therefore, $\\frac{${absC}}{k}$ must be an integer (specifically, it equals $-j$, and $j$ is an integer).

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 22fd3e1f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [cubic and quadratic polynomials]
 * - Difficulty factors: [Factoring cubic, factoring quadratic, simplifying rational expressions, domain restriction]
 * - Distractor patterns: [Canceling wrong factors, forgetting x factor, wrong remainder]
 * - Constraints: [x > 3 so we can cancel (x-3)]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */