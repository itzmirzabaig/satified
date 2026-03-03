import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: babd7461
*
* ORIGINAL ANALYSIS:
* - Number ranges: [sideJK: 10-20, perimeterJKL: 30-50, sideRS: 100-150]
* - Difficulty factors: [Similar triangles, scale factor from sides applied to perimeter]
* - Distractor patterns: [multiplies perimeter by side, squares the scale factor]
* - Constraints: [Scale factor = RS/JK, RST perimeter = scale factor × JKL perimeter]
* - Question type: [Has Figure (Mafs), Multiple Choice Text]
* - Figure generation: [Similar triangles with labels]
*/

export const generator_babd7461 = {
  metadata: {
    // id: "babd7461",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const sideJK = getRandomInt(10, 20);
    const perimeterJKL = getRandomInt(30, 50);
    const scaleFactorInt = getRandomInt(5, 10);
    const sideRS = sideJK * scaleFactorInt;
    const scaleFactor = scaleFactorInt; // Keep as integer for cleaner math
    const perimeterRST = perimeterJKL * scaleFactor;

    // Fixed: Proper triangle points, valid coordinates for labels, proper Transform
    const mafsCode = `<Mafs viewBox={{ x: [-1, 8], y: [-1, 6] }}>
  <Polygon points={[[0, 0], [2, 0], [2, 1.5]]} color="var(--mafs-blue)" />
  <Text x={0} y={-0.3}>J</Text>
  <Text x={2.2} y={0}>K</Text>
  <Text x={2.2} y={1.5}>L</Text>
  <Transform translate={[4, 0]}>
    <Polygon points={[[0, 0], [${2 * scaleFactor}, 0], [${2 * scaleFactor}, ${1.5 * scaleFactor}]]} color="var(--mafs-red)" />
    <Text x={0} y={-0.3}>R</Text>
    <Text x={${2 * scaleFactor + 0.2}} y={0}>S</Text>
    <Text x={${2 * scaleFactor + 0.2}} y={${1.5 * scaleFactor}}>T</Text>
  </Transform>
</Mafs>`;

    const optionsData = [
      { text: perimeterRST.toString(), isCorrect: true },
      { text: (perimeterJKL * sideJK).toString(), isCorrect: false, reason: "multiplies perimeter by side instead of finding scale factor" },
      { text: (perimeterJKL * scaleFactor * scaleFactor).toString(), isCorrect: false, reason: "squares the scale factor (confusing with area ratio)" },
      { text: (perimeterRST + 50).toString(), isCorrect: false, reason: "random calculation error" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `In the figure shown, triangle $JKL$ is similar to triangle $RST$, where $J$ corresponds to $R$ and $K$ corresponds to $S$. The length of $\\overline{JK}$ is $${sideJK}$, and the perimeter of triangle $JKL$ is $${perimeterJKL}$. The length of $\\overline{RS}$ is $${sideRS}$. What is the perimeter of triangle $RST$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: perimeterRST.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The scale factor is $\\frac{${sideRS}}{${sideJK}} = ${scaleFactor}$. Since the triangles are similar, the ratio of perimeters equals the scale factor. Therefore, the perimeter of triangle $RST$ is $${perimeterJKL} \\times ${scaleFactor} = ${perimeterRST}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: 59cb654c
*
* ORIGINAL ANALYSIS:
* - Number ranges: [base: 7-10, area: 49-100]
* - Difficulty factors: [Finding side from area, square root]
* - Distractor patterns: [area/4, area itself, area×2]
* - Constraints: [Side = √Area, area must be perfect square]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/