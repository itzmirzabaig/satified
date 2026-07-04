import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 297
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 5, -3, constant: 4]
 * - Difficulty factors: [Linear inequality testing, multiple point verification]
 * - Distractor patterns: [I only, II only, I and II only, I and III only]
 * - Constraints: [Must test each ordered pair]
 * - Question type: [Multiple Choice Text with roman numerals]
 * - Figure generation: [None]
 */

export const generator_297 = {
  metadata: {
    id: "297",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Inequalities In One Or Two Variables",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // Build three test points and choose coefficients so that EXACTLY one of
    // the four target subsets ({I}, {II}, {I,II}, {I,III}) is the true answer.
    // We resample until the live truth-set matches one of those four patterns,
    // which keeps the four fixed options both valid and mutually exclusive.
    const roman = ["I", "II", "III"];
    const points = [
      { x: 1, y: 1 },
      { x: 2, y: 3 },
      { x: 3, y: 2 }
    ];

    const subsetLabel = (idxs: number[]): string => {
      if (idxs.length === 1) return `${roman[idxs[0]]} only`;
      return `${idxs.map(i => roman[i]).slice(0, -1).join(", ")} and ${roman[idxs[idxs.length - 1]]} only`;
    };

    // The four answer choices, each described by the set of point indices it selects.
    const optionSets = [
      [0],        // I only
      [1],        // II only
      [0, 1],     // I and II only
      [0, 2]      // I and III only
    ];

    let a = 0, b = 0, c = 0;
    let checks: boolean[] = [];
    let correctIdx = -1;
    let tries = 0;
    do {
      a = getRandomInt(3, 7);
      b = getRandomInt(-5, -2);
      c = getRandomInt(3, 8);
      checks = points.map(p => a * p.x + b * p.y < c);
      const trueSet = checks
        .map((ok, i) => (ok ? i : -1))
        .filter(i => i >= 0);
      correctIdx = optionSets.findIndex(
        set =>
          set.length === trueSet.length &&
          set.every((i, k) => i === trueSet[k])
      );
    } while (correctIdx === -1 && tries++ < 50);

    // Extremely defensive fallback (should never trigger): force a clean draw.
    if (correctIdx === -1) {
      a = 5; b = -3; c = 6;
      checks = points.map(p => a * p.x + b * p.y < c);
      correctIdx = 2; // I and II only
    }

    const optionsData = optionSets.map((set, i) => ({
      text: subsetLabel(set),
      isCorrect: i === correctIdx
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const vals = points.map(p => a * p.x + b * p.y);
    const bSign = b >= 0 ? "+" : "-";

    const explanation = `Choice ${correctLetter} is correct. Testing each point in $${a}x ${bSign} ${Math.abs(b)}y < ${c}$: I. (${points[0].x}, ${points[0].y}): ${vals[0]} < ${c} is ${vals[0] < c}. II. (${points[1].x}, ${points[1].y}): ${vals[1]} < ${c} is ${vals[1] < c}. III. (${points[2].x}, ${points[2].y}): ${vals[2]} < ${c} is ${vals[2] < c}. Therefore, ${correctOption.text}.`;

    return {
      questionText: `Which of the following ordered pairs $(x, y)$ satisfies the inequality $${a}x ${bSign} ${Math.abs(b)}y < ${c}$ ?\nI. $(${points[0].x}, ${points[0].y})$\nII. $(${points[1].x}, ${points[1].y})$\nIII. $(${points[2].x}, ${points[2].y})$`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
