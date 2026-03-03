import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 0dd6227f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and 8 (single digit), intercepts: 20 and 0]
 * - Difficulty factors: [Slope-intercept form recognition, intersection counting]
 * - Distractor patterns: [0, 1, 2, 8 - common misconception counts]
 * - Constraints: [Different slopes guarantee one intersection]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_0dd6227f = {
  metadata: {
    // id: "0dd6227f",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - different slopes guarantee intersection
    const slope1 = getRandomInt(1, 5);
    let slope2 = getRandomInt(1, 5);
    while (slope2 === slope1) {
      slope2 = getRandomInt(1, 5);
    }
    const intercept1 = getRandomInt(5, 25);
    const intercept2 = getRandomInt(0, 15);
    
    // STEP 2: Build question text
    const questionText = `At how many points do the graphs of the equations $y=x+${intercept1}$ and $y=${slope2}x$ intersect in the $xy$-plane?`;
    
    // STEP 3: Create options - always 1 for different slopes
    const correctText = "1";
    const optionsData = [
      { text: "0", isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: "2", isCorrect: false },
      { text: slope2.toString(), isCorrect: false } // Distractor: uses slope value
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
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Each given equation is written in slope-intercept form, $y=mx+b$, where $m$ is the slope and $(0, b)$ is the y-intercept of the graph of the equation in the xy-plane. The graphs of two lines that have different slopes will intersect at exactly one point. The graph of the first equation is a line with slope 1. The graph of the second equation is a line with slope ${slope2}. Since the graphs are lines with different slopes, they will intersect at exactly one point.\n\nChoice A is incorrect because two graphs of linear equations have intersection points only if they are parallel and therefore have the same slope.\n\nChoice C is incorrect because two graphs of linear equations in the xy-plane can have only 0, 1, or infinitely many points of intersection.\n\nChoice D is incorrect because two graphs of linear equations in the xy-plane can have only 0, 1, or infinitely many points of intersection.`
    };
  }
};

/**
 * Question ID: 7efe5495
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 1-3 (simple), results: 12 (double-digit)]
 * - Difficulty factors: [Substitution, asks for expression value not variable]
 * - Distractor patterns: [24, 15, 12, 5 - multiples and nearby values]
 * - Constraints: [Clean arithmetic, integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */