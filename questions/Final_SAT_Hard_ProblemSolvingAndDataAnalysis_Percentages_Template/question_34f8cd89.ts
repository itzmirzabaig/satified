import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 34f8cd89
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [37%, 37%, 42%]
 * - Difficulty factors: [Sequential conditional probabilities, complement calculation]
 * - Distractor patterns: [Stopping early, wrong complement, multiplying all wrong]
 * - Constraints: [Final = 0.37 * 0.37 * 0.42 = 0.057498, complement = 94.25%]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - probability/percentage problem]
 */

export const generator_34f8cd89 = {
  metadata: {
    // id: "34f8cd89",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate three percentages
    const pct1 = getRandomInt(25, 45); // First characteristic
    const pct2 = getRandomInt(25, 45); // Of first, this % has second
    const pct3 = getRandomInt(30, 50); // Of first+second, this % has third
    
    // STEP 2: Calculate intersection and complement
    const intersection = (pct1 / 100) * (pct2 / 100) * (pct3 / 100);
    const complement = Math.round((1 - intersection) * 10000) / 100;
    
    // STEP 3: Create distractors
    const justThird = Math.round((100 - pct3) * 100) / 100; // Wrong: just third complement
    const earlyStop = Math.round((1 - (pct1/100) * (pct2/100)) * 10000) / 100; // Wrong: stop at 2 levels
    const multiplyWrong = Math.round(pct1 * pct2 * pct3 / 10000) / 100; // Wrong: multiply all as %
    
    const optionsData = [
      { text: multiplyWrong.toFixed(2) + "\\%", isCorrect: false, reason: "results from incorrect multiplication" },
      { text: earlyStop.toFixed(2) + "\\%", isCorrect: false, reason: "results from stopping calculation early" },
      { text: complement.toFixed(2) + "\\%", isCorrect: true, reason: "" },
      { text: justThird.toFixed(2) + "\\%", isCorrect: false, reason: "results from only considering the last percentage" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'C';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `${pct1}% of the items in a box are green. Of those, ${pct2}% are also rectangular. Of the green rectangular items, ${pct3}% are also metal. Which of the following is closest to the percentage of the items in the box that are \\underline{not} rectangular green metal items?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: complement.toFixed(2) + "%",
      explanation: `Choice ${correctLetter} is correct. The percentage that ARE green, rectangular, and metal: ${pct1}\\% × ${pct2}\\% × ${pct3}\\% = ${pct1/100} × ${pct2/100} × ${pct3/100} ≈ ${(intersection * 100).toFixed(4)}%. Therefore, the percentage that are NOT all three: $100\\% - ${(intersection * 100).toFixed(4)}\\% ≈ ${complement.toFixed(2)}%. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 25faa756
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [60%, 45%]
 * - Difficulty factors: [Sequential percentage changes, final ratio]
 * - Distractor patterns: [Same as 67c0200a, 20845d36]
 * - Constraints: [a = 1.6b, c = 0.55a, so c = 0.88b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */