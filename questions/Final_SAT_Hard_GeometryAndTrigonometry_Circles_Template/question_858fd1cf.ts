import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 858fd1cf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: single/double digit, slopes: simple fractions like 6/5]
 * - Difficulty factors: [Tangent line geometry, perpendicular slopes, point-slope form]
 * - Distractor patterns: [Calculation errors in slope, sign errors, wrong point substitution]
 * - Constraints: [Tangent line must be perpendicular to radius]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - conceptual geometry problem]
 */

export const generator_858fd1cf = {
  metadata: {
    // id: "858fd1cf",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center and point of tangency
    // Use simple integers for clean arithmetic
    const h = getRandomNonZeroInt(-5, 5);
    const k = getRandomNonZeroInt(-5, 5);
    
    // Point of tangency should create nice slope values
    // We'll ensure the slope of radius is a simple fraction
    const dx = getRandomElement([3, 4, 5, 6]); // Change in x
    const dy = getRandomElement([2, 3, 4, 5]); // Change in y
    
    const x1 = h + dx;
    const y1 = k + dy;
    
    // STEP 2: Calculate slope of radius
    const mRadiusNum = y1 - k; // dy
    const mRadiusDen = x1 - h; // dx
    const mRadius = mRadiusNum / mRadiusDen;
    
    // STEP 3: Calculate slope of tangent (negative reciprocal)
    // m_tangent = -1/m_radius = -dx/dy
    const mTangentNum = -mRadiusDen;
    const mTangentDen = mRadiusNum;
    
    // Simplify the fraction if possible (for clean answer choices)
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const common = gcd(Math.abs(mTangentNum), Math.abs(mTangentDen));
    const simplifiedNum = mTangentNum / common;
    const simplifiedDen = mTangentDen / common;
    
    // STEP 4: Find equation of tangent line: y - y1 = m(x - x1)
    // y = m(x - x1) + y1 = mx - m*x1 + y1
    // y-intercept = y1 - m*x1
    
    // Convert to standard form for easier checking: ax + by = c
    // Using point-slope: (y - y1) = (mTangentNum/mTangentDen)(x - x1)
    // mTangentDen(y - y1) = mTangentNum(x - x1)
    // mTangentDen*y - mTangentDen*y1 = mTangentNum*x - mTangentNum*x1
    // mTangentNum*x - mTangentDen*y = mTangentNum*x1 - mTangentDen*y1
    
    const A = simplifiedNum;
    const B = -simplifiedDen;
    const C = A * x1 + B * y1; // Ax + By = C form
    
    // STEP 5: Generate correct answer point (on the line)
    // Pick x, solve for y: y = (C - A*x) / B
    let finalCorrectX = getRandomInt(-10, 10, [x1]); // Not the point of tangency
    let finalCorrectY = (C - A * finalCorrectX) / B;
    
    // Ensure we get integer coordinates for the answer
    // Adjust if needed by picking different x
    if (!Number.isInteger(finalCorrectY)) {
      // Find x that gives integer y: C - A*x ≡ 0 (mod B)
      // Try a few values
      let found = false;
      for (let testX = -15; testX <= 15 && !found; testX++) {
        const testY = (C - A * testX) / B;
        if (Number.isInteger(testY) && testX !== x1) {
          finalCorrectX = testX;
          finalCorrectY = testY;
          found = true;
        }
      }
      // If still not found, use a simple approach
      if (!found) {
        finalCorrectX = x1 + simplifiedDen;
        finalCorrectY = y1 + simplifiedNum;
      }
    }
    
    // STEP 6: Generate distractor points (NOT on the line)
    // Distractor 1: Point with same x as correct answer but wrong y (calculation error)
    const distractor1Y = finalCorrectY + getRandomNonZeroInt(1, 3);
    
    // Distractor 2: Point using wrong slope (radius slope instead of tangent)
    // Point on radius line extended
    const t = getRandomInt(2, 4);
    const distractor2X = h + t * dx;
    const distractor2Y = k + t * dy;
    
    // Distractor 3: Point with sign error in slope
    // Using positive reciprocal instead of negative
    const wrongSlopeNum = mRadiusDen;
    const wrongSlopeDen = mRadiusNum;
    const wrongX = finalCorrectX + getRandomNonZeroInt(1, 3);
    const wrongY = y1 + (wrongSlopeNum / wrongSlopeDen) * (wrongX - x1);
    // Round to reasonable number
    
    const distractor3X = wrongX;
    const distractor3Y = Math.round(wrongY);
    
    // STEP 7: Format options
    const correctText = `(${finalCorrectX}, ${finalCorrectY})`;
    const optionsData = [
      { 
        text: `(${(finalCorrectX + getRandomNonZeroInt(1, 2))}, ${(finalCorrectY + getRandomNonZeroInt(1, 2))})`, 
        isCorrect: false 
      },
      { 
        text: `(${distractor2X}, ${distractor2Y})`, 
        isCorrect: false 
      },
      { 
        text: correctText, 
        isCorrect: true 
      },
      { 
        text: `(${distractor3X}, ${distractor3Y})`, 
        isCorrect: false 
      }
    ];
    
    // STEP 8: Shuffle options
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 9: Format slope for display
    const formatSlope = (num: number, den: number): string => {
      if (den === 1) return num.toString();
      if (num < 0) return `-${Math.abs(num)}/${den}`;
      return `${num}/${den}`;
    };
    
    const slopeDisplay = formatSlope(simplifiedNum, simplifiedDen);
    
    // STEP 10: Build explanation
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$. Line $t$ is tangent to this circle at the point $(${x1}, ${y1})$. Which of the following points also lies on line $t$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The slope of the radius from the center to the point of tangency is $\\frac{${mRadiusNum}}{${mRadiusDen}}$. Since the tangent line is perpendicular to the radius, its slope is the negative reciprocal: $${slopeDisplay}$. Using point-slope form with point $(${x1}, ${y1})$, the equation of line $t$ is $y - ${y1} = ${slopeDisplay}(x - ${x1})$. Substituting the coordinates from choice ${correctLetter} satisfies this equation. Choice ${incorrectOptions[0].letter} is incorrect; it results from calculation errors. Choice ${incorrectOptions[1].letter} is incorrect; this point lies on the radius, not the tangent line. Choice ${incorrectOptions[2].letter} is incorrect; it results from using the wrong slope.`
    };
  }
};

/**
 * Question ID: 9adb86ed
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: single digit (9), perimeter: double digit (31)]
 * - Difficulty factors: [Isosceles triangle properties, basic algebra]
 * - Distractor patterns: [Confusing with right triangle, using wrong formula]
 * - Constraints: [Triangle inequality satisfied automatically with radii]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */