import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 9d159400
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [centers vary, radius: 4, checking y-intercept tangency]
 * - Difficulty factors: [Tangency condition: distance from center to y-axis equals radius]
 * - Distractor patterns: [Wrong axis, wrong distance calculation]
 * - Constraints: [For y-axis tangency: |h| = r]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9d159400 = {
  metadata: {
    // id: "9d159400",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate radius
    const r = getRandomInt(3, 8);
    
    // STEP 2: Generate center for correct answer (tangency to y-axis)
    // Need |h| = r, so h = r or h = -r
    const h = getRandomElement([r, -r]);
    const k = getRandomInt(5, 15); // High y-coordinate
    
    // STEP 3: Generate distractor centers
    // Distractor A: |h| > r (no intersection with y-axis)
    const hA = r + getRandomInt(2, 4);
    const kA = k;
    
    // Distractor B: |h| > r (different quadrant)
    const hB = r + getRandomInt(1, 3);
    const kB = k - getRandomInt(2, 5);
    
    // Distractor D: h = 0 (center on y-axis, intersects at 2 points)
    const hD = 0;
    const kD = k;
    
    const correctText = `(x-${h})^{2}+(y-${k})^{2}=${r*r}`;
    
    const optionsData = [
      { text: `(x-${hA})^{2}+(y-${kA})^{2}=${r*r}`, isCorrect: false },
      { text: `(x-${hB})^{2}+(y-${kB})^{2}=${r*r}`, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: `x^{2}+(y-${kD})^{2}=${r*r}`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Which of the following equations represents a circle in the $xy$-plane that intersects the $y$-axis at exactly one point?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. A circle intersects the $y$-axis (where $x=0$) at exactly one point when it is tangent to the $y$-axis. This occurs when the horizontal distance from the center to the $y$-axis equals the radius: $|h| = r$. For choice ${correctLetter}, the center is $(${h}, ${k})$ and radius is $${r}$, and $|${h}| = ${r}$. Choice ${incorrectOptions[0].letter} is incorrect; $|${hA}| > ${r}$, so the circle doesn't touch the $y$-axis. Choice ${incorrectOptions[1].letter} is incorrect; $|${hB}| > ${r}$, so no intersection. Choice ${incorrectOptions[2].letter} is incorrect; the center is on the $y$-axis, so the circle intersects at two points.`
    };
  }
};

/**
 * Question ID: 981275d2
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (6, -5), point P: (10, -5), radius: 4]
 * - Difficulty factors: [Diameter endpoints, center as midpoint]
 * - Distractor patterns: [Wrong diameter, perpendicular diameter]
 * - Constraints: [Center is midpoint of diameter]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */