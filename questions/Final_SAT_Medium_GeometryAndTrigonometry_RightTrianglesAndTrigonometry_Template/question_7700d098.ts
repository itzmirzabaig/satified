import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7700d098
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Leg1=43.2, Hypotenuse=196.8, Leg2=192 (decimal values, clean result)]
 * - Difficulty factors: [Pythagorean theorem with decimals, multi-step calculation]
 * - Distractor patterns: [Given leg, intermediate calculation, sum of squares instead of difference]
 * - Constraints: [Must result in clean integer or simple radical, hypotenuse > both legs]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_7700d098 = {
  metadata: {
    // id: "7700d098",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Right Triangles And Trigonometry",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple with decimal scaling
    // Original: 43.2-192-196.8 (scaled 9-40-41 triple)
    // Generate 9-40-41 triple scaled by random factor
    const baseA = 9;
    const baseB = 40;
    const baseC = 41;
    const scale = getRandomInt(2, 15); // Scale to get varied sizes
    
    const a = baseA * scale; 
    const b = baseB * scale;
    const c = baseC * scale;
    
    // Convert to decimal by dividing by a factor that makes one value have 1 decimal place
    const decimalFactor = 2; // Make values have 1 decimal place
    const leg1 = a / decimalFactor; 
    const leg2 = b / decimalFactor;
    const hypotenuse = c / decimalFactor;
    
    // Format to one decimal place
    const leg1Str = leg1.toFixed(1);
    const leg2Str = leg2.toFixed(1);
    const hypotenuseStr = hypotenuse.toFixed(1);
    
    // Given values
    const givenLeg = leg1Str;
    const givenHypotenuse = hypotenuseStr;
    const answer = leg2;
    
    // STEP 2: Create distractors
    const distractorA = leg1; // The given leg
    const distractorB = Math.round((leg1 + leg2) / 2); // Random intermediate
    const distractorD = Math.round(Math.sqrt(c * c + a * a)); // Wrong formula (sum)
    
    // STEP 3: Create options with tracking
    const correctText = leg2.toString();
    const optionsData = [
      { text: givenLeg, isCorrect: false, reason: "is the length of the given leg, not the missing one" },
      { text: distractorB.toString(), isCorrect: false, reason: "is an intermediate or calculated value that does not satisfy the Pythagorean theorem" },
      { text: correctText, isCorrect: true, reason: "" },
      { text: distractorD.toString(), isCorrect: false, reason: "incorrectly adds the squares instead of subtracting" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. Using the Pythagorean theorem $a^2 + b^2 = c^2$ with given leg ${givenLeg} and hypotenuse ${givenHypotenuse}: the missing leg is $\\sqrt{${givenHypotenuse}^2 - ${givenLeg}^2} = \\sqrt{${(hypotenuse * hypotenuse).toFixed(2)} - ${(leg1 * leg1).toFixed(2)}} = \\sqrt{${(hypotenuse * hypotenuse - leg1 * leg1).toFixed(2)}} = ${answer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 6: Return question data
    return {
      questionText: `One leg of a right triangle has a length of ${givenLeg} millimeters. The hypotenuse of the triangle has a length of ${givenHypotenuse} millimeters. What is the length of the other leg of the triangle, in millimeters?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 9ec76b54
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Legs: 28 and 20 (double-digit), Hypotenuse: 4√74 (simplified radical)]
 * - Difficulty factors: [Pythagorean theorem, simplifying radicals, recognizing non-perfect squares]
 * - Distractor patterns: [Unsimplified radical, integer approximation, squared value]
 * - Constraints: [Sum of squares must not be perfect square, result must simplify]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

// File: generators/RightTrianglesAndTrigonometry/9ec76b54.ts