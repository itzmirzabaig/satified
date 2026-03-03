import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f329442c
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius A: 3n, radius B: 129n]
 * - Difficulty factors: [Circle area ratio, recognizing (129/3)² pattern]
 * - Distractor patterns: [A: 43 (linear ratio), B: 86 (2× linear), C: 129 (radius B coefficient), D: 1849 (correct)]
 * - Constraints: [Clean perfect square result]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_f329442c = {
  metadata: {
    // id: "f329442c",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate ratio components
    // Original: 3n and 129n, ratio = 43, area ratio = 43² = 1849
    const smallCoeff = getRandomInt(2, 5);
    const linearRatio = getRandomInt(20, 60); // Large ratio like 43
    const largeCoeff = smallCoeff * linearRatio;
    
    // STEP 2: Calculate area ratio
    const areaRatio = linearRatio * linearRatio;
    
    // STEP 3: Create distractors
    const distractorA = linearRatio; // Linear ratio
    const distractorB = linearRatio * 2; // 2× linear
    const distractorC = largeCoeff; // Just the large coefficient
    
    const correctText = areaRatio.toLocaleString();
    
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
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Circle $A$ has a radius of $${smallCoeff}n$ and circle $B$ has a radius of $${largeCoeff}n$, where $n$ is a positive constant. The area of circle $B$ is how many times the area of circle $A$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The ratio of radii is $\\frac{${largeCoeff}n}{${smallCoeff}n} = ${linearRatio}$. Since area is proportional to radius squared, the area ratio is $${linearRatio}^2 = ${areaRatio.toLocaleString()}$. Choice ${incorrectOptions[0].letter} is incorrect because it gives the linear ratio instead of the area ratio. Choice ${incorrectOptions[1].letter} is incorrect because it doubles the linear ratio. Choice ${incorrectOptions[2].letter} is incorrect because it gives the coefficient of the larger radius instead of the area ratio.`
    };
  }
};

/**
 * Question ID: 099526fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [points: (-6,4) to (3,10), area: 36√13]
 * - Difficulty factors: [Distance formula, right triangle area with one leg given]
 * - Distractor patterns: [A: 12, B: 24 (correct), C: 3√13, D: 18√13]
 * - Constraints: [Must work out to clean answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [Line segment Mafs]
 */