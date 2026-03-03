import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

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

export const generator_6676f055 = {
  metadata: {
    // id: "6676f055",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: f(θ) = -0.28(θ-27)² + 880, max at θ=27
    // Randomize: a (-0.1 to -0.5), h (20-40), k (500-1000)
    const a = -1 * (getRandomInt(1, 5) / 10); // -0.1 to -0.5
    const h = getRandomInt(20, 40); // 20 to 40
    const k = getRandomInt(500, 1000); // 500 to 1000
    
    // STEP 2: Calculate derived values
    
    // STEP 3: Build question text
    // Fixed: \\theta (single escaped backslash) instead of \\\\theta (double escaped)
    const questionText = `An engineer discovered that the function $f(\\theta)=${a}(\\theta-${h})^{2}+${k}$ models the airflow $f(\\theta)$, in cubic feet per minute, as a function of the angle of the fan $\\theta$, in degrees. According to the model, what angle, in degrees, gives the greatest airflow?`;
    
    // STEP 4: Create options with tracking
    const optionsData = [
      { text: `$${a}$`, isCorrect: false, reason: "this is the coefficient $a$, which indicates the parabola opens downward, not the angle" },
      { text: `$${Math.abs(a)}$`, isCorrect: false, reason: "this is the absolute value of the coefficient, not the angle" },
      { text: `$${h}$`, isCorrect: true },
      { text: `$${k}$`, isCorrect: false, reason: "this is the maximum value of the airflow ($k$), not the angle that produces it" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const correctAnswer = `${h}`;
    
    // STEP 6: Build explanation with dynamic letters
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    // Fixed: \\theta instead of \\\\theta throughout
    const explanation = `Choice ${correctLetter} is correct. The function is in vertex form $f(\\theta) = a(\\theta - h)^2 + k$, where $(h, k)$ is the vertex. Since $a = ${a} < 0$, the parabola opens downward and the vertex represents a maximum. The vertex is at $(${h}, ${k})$, so the angle that gives the greatest airflow is $\\theta = ${h}$ degrees. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
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