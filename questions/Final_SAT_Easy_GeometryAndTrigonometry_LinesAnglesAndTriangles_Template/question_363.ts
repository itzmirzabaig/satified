import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 363
*
* ORIGINAL ANALYSIS:
* - Number ranges: [exteriorAngle: 100-130]
* - Difficulty factors: [Isosceles triangle, exterior angle, linear pair]
* - Distractor patterns: [Select exterior angle, find base angle, halves base angle]
* - Constraints: [Base angles equal, x = 180 - 2*baseAngle]
* - Question type: [Figure→Multiple Choice Text]
*
* Intent: triangle ABC with AB = CB (so base angles A and C are equal). Side
* AC is extended to D, forming exterior angle BCD = exteriorAngle at C. The
* interior base angle BCA is its linear-pair supplement (180 - exteriorAngle),
* angle BAC equals it, and the apex angle x = 180 - 2*baseAngle.
*/

export const generator_363 = {
  metadata: {
    id: "363",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const exteriorAngle = getRandomInt(100, 130);
    const baseAngle = 180 - exteriorAngle;   // interior base angle at A and C (50-80)
    const vertexAngle = 180 - 2 * baseAngle; // apex angle x (20-80)
    const correctAnswer = vertexAngle.toString();

    // --- Figure: isosceles triangle ABC with base AC extended to D (plain SVG) ---
    const width = 450;
    const height = 250;
    // Fixed schematic coordinates (apex B on top, base A-C, extended to D).
    const Ax = 90, Ay = 190;
    const Cx = 300, Cy = 190;
    const Bx = 195, By = 55;   // apex, horizontally centered over AC
    const Dx = 400, Dy = 190;  // extension of AC beyond C
    const figureCode = `
      <div style="text-align:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; max-width:${width}px; height:auto; font-family:sans-serif; user-select:none;">
          <!-- Triangle sides -->
          <line x1="${Ax}" y1="${Ay}" x2="${Bx}" y2="${By}" stroke="currentColor" stroke-width="2"/>
          <line x1="${Cx}" y1="${Cy}" x2="${Bx}" y2="${By}" stroke="currentColor" stroke-width="2"/>
          <!-- Base AC extended to D -->
          <line x1="${Ax}" y1="${Ay}" x2="${Dx}" y2="${Dy}" stroke="currentColor" stroke-width="2"/>
          <!-- Vertex labels -->
          <text x="${Ax - 18}" y="${Ay + 6}" font-size="16" font-style="italic" fill="currentColor">A</text>
          <text x="${Cx - 4}" y="${Cy + 20}" font-size="16" font-style="italic" fill="currentColor">C</text>
          <text x="${Bx - 6}" y="${By - 8}" font-size="16" font-style="italic" fill="currentColor">B</text>
          <text x="${Dx + 6}" y="${Dy + 6}" font-size="16" font-style="italic" fill="currentColor">D</text>
          <!-- Exterior angle BCD label (between CB and CD, above the extension at C) -->
          <text x="${Cx + 16}" y="${Cy - 14}" font-size="15" fill="currentColor">${exteriorAngle}&#176;</text>
          <!-- Apex angle x label just below B -->
          <text x="${Bx - 4}" y="${By + 26}" font-size="15" font-style="italic" fill="currentColor">x</text>
        </svg>
      </div>
    `;

    // Candidate distractors with reasons; dedupe against the correct answer and
    // each other so no collision (e.g. exteriorAngle == 120 gives vertex == base,
    // exteriorAngle == 108 gives vertex == round(base/2)) can occur.
    const candidates: { val: number; reason: string }[] = [
      { val: exteriorAngle, reason: "selects the exterior angle instead of the interior angle x" },
      { val: baseAngle, reason: "finds a base angle instead of the vertex angle x" },
      { val: Math.round(baseAngle / 2), reason: "incorrectly halves a base angle" },
      { val: vertexAngle + 10, reason: "results from an arithmetic error" },
      { val: vertexAngle - 5, reason: "results from an arithmetic error" }
    ];

    const usedVals = new Set<number>([vertexAngle]);
    const distractors: { text: string; isCorrect: boolean; reason: string }[] = [];
    for (const c of candidates) {
      if (distractors.length === 3) break;
      if (c.val > 0 && !usedVals.has(c.val)) {
        usedVals.add(c.val);
        distractors.push({ text: c.val.toString(), isCorrect: false, reason: c.reason });
      }
    }

    const optionsData = [
      { text: correctAnswer, isCorrect: true, reason: "" },
      ...distractors
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In the given figure, $\\overline{AC}$ extends to point $D$. If the measure of $\\angle BAC$ is equal to the measure of $\\angle BCA$, what is the value of $x$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Angles $BCA$ and $BCD$ form a linear pair, so $\\angle BCA = 180^{\\circ} - ${exteriorAngle}^{\\circ} = ${baseAngle}^{\\circ}$. Because $\\angle BAC = \\angle BCA$, we have $\\angle BAC = ${baseAngle}^{\\circ}$. The three interior angles of $\\triangle ABC$ sum to a straight angle, so $x = 180^{\\circ} - ${baseAngle}^{\\circ} - ${baseAngle}^{\\circ} = ${correctAnswer}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
