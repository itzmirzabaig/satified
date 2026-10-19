import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 335
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideTU: 4-8, scaleFactor: 2-4, perimeterTUV: 30-60]
* - Difficulty factors: [Similar triangles with table, scale factor from perimeters]
* - Distractor patterns: [divides by scale factor, repeats side length, adds perimeter to side]
* - Constraints: [Scale factor = XYZ perimeter / TUV perimeter, XY = TU × scale factor]
* - Question type: [Has Table, Multiple Choice Text]
* - Figure generation: [HTML Table]
*/

export const generator_335 = {
  metadata: {
    id: "335",
    assessment: "Formative",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideTU = getRandomInt(4, 8);
    const scaleFactor = getRandomInt(2, 4);
    const perimeterTUV = getRandomInt(30, 60);
    const perimeterXYZ = perimeterTUV * scaleFactor;
    const sideXY = sideTU * scaleFactor;

    // Option values are always pairwise distinct:
    //   sideXY  = sideTU * scaleFactor  (scaleFactor >= 2, so > sideTU)
    //   sideTU  in [4, 8]
    //   sideTU / scaleFactor           (< sideTU, one decimal place)
    //   perimeterTUV + sideTU >= 34    (larger than sideXY which is <= 32)
    // No collision is possible across the declared ranges.
    const tableCode = `
      <table>
        <thead>
          <tr><th>Triangle</th><th>Perimeter</th></tr>
        </thead>
        <tbody>
          <tr><td>$TUV$</td><td>$${perimeterTUV}$</td></tr>
          <tr><td>$XYZ$</td><td>$${perimeterXYZ}$</td></tr>
        </tbody>
      </table>
    `;

    // The divided value used to be written with one decimal place (4 / 4 was
    // "1.0", 5 / 3 was "1.7"); it is now a whole number or a reduced fraction.
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const g = gcd(sideTU, scaleFactor);
    const dividedText = scaleFactor / g === 1 ? `${sideTU / g}` : `$\\frac{${sideTU / g}}{${scaleFactor / g}}$`;

    const optionsData = [
      { text: dividedText, isCorrect: false, reason: `it divides ${sideTU} by ${scaleFactor} instead of multiplying; triangle $XYZ$ is larger, so its sides are ${scaleFactor} times as long` },
      { text: sideTU.toString(), isCorrect: false, reason: `${sideTU} is the length of $\\overline{TU}$, not $\\overline{XY}$` },
      { text: sideXY.toString(), isCorrect: true, reason: '' },
      { text: (perimeterTUV + sideTU).toString(), isCorrect: false, reason: `it adds the perimeter of triangle $TUV$, ${perimeterTUV}, to ${sideTU}; corresponding sides are in the same ratio as the perimeters, so ${sideTU} must be multiplied by ${scaleFactor}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table gives the perimeters of similar triangles $TUV$ and $XYZ$, where $\\overline{TU}$ corresponds to $\\overline{XY}$. The length of $\\overline{TU}$ is ${sideTU}. What is the length of $\\overline{XY}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideXY.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The ratio of the perimeters is $\\frac{${perimeterXYZ}}{${perimeterTUV}} = ${scaleFactor}$. Since the triangles are similar, the ratio of the lengths of corresponding sides is also ${scaleFactor}, so $XY = ${scaleFactor}(${sideTU}) = ${sideXY}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
