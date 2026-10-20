import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 367
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideLength: 3100-9900]
* - Difficulty factors: [Equilateral triangle definition, isosceles triangle properties]
* - Distractor patterns: [Statements that are true or possible but not sufficient]
* - Constraints: [AB = BC = sideLength; exactly one choice proves the triangle equilateral]
* - Question type: [Conceptual (no figure)→Multiple Choice Text]
*
* FIXED:
* - The stem asked which statement is sufficient, but the choices were bare
*   lengths ("4 mm", "369 mm") made by dividing the side length by 10, 100,
*   and 1000. The choices are now statements. The sufficient one is either
*   AC equal to the side length or angle B measuring 60 degrees, chosen at
*   random; the others are true or possible but do not prove the triangle
*   equilateral. Lengths are written with thousands commas.
*/

export const generator_367 = {
  metadata: {
    id: "367",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Lines Angles And Triangles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideLength = getRandomInt(31, 99) * 100 + getRandomInt(1, 99);
    const s = sideLength.toLocaleString('en-US');
    const useSide = Math.random() < 0.5;

    const correct = useSide
      ? { text: `$AC = ${s}$ mm`, why: `In an equilateral triangle, all three sides have the same length. Since $AB = ${s}$ mm and $BC = ${s}$ mm, knowing that $AC = ${s}$ mm shows that all three sides have the same length, so triangle $ABC$ is equilateral.` }
      : { text: `The measure of angle $B$ is $60^{\\circ}$.`, why: `Since $AB = BC$, triangle $ABC$ is isosceles, and angles $A$ and $C$, which are opposite the congruent sides, are congruent. If the measure of angle $B$ is $60^{\\circ}$, then angles $A$ and $C$ together measure $180^{\\circ} - 60^{\\circ} = 120^{\\circ}$, so each measures $60^{\\circ}$. A triangle whose angles all measure $60^{\\circ}$ is equilateral.` };

    const optionsData = [
      { text: correct.text, isCorrect: true, reason: '' },
      { text: `The measure of angle $A$ is equal to the measure of angle $C$.`, isCorrect: false, reason: `angles $A$ and $C$ are opposite the congruent sides $BC$ and $AB$, so they are congruent in every triangle with $AB = BC$; this does not show that $AC$ is also ${s} mm` },
      { text: `The measure of angle $B$ is $90^{\\circ}$.`, isCorrect: false, reason: `if angle $B$ were a right angle, side $AC$ would be the hypotenuse and would be longer than ${s} mm, so the triangle would be an isosceles right triangle, not an equilateral triangle` },
      { text: `The perimeter of triangle $ABC$ is greater than ${(2 * sideLength).toLocaleString('en-US')} mm.`, isCorrect: false, reason: `the perimeter is $${s} + ${s} + AC$, which is greater than ${(2 * sideLength).toLocaleString('en-US')} mm for any positive length of $AC$; this does not determine $AC$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    return {
      questionText: `In triangle $ABC$, $AB = ${s}$ millimeters (mm) and $BC = ${s}$ mm. Which of the following statements is sufficient to prove that triangle $ABC$ is equilateral?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correct.text,
      explanation: `Choice ${correctOption.letter} is correct. ${correct.why} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
