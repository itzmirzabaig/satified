import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: a4c05a1b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [threshold: 55-70 degrees]
 * - Difficulty factors: [Parallel lines, same-side interior angles, inequality reasoning]
 * - Distractor patterns: [A: wrong inequality direction, C: always true but not what asked, D: impossible]
 * - Constraints: [x + y = 180, y < threshold implies x > 180 - threshold]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parallel vertical lines cut by transversal]
 */

export const generator_a4c05a1b = {
  metadata: {
    // id: "a4c05a1b",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random threshold
    const threshold = getRandomInt(55, 70);
    const complement = 180 - threshold;
    
    // STEP 2: Build Mafs code with calculated positions
    const lineX1 = -1.5;
    const lineX2 = 1.5;
    const transX1 = -4;
    const transY1 = -2;
    const transX2 = 1;
    const transY2 = 4;
    
    const mafsCode = null;

    // STEP 3: Create options
    const optionsData = [
      { text: `x < ${complement}`, isCorrect: false, reason: "reverses the inequality direction" },
      { text: `x > ${complement}`, isCorrect: true },
      { text: `x + y < 180`, isCorrect: false, reason: "is always false since x + y = 180 for parallel lines" },
      { text: `x + y > 180`, isCorrect: false, reason: "is always false since x + y = 180 for parallel lines" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the figure shown, lines $r$ and $s$ are parallel, and line $m$ intersects both lines. If $y < ${threshold}$, which of the following must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `x > ${complement}`,
      explanation: `Choice ${correctOption.letter} is correct. Angles $x$ and $y$ are same-side interior angles. Since $r \\\\parallel s$, $x + y = 180$. We are given $y < ${threshold}$. Subtracting $y$ from 180 gives $x = 180 - y$. Since $y < ${threshold}$, then $-y > -${threshold}$, so $180 - y > 180 - ${threshold}$, which simplifies to $x > ${complement}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: d3fe472f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scale factor: 2-4, side length: 10-30]
 * - Difficulty factors: [Similar triangles, scale factor application]
 * - Distractor patterns: [A: subtracted scale, B: no change (scale 1), C: added scale]
 * - Constraints: [XY = 2 * AB]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [null]
 */
