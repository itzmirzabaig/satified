import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 811
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients in y = 6x + 3 form]
 * - Difficulty factors: [Infinitely many solutions, equivalent equations]
 * - Distractor patterns: [Various distribution patterns]
 * - Constraints: [Must multiply entire equation by 2]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_811 = {
  metadata: {
    id: "811",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Use base equation y = 6x + 3 pattern
    const m = getRandomInt(2, 8);
    const b = getRandomInt(2, 8);
    
    // STEP 2: Build question text
    const questionText = `One of the two equations in a system of linear equations is given. The system has infinitely many solutions. Which equation could be the second equation in this system?\n\n$$y = ${m}x + ${b}$$`;
    
    // STEP 3: Create options.
    // Each option carries a `kind` so its per-option explanation can be looked
    // up by its ACTUAL displayed letter after shuffling (letters are only
    // meaningful post-shuffle).
    const optionA = `$$y = 2(${m}x) + ${b}$$`; // Only x multiplied
    const optionB = `$$y = 2(${m}x + ${b})$$`; // Everything multiplied but not distributed
    const optionC = `$$2(y) = 2(${m}x) + ${b}$$`; // Only partial
    const optionD = `$$2(y) = 2(${m}x + ${b})$$`; // Correct - multiply both sides by 2

    const optionsData = [
      { text: optionA, isCorrect: false, kind: 'xOnly' },
      { text: optionB, isCorrect: false, kind: 'notDistributed' },
      { text: optionC, isCorrect: false, kind: 'partial' },
      { text: optionD, isCorrect: true, kind: 'correct' }
    ];

    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;

    // STEP 5: Build the per-option analysis in DISPLAYED order so every letter
    // in the explanation matches what the student sees.
    const analysisByKind: Record<string, string> = {
      xOnly: `$$y = 2(${m}x) + ${b}$$\n   Distributing gives $$y = ${2 * m}x + ${b}$$.\n   This is not equivalent to $$y = ${m}x + ${b}$$, so it is incorrect.`,
      notDistributed: `$$y = 2(${m}x + ${b})$$\n   Distributing gives $$y = ${2 * m}x + ${2 * b}$$.\n   This is not equivalent to $$y = ${m}x + ${b}$$, so it is incorrect.`,
      partial: `$$2(y) = 2(${m}x) + ${b}$$\n   This simplifies to $$2y = ${2 * m}x + ${b}$$, and dividing by $$2$$ gives $$y = ${m}x + ${b / 2}$$.\n   This is not equivalent to $$y = ${m}x + ${b}$$, so it is incorrect.`,
      correct: `$$2(y) = 2(${m}x + ${b})$$\n   This is the original equation with both sides multiplied by $$2$$.\n   $$2y = 2(${m}x) + 2(${b}) = ${2 * m}x + ${2 * b}$$\n   Dividing by $$2$$ returns $$y = ${m}x + ${b}$$, so this represents the same line and is the correct answer.`
    };
    const optionAnalysis = shuffledOptions
      .map(o => `${o.letter}. ${analysisByKind[o.kind]}`)
      .join('\n\n');

    // STEP 6: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: optionD,
      explanation: `The problem asks for a second equation that would result in a system with infinitely many solutions. A system of linear equations has infinitely many solutions if the two lines are identical, so the second equation must be equivalent to the first equation, $$y = ${m}x + ${b}$$.\n\nChecking each option:\n\n${optionAnalysis}\n\nThe correct option is **${correctLetter}**.`
    };
  }
};
