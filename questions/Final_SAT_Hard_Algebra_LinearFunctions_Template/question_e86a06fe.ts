import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: e86a06fe
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [suit fabric: 5 yards (single-digit), equation: y - 5x = 6]
 * - Difficulty factors: [Interpreting linear equation in context, understanding constant term]
 * - Distractor patterns: [A: wrong variable interpretation, B: wrong total, C: wrong usage amount]
 * - Constraints: [y = 5x + 6, interpret 6 as excess fabric]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_e86a06fe = {
  metadata: {
    // id: "e86a06fe",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const yardsPerSuit = getRandomInt(3, 8); // 3-8 yards per suit
    const excessFabric = getRandomInt(3, 12); // 3-12 yards excess
    
    // STEP 2: Create options
    const correctText = `Kaylani purchased ${excessFabric} yards more fabric than she used to make the suits.`;
    
    const optionsData = [
      { text: `Kaylani made ${excessFabric} suits.`, isCorrect: false, reason: `Kaylani made $x$ suits, not ${excessFabric} suits` },
      { text: `Kaylani purchased a total of ${yardsPerSuit * excessFabric} yards of fabric.`, isCorrect: false, reason: `the total yards purchased is $y = ${yardsPerSuit}x + ${excessFabric}$, not a fixed value` },
      { text: `Kaylani used a total of ${excessFabric} yards of fabric to make the suits.`, isCorrect: false, reason: `the total used is $${yardsPerSuit}x$ yards, not ${excessFabric} yards` },
      { text: correctText, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    return {
      questionText: `Kaylani used fabric measuring ${yardsPerSuit} yards in length to make each suit for a men's choir. The relationship between the number of suits that Kaylani made, $x$, and the total length of fabric that she purchased $y$, in yards, is represented by the equation $y-${yardsPerSuit} x=${excessFabric}$. What is the best interpretation of ${excessFabric} in this context?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Adding $${yardsPerSuit}x$ to both sides of $y - ${yardsPerSuit}x = ${excessFabric}$ yields $y = ${yardsPerSuit}x + ${excessFabric}$. Since Kaylani made $x$ suits and used ${yardsPerSuit} yards per suit, $${yardsPerSuit}x$ represents fabric used. Since $y$ is total purchased, ${excessFabric} represents excess fabric purchased beyond what was used. Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: e103300e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 4 (single-digit), intercept: 19 (double-digit)]
 * - Difficulty factors: [Interpreting x-intercept of linear function]
 * - Distractor patterns: [B: y-intercept interpretation, C: wrong slope description, D: slope interpretation]
 * - Constraints: [f(x) = 4x + 19, x-intercept is where f(x) = 0]
 * - Question type: [Word problem → Multiple Choice Text]
 * - Figure generation: [None]
 */

// File: generators/linear-functions/e103300e.ts