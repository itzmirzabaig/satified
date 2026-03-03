import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../types';



/**
 * Question ID: b0a72bdc
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (5, 3), radius squared: 16]
 * - Difficulty factors: [Standard form recognition, diameter vs radius]
 * - Distractor patterns: [Confusing r with r², using radius instead of diameter]
 * - Constraints: [Standard circle equation]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_b0a72bdc = {
  metadata: {
    // id: "b0a72bdc",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = getRandomInt(2, 8);
    const k = getRandomInt(2, 8);
    
    // STEP 2: Generate radius
    const r = getRandomInt(3, 8);
    const rSquared = r * r;
    const diameter = 2 * r;
    
    // STEP 3: Generate distractors
    const distractorA = r; // Radius
    const distractorC = rSquared; // r²
    const distractorD = 2 * rSquared; // Double r² (nonsense)
    
    const correctText = diameter.toString();
    
    const optionsData = [
      { text: distractorA.toString(), isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorC.toString(), isCorrect: false },
      { text: distractorD.toString(), isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `What is the diameter of the circle in the $xy$-plane with equation $(x-${h})^{2}+(y-${k})^{2}=${rSquared}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The equation is in standard form $(x-h)^{2}+(y-k)^{2}=r^{2}$, where $r^{2}=${rSquared}$. Thus $r=${r}$ and the diameter is $2r=${diameter}$. Choice ${incorrectOptions[0].letter} is incorrect; this is the radius, not the diameter. Choice ${incorrectOptions[1].letter} is incorrect; this is $r^{2}$. Choice ${incorrectOptions[2].letter} is incorrect; this results from doubling $r^{2}$ instead of $r$.`
    };
  }
};

/**
 * Question ID: 249d3f80
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [arc measure: 100°, angle: same]
 * - Difficulty factors: [Central angle definition]
 * - Distractor patterns: [Confusing with inscribed angle]
 * - Constraints: [Direct relationship arc=central angle]
 * - Question type: [Conceptual→Fill in blank]
 * - Figure generation: [None]
 */