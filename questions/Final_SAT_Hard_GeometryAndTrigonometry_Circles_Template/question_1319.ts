import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1319
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (h, k) with k<0, translation: shift units right]
 * - Difficulty factors: [Horizontal translation of circle]
 * - Distractor patterns: [Wrong direction (left), changing y instead of x (up/down)]
 * - Constraints: [Only x-coordinate changes for horizontal shift]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 *
 * FIXED:
 * - Distractor explanation reasons were assigned by post-shuffle array position
 *   (incorrectOptions[0/1/2]), so "translates up/left/down" did not match the
 *   options they labelled. Reasons are now tied to each distractor's fixed
 *   identity (up / left / down) via a lookup by tag, so every label is true.
 * - Replaced ad-hoc sign handling that produced malformed LaTeX like
 *   "(y--7)", "(x--1)", and "(y+0)". A single formatter now renders every
 *   center coordinate correctly: "(x-a)", "(x+n)" for negatives, and a bare
 *   "x^{2}" when a coordinate is 0.
 */

export const generator_1319 = {
  metadata: {
    id: "1319",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate center (h, k) with k < 0, and radius.
    const h = getRandomInt(3, 10);
    const k = -getRandomInt(1, 6);
    const r = getRandomInt(1, 4);

    // STEP 2: Generate translation distance.
    const shift = getRandomInt(2, 6);

    // STEP 3: New center after translating RIGHT (only x changes).
    const newH = h + shift;

    // STEP 4: Build the equation strings from centers so signs are always valid.
    const rSq = r * r;
    const eq = (a: number, b: number) => `${axisTerm('x', a)}+${axisTerm('y', b)}=${rSq}`;

    const correctText = eq(newH, k);                 // right: (h+shift, k)
    const distractorUp = eq(h, k + shift);           // changed y upward
    const distractorDown = eq(h, k - shift);         // changed y downward
    const distractorLeft = eq(h - shift, k);         // wrong x direction

    // Tag each option so the explanation can reference it by identity, not by
    // shuffled position.
    const optionsData = [
      { text: correctText, isCorrect: true, tag: 'correct' as const },
      { text: distractorUp, isCorrect: false, tag: 'up' as const },
      { text: distractorLeft, isCorrect: false, tag: 'left' as const },
      { text: distractorDown, isCorrect: false, tag: 'down' as const }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const letterOf = (tag: string) => shuffledOptions.find(o => o.tag === tag)!.letter;

    return {
      questionText: `Circle A has equation $${eq(h, k)}$. In the $xy$-plane, circle B is obtained by translating circle A to the right ${shift} units. Which equation represents circle B?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The original center is $(${h}, ${k})$. Translating ${shift} units to the right increases the x-coordinate by ${shift}: $${h}+${shift}=${newH}$, giving center $(${newH}, ${k})$. The y-coordinate and radius are unchanged. Choice ${letterOf('up')} is incorrect; it changes the y-coordinate instead of the x-coordinate, translating up. Choice ${letterOf('left')} is incorrect; it decreases the x-coordinate, translating left instead of right. Choice ${letterOf('down')} is incorrect; it changes the y-coordinate instead of the x-coordinate, translating down.`
    };
  }
};

// Render one squared axis term of a circle equation for center coordinate `c`.
//   c > 0  -> "(x-c)^{2}"
//   c < 0  -> "(x+|c|)^{2}"
//   c == 0 -> "x^{2}"
function axisTerm(varName: 'x' | 'y', c: number): string {
  if (c === 0) return `${varName}^{2}`;
  if (c > 0) return `(${varName}-${c})^{2}`;
  return `(${varName}+${Math.abs(c)})^{2}`;
}
