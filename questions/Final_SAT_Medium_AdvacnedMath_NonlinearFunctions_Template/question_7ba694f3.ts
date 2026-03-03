import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 7ba694f3
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [bacteria doubles every day, initial: 44000, y = 44000(2)^t]
 * - Difficulty factors: [Exponential growth with doubling time, base recognition]
 * - Distractor patterns: [A/B: wrong structure, C: decay instead of growth]
 * - Constraints: [Doubling means base = 2]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - word problem]
 */

export const generator_7ba694f3 = {
  metadata: {
    // id: "7ba694f3",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 44000 bacteria, doubles every day
    // Randomize: initial (20000-80000), could vary doubling or tripling
    const initial = getRandomInt(20, 80) * 1000; // 20000 to 80000
    const base = 2; // doubles
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    const questionText = `The number of bacteria in a liquid medium doubles every day. There were $${initial.toLocaleString()}$ bacteria in the liquid medium at the start of an observation. Which represents the number of bacteria, $y$, in the liquid medium $t$ days after the start of the observation?`;
    
    // STEP 4: Create options with tracking
    // Fixed: \\frac instead of \\\\frac
    const optionsData = [
      { text: `$y = \\frac{1}{${base}}(${initial})^t$`, isCorrect: false, reason: "has incorrect structure with initial value as base" },
      { text: `$y = ${base}(${initial})^t$`, isCorrect: false, reason: "swaps the initial amount and growth factor" },
      { text: `$y = ${initial}(\\frac{1}{${base}})^t$`, isCorrect: false, reason: "represents decay (halving each day), not growth" },
      { text: `$y = ${initial}(${base})^t$`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `$y = ${initial}(${base})^t$`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The general form for exponential growth is $y = a(b)^t$, where $a$ is the initial amount and $b$ is the growth factor. The initial number of bacteria is $${initial.toLocaleString()}$, so $a = ${initial}$. Since the number doubles every day, $b = 2$. Therefore, $y = ${initial}(2)^t$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    // STEP 7: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};