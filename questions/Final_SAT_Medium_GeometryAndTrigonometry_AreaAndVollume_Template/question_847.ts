import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 847
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [base area: 75, height: 10, syrup: 110]
 * - Difficulty factors: [Volume subtraction, total vs partial volume]
 * - Distractor patterns: [A: base/10, B: syrup×something, D: total volume]
 * - Constraints: [Numbers should produce clean integer fruit volume]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_847 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const baseArea = getRandomInt(60, 90);
    const height = getRandomInt(8, 12);
    const totalVolume = baseArea * height;
    const syrupVolume = getRandomInt(100, 150);
    const fruitVolume = totalVolume - syrupVolume;
    
    // STEP 2: Create options with tracking
    // Each distractor carries its OWN rationale so the explanation stays
    // correct after shuffling (reason is bound to the value, not to a letter).
    const correctText = `${fruitVolume}\\text{ cm}^3`;

    // Distractors
    const distractorA = `${(baseArea / 10).toFixed(1)}\\text{ cm}^3`; // Base/10
    const distractorB = `${(syrupVolume + baseArea)}\\text{ cm}^3`; // Syrup + base
    const distractorD = `${totalVolume}\\text{ cm}^3`; // Total volume

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `this divides the base area by 10, which is not part of the volume calculation` },
      { text: distractorB, isCorrect: false, reason: `this adds the syrup volume and the base area, two unrelated quantities` },
      { text: correctText, isCorrect: true, reason: '' },
      { text: distractorD, isCorrect: false, reason: `this is the total volume of the can, not just the volume of the fruit` }
    ];

    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    // STEP 4: Build explanation — pull each distractor's reason from the
    // shuffled option itself so every letter matches its actual value.
    const distractorExplanations = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');
    const explanation = `Choice ${correctLetter} is correct. The total volume of the can is $V = \\text{base area} \\times \\text{height} = ${baseArea} \\times ${height} = ${totalVolume}$ cm³. The volume of fruit is the total volume minus the syrup volume: $${totalVolume} - ${syrupVolume} = ${fruitVolume}$ cm³. ${distractorExplanations}`;
    
    return {
      // FIXED: Changed \\\\text to \\text in questionText
      questionText: `A cylindrical can containing pieces of fruit is filled to the top with syrup before being sealed. The base of the can has an area of $${baseArea}\\text{ cm}^2$, and the height of the can is $${height}\\text{ cm}$. If $${syrupVolume}\\text{ cm}^3$ of syrup is needed to fill the can to the top, which of the following is closest to the total volume of the pieces of fruit in the can?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};