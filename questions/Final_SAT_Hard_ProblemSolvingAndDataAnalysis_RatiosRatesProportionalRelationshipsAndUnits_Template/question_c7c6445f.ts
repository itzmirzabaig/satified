import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c7c6445f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [area: 4.36 square miles, conversion: 1760 yards/mile]
 * - Difficulty factors: [Square unit conversion, large number handling]
 * - Distractor patterns: [404: random/dividing, 7674: linear conversion error, 710459: unrelated]
 * - Constraints: [Must square 1760 to get 3,097,600 conversion factor]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_c7c6445f = {
  metadata: {
    // id: "c7c6445f",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate area value (4.36 in original - single digit decimal)
    const areaSquareMiles = parseFloat((Math.random() * 5 + 2).toFixed(2)); // 2.00 to 7.00
    
    // STEP 2: Conversion
    const yardsPerMile = 1760;
    const squareYardsPerSquareMile = yardsPerMile * yardsPerMile; // 3,097,600
    const areaSquareYards = Math.round(areaSquareMiles * squareYardsPerSquareMile);
    
    // STEP 3: Distractors
    // A: Random small number or division error
    const distractorA = getRandomInt(300, 500);
    // B: Linear conversion error (multiplying by 1760 instead of 1760²)
    const distractorB = Math.round(areaSquareMiles * yardsPerMile);
    // C: Another wrong calculation (square root error)
    const distractorC = Math.round(areaSquareMiles * Math.sqrt(squareYardsPerSquareMile));
    
    // Ensure distractors are unique and different from correct answer
    const distractorValues = [distractorA, distractorB, distractorC];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== areaSquareYards && arr.indexOf(d) === i
    );
    
    while (uniqueDistractors.length < 3) {
      const newDistractor = areaSquareYards + getRandomInt(-10000, 10000);
      if (newDistractor !== areaSquareYards && !uniqueDistractors.includes(newDistractor) && newDistractor > 0) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = areaSquareYards.toLocaleString();
    const optionsData = [
      { text: uniqueDistractors[0].toString(), isCorrect: false, reason: "results from incorrect operation or calculation error" },
      { text: uniqueDistractors[1].toString(), isCorrect: false, reason: "results from using linear conversion factor instead of squared factor" },
      { text: uniqueDistractors[2].toString(), isCorrect: false, reason: "results from using square root of conversion factor" },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Since 1 mile = ${yardsPerMile} yards, 1 square mile = ${yardsPerMile}² = ${squareYardsPerSquareMile.toLocaleString()} square yards. Therefore, ${areaSquareMiles} square miles = ${areaSquareMiles} × ${squareYardsPerSquareMile.toLocaleString()} = ${correctText} square yards. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A certain town has an area of $${areaSquareMiles}$ square miles. What is the area, in $\\underline{\\text{square yards}}$, of this town? $(1 \\text{ mile} = 1,760 \\text{ yards})$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 61f61789
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge: 2.00 cm, mass: 2.56 g, density: 0.32 g/cm³]
 * - Difficulty factors: [Density formula, cube volume, decimal division]
 * - Distractor patterns: [Fill-in-the-blank - accepts 0.32 or 8/25]
 * - Constraints: [Volume = 8 cm³, mass/volume = clean decimal]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */