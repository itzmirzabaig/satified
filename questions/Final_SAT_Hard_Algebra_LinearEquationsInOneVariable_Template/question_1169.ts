import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1169
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [10, 9, 7 (single-digit sizes), 4 (multiplier), 10 (constant), 100 (total)]
 * - Difficulty factors: [Setting up equation from word problem, distinguishing count vs size]
 * - Distractor patterns: [A: multiplies by sizes (perimeter confusion), B: assumes n of each type, C: forgets the n for 9-inch pans]
 * - Constraints: [Must sum to total pans]
 * - Question type: [Word Problem→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1169 = {
  metadata: {
    id: "1169",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate random values — answer-first construction so the
    // total is an exact integer and no unbounded retry is needed.
    // Three DISTINCT pan sizes drawn from disjoint ranges (large > medium > small),
    // so the three sizes can never collide for any draw.
    const size1 = getRandomInt(8, 12);  // Large size
    const size2 = getRandomInt(5, 7);   // Medium size (the variable n refers to this)
    const size3 = getRandomInt(3, 4);   // Small size

    const multiplier = getRandomInt(3, 6);       // large pans = multiplier * n
    const nCoeff = multiplier + 1;               // coefficient after combining n + multiplier*n
    const n = getRandomInt(10, 18);              // number of medium (n-inch) pans
    const constantCount = getRandomInt(5, 15);   // number of small pans (a plain count)

    // total is derived, so (multiplier+1)*n + constantCount = totalPans exactly
    const totalPans = nCoeff * n + constantCount;

    // STEP 2: Build the correct equation: multiplier*n + n + constantCount = totalPans
    const correctEquation = `${nCoeff}n + ${constantCount} = ${totalPans}`;

    // STEP 3: Distractors (all structurally distinct from the correct equation
    // and from each other for every draw — see note).
    // A: multiplies counts by sizes (length, not count)
    const distractorA = `${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount}) = ${totalPans}`;
    // B: assumes n pans of each size, then multiplies by size
    const distractorB = `${size1}n + ${size2}n + ${size3}n = ${totalPans}`;
    // C: forgets the n medium pans themselves (drops the +n term)
    const distractorC = `${multiplier}n + ${constantCount} = ${totalPans}`;

    // STEP 4: Create options. Before: the reasons did not name the expressions
    // and the explanation used dash bullets and hyphenated sizes ("10-inch").
    const optionsData = [
      { text: `$${distractorA}$`, isCorrect: false, reason: `$${size1}(${multiplier}n) + ${size2}n + ${size3}(${constantCount})$ multiplies each number of pans by its size in inches, but the total of ${totalPans} counts pans, not inches` },
      { text: `$${distractorB}$`, isCorrect: false, reason: `$${size1}n + ${size2}n + ${size3}n$ uses the sizes in inches as if they were numbers of pans and assumes there are $n$ pans of each size` },
      { text: `$${distractorC}$`, isCorrect: false, reason: `$${multiplier}n + ${constantCount}$ counts the large pans and the small pans but leaves out the $n$ medium pans` },
      { text: `$${correctEquation}$`, isCorrect: true, reason: '' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The plant makes $n$ medium pans, ${multiplier} times as many large pans, which is $${multiplier}n$, and ${constantCount} small pans. So the total number of pans is $n + ${multiplier}n + ${constantCount}$. Combining like terms gives $${nCoeff}n + ${constantCount}$, and the total is ${totalPans}, so $${correctEquation}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `A manufacturing plant makes large, medium, and small frying pans, which measure ${size1} inches, ${size2} inches, and ${size3} inches across, respectively. During a certain day, the number of large frying pans the plant makes is ${multiplier} times the number $n$ of medium frying pans it makes, and the number of small frying pans it makes is ${constantCount}. During this day, the plant makes ${totalPans} frying pans in total. Which equation represents this situation?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: `$${correctEquation}$`,
      explanation: explanation
    };
  }
};
