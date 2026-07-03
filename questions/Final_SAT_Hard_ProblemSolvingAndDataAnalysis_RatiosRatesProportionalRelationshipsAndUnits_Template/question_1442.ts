import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1442
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [side ratio: 3:1, field strength: 29.00, total flux: 4640]
 * - Difficulty factors: [Area ratio of squares, algebraic setup, proportional reasoning]
 * - Distractor patterns: [Fill-in-the-blank - no distractors]
 * - Constraints: [Area ratio is 9:1 (3²), total parts = 10, must divide 4640 appropriately]
 * - Question type: [Text→Fill-in-the-blank]
 * - Figure generation: [None - conceptual]
 */

export const generator_1442 = {
  metadata: {
    id: "1442",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // Flux = field strength × area. Two adjacent squares: the larger square's side
    // is `sideRatio` times the smaller square's side, so their areas are in the
    // ratio sideRatio² : 1. With smaller area = A, larger area = areaRatio·A and
    // total area = (areaRatio + 1)·A, the flux through the larger square is
    //   fieldStrength × areaRatio × A.
    //
    // Answer-first construction keeps every displayed quantity a clean integer:
    //   pick fieldStrength as a whole number (shown as "NN.00", matching the
    //   original 29.00), pick the small area as an integer, then derive the
    //   integer total flux and integer large-square flux exactly.
    const sideRatio = getRandomInt(2, 5);            // 3 in the original
    const areaRatio = sideRatio * sideRatio;         // 9 for ratio 3:1
    const totalParts = areaRatio + 1;                // small (1) + large (areaRatio)

    const fieldStrength = getRandomInt(10, 40);      // whole number, displayed as NN.00
    const smallArea = getRandomInt(5, 20);           // smaller square's area (m²), integer
    const largeArea = smallArea * areaRatio;         // larger square's area (m²), integer
    const totalArea = smallArea * totalParts;        // combined area (m²), integer

    const totalFlux = fieldStrength * totalArea;     // integer volts·meters
    const largeFlux = fieldStrength * largeArea;     // integer volts·meters (the answer)

    const strengthText = fieldStrength.toFixed(2);   // e.g. "29.00"

    return {
      questionText: `For an electric field passing through a flat surface perpendicular to it, the electric flux of the electric field through the surface is the product of the electric field's strength and the area of the surface. A certain flat surface consists of two adjacent squares, where the side length, in meters, of the larger square is ${sideRatio} times the side length, in meters, of the smaller square. An electric field with strength ${strengthText} volts per meter passes uniformly through this surface, which is perpendicular to the electric field. If the total electric flux of the electric field through this surface is ${totalFlux.toLocaleString()} volts · meters, what is the electric flux, in volts · meters, of the electric field through the larger square?`,
      figureCode: null,
      options: [],
      correctAnswer: largeFlux.toString(),
      explanation: `The correct answer is ${largeFlux.toLocaleString()}. Because the larger square's side is ${sideRatio} times the smaller square's side, their areas are in the ratio ${sideRatio}² = ${areaRatio} to 1, so the total area is split into ${totalParts} equal parts (${areaRatio} for the larger square and 1 for the smaller). The total area is the total flux divided by the field strength: ${totalFlux.toLocaleString()} ÷ ${strengthText} = ${totalArea.toLocaleString()} square meters. The larger square therefore has area ${largeArea.toLocaleString()} square meters (${areaRatio} of the ${totalParts} parts), and its flux is ${strengthText} × ${largeArea.toLocaleString()} = ${largeFlux.toLocaleString()} volts · meters.`
    };
  }
};
