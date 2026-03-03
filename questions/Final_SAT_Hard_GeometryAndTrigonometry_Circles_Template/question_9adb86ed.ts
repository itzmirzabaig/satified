import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



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

export const generator_9adb86ed = {
  metadata: {
    // id: "9adb86ed",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate radius (single digit to match original difficulty)
    const radius = getRandomInt(5, 12);
    
    // STEP 2: Calculate two radii sum
    const twoRadii = 2 * radius;
    
    // STEP 3: Generate perimeter that gives clean answer
    // QR = Perimeter - 2*radius
    // Make QR different from radius (not equilateral) and reasonable
    const qrLength = getRandomInt(radius + 2, radius + 8); // QR > radius to avoid equilateral
    const perimeter = twoRadii + qrLength;
    
    // STEP 4: Generate distractors
    // Distractor 1: If student thought it was right triangle (radius * sqrt(2))
    const distractor1 = Math.round(radius * Math.sqrt(2) * 10) / 10;
    
    // Distractor 2: Simple error - just the radius
    const distractor2 = radius;
    
    // Distractor 3: If student added wrong (used diameter instead)
    const distractor3 = perimeter - radius; // Wrong - used one radius instead of two
    
    const correctText = qrLength.toString();
    
    const optionsData = [
      { text: distractor1.toString().replace(/\.0$/, ''), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractor2.toString(), isCorrect: false },
      { text: distractor3.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Points $Q$ and $R$ lie on a circle with center $P$. The radius of this circle is ${radius} inches. Triangle $PQR$ has a perimeter of ${perimeter} inches. What is the length, in inches, of $\\overline{QR}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Since $P$ is the center and $Q$ and $R$ are on the circle, segments $\\overline{PQ}$ and $\\overline{PR}$ are both radii of length ${radius} inches. The perimeter of triangle $PQR$ is $PQ + PR + QR = ${radius} + ${radius} + QR = ${perimeter}$. Solving for $QR$: $QR = ${perimeter} - ${twoRadii} = ${qrLength}$ inches. Choice ${incorrectOptions[0].letter} is incorrect; this would be the hypotenuse if $\\triangle PQR$ were an isosceles right triangle. Choice ${incorrectOptions[1].letter} is incorrect; this assumes the triangle is equilateral. Choice ${incorrectOptions[2].letter} is incorrect; this results from using only one radius in the perimeter calculation.`
    };
  }
};

/**
 * Question ID: c8345903
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc length: 5π (symbolic), angle: 100°]
 * - Difficulty factors: [Arc length proportion, circumference calculation]
 * - Distractor patterns: [Adding instead of ratio, wrong angle usage]
 * - Constraints: [Angle must be less than 360°]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Circle with arc, angle marker - requires Mafs]
 */