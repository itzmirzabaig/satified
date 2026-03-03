import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 167aff9e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [surface areas: 58 and 1450, volume Y: 1250]
 * - Difficulty factors: [Similar solids, surface area ratio → linear scale → volume scale]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Surface area ratio must be perfect square for clean scale factor]
 * - Question type: [Fill-in-the-blank]
 * - Figure generation: [None]
 */

export const generator_167aff9e = {
  metadata: {
    // id: "167aff9e",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate a clean scale factor
    // For similar solids: surface area ratio = k², volume ratio = k³
    // We need surface area ratio to be a perfect square
    const k = getRandomInt(3, 8); // Linear scale factor
    const kSquared = k * k; // Surface area ratio
    
    // STEP 2: Generate base surface area and calculate scaled
    // Keep numbers manageable but in similar range to original (58)
    const baseSurfaceArea = getRandomInt(20, 100);
    const scaledSurfaceArea = baseSurfaceArea * kSquared;
    
    // STEP 3: Calculate volumes
    // Volume ratio is k³
    const baseVolume = getRandomInt(10, 200); // Volume of smaller prism
    const scaledVolume = baseVolume * k * k * k; // Volume of larger prism
    
    // STEP 4: Calculate answer
    const sumVolumes = baseVolume + scaledVolume;
    
    return {
      questionText: `Right rectangular prism X is similar to right rectangular prism Y. The surface area of right rectangular prism X is $${baseSurfaceArea}$ square centimeters (cm²), and the surface area of right rectangular prism Y is $${scaledSurfaceArea}$ cm². The volume of right rectangular prism Y is $${scaledVolume}$ cubic centimeters (cm³). What is the sum of the volumes, in cm³, of right rectangular prism X and right rectangular prism Y?`,
      figureCode: null,
      options: null,
      correctAnswer: sumVolumes.toString(),
      explanation: `Since the prisms are similar, the ratio of surface areas equals the square of the linear scale factor. The ratio is $\\frac{${scaledSurfaceArea}}{${baseSurfaceArea}} = ${kSquared} = ${k}^2$, so the linear scale factor is $${k}$. The volume ratio is $${k}^3 = ${k*k*k}$. Since the volume of Y is $${scaledVolume}$, the volume of X is $\\frac{${scaledVolume}}{${k*k*k}} = ${baseVolume}$. The sum is $${baseVolume} + ${scaledVolume} = ${sumVolumes}$.`
    };
  }
};

/**
 * Question ID: 502d9690
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [areas: 648 and 72, longest side: 36]
 * - Difficulty factors: [Similar rectangles, area ratio = (linear ratio)²]
 * - Distractor patterns: [A: 4 (uses ratio directly), B: 9 (area ratio), C: 12 (correct), D: 36 (original side)]
 * - Constraints: [Area ratio must be perfect square for clean answer]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */