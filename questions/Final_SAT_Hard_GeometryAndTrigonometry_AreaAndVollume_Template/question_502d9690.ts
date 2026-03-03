import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 502d9690
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [areas: 648 and 72, longest side: 36]
 * - Difficulty factors: [Similar rectangles, area ratio = (linear ratio)²]
 * - Distractor patterns: [A: 4 (uses ratio directly), B: 9 (area ratio), C: 12 (correct), D: 36 (original side)]
 * - Constraints: [Area ratio must be perfect square for clean answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_502d9690 = {
  metadata: {
    // id: "502d9690",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate area ratio as perfect square
    const scaleFactor = getRandomInt(2, 5); // Linear scale
    const areaRatio = scaleFactor * scaleFactor;
    
    // STEP 2: Generate dimensions
    const smallerArea = getRandomInt(30, 100);
    const largerArea = smallerArea * areaRatio;
    const largerLongestSide = getRandomInt(20, 50);
    const smallerLongestSide = largerLongestSide / scaleFactor;
    
    // STEP 3: Create distractors
    const distractorA = largerLongestSide / areaRatio; // Using ratio directly
    const distractorB = areaRatio; // Just the ratio value
    const distractorD = largerLongestSide; // Original side
    
    const correctText = smallerLongestSide.toString();
    
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
      questionText: `Rectangle $ABCD$ is similar to rectangle $EFGH$. The area of rectangle $ABCD$ is $${largerArea}$ square inches, and the area of rectangle $EFGH$ is $${smallerArea}$ square inches. The length of the longest side of rectangle $ABCD$ is $${largerLongestSide}$ inches. What is the length, in inches, of the longest side of rectangle $EFGH$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The ratio of areas is $\\frac{${smallerArea}}{${largerArea}} = \\frac{1}{${areaRatio}}$. Since area ratio equals the square of linear ratio, the linear ratio is $\\sqrt{\\frac{1}{${areaRatio}}} = \\frac{1}{${scaleFactor}}$. Therefore, the longest side of $EFGH$ is $\\frac{${largerLongestSide}}{${scaleFactor}} = ${smallerLongestSide}$ inches. Choice ${incorrectOptions[0].letter} is incorrect because it uses the area ratio directly instead of the square root. Choice ${incorrectOptions[1].letter} is incorrect because it gives the area ratio rather than the side length. Choice ${incorrectOptions[2].letter} is incorrect because it gives the side length of the larger rectangle.`
    };
  }
};

/**
 * Question ID: b2528e6b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coordinates: (6,2), (6,10), (2,6)]
 * - Difficulty factors: [Finding circle from 3 points, circumcenter = intersection of perpendicular bisectors]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Points must form valid circle, center is equidistant from all 3]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [Circle with 3 points Mafs]
 */