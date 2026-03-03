import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 4661e2a9
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [simple linear and quadratic system, intersection points]
 * - Difficulty factors: [System with parabola and line, solving by substitution, involves radicals]
 * - Distractor patterns: [Other radical combinations, sign errors]
 * - Constraints: [Must generate valid Mafs figure showing intersection]
 * - Question type: [Multiple choice text with figure]
 * - Figure generation: [Mafs graph showing line and parabola intersections]
 */

export const generator_4661e2a9 = {
  metadata: {
    // id: "4661e2a9",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Original: y = x - 1 and y = x² - x - 3
    // Let's create: y = x + c1 and y = x² + c2*x + c3
    
    // For intersection: x + c1 = x² + c2*x + c3
    // x² + (c2-1)x + (c3-c1) = 0
    
    // We want solutions involving radicals, so discriminant should be positive but not perfect square
    // Actually original had nice form: (1+√3, √3) etc.
    
    // Let's create system where substitution gives y² = k or similar nice form
    
    // Pattern: x - y = 1 → x = y + 1
    // x + y = x² - 3 → (y+1) + y = (y+1)² - 3
    
    const offset = getRandomInt(1, 4);
    const constant = getRandomInt(2, 6);
    
    // System:
    // x - y = offset  → x = y + offset
    // x + y = x² - constant
    
    // Substituting: (y + offset) + y = (y + offset)² - constant
    // 2y + offset = y² + 2*offset*y + offset² - constant
    // y² + (2*offset - 2)y + (offset² - constant - offset) = 0
    
    // For nice solutions, let's set up so y² = some value
    // Actually let's use the pattern from original more directly
    
    // Original after sub: 2y + 1 = y² + 2y + 1 - 3 → y² = 3
    // So: 2y + offset = y² + 2*offset*y + offset² - constant
    // We want: y² = something nice
    
    // Let's try: offset = 1, then 2y + 1 = y² + 2y + 1 - constant → y² = constant
    // So if constant = 3, y = ±√3, and x = 1 ± √3, giving (1+√3, √3) and (1-√3, -√3)
    
    const k = getRandomInt(2, 8); // The value under radical (should not be perfect square)
    // Check k is not perfect square
    const isPerfectSquare = (n: number) => Math.sqrt(n) % 1 === 0;
    
    let finalK = k;
    while (isPerfectSquare(finalK)) {
      finalK++;
    }
    
    // System: x - y = 1, x + y = x² - finalK
    // Solutions: (1+√finalK, √finalK) and (1-√finalK, -√finalK)
    
    // STEP 2: Build Mafs code
    const viewBoxX = [-3, 5];
    const viewBoxY = [-5, 5];
    
    const mafsCode = `<Mafs pan={true} zoom={true} viewBox={{ x: [${viewBoxX[0]}, ${viewBoxX[1]}], y: [${viewBoxY[0]}, ${viewBoxY[1]}] }}>
  <Coordinates.Cartesian subdivisions={false} />
  <Plot.OfX y={(x) => x - 1} color="var(--mafs-blue)" weight={2} />
  <Plot.OfX y={(x) => x**2 - x - ${finalK}} color="var(--mafs-red)" weight={2} />
  <LaTeX at={[4, 3.5]} tex="y = x - 1" />
  <LaTeX at={[3.5, 4.5]} tex="y = x^2 - x - ${finalK}" />
</Mafs>`;

    // STEP 3: Create options based on correct solution
    // Correct: (1+√finalK, √finalK)
    const correctX = `1+\\sqrt{${finalK}}`;
    const correctY = `\\sqrt{${finalK}}`;
    
    // Distractor B: (√finalK, -√finalK) - swapped and wrong sign pattern
    const distractorB = `$(\\sqrt{${finalK}},-\\sqrt{${finalK}})$`;
    // Distractor C: (1+√(2*finalK), √(2*finalK)) - wrong radical
    const distractorC = `$(1+\\sqrt{${2*finalK}}, \\sqrt{${2*finalK}})$`;
    // Distractor D: (√finalK, -1+√finalK) - mixed up
    const distractorD = `$(\\sqrt{${finalK}},-1+\\sqrt{${finalK}})$`;
    
    const optionsData = [
      { text: `$(1+\\sqrt{${finalK}}, \\sqrt{${finalK}})$`, isCorrect: true },
      { text: distractorB, isCorrect: false, reason: "incorrectly assigns the x-coordinate as the y-value and uses the negative y-value" },
      { text: distractorC, isCorrect: false, reason: `uses $\\sqrt{${2*finalK}}$ instead of $\\sqrt{${finalK}}$` },
      { text: distractorD, isCorrect: false, reason: "incorrectly mixes up the coordinates and pattern" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. From $x - y = 1$, we get $x = y + 1$. Substituting into $x + y = x^2 - ${finalK}$: $(y+1) + y = (y+1)^2 - ${finalK}$. This simplifies to $2y + 1 = y^2 + 2y + 1 - ${finalK}$, so $y^2 = ${finalK}$. Thus $y = \\pm\\sqrt{${finalK}}$. When $y = \\sqrt{${finalK}}$, $x = 1 + \\sqrt{${finalK}}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `$x - y = 1$\n$x + y = x^2 - ${finalK}$\n\nWhich ordered pair is a solution to the system of equations above?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: explanation
    };
  }
};

/**
 * Question ID: f65288e8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [denominator is perfect square trinomial, equals 4]
 * - Difficulty factors: [Rational equation, perfect square recognition, reciprocal, extraneous solution check]
 * - Distractor patterns: [N/A - fill in blank with multiple accepted answers]
 * - Constraints: [Denominator factors as (x+p)², solutions must not make denominator zero]
 * - Question type: [Fill-in-the-blank with multiple accepted answers]
 * - Figure generation: [None]
 */

// File: generators/hard/advanced_math/f65288e8.ts