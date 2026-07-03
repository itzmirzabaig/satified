import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 659
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [a: 2-4, b: 2-4, c: 6-12, targetValue (x-c): 2-5]
 * - Difficulty factors: [Solving for the expression x-c rather than x]
 * - Distractor patterns: [reports c, reports x, reports x+c]
 * - Constraints: [(a+b)(x-c) = d, so x-c = targetValue]
 * - Question type: [Multiple Choice Text]
 *
 * MATH NOTE: The equation is a(x-c) + b(x-c) = d. Letting u = x-c gives
 * (a+b)u = d, so u = d/(a+b). We build d = (a+b)*targetValue so u = targetValue
 * exactly (an integer, no float artifacts). The question asks for u = x-c.
 *
 * DISTINCTNESS: with targetValue in [2,5] and c in [6,12] the correct answer
 * targetValue and the three distractors c, targetValue+c (= x), targetValue+2c
 * (= x+c) are pairwise distinct for every draw:
 *   c > targetValue                 (c >= 6 > 5 >= targetValue)
 *   targetValue+c  differs from c by targetValue >= 2 and from targetValue by c
 *   targetValue+2c differs from each of the others by a positive amount
 */

export const generator_659 = {
  metadata: {
    id: "659",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In One Variable",
    difficulty: "Medium"
  },

  generate: (): QuestionData => {
    // Equation: a(x-c) + b(x-c) = d, with d chosen so x-c = targetValue exactly.
    const a = getRandomInt(2, 4);
    const b = getRandomInt(2, 4);
    const c = getRandomInt(6, 12);
    const targetValue = getRandomInt(2, 5); // the value of (x - c)
    const d = (a + b) * targetValue;

    // Deterministic, provably-distinct distractors (see DISTINCTNESS note):
    const distReportsC = c;                 // reports the constant that was subtracted
    const distX        = targetValue + c;   // solved for x instead of x - c
    const distXPlusC   = targetValue + 2 * c; // subtracted the constant a second time

    const correctText = `${targetValue}`;
    const optionsData = [
      { text: `${targetValue}`, isCorrect: true },
      { text: `${distReportsC}`, isCorrect: false },
      { text: `${distX}`, isCorrect: false },
      { text: `${distXPlusC}`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;

    return {
      questionText: `If \\( ${a}(x-${c})+${b}(x-${c})=${d} \\), what is the value of \\( x-${c} \\)?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Let \\( u = x-${c} \\). The equation becomes \\( ${a}u+${b}u=${d} \\), or \\( ${a + b}u=${d} \\). Dividing both sides by \\( ${a + b} \\) gives \\( u=\\dfrac{${d}}{${a + b}}=${targetValue} \\), so \\( x-${c}=${targetValue} \\). The value \\( ${distReportsC} \\) is just the constant \\(${c}\\) that was subtracted; \\( ${distX} \\) is the value of \\(x\\) itself (found by adding \\(${c}\\) back); and \\( ${distXPlusC} \\) adds \\(${c}\\) one extra time.`
    };
  }
};
