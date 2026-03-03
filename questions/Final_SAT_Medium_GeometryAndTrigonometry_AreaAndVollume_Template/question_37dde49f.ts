import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 37dde49f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 473, formula with k³]
 * - Difficulty factors: [Volume formula manipulation, cube root calculation]
 * - Distractor patterns: [A: small value, B: cube root miscalc, C: close miscalc]
 * - Constraints: [Should produce clean decimal or specific value]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_37dde49f = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Choose k such that (7πk³)/48 gives a clean volume
    const k = getRandomInt(8, 12);
    const volume = Math.round((7 * Math.PI * k * k * k) / 48);
    
    // STEP 2: Calculate derived values for options
    const kCubed = k * k * k;
    
    // STEP 3: Create options with tracking (approximate values)
    const correctText = k.toFixed(2);
    
    // Distractors
    const distractorA = (k / 4).toFixed(2);
    const distractorB = (k * 0.77).toFixed(2);
    const distractorC = (k * 0.78).toFixed(2);
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: distractorC, isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Build explanation
    // FIXED: Changed \\\\ to \\ for all LaTeX commands
    const explanation = `Choice ${correctLetter} is correct. Setting the volume formula equal to ${volume}: $${volume} = \\frac{7\\pi k^3}{48}$. Solving for $k$: $k^3 = \\frac{${volume} \\times 48}{7\\pi} \\approx ${Math.round((volume * 48)/(7 * Math.PI))}$. Taking the cube root gives $k \\approx ${k}$. Choice ${incorrectOptions[0].letter} is incorrect; this value is too small. Choice ${incorrectOptions[1].letter} is incorrect; this is a miscalculation of the cube root. Choice ${incorrectOptions[2].letter} is incorrect; this is close but results from a minor calculation error.`;
    
    return {
      // FIXED: Changed \\\\ to \\ for all LaTeX commands in questionText
      questionText: `The glass pictured above can hold a maximum volume of ${volume} cubic centimeters. The volume $V$ is given by the formula $V = \\frac{7\\pi k^3}{48}$. What is the value of $k$, in centimeters?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};