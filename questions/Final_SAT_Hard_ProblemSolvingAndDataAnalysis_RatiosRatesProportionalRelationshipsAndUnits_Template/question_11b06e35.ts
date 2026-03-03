import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 11b06e35
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: 813 kg/m³, edge: 0.60 m, answer: 176 kg]
 * - Difficulty factors: [Density × cube volume, careful calculation]
 * - Distractor patterns: [176: correct, 488: density×edge, 1355: density/edge, 3764: density/volume]
 * - Constraints: [Edge < 1 ensures volume < 1, making mass < density]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_11b06e35 = {
  metadata: {
    // id: "11b06e35",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values
    const density = getRandomInt(800, 900); // 813 in original
    const edgeLength = parseFloat((Math.random() * 0.3 + 0.5).toFixed(2)); // 0.50 to 0.80
    
    // STEP 2: Calculate
    const volume = Math.pow(edgeLength, 3);
    const mass = density * volume;
    const massRounded = Math.round(mass);
    
    // STEP 3: Distractors
    // B: Density × edge (forgetting to cube)
    const distractorB = Math.round(density * edgeLength);
    // C: Density / edge (wrong operation)
    const distractorC = Math.round(density / edgeLength);
    // D: Density / volume (inverted)
    const distractorD = Math.round(density / volume);
    
    // Ensure distractors are unique
    const distractorValues = [distractorB, distractorC, distractorD];
    const uniqueDistractors = distractorValues.filter((d, i, arr) => 
      d !== massRounded && arr.indexOf(d) === i && d > 0
    );
    
    while (uniqueDistractors.length < 3) {
      const newDistractor = massRounded + getRandomInt(50, 200) * (Math.random() > 0.5 ? 1 : -1);
      if (newDistractor !== massRounded && !uniqueDistractors.includes(newDistractor) && newDistractor > 0) {
        uniqueDistractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create and shuffle options
    const correctText = massRounded.toString();
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: uniqueDistractors[0].toString(), isCorrect: false, reason: "results from multiplying density by edge length instead of volume" },
      { text: uniqueDistractors[1].toString(), isCorrect: false, reason: "results from dividing density by edge length" },
      { text: uniqueDistractors[2].toString(), isCorrect: false, reason: "results from dividing density by volume instead of multiplying" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. Volume = (${edgeLength})³ = ${volume.toFixed(6)} m³. Mass = ${density} × ${volume.toFixed(6)} = ${massRounded} kg. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `The density of a certain solid substance is $${density}$ kilograms per cubic meter. A sample of this substance is in the shape of a cube, where each edge has a length of $${edgeLength}$ meters. To the nearest whole number, what is the mass, in kilograms, of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

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