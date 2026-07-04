import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1277
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [edge length: 68, radius: 34 (double-digit)]
 * - Difficulty factors: [Volume formulas, cube-sphere relationship, subtraction]
 * - Distractor patterns: [A: correct, B: sphere volume only, C: calculation error, D: cube volume only]
 * - Constraints: [Sphere touches center of each face means diameter = edge length]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None - conceptual 3D geometry]
 */

export const generator_1277 = {
  metadata: {
    id: "1277",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values - preserve relationship that sphere fits in cube
    // Original: edge = 68, radius = 34 (so diameter = edge)
    // We need edge = 2 * radius, and both should be reasonable numbers
    const radius = getRandomInt(20, 50); // Double-digit range like original
    const edge = radius * 2;
    
    // STEP 2: Calculate volumes
    const cubeVolume = Math.pow(edge, 3);
    const sphereVolume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const remainingVolume = cubeVolume - sphereVolume;
    const roundedRemaining = Math.round(remainingVolume);
    
    // STEP 3: Create distractors based on SAT patterns
    // A: correct answer (rounded)
    // B: sphere volume only (rounded)
    // C: some miscalculation
    // D: cube volume only
    
    const sphereVolumeRounded = Math.round(sphereVolume);
    const cubeVolumeRounded = Math.round(cubeVolume);
    const miscalculation = Math.round(cubeVolume - (2/3) * sphereVolume); // Wrong formula

    // Tag each distractor with its conceptual "kind" so the explanation can
    // reference the reason that matches each distractor's identity — not its
    // arbitrary post-shuffle position.
    const optionsData = [
      { text: roundedRemaining.toString(), isCorrect: true, kind: 'correct' },
      { text: sphereVolumeRounded.toString(), isCorrect: false, kind: 'sphere' },
      { text: miscalculation.toString(), isCorrect: false, kind: 'miscalc' },
      { text: cubeVolumeRounded.toString(), isCorrect: false, kind: 'cube' }
    ];

    // STEP 4: Shuffle options
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const sphereOption = shuffledOptions.find(o => o.kind === 'sphere')!;
    const miscalcOption = shuffledOptions.find(o => o.kind === 'miscalc')!;
    const cubeOption = shuffledOptions.find(o => o.kind === 'cube')!;

    return {
      questionText: `A cube has an edge length of $${edge}$ inches. A solid sphere with a radius of $${radius}$ inches is inside the cube, such that the sphere touches the center of each face of the cube. To the nearest cubic inch, what is the volume of the space in the cube not taken up by the sphere?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The volume of the cube is $${edge}^3 = ${cubeVolume.toLocaleString()}$ cubic inches. The volume of the sphere is $\\frac{4}{3}\\pi(${radius})^3 \\approx ${sphereVolumeRounded.toLocaleString()}$ cubic inches. The remaining volume is approximately $${cubeVolume.toLocaleString()} - ${sphereVolumeRounded.toLocaleString()} \\approx ${roundedRemaining.toLocaleString()}$ cubic inches. Choice ${sphereOption.letter} is incorrect because it represents only the volume of the sphere. Choice ${miscalcOption.letter} is incorrect due to a calculation error. Choice ${cubeOption.letter} is incorrect because it represents only the volume of the cube.`
    };
  }
};
