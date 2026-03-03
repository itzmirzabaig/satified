import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
* Question ID: d683a9cc
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 2-8]
* - Difficulty factors: [Volume of prism with figure]
* - Distractor patterns: [l×w×2, l×w, l+w+h]
* - Constraints: [Volume = l × w × h]
* - Question type: [Has Figure (Mafs), Multiple Choice Text]
* - Figure generation: [3D rectangular prism representation]
*/

export const generator_d683a9cc = {
  metadata: {
    // id: "d683a9cc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const length = getRandomInt(4, 8);
    const width = getRandomInt(2, 5);
    const height = getRandomInt(3, 6);
    const volume = length * width * height;
    const baseArea = length * width;

    // Scale for visualization (divide by 2 to fit in view)
    const l = length / 2;
    const w = width / 2;
    const h = height / 2;
    const offset = 0.5; // for 3D effect

    // Fixed: Proper 3D prism with front face, back face, and connecting edges
    const mafsCode = `<Mafs viewBox={{ x: [-1, ${l + w + 1}], y: [-1, ${h + offset + 1}] }}>
  <!-- Front face (rectangle) -->
  <Polygon points={[[0, 0], [${l}, 0], [${l}, ${h}], [0, ${h}]]} color="var(--mafs-blue)" fillOpacity={0.3} />
  
  <!-- Back face (offset rectangle) -->
  <Polygon points={[[${offset}, ${offset}], [${l + offset}, ${offset}], [${l + offset}, ${h + offset}], [${offset}, ${h + offset}]]} color="var(--mafs-blue)" fillOpacity={0.1} />
  
  <!-- Connecting edges (front to back) -->
  <Line.Segment point1={[0, 0]} point2={[${offset}, ${offset}]} color="var(--mafs-blue)" />
  <Line.Segment point1={[${l}, 0]} point2={[${l + offset}, ${offset}]} color="var(--mafs-blue)" />
  <Line.Segment point1={[${l}, ${h}]} point2={[${l + offset}, ${h + offset}]} color="var(--mafs-blue)" />
  <Line.Segment point1={[0, ${h}]} point2={[${offset}, ${h + offset}]} color="var(--mafs-blue)" />
  
  <!-- Labels -->
  <Text x={${l / 2}} y={-0.4}>l = ${length}</Text>
  <Text x={${l + 0.3}} y={${h / 2}}>h = ${height}</Text>
  <Text x={${l + offset + 0.2}} y={${offset / 2}}>w = ${width}</Text>
</Mafs>`;

    const optionsData = [
      { text: volume.toString(), isCorrect: true },
      { text: (baseArea * 2).toString(), isCorrect: false, reason: "multiplies base area by 2 instead of by height" },
      { text: baseArea.toString(), isCorrect: false, reason: "calculates only the base area" },
      { text: (length + width + height).toString(), isCorrect: false, reason: "adds the three dimensions instead of multiplying" }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The figure shows the lengths, in centimeters (cm), of the edges of a right rectangular prism. The volume \\(V\\) of a right rectangular prism is \\(\\ell wh\\), where \\(\\ell\\) is the length of the prism, \\(w\\) is the width of the prism, and \\(h\\) is the height of the prism. What is the volume, in cubic centimeters, of the prism?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: volume.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The volume is calculated as \\(V = \\ell wh = (${length})(${width})(${height}) = ${volume}\\) cubic centimeters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};

/**
* Question ID: a490003a
*
* ORIGINAL ANALYSIS:
* - Number ranges: [width 5-10, difference 30-50]
* - Difficulty factors: [Word problem, finding length then area]
* - Distractor patterns: [width, 2×width, sum of sides]
* - Constraints: [Length = width + 40, Area = length × width]
* - Question type: [No figure, Multiple Choice Text]
* - Figure generation: [None]
*/