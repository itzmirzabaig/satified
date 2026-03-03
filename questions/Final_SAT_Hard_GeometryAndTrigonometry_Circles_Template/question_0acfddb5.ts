import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 0acfddb5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 168, perimeter: 3856, large numbers]
 * - Difficulty factors: [Tangent properties, Pythagorean theorem, large number arithmetic]
 * - Distractor patterns: [Tangent length instead of hypotenuse, calculation errors]
 * - Constraints: [Two tangent segments from external point are equal]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_0acfddb5 = {
  metadata: {
    // id: "0acfddb5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate radius (large number)
    const r = getRandomInt(100, 200);
    
    // STEP 2: Generate tangent length (also large)
    // Ensure we get nice Pythagorean triple or close
    const t = getRandomInt(1500, 2000);
    
    // STEP 3: Calculate hypotenuse using Pythagorean theorem
    // GH = √(r² + t²)
    // We want this to be nice, so let's construct a Pythagorean triple
    
    // Use multiple of 3-4-5 or 5-12-13 or 7-24-25, etc.
    const triples = [[3, 4, 5], [5, 12, 13], [7, 24, 25], [8, 15, 17], [20, 21, 29]];
    const [a, b, c] = getRandomElement(triples);
    const scale = getRandomInt(20, 50);
    
    const radius = a * scale;
    const tangent = b * scale;
    const hypotenuse = c * scale;
    
    // STEP 4: Calculate perimeter
    // Perimeter = 2*r + 2*tangent = 2(r + tangent)
    const perimeter = 2 * (radius + tangent);
    
    // STEP 5: Generate distractors
    const distractorA = radius; // Just the radius
    const distractorB = tangent - radius; // Wrong calculation
    const distractorC = tangent; // Tangent length (trap!)
    
    const correctText = hypotenuse.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A circle has center $G$, and points $M$ and $N$ lie on the circle. Line segments $MH$ and $NH$ are tangent to the circle at points $M$ and $N$, respectively. If the radius of the circle is ${radius} millimeters and the perimeter of quadrilateral $GMHN$ is ${perimeter} millimeters, what is the distance, in millimeters, between points $G$ and $H$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Tangents from an external point are equal, so $MH = NH$. The perimeter is $GM + MH + HN + NG = ${radius} + MH + MH + ${radius} = ${perimeter}$. Solving: $2MH = ${perimeter} - ${2 * radius} = ${2 * tangent}$, so $MH = ${tangent}$. Triangle $GMH$ is right-angled at $M$, so by the Pythagorean theorem: $GH = \\\\sqrt{${radius}^{2} + ${tangent}^{2}} = \\\\sqrt{${radius * radius} + ${tangent * tangent}} = \\\\sqrt{${radius * radius + tangent * tangent}} = ${hypotenuse}$. Choice ${incorrectOptions[0].letter} is incorrect; this is just the radius. Choice ${incorrectOptions[1].letter} is incorrect; this results from arithmetic errors. Choice ${incorrectOptions[2].letter} is incorrect; this is the tangent length, not the hypotenuse.`
    };
  }
};

/**
 * Question ID: ca2235f6
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc: 45°, arc length: 3, circumference: 24]
 * - Difficulty factors: [Arc length proportion, solving for circumference]
 * - Distractor patterns: [Using arc length as circumference, wrong ratio]
 * - Constraints: [Proportion: arc/circumference = angle/360]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */