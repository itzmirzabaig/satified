import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 828
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 6, 10, 14, various intercepts]
 * - Difficulty factors: [Identify parallel lines for no solution]
 * - Distractor patterns: [A, B, C, D systems]
 * - Constraints: [Same slope, different intercept]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_828 = {
  metadata: {
    id: "828",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values for parallel lines
    const m = getRandomInt(3, 10);
    const b1 = getRandomInt(2, 8);
    const b2 = b1 + getRandomInt(3, 8);
    
    // STEP 2: Build question text
    const questionText = `Which of the following systems of linear equations has no solution?`;
    
    // STEP 3: Create options.
    // Option A is the ONLY intended no-solution system (parallel: equal slope m,
    // different intercepts b1 != b2). Every distractor must intersect at exactly
    // one point, so its two lines must have DIFFERENT slopes. Force distinct
    // slopes on option C (drawn from overlapping ranges) so it can never become a
    // second parallel/no-solution system.
    let cSlope1 = getRandomInt(10, 20);
    let cSlope2 = getRandomInt(5, 15);
    let cGuard = 0;
    while (cSlope2 === cSlope1 && cGuard++ < 50) {
      cSlope2 = getRandomInt(5, 15);
    }
    if (cSlope2 === cSlope1) cSlope2 = cSlope1 === 5 ? 6 : cSlope1 - 1;

    const optionA = `$y=${m}x+${b1}$ $y=${m}x+${b2}$`;
    const optionB = `$y=${getRandomInt(10, 20)}$ $y=${getRandomInt(5, 15)}x+${getRandomInt(5, 15)}$`;
    const optionC = `$y=${cSlope1}x+${getRandomInt(10, 20)}$ $y=${cSlope2}x+${getRandomInt(10, 20)}$`;
    const optionD = `$x=${getRandomInt(2, 5)}$ $y=${getRandomInt(5, 15)}$`;
    
    const optionsData = [
      { text: optionA, isCorrect: true },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: false },
      { text: optionD, isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optionA,
      explanation: `To determine which system has no solution, we need to compare the slopes and y-intercepts of the linear equations. A system of linear equations has **no solution** if the lines are parallel. Parallel lines have the **same slope** ($m$) but **different y-intercepts** ($b$).\n\nThe equations are given in slope-intercept form, $y=mx+b$, where $m$ is the slope and $b$ is the y-intercept.\n\nLet's analyze each option:\n\n**${correctLetter}. $y=${m}x+${b1}$ and $y=${m}x+${b2}$**\n*   Equation 1: $y=${m}x+${b1}$ $\\rightarrow$ Slope $m=${m}$, y-intercept $b=${b1}$\n*   Equation 2: $y=${m}x+${b2}$ $\\rightarrow$ Slope $m=${m}$, y-intercept $b=${b2}$\n*   **Comparison:** The slopes are equal ($${m}=${m}$), but the y-intercepts are different ($${b1}\\ne ${b2}$). This means the lines are parallel and will never intersect. Therefore, this system has **no solution**.\n\n**Other options** have different slopes, meaning they intersect at one point.`
    };
  }
};
