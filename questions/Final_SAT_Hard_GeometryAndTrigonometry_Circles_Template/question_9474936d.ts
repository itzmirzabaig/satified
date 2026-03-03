import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 9474936d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center coordinates: double digit (-4, 19), radius: 11]
 * - Difficulty factors: [Understanding circle bounds, inequality solving]
 * - Distractor patterns: [Using diameter instead of radius, sign errors on center]
 * - Constraints: [Point must be within circle bounds]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_9474936d = {
  metadata: {
    // id: "9474936d",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates (larger numbers for difficulty)
    const h = getRandomInt(-15, 5);
    const k = getRandomInt(10, 30); // Keep y positive and larger
    
    // STEP 2: Generate radius (not too large)
    const r = getRandomInt(8, 20);
    
    // STEP 3: Calculate bounds
    const xMin = h - r;
    const xMax = h + r;
    const yMin = k - r;
    const yMax = k + r;
    
    // STEP 4: Generate correct answer (within [xMin, xMax])
    // Pick a value clearly inside, not on boundary
    const correctA = getRandomInt(xMin + 2, xMax - 2);
    
    // STEP 5: Generate distractors
    // Distractor A: Less than xMin (outside left)
    const distractorA = xMin - getRandomInt(1, 3);
    
    // Distractor C: Greater than xMax (outside right)  
    const distractorC = xMax + getRandomInt(5, 15);
    
    // Distractor D: Much greater than xMax
    const distractorD = xMax + getRandomInt(10, 25);
    
    const correctText = correctA.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `$$(x${h >= 0 ? '-' : '+'}${Math.abs(h)})^{2}+(y-${k})^{2}=${r*r}$$\nThe graph of the given equation is a circle in the $xy$-plane. The point $(a, b)$ lies on the circle. Which of the following is a possible value for $a$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The circle has center $(${h}, ${k})$ and radius $${r}$. The x-coordinates of points on the circle satisfy $${h} - ${r} \\\\leq a \\\\leq ${h} + ${r}$, or $${xMin} \\\\leq a \\\\leq ${xMax}$. Only ${correctA} falls within this interval. Choice ${incorrectOptions[0].letter} is incorrect; ${distractorA} < ${xMin}$. Choice ${incorrectOptions[1].letter} is incorrect; ${distractorC} > ${xMax}$. Choice ${incorrectOptions[2].letter} is incorrect; ${distractorD} > ${xMax}$.`
    };
  }
};

/**
 * Question ID: 2266984b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: double digit (20, 16), constant: -20]
 * - Difficulty factors: [Completing the square with larger numbers]
 * - Distractor patterns: [Sign errors on center, using raw coefficients]
 * - Constraints: [Must complete square correctly]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */