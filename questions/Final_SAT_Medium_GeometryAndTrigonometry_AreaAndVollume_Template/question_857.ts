import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 857
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [radius: 43 (double-digit)]
 * - Difficulty factors: [Circle area formula, squaring double-digit numbers]
 * - Distractor patterns: [A: r/2, B: r, C: 2r (circumference)]
 * - Constraints: [Radius should be such that r² is clean]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_857 = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Area And Volume",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const radius = getRandomInt(30, 50); // Double-digit like 43
    
    // STEP 2: Calculate derived values
    const areaCoeff = radius * radius;
    
    // STEP 3: Create options. Each distractor carries the rationale that matches
    // ITS OWN value, so the explanation stays correct no matter how the shuffle
    // reorders the choices.
    const correctText = `${areaCoeff}\\pi`;

    // Distractor A: r*pi/2  — halves the radius before applying pi (misuse of the formula)
    const distractorA = `\\frac{${radius}\\pi}{2}`;
    // Distractor B: r*pi    — forgot to square the radius (used pi*r instead of pi*r^2)
    const distractorB = `${radius}\\pi`;
    // Distractor C: 2*r*pi  — computed the circumference (2*pi*r) instead of the area
    const distractorC = `${2 * radius}\\pi`;

    const optionsData = [
      { text: distractorA, isCorrect: false, reason: `this halves the radius before applying $\\pi$, rather than squaring the radius as the area formula requires` },
      { text: distractorB, isCorrect: false, reason: `this would be the result if the formula were $\\pi r$ instead of $\\pi r^2$` },
      { text: distractorC, isCorrect: false, reason: `this is the circumference of the circle ($2\\pi r$), not the area` },
      { text: correctText, isCorrect: true, reason: '' }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    // Report the distractors in letter order, each paired with its own rationale.
    const incorrectOptions = shuffledOptions
      .filter(o => !o.isCorrect)
      .sort((a, b) => a.letter.localeCompare(b.letter));

    // STEP 5: Build explanation — rationales follow each distractor's value.
    const distractorSentences = incorrectOptions
      .map(o => `Choice ${o.letter} is incorrect; ${o.reason}.`)
      .join(' ');
    const explanation = `Choice ${correctLetter} is correct. The area of a circle is $A = \\pi r^2$. With radius ${radius}, the area is $\\pi(${radius})^2 = ${areaCoeff}\\pi$ square meters. ${distractorSentences}`;
    
    return {
      questionText: `A circle has a radius of $${radius}$ meters. What is the area, in square meters, of the circle?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};