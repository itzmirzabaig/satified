import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: d71f6dbf
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = -16x² + 20x + 5, h(1.4) = 1.64 interpretation]
 * - Difficulty factors: [Function notation in physics context, time vs height]
 * - Distractor patterns: [B/C: swapped time and height, D: confuses height with speed]
 * - Constraints: [h(t) gives height at time t]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - function interpretation]
 */

export const generator_d71f6dbf = {
  metadata: {
    // id: "d71f6dbf",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // This is about interpreting h(1.4) = 1.64, core concept doesn't need randomization
    
    // STEP 2: Build question text
    const questionText = `The height, in feet, of an object $x$ seconds after it is thrown straight up in the air can be modeled by the function $h(x)=-16x^{2}+20x+5$. Based on the model, which of the following statements best interprets the equation $h(1.4)=1.64$?`;
    
    // STEP 3: Create options with tracking
    const optionsData = [
      { text: `The height of the object 1.4 seconds after being thrown straight up in the air is 1.64 feet.`, isCorrect: true },
      { text: `The height of the object 1.64 seconds after being thrown straight up in the air is 1.4 feet.`, isCorrect: false, reason: "this swaps the time (1.4 seconds) with the height (1.64 feet)" },
      { text: `The height of the object 1.64 seconds after being thrown straight up in the air is approximately 1.4 times as great as its initial height.`, isCorrect: false, reason: "this misidentifies both values and creates an incorrect comparison" },
      { text: `The speed of the object 1.4 seconds after being thrown straight up in the air is approximately 1.64 feet per second.`, isCorrect: false, reason: "the function $h(x)$ gives height, not speed" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `The height of the object 1.4 seconds after being thrown straight up in the air is 1.64 feet.`;
    
    // STEP 5: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    const explanation = `Choice ${correctLetter} is correct. The value $1.4$ is the input $x$, representing seconds after the object was thrown. When the function $h$ is evaluated at $x = 1.4$, the output is $1.64$, representing height in feet. Therefore, the height of the object 1.4 seconds after being thrown is 1.64 feet. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer,
      explanation: explanation
    };
  }
};

/**
 * Question ID: 6676f055
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(θ) = -0.28(θ-27)² + 880, maximum at θ=27]
 * - Difficulty factors: [Vertex form, finding maximum input value, context]
 * - Distractor patterns: [A/B: coefficient values, D: maximum output value]
 * - Constraints: [Vertex at (27, 880), maximum occurs at θ=27]
 * - Question type: [No Figure→Multiple Choice Text]
 * - Figure generation: [None - function analysis]
 */