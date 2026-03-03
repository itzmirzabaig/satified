import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9b5b23fc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [percentage: 201%]
 * - Difficulty factors: [Converting percentage to decimal, recognizing linear vs exponential]
 * - Distractor patterns: [Decreasing exponential (wrong direction), decreasing linear (wrong direction), increasing exponential (wrong model type)]
 * - Constraints: [201% = 2.01, f(x) = 2.01x is linear with positive slope]
 * - Question type: [Conceptual (NO FIGURE)→Multiple Choice Text]
 * - Figure generation: [None - conceptual question]
 */

export const generator_9b5b23fc = {
  metadata: {
    // id: "9b5b23fc",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Original: 201%, but we'll vary this
    const percentBase = getRandomInt(101, 299); // over 100% means growth
    const percent = percentBase % 10 === 0 ? percentBase + 1 : percentBase; // ensure not round
    const decimal = (percent / 100).toFixed(2);
    
    // STEP 2: Create options (no figure needed - conceptual)
    const optionsData = [
      { text: "Decreasing exponential", isCorrect: false, reason: "may result from conceptual errors about percentage decrease" },
      { text: "Decreasing linear", isCorrect: false, reason: "may result from conceptual errors about negative slope" },
      { text: "Increasing exponential", isCorrect: false, reason: "could describe the function $f(x)=(${decimal})^{x}$, where $f(x)$ is equal to ${percent}% of $f(x-1)$, not $x$, for $x>0$" },
      { text: "Increasing linear", isCorrect: true }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Return question data (NO FIGURE)
    return {
      questionText: `For $x > 0$, the function $f$ is defined as follows: $f(x)$ equals ${percent}% of $x$. Which of the following could describe this function?`,
      figureCode: null, // ✅ No figure in original
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Increasing linear",
      explanation: `Choice ${correctLetter} is correct. It's given that for $x>0, f(x)$ is equal to ${percent}% of $x$. This is equivalent to $f(x)=\\\\frac{${percent}}{100} x$, or $f(x)=${decimal} x$, for $x>0$. This function indicates that as $x$ increases, $f(x)$ also increases, which means $f$ is an increasing function. Furthermore, $f(x)$ increases at a constant rate of ${decimal} for each increase of $x$ by 1. A function with a constant rate of change is linear. Thus, the function $f$ can be described as an increasing linear function. Choice ${incorrectOptions[0].letter} is incorrect and ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect and ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect. This ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: af142f8d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Account A: $500, 6%, Account B: $1000, $25/year]
 * - Difficulty factors: [Comparing exponential vs linear growth, compound interest calculation]
 * - Distractor patterns: [A always more (correct), A always less, A eventually less, A eventually more]
 * - Constraints: [Year 1: A = $30, B = $25; A starts higher and grows exponentially]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML Table]
 */