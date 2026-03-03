import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 90287515
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [density: ~800 kg/m³ (triple-digit), edge length: 0.90 (decimal < 1)]
 * - Difficulty factors: [Unit conversion, cube volume calculation, density formula manipulation]
 * - Distractor patterns: [Multiplying by edge instead of edge³, dividing instead of multiplying, wrong operation order]
 * - Constraints: [Edge length must be < 1 to make volume smaller than edge, density × volume should give reasonable mass]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_90287515 = {
  metadata: {
    // id: "90287515",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate values matching original ranges
    // Density: 800-900 range (triple-digit)
    const density = getRandomInt(800, 900);
    // Edge length: 0.50-0.99 (decimal < 1, as in original 0.90)
    const edgeLength = parseFloat((Math.random() * 0.49 + 0.5).toFixed(2)); // 0.50 to 0.99
    
    // STEP 2: Calculate derived values
    const volume = Math.pow(edgeLength, 3);
    const mass = density * volume;
    const massRounded = Math.round(mass);
    
    // STEP 3: Generate distractors based on SAT error patterns
    // B: Density × edge (forgetting to cube)
    const distractorB = Math.round(density * edgeLength);
    // C: Density / edge (wrong operation)
    const distractorC = Math.round(density / edgeLength);
    // D: Density / volume (inverted formula)
    const distractorD = Math.round(density / volume);
    
    // Ensure all distractors are unique and different from correct answer
    const distractors = [distractorB, distractorC, distractorD].filter((d, i, arr) => 
      d !== massRounded && arr.indexOf(d) === i
    );
    
    // If we don't have enough unique distractors, generate more
    while (distractors.length < 3) {
      const newDistractor = massRounded + getRandomInt(-50, 50);
      if (newDistractor !== massRounded && !distractors.includes(newDistractor)) {
        distractors.push(newDistractor);
      }
    }
    
    // STEP 4: Create options with tracking
    const correctText = massRounded.toString();
    const optionsData = [
      { text: correctText, isCorrect: true },
      { text: distractors[0].toString(), isCorrect: false, reason: "results from multiplying density by edge length instead of edge length cubed" },
      { text: distractors[1].toString(), isCorrect: false, reason: "results from dividing density by edge length" },
      { text: distractors[2].toString(), isCorrect: false, reason: "results from dividing density by volume instead of multiplying" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. The volume of a cube with edge length ${edgeLength} meters is (${edgeLength})³ = ${volume.toFixed(6)} cubic meters. Using the formula Mass = Density × Volume, the mass is ${density} × ${volume.toFixed(6)} = ${mass.toFixed(3)} kg, which rounds to ${massRounded} kg. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: `A sample of oak has a density of $${density}$ kilograms per cubic meter. The sample is in the shape of a cube, where each edge has a length of $${edgeLength}$ meters. To the nearest whole number, what is the mass, in kilograms, of this sample?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};

/**
 * Question ID: e7133228
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [acceleration: 7.3 (single decimal), conversion: 1 mile = 1609m]
 * - Difficulty factors: [Complex unit conversion with squared time units, dimensional analysis]
 * - Distractor patterns: [0.3: dividing by 60 instead of 60², 195.8/220.4: calculation errors]
 * - Constraints: [Must convert m/s² to mi/min² using squared conversion factor]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */