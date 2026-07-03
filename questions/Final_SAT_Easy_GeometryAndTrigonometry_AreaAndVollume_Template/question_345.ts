import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question 345
*
* ORIGINAL ANALYSIS:
* - Number ranges: [dimensions 2-8]
* - Difficulty factors: [Volume of prism with figure]
* - Distractor patterns: [l×w×2, l×w, l+w+h]
* - Constraints: [Volume = l × w × h]
* - Question type: [Has Figure (SVG), Multiple Choice Text]
* - Figure generation: [3D rectangular prism representation]
*
* FIXED:
* - Original distractors D2 (base area = l·w) and D3 (l+w+h) collide for 5 of
*   the 80 draws (e.g. l=4,w=3,h=5 → both 12), which produced DUP_OPTIONS.
*   Added a bounded uniqueness retry (<=50) that redraws until the four option
*   values are distinct.
* - Replaced the Mafs prism (which drew off-scale and could overflow its
*   viewBox) with a plain, self-contained SVG isometric prism drawn at fixed
*   pixel coordinates so it always fits; the l/w/h labels are interpolated from
*   the live draw values so the figure matches the question every time.
* - Volume is integer by construction; explanation numbers come from the same
*   live variables and the correct letter is read from the shuffled array.
*/

export const generator_345 = {
  metadata: {
    id: "345",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    let length = getRandomInt(4, 8);
    let width = getRandomInt(2, 5);
    let height = getRandomInt(3, 6);

    // Bounded retry: guarantee the four option values are all distinct.
    const optionVals = () => {
      const baseArea = length * width;
      return [
        length * width * height, // correct volume
        baseArea * 2,            // multiplies base area by 2 instead of height
        baseArea,                // only the base area
        length + width + height  // adds the dimensions
      ];
    };
    let tries = 0;
    while (new Set(optionVals()).size < 4 && tries++ < 50) {
      length = getRandomInt(4, 8);
      width = getRandomInt(2, 5);
      height = getRandomInt(3, 6);
    }

    const volume = length * width * height;
    const baseArea = length * width;

    // Self-contained SVG of a right rectangular prism. The box is drawn at
    // fixed pixel coordinates (illustrative, not to scale, as on the SAT); only
    // the dimension labels change with the draw so they always match the text.
    const figureCode = `<div style="width:100%;max-width:320px;margin:0 auto;"><svg viewBox="0 0 300 220" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg">
  <!-- back face -->
  <polygon points="80,50 250,50 250,150 80,150" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
  <!-- front face -->
  <polygon points="40,80 210,80 210,180 40,180" fill="#3b82f6" fill-opacity="0.12" stroke="currentColor" stroke-width="2"/>
  <!-- connecting edges -->
  <line x1="40" y1="80" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>
  <line x1="210" y1="80" x2="250" y2="50" stroke="currentColor" stroke-width="2"/>
  <line x1="210" y1="180" x2="250" y2="150" stroke="currentColor" stroke-width="2"/>
  <line x1="40" y1="180" x2="80" y2="150" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3" opacity="0.6"/>
  <!-- labels -->
  <text x="125" y="200" text-anchor="middle" font-size="14" fill="currentColor">l = ${length}</text>
  <text x="224" y="135" text-anchor="start" font-size="14" fill="currentColor">h = ${height}</text>
  <text x="238" y="66" text-anchor="start" font-size="14" fill="currentColor">w = ${width}</text>
</svg></div>`;

    const optionsData = [
      { text: volume.toString(), isCorrect: true },
      { text: (baseArea * 2).toString(), isCorrect: false, reason: "multiplies the base area by 2 instead of by the height" },
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
      questionText: `The figure shows the lengths, in centimeters (cm), of the edges of a right rectangular prism. The volume $V$ of a right rectangular prism is $\\ell wh$, where $\\ell$ is the length of the prism, $w$ is the width of the prism, and $h$ is the height of the prism. What is the volume, in cubic centimeters, of the prism?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: volume.toString(),
      explanation: `Choice ${correctOption.letter} is correct. The volume is $V = \\ell wh = (${length})(${width})(${height}) = ${volume}$ cubic centimeters. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
