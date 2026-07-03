import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1289
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [dimensions l,w in 3..8, h in 4..10]
 * - Difficulty factors: [Surface area of a right rectangular prism]
 * - Distractor patterns: [one face lw, sum of three faces (no doubling), volume, correct surface area]
 * - Constraints: [Standard SA formula application; all four options distinct]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1289 = {
  metadata: {
    id: "1289",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate dimensions.
    // Guard so the correct answer and all three distractors are pairwise
    // distinct for the chosen draw. The notable collision across the range is
    //   C (volume l*w*h) == D (surface area 2(lw+lh+wh))
    // e.g. (5,5,10) -> 250 == 250 and (6,6,6) -> 216 == 216. The sum-of-faces
    // distractor can also coincide with the volume for some triples. Bounded
    // retry keeps the intended four-value distractor structure intact.
    let l = getRandomInt(3, 8);
    let w = getRandomInt(3, 8);
    let h = getRandomInt(4, 10);
    let tries = 0;
    while (tries++ < 50) {
      const f1 = l * w;
      const sum = l * w + l * h + w * h;
      const vol = l * w * h;
      const sa = 2 * sum;
      if (new Set([f1, sum, vol, sa]).size === 4) break;
      l = getRandomInt(3, 8);
      w = getRandomInt(3, 8);
      h = getRandomInt(4, 10);
    }

    // STEP 2: Calculate surface area and distractors
    const face1 = l * w;
    const face2 = l * h;
    const face3 = w * h;
    const sumFaces = face1 + face2 + face3;
    const surfaceArea = 2 * sumFaces;
    const volume = l * w * h;

    // STEP 3: Create distractors
    const distractorOneFace = face1;   // Just one face
    const distractorNoDouble = sumFaces; // Sum of three faces without doubling
    const distractorVolume = volume;   // Volume instead of surface area

    const correctText = surfaceArea.toString();

    const optionsData = [
      { text: distractorOneFace.toString(), isCorrect: false, kind: 'oneFace' },
      { text: distractorNoDouble.toString(), isCorrect: false, kind: 'noDouble' },
      { text: distractorVolume.toString(), isCorrect: false, kind: 'volume' },
      { text: correctText, isCorrect: true, kind: 'correct' }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const letterOf = (kind: string) => shuffledOptions.find(o => o.kind === kind)!.letter;

    return {
      questionText: `The dimensions of a right rectangular prism are $${l}$ inches by $${w}$ inches by $${h}$ inches. What is the surface area, in square inches, of the prism?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The surface area is $2(lw + lh + wh) = 2((${l})(${w}) + (${l})(${h}) + (${w})(${h})) = 2(${face1} + ${face2} + ${face3}) = 2(${sumFaces}) = ${surfaceArea}$ square inches. Choice ${letterOf('oneFace')} is incorrect because it finds the area of only one face. Choice ${letterOf('noDouble')} is incorrect because it adds the three distinct face areas without doubling them (a prism has 6 faces, not 3). Choice ${letterOf('volume')} is incorrect because it computes the volume instead of the surface area.`
    };
  }
};
