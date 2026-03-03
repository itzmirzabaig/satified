import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: 2afd3cec
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [20%, 360 marbles]
 * - Difficulty factors: [Reverse percentage problem, careful reading required]
 * - Distractor patterns: [20% of remaining, using 360 as total, wrong percentage]
 * - Constraints: [80% of original = 360, so original = 450, removed = 90]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_2afd3cec = {
  metadata: {
    // id: "2afd3cec",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Percentages",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate percentage removed and remaining count
    const pctRemoved = getRandomInt(15, 35); // 15-35% removed
    let remaining: number;
    let remainingPct: number;
    let original: number;
    let removed: number;
    let attempts = 0;
    const maxAttempts = 100;
    
    // Use while loop instead of recursion
    while (attempts < maxAttempts) {
      remaining = getRandomInt(200, 800);
      remainingPct = 100 - pctRemoved;
      original = Math.round((remaining / remainingPct) * 100);
      removed = original - remaining;
      
      if (Math.abs((original * remainingPct / 100) - remaining) <= 1) {
        break;
      }
      attempts++;
    }
    
    // Fallback
    if (attempts >= maxAttempts) {
      remaining = 360;
      remainingPct = 100 - pctRemoved;
      original = Math.round((remaining / remainingPct) * 100);
      removed = original - remaining;
    }
    
    // STEP 3: Create distractors
    const pctOfRemaining = Math.round(remaining * pctRemoved / 100); // Wrong: % of remaining
    const wrongTotal = remaining; // Wrong: thinks 360 is original
    const wrongCalc = Math.round(remaining / (pctRemoved / 100)); // Wrong: wrong division
    
    const optionsData = [
      { text: pctOfRemaining.toString(), isCorrect: false, reason: "incorrectly calculates percentage of remaining marbles" },
      { text: removed.toString(), isCorrect: true, reason: "" },
      { text: original.toString(), isCorrect: false, reason: "confuses remaining count with removed count" },
      { text: wrongCalc.toString(), isCorrect: false, reason: "uses incorrect percentage in division" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption?.letter || 'B';
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `After ${pctRemoved}% of the original number of marbles in a group were removed from the group, ${remaining} marbles remained in the group. How many marbles were removed from the group?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: removed.toString(),
      explanation: `Choice ${correctLetter} is correct. If ${pctRemoved}% were removed, then ${remainingPct}% remained. If $x$ is the original number: $0.${remainingPct}x = ${remaining}$, so $x = \\frac{${remaining}}{0.${remainingPct}} = ${original}$. The number removed is ${original} - ${remaining} = ${removed}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 2e92cc21
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [110%, 90%, 47]
 * - Difficulty factors: [Chained "greater than" and "less than" calculations]
 * - Distractor patterns: [Sign errors, decimal errors]
 * - Constraints: [b = 0.1 * 47, a = 2.1 * b]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None - algebraic percentage problem]
 */