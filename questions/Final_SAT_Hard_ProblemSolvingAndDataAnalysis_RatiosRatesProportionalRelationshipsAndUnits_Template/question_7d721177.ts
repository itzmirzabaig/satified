import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 7d721177
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 353 kg/m³, mass: 345 kg, answer: ~0.99 (decimal < 1)]
 * - Difficulty factors: [Inverse density formula, cube root calculation, working backwards]
 * - Distractor patterns: [0.98: calculation error, 1.01/1.02: overestimates]
 * - Constraints: [Mass < Density ensures volume < 1, so edge < 1]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_7d721177 = {
  metadata: {
    // id: "7d721177",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    // Density: 300-400 range (as in 353)
    const density = getRandomInt(300, 400);
    // Mass should be slightly less than density so volume < 1
    const mass = getRandomInt(Math.floor(density * 0.9), density - 1);
    
    // STEP 2: Calculate volume and edge length
    const volume = mass / density;
    const edgeLength = Math.cbrt(volume);
    const edgeRounded = Math.round(edgeLength * 100) / 100; // To nearest hundredth
    
    // STEP 3: Generate distractors
    // A: Slightly too small (0.98 when answer is 0.99)
    const distractorA = Math.max(0.01, (edgeRounded - 0.01)).toFixed(2);
    // C: Slightly too large
    const distractorC = (edgeRounded + 0.02).toFixed(2);
    // D: Even larger
    const distractorD = (edgeRounded + 0.03).toFixed(2);
    
    // Ensure distractors are unique
    const distractorValues = [parseFloat(distractorA), parseFloat(distractorC), parseFloat(distractorD)];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== edgeRounded && arr.indexOf(d) === i
    );
    
    while (uniqueDistractors.length < 3) {
      const offset = (uniqueDistractors.length + 1) * 0.01;
      const newDistractor = edgeRounded + (Math.random() > 0.5 ? offset : -offset);
      const roundedDistractor = Math.round(newDistractor * 100) / 100;
      if (roundedDistractor !== edgeRounded && !uniqueDistractors.includes(roundedDistractor) && roundedDistractor > 0) {
        uniqueDistractors.push(roundedDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = edgeRounded.toFixed(2);
    const optionsData = [
      { text: uniqueDistractors[0].toFixed(2), isCorrect: false, reason: "results from underestimating the cube root" },
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[1].toFixed(2), isCorrect: false, reason: "results from overestimating the cube root" },
      { text: uniqueDistractors[2].toFixed(2), isCorrect: false, reason: "results from significant overestimation of the cube root" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Volume = Mass/Density = ${mass}/${density} = ${volume.toFixed(6)} m³. Edge length = ∛${volume.toFixed(6)} = ${edgeRounded} m. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `The density of a certain type of wood is $${density}$ kilograms per cubic meter. A sample of this wood is in the shape of a cube and has a mass of $${mass}$ kilograms. To the nearest hundredth of a meter, what is the length of one edge of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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