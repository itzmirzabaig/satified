import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 6a87902f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 10 and -1]
 * - Difficulty factors: [Parallel lines recognition, no solution concept]
 * - Distractor patterns: [Zero, Exactly one, Exactly two, Infinitely many]
 * - Constraints: [Same slope, different intercepts = parallel = no solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_6a87902f = {
  metadata: {
    // id: "6a87902f",
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
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: "Zero",
      explanation: `The given system of equations is: 1) $y = ${slope}x + ${intercept1}$ 2) $y = ${slope}x ${signStr} ${absIntercept2}$ Both equations are in the slope-intercept form, $y = mx + b$, where $m$ is the slope and $b$ is the $y$-intercept. - For the first equation, the slope $m_1 = ${slope}$ and the $y$-intercept is $${intercept1}$. - For the second equation, the slope $m_2 = ${slope}$ and the $y$-intercept is $${intercept2}$. Comparing the two lines: - The slopes are equal ($m_1 = m_2 = ${slope}$). - The $y$-intercepts are different ($${intercept1} \\neq ${intercept2}$). Lines in the $xy$-plane that have the same slope but different $y$-intercepts are parallel. Parallel lines never intersect. Therefore, the system of equations has zero solutions, meaning the graphs intersect at zero points. Why other options are incorrect: - B. Exactly one: This would happen if the lines had different slopes. - C. Exactly two: Two linear equations cannot intersect at exactly two points; straight lines intersect once, never (parallel), or infinitely many times (same line). - D. Infinitely many: This would happen if the lines were identical (same slope and same $y$-intercept).`
    };
  }
};

/**
 * Question ID: 6e6a3241
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1, 5, 2, -1 (single digit), intercepts vary]
 * - Difficulty factors: [Graph identification from intercepts]
 * - Distractor patterns: [Graph A, B, C, D]
 * - Constraints: [Mafs graph showing correct intercepts]
 * - Question type: [Multiple Choice with Figure]
 * - Figure generation: [Mafs - two lines with specific intercepts]
 */