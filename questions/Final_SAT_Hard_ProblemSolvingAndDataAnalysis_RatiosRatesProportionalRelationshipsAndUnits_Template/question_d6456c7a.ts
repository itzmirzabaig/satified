import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: d6456c7a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 11,863,808 sq yards, answer: 3.83 sq miles]
 * - Difficulty factors: [Large number division, square unit conversion]
 * - Distractor patterns: [1.96: sqrt error, 3444.39: linear conversion, 6740.8: divide by 1760 not 1760²]
 * - Constraints: [Must divide by 3,097,600 (1760²)]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_d6456c7a = {
  metadata: {
    // id: "d6456c7a",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate area in square yards (large number)
    const yardsPerMile = 1760;
    const squareYardsPerSquareMile = yardsPerMile * yardsPerMile; // 3,097,600
    
    // Generate a clean result (3.83 in original means area is about 3.83 × 3,097,600)
    const resultMiles = parseFloat((Math.random() * 3 + 2).toFixed(2)); // 2.00 to 5.00
    const areaSquareYards = Math.round(resultMiles * squareYardsPerSquareMile);
    
    // STEP 2: Calculate answer
    const answer = (areaSquareYards / squareYardsPerSquareMile).toFixed(2);
    
    // STEP 3: Distractors
    // A: Square root of correct answer
    const distractorA = Math.sqrt(resultMiles).toFixed(2);
    // C: Linear conversion (divide by 1760 instead of 1760²)
    const distractorC = (areaSquareYards / yardsPerMile).toFixed(2);
    // D: Another linear error variation
    const distractorD = (areaSquareYards / (yardsPerMile * 1.76)).toFixed(2); // Wrong factor
    
    // Ensure distractors are unique
    const distractorValues = [parseFloat(distractorA), parseFloat(distractorC), parseFloat(distractorD)];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== parseFloat(answer) && arr.indexOf(d) === i && d > 0
    );
    
    while (uniqueDistractors.length < 3) {
      const wrongResult = parseFloat(answer) + getRandomInt(1, 10) * 0.5 * (Math.random() > 0.5 ? 1 : -1);
      const newDistractor = Math.max(0.01, wrongResult);
      if (Math.abs(newDistractor - parseFloat(answer)) > 0.01 && !uniqueDistractors.includes(newDistractor)) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = answer;
    const optionsData = [
      { text: uniqueDistractors[0].toFixed(2), isCorrect: false, reason: "results from taking the square root of the correct answer" },
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[1].toFixed(2), isCorrect: false, reason: "results from dividing by the linear conversion factor instead of the squared factor" },
      { text: uniqueDistractors[2].toFixed(2), isCorrect: false, reason: "results from using an incorrect conversion factor" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Since $1 \\text{ mile} = 1,760 \\text{ yards}$, $1 \\text{ mi}^2 = 1,760^2 = 3,097,600 \\text{ yd}^2$. Converting: $\\frac{${areaSquareYards.toLocaleString()}}{3,097,600} = ${answer} \\text{ mi}^2$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A certain park has an area of $${areaSquareYards.toLocaleString()}$ square yards. What is the area, in square miles, of this park? ($1 \\text{ mile} = 1,760 \\text{ yards}$)`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};