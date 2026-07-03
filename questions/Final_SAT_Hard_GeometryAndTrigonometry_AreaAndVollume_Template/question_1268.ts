import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1268
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [volume: 71148π, base area: 5929π]
 * - Difficulty factors: [Cone slant height, multi-step: find h from V and base, find r from base, then l = √(r²+h²)]
 * - Distractor patterns: [A: 12 (random), B: 36 (height), C: 77 (radius), D: 85 (correct)]
 * - Constraints: [Numbers must work out to Pythagorean triple or similar]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1268 = {
  metadata: {
    id: "1268",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate Pythagorean triple for (r, h, l)
    // Original: 77, 36, 85 (since 77² + 36² = 5929 + 1296 = 7225 = 85²)
    // Generate similar triple or use scaled version
    const pythagoreanTriples = [
      [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25],
      [20, 21, 29], [12, 35, 37], [9, 40, 41], [28, 45, 53],
      [11, 60, 61], [16, 63, 65], [33, 56, 65], [48, 55, 73],
      [13, 84, 85], [36, 77, 85], [39, 80, 89], [65, 72, 97]
    ];
    
    const triple = pythagoreanTriples[getRandomInt(0, pythagoreanTriples.length - 1)];
    const scale = getRandomInt(1, 3); // Scale for larger numbers
    const radius = triple[0] * scale;
    const height = triple[1] * scale;
    const slantHeight = triple[2] * scale;

    // STEP 2: Calculate volume and base area (coefficients of π only)
    // baseArea = r²; volume = (1/3)r²h. For any Pythagorean triple one leg is
    // divisible by 3, so r²·h is always divisible by 3 → volume is exact.
    const baseArea = radius * radius; // πr², coefficient only
    const volume = (baseArea * height) / 3; // (1/3)πr²h, coefficient only (exact integer)

    // STEP 3: Create distractors
    // B = height only, C = radius only (both legs < hypotenuse, so neither can
    // equal the slant height; the two legs of a Pythagorean triple are never
    // equal, so B ≠ C). A is a nearby plausible value, guarded so it collides
    // with none of {radius, height, slantHeight}.
    const distractorB = height; // Height only
    const distractorC = radius; // Radius only
    const taken = new Set([radius, height, slantHeight]);
    let distractorA = slantHeight + getRandomInt(1, 5);
    let tries = 0;
    while (taken.has(distractorA) && tries++ < 50) {
      distractorA = slantHeight + getRandomInt(1, 9);
    }

    const correctText = slantHeight.toString();

    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: distractorB.toString(), isCorrect: false },
      { text: distractorC.toString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    // Look up each distractor's post-shuffle letter by its value so the
    // explanation's reasons always match the choices (all four values distinct).
    const letterOf = (val: number) =>
      shuffledOptions.find(o => o.text === val.toString())!.letter;
    const letterHeight = letterOf(distractorB);
    const letterRadius = letterOf(distractorC);
    const letterOther = letterOf(distractorA);

    return {
      questionText: `A right circular cone has a volume of $${volume.toLocaleString()}\\pi$ cubic centimeters and the area of its base is $${baseArea.toLocaleString()}\\pi$ square centimeters. What is the slant height, in centimeters, of this cone?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. From the base area $\\pi r^2 = ${baseArea.toLocaleString()}\\pi$, we get $r = ${radius}$. From the volume $V = \\frac{1}{3}\\pi r^2 h = ${volume.toLocaleString()}\\pi$, substituting $r = ${radius}$ gives $\\frac{1}{3}(${baseArea.toLocaleString()})h = ${volume.toLocaleString()}$, so $h = ${height}$. The slant height is $l = \\sqrt{r^2 + h^2} = \\sqrt{${radius * radius} + ${height * height}} = \\sqrt{${radius * radius + height * height}} = ${slantHeight}$. Choice ${letterRadius} is incorrect because it gives the radius instead of the slant height. Choice ${letterHeight} is incorrect because it gives the height instead of the slant height. Choice ${letterOther} is incorrect because it is not obtained from the volume and base area.`
    };
  }
};
