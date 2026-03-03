import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c984f1a5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 27]
 * - Difficulty factors: [Hemisphere volume formula, approximation]
 * - Distractor patterns: [A: 1500 (way off), B: 6100 (wrong formula), C: 30900 (full sphere), D: 41200 (correct)]
 * - Constraints: [Must use V = (2/3)πr³ for hemisphere]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_c984f1a5 = {
  metadata: {
    // id: "c984f1a5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Vollume",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate radius (double digit like original 27)
    const radius = getRandomInt(20, 35);
    
    // STEP 2: Calculate volumes
    // Full sphere: (4/3)πr³, Hemisphere: (2/3)πr³
    const hemisphereVolume = (2/3) * Math.PI * Math.pow(radius, 3);
    const fullSphereVolume = (4/3) * Math.PI * Math.pow(radius, 3);
    
    // STEP 3: Round and create distractors
    const correctVolume = Math.round(hemisphereVolume / 100) * 100; // Round to nearest hundred
    const distractorA = Math.round(correctVolume / 20 / 100) * 100; // Way too small
    const distractorB = Math.round((hemisphereVolume / 5) / 100) * 100; // Wrong formula
    const distractorC = Math.round(fullSphereVolume / 100) * 100; // Full sphere
    
    const correctText = correctVolume.toLocaleString();
    
    const optionsData = [
      { text: distractorA.toLocaleString(), isCorrect: false },
      { text: distractorB.toLocaleString(), isCorrect: false },
      { text: distractorC.toLocaleString(), isCorrect: false },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `A hemisphere is half of a sphere. If a hemisphere has a radius of $${radius}$ inches, which of the following is closest to the volume, in cubic inches, of this hemisphere?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctOption.letter} is correct. The volume of a hemisphere is $V = \\frac{2}{3}\\pi r^3 = \\frac{2}{3}\\pi(${radius})^3 = \\frac{2}{3}\\pi(${Math.pow(radius, 3).toLocaleString()}) \\approx ${Math.round((2/3) * Math.pow(radius, 3) * 3.14159).toLocaleString()} \\approx ${correctVolume}$ cubic inches. Choice ${incorrectOptions[0].letter} is incorrect because it is far too small. Choice ${incorrectOptions[1].letter} is incorrect because it uses the wrong formula. Choice ${incorrectOptions[2].letter} is incorrect because it calculates the volume of a full sphere instead of a hemisphere.`
    };
  }
};

/**
 * Question ID: 306264ab
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sides: 2√2, 6√2, √80]
 * - Difficulty factors: [Identifying right triangle from sides, simplifying radicals, area calculation]
 * - Distractor patterns: [A: 8√2+√80 (perimeter-like), B: 12 (correct), C: 24√80 (wrong), D: 24 (forgot 1/2)]
 * - Constraints: [Must satisfy Pythagorean theorem]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */