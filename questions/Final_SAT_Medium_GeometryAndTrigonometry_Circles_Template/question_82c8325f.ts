import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 82c8325f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (-4, 5), point: (-8, 8), radius²: 25 (perfect square)]
 * - Difficulty factors: [Calculating radius from center and point, distance formula]
 * - Distractor patterns: [A=wrong signs and wrong radius, B=correct signs but radius not squared, C=wrong signs but correct radius squared, D=correct]
 * - Constraints: [Must calculate distance properly, radius² must be perfect square for clean answer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_82c8325f = {
  metadata: {
    // id: "82c8325f",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center coordinates (similar range: -10 to 10)
    const h = getRandomInt(-8, -2); // Negative x-center (like -4)
    const k = getRandomInt(2, 8);   // Positive y-center (like 5)
    
    // STEP 2: Generate a point on the circle such that radius² is a perfect square
    // Use Pythagorean triples or easy combinations: 3-4-5, 5-12-13, 6-8-10, etc.
    const triples = [
      { a: 3, b: 4, c: 25 },   // 3² + 4² = 25
      { a: 6, b: 8, c: 100 },  // 6² + 8² = 100
      { a: 5, b: 12, c: 169 }, // 5² + 12² = 169
      { a: 8, b: 15, c: 289 }, // 8² + 15² = 289
      { a: 4, b: 3, c: 25 }    // 4² + 3² = 25
    ];
    
    const triple = getRandomElement(triples);
    const dx = triple.a * (Math.random() > 0.5 ? 1 : -1); // Random direction
    const dy = triple.b * (Math.random() > 0.5 ? 1 : -1); // Random direction
    
    const pointX = h + dx;
    const pointY = k + dy;
    const rSquared = triple.c;
    const r = Math.sqrt(rSquared);
    
    // STEP 3: Create equation strings with proper sign handling
    const formatCenter = (val: number): string => {
      if (val >= 0) return `-${val}`;
      return `+${Math.abs(val)}`;
    };
    
    const formatCenterWrong = (val: number): string => {
      if (val >= 0) return `+${val}`;
      return `-${Math.abs(val)}`;
    };
    
    // Correct: (x - h)² + (y - k)² = r²
    const correctEquation = `$(x ${formatCenter(h)})^2 + (y ${formatCenter(k)})^2 = ${rSquared}$`;
    
    // Distractor A: Wrong signs for center, wrong radius (not squared)
    const optionA = `$(x ${formatCenterWrong(h)})^2 + (y ${formatCenterWrong(k)})^2 = ${r}$`;
    
    // Distractor B: Correct signs, but radius not squared
    const optionB = `$(x ${formatCenter(h)})^2 + (y ${formatCenter(k)})^2 = ${r}$`;
    
    // Distractor C: Wrong signs for center, but correct radius squared
    const optionC = `$(x ${formatCenterWrong(h)})^2 + (y ${formatCenterWrong(k)})^2 = ${rSquared}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: false, reason: "This has the wrong center signs and uses radius instead of radius squared" },
      { text: optionB, isCorrect: false, reason: "This uses the radius instead of radius squared" },
      { text: optionC, isCorrect: false, reason: "This has the wrong center signs" },
      { text: correctEquation, isCorrect: true }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `A circle in the $xy$-plane has its center at $(${h}, ${k})$ and the point $(${pointX}, ${pointY})$ lies on the circle. Which equation represents this circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The standard equation is $(x - h)^2 + (y - k)^2 = r^2$. The center is $(${h}, ${k})$, so $h = ${h}$ and $k = ${k}$. To find $r^2$, calculate the distance from the center to the point $(${pointX}, ${pointY})$: $(${pointX} - (${h}))^2 + (${pointY} - ${k})^2 = (${dx})^2 + (${dy})^2 = ${dx * dx} + ${dy * dy} = ${rSquared}$. Therefore, the equation is $(x ${formatCenter(h)})^2 + (y ${formatCenter(k)})^2 = ${rSquared}$. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: b96ff36e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (3, 5), radius²: 9, point: (6, c) where c=5]
 * - Difficulty factors: [Substituting point into circle equation, solving for y-coordinate]
 * - Distractor patterns: [None - fill in the blank, single correct answer]
 * - Constraints: [Point (6, c) is horizontally aligned with center y-coordinate]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

// File: generators/Circles/b96ff36e.ts