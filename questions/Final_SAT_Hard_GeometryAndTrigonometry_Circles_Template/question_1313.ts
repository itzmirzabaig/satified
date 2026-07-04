import { getRandomInt, getRandomElement, shuffle, getRandomNonZeroInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1313
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [center: (5, 3), radius squared: 16]
 * - Difficulty factors: [Standard form recognition, diameter vs radius]
 * - Distractor patterns: [Confusing r with r², using radius instead of diameter]
 * - Constraints: [Standard circle equation]
 * - Question type: [Conceptual→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1313 = {
  metadata: {
    id: "1313",
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
    
    // STEP 3: Generate distractors, each carrying its own explanation reason
    // (reasons are tied to the distractor's mathematical identity, not its
    // eventual shuffle position).
    const correctText = diameter.toString();

    const optionsData = [
      { text: r.toString(), isCorrect: false, reason: `this is the radius, not the diameter` },
      { text: correctText, isCorrect: true, reason: `` },
      { text: rSquared.toString(), isCorrect: false, reason: `this is $r^{2}$, not the diameter` },
      { text: (2 * rSquared).toString(), isCorrect: false, reason: `this results from doubling $r^{2}$ instead of $r$` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    const distractorText = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');

    return {
      questionText: `What is the diameter of the circle in the $xy$-plane with equation $(x-${h})^{2}+(y-${k})^{2}=${rSquared}$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The equation is in standard form $(x-h)^{2}+(y-k)^{2}=r^{2}$, where $r^{2}=${rSquared}$. Thus $r=${r}$ and the diameter is $2r=${diameter}$. ${distractorText}`
    };
  }
};
