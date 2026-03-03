import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: 689abc2a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideTU: 4-8, scaleFactor: 2-4, perimeterTUV: 30-60]
* - Difficulty factors: [Similar triangles with table, scale factor from perimeters]
* - Distractor patterns: [divides by scale factor, repeats side length, adds perimeter to side]
* - Constraints: [Scale factor = XYZ perimeter / TUV perimeter, XY = TU × scale factor]
* - Question type: [Has Table, Multiple Choice Text]
* - Figure generation: [HTML Table]
*/

export const generator_689abc2a = {
  metadata: {
    // id: "689abc2a",
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

    const optionsData = [
      { text: (sideTU / scaleFactor).toFixed(1), isCorrect: false, reason: "divides by scale factor instead of multiplying" },
      { text: sideTU.toString(), isCorrect: false, reason: "states the length of TU instead of XY" },
      { text: sideXY.toString(), isCorrect: true },
      { text: (perimeterTUV + sideTU).toString(), isCorrect: false, reason: "adds perimeter to side length" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The table gives the perimeters of similar triangles $TUV$ and $XYZ$, where $\\overline{TU}$ corresponds to $\\overline{XY}$. The length of $\\overline{TU}$ is $${sideTU}$. What is the length of $\\overline{XY}$?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: sideXY.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The ratio of perimeters is $\\frac{${perimeterXYZ}}{${perimeterTUV}} = ${scaleFactor}$. Since the triangles are similar, XY = ${sideTU} × ${scaleFactor} = ${sideXY}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 0837c3b9
*
* ORIGINAL ANALYSIS:
* - Number ranges: [areaP: 60-100, removed: 15-30]
* - Difficulty factors: [Subtraction of areas]
* - Distractor patterns: [adds areas, calculation error]
* - Constraints: [Result = P - removed]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/