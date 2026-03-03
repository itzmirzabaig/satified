import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
* Question ID: c47256ca
*
* ORIGINAL ANALYSIS:
* - Number ranges: [speed: 64 yards/sec, conversion: 3 feet/yard, answer: 192 feet/sec]
* - Difficulty factors: [Rate conversion, multiplication]
* - Distractor patterns: [A: 61 (64-3), B: 67 (64+3), C: 94 (random), D: 192 (correct, 64×3)]
* - Constraints: [Simple multiplication]
* - Question type: [Multiple Choice Text]
* - Figure generation: [None]
*/

export const generator_c47256ca = {
  metadata: {
    // id: "c47256ca",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Ratios Rates Proportional Relationships And Units",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    const yardsPerSec = getRandomInt(50, 80);
    const feetPerYard = 3;
    const feetPerSec = yardsPerSec * feetPerYard;

    const distractor1 = yardsPerSec - feetPerYard;
    const distractor2 = yardsPerSec + feetPerYard;
    const distractor3 = yardsPerSec + 30;

    const optionsData = [
      { text: distractor1.toString(), isCorrect: false, reason: "subtracting the values" },
      { text: distractor2.toString(), isCorrect: false, reason: "adding the values" },
      { text: distractor3.toString(), isCorrect: false, reason: "an unrelated calculation" },
      { text: feetPerSec.toString(), isCorrect: true, reason: null }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // Fixed: Use $...$ only for math, plain text for words
    const explanation = `To convert from yards per second to feet per second, multiply the number of yards by ${feetPerYard}. $${yardsPerSec} \\times ${feetPerYard} = ${feetPerSec}$. Choice ${correctLetter} is correct. Choice ${incorrectOptions[0].letter} is incorrect; it results from ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it results from ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it results from ${incorrectOptions[2].reason}.`;

    return {
      // Fixed: Plain text for units, no \\text{} needed
      questionText: `An object's speed is ${yardsPerSec} yards per second. What is the object's speed, in feet per second? (1 yard = ${feetPerYard} feet)`,
      figureCode: null,
      options: shuffledOptions.map(opt => opt.text),
      correctAnswer: feetPerSec.toString(),
      explanation: explanation
    };
  }
};

/**
* Question ID: 551c52b9
*
* ORIGINAL ANALYSIS:
* - Number ranges: [earns p dollars per w hours, asks for 39w hours, answer: 39p]
* - Difficulty factors: [Proportional reasoning with variables, algebraic expression]
* - Distractor patterns: [A: 39p (correct), B: p/39 (divided), C: p+39 (added), D: p-39 (subtracted)]
* - Constraints: [Must recognize 39w is 39 times w]
* - Question type: [Multiple Choice Text with algebraic expressions]
* - Figure generation: [None]
*/