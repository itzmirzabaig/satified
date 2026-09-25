import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 818
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 16, various intercepts]
 * - Difficulty factors: [Identify parallel lines]
 * - Distractor patterns: [A, B, C, D systems]
 * - Constraints: [Same slope = parallel = no solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED (both equations in each option rendered on one line — same as
 * Q814/Q308/Q310/Q316): each option was TWO adjacent $...$ segments, which
 * HTML runs together inline. Each option is now ONE $...$ aligned block:
 * second equation below the first, equals signs aligned. Option values
 * were hoisted to variables (same ranges, same draw order — generation
 * behavior unchanged). No question logic changed.
 */

export const generator_818 = {
  metadata: {
    id: "818",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const m = getRandomInt(10, 20);
    const b1 = getRandomInt(2, 8);
    const b2 = b1 + getRandomInt(10, 20);
    
    // STEP 2: Build question text
    const questionText = `Which of the following systems of linear equations has no solution?`;
    
    // STEP 3: Create options.
    // Option C is the ONLY intended no-solution system (parallel: equal slope m,
    // different intercepts b1 != b2). Every distractor must intersect at exactly
    // one point, so its two lines must have DIFFERENT slopes. Force distinct
    // slopes on option B (drawn from overlapping ranges) so it can never become a
    // second parallel/no-solution system.
    let bSlope1 = getRandomInt(5, 10);
    let bSlope2 = getRandomInt(2, 8);
    let bGuard = 0;
    while (bSlope2 === bSlope1 && bGuard++ < 50) {
      bSlope2 = getRandomInt(2, 8);
    }
    if (bSlope2 === bSlope1) bSlope2 = bSlope1 === 2 ? 3 : bSlope1 - 1;

    // Option values (hoisted so each random draw is used once — identical
    // ranges and order to the original inline interpolations).
    const aX = getRandomInt(2, 5);
    const aY = getRandomInt(5, 15);
    const bInt1 = getRandomInt(5, 10);
    const bInt2 = getRandomInt(5, 10);
    const dHoriz = getRandomInt(3, 8);
    const dSlope = getRandomInt(5, 15);
    const dInt = getRandomInt(5, 15);

    // Each option is ONE aligned block so the two equations stack.
    const sys = (e1: string, e2: string) => `$\\begin{aligned} ${e1} \\\\ ${e2} \\end{aligned}$`;
    const optionA = sys(`x=${aX}`, `y=${aY}`);
    const optionB = sys(`y=${bSlope1}x+${bInt1}`, `y=${bSlope2}x+${bInt2}`);
    const optionC = sys(`y=${m}x+${b1}`, `y=${m}x+${b2}`);
    const optionD = sys(`y=${dHoriz}`, `y=${dSlope}x+${dInt}`);
    
    const optionsData = [
      { text: optionA, isCorrect: false },
      { text: optionB, isCorrect: false },
      { text: optionC, isCorrect: true },
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
      correctAnswer: optionC,
      explanation: `A system of linear equations has no solution if the lines are parallel, which means they have the same slope but different y-intercepts. Let's analyze each option:\n\nA. These represent a vertical line and a horizontal line. They intersect at one point.\n\nB. These lines have different slopes, so they intersect at one point.\n\nC. Both lines have slope ${m} but different y-intercepts (${b1} and ${b2}), so they are parallel and never intersect. This system has no solution.\n\nD. These have different slopes (0 vs non-zero), so they intersect at one point.\n\nTherefore, the correct option is ${correctLetter}.`
    };
  }
};