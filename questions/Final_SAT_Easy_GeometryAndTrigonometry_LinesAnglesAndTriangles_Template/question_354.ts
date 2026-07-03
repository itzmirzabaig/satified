import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 354
*
* ORIGINAL ANALYSIS:
* - Number ranges: [angle: 120-175]
* - Difficulty factors: [Parallel lines, corresponding angles, transversal properties]
* - Distractor patterns: [Division error, supplementary angle, random calculation error]
* - Constraints: [Obtuse angle, lines must be parallel]
* - Question type: [Figure→Multiple Choice Text]
*
* FIXED:
* - Old distractors collided for some draws that the 25-draw smoke missed but
*   the 200-draw audit caught: (180 - g) equaled (g - 100) at g = 140, and
*   round(g/10) equaled (180 - g) at g = 164, producing DUP_OPTIONS.
* - Correct answer (g) is always >= 120; every distractor here is < 100 and the
*   set is de-duplicated with a bounded retry, so all four options are distinct
*   for every draw. The labeled "supplementary" distractor is kept intact; any
*   remaining collisions are resolved with unique arithmetic-slip fillers.
* - Explanation no longer places a $digit segment next to a $letter segment,
*   clearing the DOLLAR_RISK soft flag.
*/

export const generator_354 = {
  metadata: {
    id: "354",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const givenAngle = getRandomInt(120, 175); // obtuse; correct answer = givenAngle
    const yTop = 2;
    const yBottom = 0;

    // Two parallel lines cut by a transversal - corresponding angles.
    const mafsCode = `<Mafs viewBox={{ x: [-3, 5], y: [-1, 4] }}>
  <!-- Parallel line m (top) -->
  <Line.Segment point1={[-2, ${yTop}]} point2={[4, ${yTop}]} color="var(--mafs-foreground)" />

  <!-- Parallel line n (bottom) -->
  <Line.Segment point1={[-2, ${yBottom}]} point2={[4, ${yBottom}]} color="var(--mafs-foreground)" />

  <!-- Transversal line t -->
  <Line.Segment point1={[-1, -1]} point2={[3, 3.5]} color="var(--mafs-foreground)" />

  <!-- Angle labels -->
  <Text x={0.5} y={${yTop + 0.5}}>${givenAngle}°</Text>
  <Text x={0.5} y={${yBottom - 0.5}}>w°</Text>
</Mafs>`;

    const correctAnswer = givenAngle.toString();

    // Build a distinct set of wrong answers. The correct value is >= 120; every
    // distractor below is < 100, so distractors only ever risk colliding with
    // each other. We add labeled candidates first, then fill any gaps caused by
    // a collision with unique arithmetic-slip values (generic reason).
    const used = new Set<number>([givenAngle]);
    const wrong: { value: number; reason: string }[] = [];
    const tryAdd = (value: number, reason: string) => {
      if (wrong.length >= 3) return;
      if (value > 0 && value < 100 && !used.has(value)) { used.add(value); wrong.push({ value, reason }); }
    };

    tryAdd(180 - givenAngle, "finds the supplementary angle instead of the congruent corresponding angle");
    tryAdd(givenAngle - 100, "drops the hundreds digit of the angle measure");
    tryAdd(Math.round(givenAngle / 10), "mistakenly divides the angle measure by 10");

    // Fill remaining slots with unique values < 100 (arithmetic slips).
    let filler = 10;
    while (wrong.length < 3 && filler < 100) {
      if (!used.has(filler)) { used.add(filler); wrong.push({ value: filler, reason: "makes a calculation error" }); }
      filler++;
    }

    const optionsData = [
      { text: wrong[0].value.toString(), isCorrect: false, reason: wrong[0].reason },
      { text: wrong[1].value.toString(), isCorrect: false, reason: wrong[1].reason },
      { text: correctAnswer, isCorrect: true },
      { text: wrong[2].value.toString(), isCorrect: false, reason: wrong[2].reason }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `Note: Figure not drawn to scale. In the figure, line $m$ is parallel to line $n$. What is the value of $w$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctAnswer,
      explanation: `Choice ${correctOption.letter} is correct. Lines $m$ and $n$ are parallel and line $t$ is a transversal, so the marked angles are corresponding angles. Corresponding angles formed by a transversal cutting parallel lines are congruent, so the two angle measures are equal and $w = ${givenAngle}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
