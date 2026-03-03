import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: fa2771d5
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (7, -3), translation: 4 units right]
 * - Difficulty factors: [Horizontal translation of circle]
 * - Distractor patterns: [Wrong direction, changing y instead of x]
 * - Constraints: [Only x-coordinate changes for horizontal shift]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_fa2771d5 = {
  metadata: {
    // id: "fa2771d5",
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate center
    const h = getRandomInt(3, 10);
    const k = -getRandomInt(1, 6);
    const r = getRandomInt(1, 4);
    
    // STEP 2: Generate translation
    const shift = getRandomInt(2, 6);
    
    // STEP 3: Calculate new center
    const newH = h + shift;
    
    // STEP 4: Generate distractors
    // Distractor A: Shifted up (changed y)
    const distractorA = `(x-${h})^{2}+(y+${Math.abs(k + shift)})^{2}=${r*r}`;
    
    // Distractor B: Shifted left
    const distractorB = `(x-${h - shift})^{2}+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^{2}=${r*r}`;
    
    // Distractor D: Shifted down
    const distractorD = `(x-${h})^{2}+(y-${k - shift})^{2}=${r*r}`;
    
    const correctText = `(x-${newH})^{2}+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^{2}=${r*r}`;
    
    const optionsData = [
      { text: distractorA, isCorrect: false },
      { text: distractorB, isCorrect: false },
      { text: correctText, isCorrect: true },
      { text: distractorD, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `Circle A has equation $(x-${h})^{2}+(y${k >= 0 ? '-' : '+'}${Math.abs(k)})^{2}=${r*r}$. In the $xy$-plane, circle B is obtained by translating circle A to the right ${shift} units. Which equation represents circle B?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The original center is $(${h}, ${k})$. Translating ${shift} units right changes the x-coordinate: $${h}+${shift}=${newH}$. The y-coordinate and radius remain unchanged. Choice ${incorrectOptions[0].letter} is incorrect; this translates up. Choice ${incorrectOptions[1].letter} is incorrect; this translates left. Choice ${incorrectOptions[2].letter} is incorrect; this translates down.`
    };
  }
};

/**
 * Question ID: 1a2b3c4d
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (16, 17), radius: 7k]
 * - Difficulty factors: [Symbolic radius, squaring coefficient]
 * - Distractor patterns: [Forgetting to square k, wrong coefficient]
 * - Constraints: [(7k)² = 49k²]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */