import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1275
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume A: 22]
 * - Difficulty factors: [Cylinder volume scaling: double radius (4× area), half height (1/2) → net 2×]
 * - Distractor patterns: [A: 11 (half), B: 22 (same), C: 44 (correct), D: 66 (3×)]
 * - Constraints: [Understanding how r² scales vs h scales]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1275 = {
  metadata: {
    id: "1275",
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
    const distractorHalf = Math.round(baseVolume / 2); // Forgot radius squared (only halves)
    const distractorSame = baseVolume; // Same volume
    const distractorTriple = baseVolume * 3; // Random multiple

    const correctText = newVolume.toString();

    // Tag each distractor with its conceptual "kind" so the explanation can
    // reference the reason that matches each distractor's identity — not its
    // arbitrary post-shuffle position.
    const optionsData = [
      { text: distractorHalf.toString(), isCorrect: false, kind: 'half' },
      { text: distractorSame.toString(), isCorrect: false, kind: 'same' },
      { text: correctText, isCorrect: true, kind: 'correct' },
      { text: distractorTriple.toString(), isCorrect: false, kind: 'triple' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const halfOption = shuffledOptions.find(o => o.kind === 'half')!;
    const sameOption = shuffledOptions.find(o => o.kind === 'same')!;
    const tripleOption = shuffledOptions.find(o => o.kind === 'triple')!;

    return {
      questionText: `The volume of right circular cylinder A is $${baseVolume}$ cubic centimeters. What is the volume, in cubic centimeters, of a right circular cylinder with twice the radius and half the height of cylinder A?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume formula is $V = \\pi r^2 h$. If radius doubles, $r^2$ becomes $(2r)^2 = 4r^2$ (4 times larger). If height halves, it becomes $\\frac{h}{2}$ (half as large). The new volume is $4 \\times \\frac{1}{2} = 2$ times the original: $2 \\times ${baseVolume} = ${newVolume}$. Choice ${halfOption.letter} is incorrect because it only halves the volume without accounting for the radius change. Choice ${sameOption.letter} is incorrect because it keeps the volume the same. Choice ${tripleOption.letter} is incorrect because it triples the volume instead of doubling.`
    };
  }
};
