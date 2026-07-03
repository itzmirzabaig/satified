import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 796
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slopes: 1 and 8 (single digit), intercepts: 20 and 0]
 * - Difficulty factors: [Slope-intercept form recognition, intersection counting]
 * - Distractor patterns: [0, 1, 2, 8 - common misconception counts]
 * - Constraints: [Different slopes guarantee one intersection]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None - conceptual]
 */

export const generator_796 = {
  metadata: {
    id: "796",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values.
    // Line 1 is y = x + intercept1 (slope 1). Line 2 is y = slope2 * x.
    // slope2 must differ from 1 so the two lines are guaranteed non-parallel
    // and therefore intersect at exactly one point.
    const slope2 = getRandomInt(2, 6);          // != 1 by construction
    const intercept1 = getRandomInt(5, 25);

    // STEP 2: Build question text.
    const questionText = `At how many points do the graphs of the equations $y = x + ${intercept1}$ and $y = ${slope2}x$ intersect in the $xy$-plane?`;

    // STEP 3: Create options. Standard intersection-count choices; none can
    // collide with each other for any draw.
    const correctText = "1";
    const optionsData = [
      { text: "0", isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: "2", isCorrect: false },
      { text: "Infinitely many", isCorrect: false }
    ];

    // STEP 4: Shuffle and assign letters.
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const zeroLetter = shuffledOptions.find(o => o.text === "0")!.letter;
    const twoLetter = shuffledOptions.find(o => o.text === "2")!.letter;
    const infLetter = shuffledOptions.find(o => o.text === "Infinitely many")!.letter;

    // STEP 5: Return question data.
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Each equation is written in slope-intercept form, $y = mx + b$, where $m$ is the slope. The first line, $y = x + ${intercept1}$, has a slope of $(1)$. The second line, $y = ${slope2}x$, has a slope of $(${slope2})$. Two lines with different slopes intersect at exactly one point, so the graphs meet at exactly one point.\n\nChoice ${zeroLetter} is incorrect: two lines have no points of intersection only when they are parallel (equal slopes but different intercepts), which is not the case here.\n\nChoice ${twoLetter} is incorrect: two distinct lines in the $xy$-plane can never cross at exactly two points.\n\nChoice ${infLetter} is incorrect: two lines share infinitely many points only when they are identical, but these lines have different slopes.`
    };
  }
};
