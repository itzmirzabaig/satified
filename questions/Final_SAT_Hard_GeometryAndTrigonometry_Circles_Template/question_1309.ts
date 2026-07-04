import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1309
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [centers vary, radius: 4, checking y-intercept tangency]
 * - Difficulty factors: [Tangency condition: distance from center to y-axis equals radius]
 * - Distractor patterns: [Wrong axis, wrong distance calculation]
 * - Constraints: [For y-axis tangency: |h| = r]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1309 = {
  metadata: {
    id: "1309",
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
    
    // Render helper: format (x - h) with correct sign so h<0 shows (x + |h|),
    // h=0 shows x, avoiding double-sign artifacts like (x--6).
    const xTerm = (hh: number): string =>
      hh === 0 ? 'x' : hh > 0 ? `(x-${hh})` : `(x+${Math.abs(hh)})`;

    const correctText = `${xTerm(h)}^{2}+(y-${k})^{2}=${r*r}`;

    // Attach each distractor's explanation reason (with its own |h| baked in)
    // to the option BEFORE shuffling, so the reason travels with its option.
    const optionsData = [
      { text: `${xTerm(hA)}^{2}+(y-${kA})^{2}=${r*r}`, isCorrect: false, reason: `$|${hA}| > ${r}$, so the circle does not reach the $y$-axis` },
      { text: `${xTerm(hB)}^{2}+(y-${kB})^{2}=${r*r}`, isCorrect: false, reason: `$|${hB}| > ${r}$, so the circle does not intersect the $y$-axis` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: `${xTerm(hD)}^{2}+(y-${kD})^{2}=${r*r}`, isCorrect: false, reason: `the center is on the $y$-axis $(|${hD}| < ${r})$, so the circle crosses it at two points` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const distractorExplanations = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');

    return {
      questionText: `Which of the following equations represents a circle in the $xy$-plane that intersects the $y$-axis at exactly one point?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. A circle intersects the $y$-axis (where $x=0$) at exactly one point when it is tangent to the $y$-axis. This occurs when the horizontal distance from the center to the $y$-axis equals the radius: $|h| = r$. For choice ${correctLetter}, the center is $(${h}, ${k})$ and the radius is $r = ${r}$, and $|${h}| = ${r}$. ${distractorExplanations}`
    };
  }
};
