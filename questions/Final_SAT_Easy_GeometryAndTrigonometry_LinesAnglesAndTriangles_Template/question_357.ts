import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 357
 * ORIGINAL ANALYSIS:
 * Number ranges: [givenAngle: 120-140]
 * Difficulty factors: [Parallel lines, angle relationships]
 * Distractor patterns: [Calculation error, confuses with angle a]
 * Constraints: [Based on specific geometric configuration]
 * Question type: [Figure→Multiple Choice Text]
 *
 * Intent: two parallel lines m and n are cut by a transversal. The obtuse
 * same-side interior angle is the given angle; b is the acute same-side
 * interior angle. Since consecutive (same-side) interior angles are
 * supplementary, b = 180 - givenAngle.
 */
export const generator_357 = {
  metadata: {
    id: "357",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(120, 140); // obtuse interior angle
    const correctAnswerVal = 180 - givenAngle; // b, acute interior angle (40-60)

    // --- Figure: two parallel horizontal lines cut by a transversal (plain SVG) ---
    const width = 450;
    const height = 250;
    // Parallel lines m (top) and n (bottom); transversal crosses both.
    const yTop = 80;
    const yBot = 175;
    const xTopHit = 250; // transversal crosses line m here
    const xBotHit = 190; // transversal crosses line n here
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:sans-serif; user-select:none;">
          <!-- Parallel line m -->
          <line x1="40" y1="${yTop}" x2="410" y2="${yTop}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yTop + 4}" font-size="16" font-style="italic" fill="currentColor">m</text>
          <!-- Parallel line n -->
          <line x1="40" y1="${yBot}" x2="410" y2="${yBot}" stroke="currentColor" stroke-width="2"/>
          <text x="418" y="${yBot + 4}" font-size="16" font-style="italic" fill="currentColor">n</text>
          <!-- Transversal -->
          <line x1="${xBotHit - 55}" y1="${yBot + 45}" x2="${xTopHit + 55}" y2="${yTop - 45}" stroke="currentColor" stroke-width="2"/>
          <!-- Given (obtuse) same-side interior angle at line m, on the lower-right -->
          <text x="${xTopHit + 12}" y="${yTop + 26}" font-size="15" fill="currentColor">${givenAngle}&#176;</text>
          <!-- Unknown angle b at line n, on the upper-right (same side) -->
          <text x="${xBotHit + 12}" y="${yBot - 12}" font-size="15" font-style="italic" fill="currentColor">b</text>
        </svg>
      </div>
    `;

    // --- Options: correct plus 3 guaranteed-distinct distractors ---
    // Candidate distractors (with pedagogical reasons); dedupe against the
    // correct answer and each other so no collision can occur for any draw.
    const candidates: { val: number; reason: string }[] = [
      { val: givenAngle, reason: "gives the measure of the given obtuse angle instead of its supplement" },
      { val: givenAngle - 90, reason: "subtracts 90 instead of subtracting from 180" },
      { val: 90, reason: "assumes the angle is a right angle" },
      { val: correctAnswerVal + 10, reason: "results from an arithmetic error" },
      { val: correctAnswerVal - 5, reason: "results from an arithmetic error" }
    ];

    const usedVals = new Set<number>([correctAnswerVal]);
    const distractors: { text: string; isCorrect: boolean; reason: string }[] = [];
    for (const c of candidates) {
      if (distractors.length === 3) break;
      if (c.val > 0 && !usedVals.has(c.val)) {
        usedVals.add(c.val);
        distractors.push({ text: `${c.val}`, isCorrect: false, reason: c.reason });
      }
    }

    const optionsData = [
      { text: `${correctAnswerVal}`, isCorrect: true, reason: "" },
      ...distractors
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the figure above, lines $m$ and $n$ are parallel. What is the value of $b$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The given angle, which measures $a = ${givenAngle}^{\\circ}$, and the angle labeled $b$ are consecutive interior angles (same-side interior angles). Because lines $m$ and $n$ are parallel, consecutive interior angles are supplementary, so their measures add to a straight angle: $b + a = 180^{\\circ}$, which gives $b = 180 - ${givenAngle} = ${correctAnswerVal}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
