import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



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

export const generator_981275d2 = {
  metadata: {
    // id: "981275d2",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = getRandomInt(3, 10);
    const k = -getRandomInt(3, 8);
    const r = getRandomInt(3, 7);
    
    // STEP 2: Generate point P (on circle, horizontal from center for simplicity)
    const px = h + r;
    const py = k;
    
    // STEP 3: Calculate Q (diametrically opposite)
    // Center is midpoint: h = (px + qx)/2, k = (py + qy)/2
    const qx = 2 * h - px;
    const qy = 2 * k - py;
    
    // STEP 4: Generate distractors
    // Distractor B: Perpendicular diameter endpoint
    const distractorBx = h;
    const distractorBy = k + r;
    
    // Distractor C: Center itself
    const distractorCx = h;
    const distractorCy = k;
    
    // Distractor D: Other perpendicular
    const distractorDx = h;
    const distractorDy = k - r;
    
    const correctText = `(${qx}, ${qy})`;
    
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: `(${distractorBx}, ${distractorBy})`, isCorrect: false },
      { text: `(${distractorCx}, ${distractorCy})`, isCorrect: false },
      { text: `(${distractorDx}, ${distractorDy})`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `In the $xy$-plane, the graph of the equation $(x-${h})^{2}+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^{2}=${r*r}$ is a circle. Point $P$ is on the circle and has coordinates $(${px}, ${py})$. If $\\\\overline{PQ}$ is a diameter of the circle, what are the coordinates of point $Q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The center $(${h}, ${k})$ is the midpoint of diameter $\\\\overline{PQ}$. Using the midpoint formula: $\\\\frac{${px} + x_Q}{2} = ${h}$ and $\\\\frac{${py} + y_Q}{2} = ${k}$. Solving: $x_Q = 2(${h}) - ${px} = ${qx}$ and $y_Q = 2(${k}) - ${py} = ${qy}$. Thus $Q = (${qx}, ${qy})$. Choice ${incorrectOptions[0].letter} is incorrect; this would be on a perpendicular diameter. Choice ${incorrectOptions[1].letter} is incorrect; this is the center, not on the circle. Choice ${incorrectOptions[2].letter} is incorrect; this is also on a perpendicular diameter.`
    };
  }
};

/**
 * Question ID: 89661424
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-5, 2), radius: 9]
 * - Difficulty factors: [Converting general form to standard form]
 * - Distractor patterns: [Sign errors on linear terms, wrong constant]
 * - Constraints: [Expansion must match]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */