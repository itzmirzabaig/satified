import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 93de3f84
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume A: 22]
 * - Difficulty factors: [Cylinder volume scaling: double radius (4× area), half height (1/2) → net 2×]
 * - Distractor patterns: [A: 11 (half), B: 22 (same), C: 44 (correct), D: 66 (3×)]
 * - Constraints: [Understanding how r² scales vs h scales]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_93de3f84 = {
  metadata: {
    // id: "93de3f84",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate base volume
    const baseVolume = getRandomInt(15, 50);
    
    // STEP 2: Calculate new volume
    // New radius = 2r, so r² becomes 4r² (4× volume)
    // New height = h/2 (1/2 volume)
    // Net: 4 × 1/2 = 2× original volume
    const newVolume = baseVolume * 2;
    
    // STEP 3: Create distractors
    const distractorA = Math.round(baseVolume / 2); // Forgot radius squared
    const distractorB = baseVolume; // Same volume
    const distractorD = baseVolume * 3; // Random multiple
    
    const correctText = newVolume.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The volume of right circular cylinder A is $${baseVolume}$ cubic centimeters. What is the volume, in cubic centimeters, of a right circular cylinder with twice the radius and half the height of cylinder A?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume formula is $V = \\pi r^2 h$. If radius doubles, $r^2$ becomes $(2r)^2 = 4r^2$ (4 times larger). If height halves, it becomes $\\frac{h}{2}$ (half as large). The new volume is $4 \\times \\frac{1}{2} = 2$ times the original: $2 \\times ${baseVolume} = ${newVolume}$. Choice ${incorrectOptions[0].letter} is incorrect because it only halves the volume without accounting for the radius change. Choice ${incorrectOptions[1].letter} is incorrect because it keeps the volume the same. Choice ${incorrectOptions[2].letter} is incorrect because it triples the volume instead of doubling.`
    };
  }
};

/**
 * Question ID: eb70d2d0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-3,4), (5,3), (4,-3)]
 * - Difficulty factors: [Triangle area from coordinates using shoelace or box method]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Points must form valid triangle with clean area]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Triangle with coordinates Mafs]
 */