import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 805
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 10 and -1]
 * - Difficulty factors: [Parallel lines recognition, no solution concept]
 * - Distractor patterns: [Zero, Exactly one, Exactly two, Infinitely many]
 * - Constraints: [Same slope, different intercepts = parallel = no solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_805 = {
  metadata: {
    id: "805",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - parallel lines (same slope, different intercept)
    const slope = getRandomInt(1, 5);
    const intercept1 = getRandomInt(5, 15);
    const intercept2 = -1 * getRandomInt(1, 10); // Negative intercept
    
    // STEP 2: Build question text
    const signStr = intercept2 >= 0 ? '+' : '-';
    const absIntercept2 = Math.abs(intercept2);
    const questionText = `At how many points do the graphs of the given equations intersect in the $xy$-plane?\n\n$$\\begin{cases} y = ${slope}x + ${intercept1} \\\\ y = ${slope}x ${signStr} ${absIntercept2} \\end{cases}$$`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: "Zero", isCorrect: true },
      { text: "Exactly one", isCorrect: false },
      { text: "Exactly two", isCorrect: false },
      { text: "Infinitely many", isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;

    // STEP 5: Build distractor explanations keyed by option TEXT, then labeled
    // with each option's ACTUAL shuffled letter (the letters are only known
    // after shuffling — never hardcode them).
    const reasons: Record<string, string> = {
      "Exactly one": `is incorrect. The graphs would intersect at exactly one point only if the lines had different slopes; here the slopes are equal.`,
      "Exactly two": `is incorrect. Two distinct straight lines can intersect at most once, so they can never intersect at exactly two points.`,
      "Infinitely many": `is incorrect. The graphs would intersect at infinitely many points only if the lines were identical (same slope and same $y$-intercept); here the $y$-intercepts differ.`
    };

    const wrongExplanations = shuffledOptions
      .filter(o => !o.isCorrect)
      .map(o => `Choice ${o.letter} (${o.text}) ${reasons[o.text]}`)
      .join(' ');

    // STEP 6: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Zero",
      explanation: `Choice ${correctLetter} (Zero) is correct. The given system of equations is: 1) $y = ${slope}x + ${intercept1}$ 2) $y = ${slope}x ${signStr} ${absIntercept2}$ Both equations are in the slope-intercept form, $y = mx + b$, where $m$ is the slope and $b$ is the $y$-intercept. For the first equation, the slope $m_1 = ${slope}$ and the $y$-intercept is $${intercept1}$. For the second equation, the slope $m_2 = ${slope}$ and the $y$-intercept is $${intercept2}$. Comparing the two lines: the slopes are equal ($m_1 = m_2 = ${slope}$), but the $y$-intercepts are different ($${intercept1} \\neq ${intercept2}$). Lines in the $xy$-plane that have the same slope but different $y$-intercepts are parallel, and parallel lines never intersect. Therefore, the system has zero solutions, so the graphs intersect at zero points. ${wrongExplanations}`
    };
  }
};
