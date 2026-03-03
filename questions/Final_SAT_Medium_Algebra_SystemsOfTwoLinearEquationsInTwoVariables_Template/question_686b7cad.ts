import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 686b7cad
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [votes: 15,000 difference, ratio: 3:1]
 * - Difficulty factors: [Word problem, system from ratios]
 * - Distractor patterns: [7500, 15000, 22500, 45000]
 * - Constraints: [Integer solution]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_686b7cad = {
  metadata: {
    // id: "686b7cad",
    assessment: "SAT",
    test: "Math",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    const ratio = getRandomInt(2, 5);
    const difference = getRandomInt(10000, 25000);
    
    // f = ratio * a, f = a + difference
    // ratio * a = a + difference
    // a * (ratio - 1) = difference
    // a = difference / (ratio - 1)
    
    // Ensure clean division
    const adjustedDiff = difference - (difference % (ratio - 1));
    const against = adjustedDiff / (ratio - 1);
    const favor = ratio * against;
    
    // STEP 2: Build question text
    const questionText = `A proposal for a new library was included on an election ballot. A radio show stated that $${ratio}$ times as many people voted in favor of the proposal as people who voted against it. A social media post reported that $${adjustedDiff.toLocaleString()}$ more people voted in favor of the proposal than voted against it. Based on these data, how many people voted against the proposal?`;
    
    // STEP 3: Create options
    const distractor1 = Math.floor(against / 2);
    const distractor2 = adjustedDiff;
    const distractor3 = favor;
    
    const optionsData = [
      { text: against.toLocaleString(), isCorrect: true },
      { text: distractor2.toLocaleString(), isCorrect: false },
      { text: distractor3.toLocaleString(), isCorrect: false },
      { text: (favor * 2).toLocaleString(), isCorrect: false }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // STEP 5: Return question data
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: against.toLocaleString(),
      explanation: `Let $f$ be the number of people who voted in favor of the proposal.\nLet $a$ be the number of people who voted against the proposal.\n\nFrom the first statement ("$${ratio}$ times as many people voted in favor... as people who voted against it"), we can write the equation:\n$f = ${ratio}a$\n\nFrom the second statement ("$${adjustedDiff.toLocaleString()}$ more people voted in favor... than voted against it"), we can write the equation:\n$f = a + ${adjustedDiff}$\n\nNow we have a system of two equations:\n1) $f = ${ratio}a$\n2) $f = a + ${adjustedDiff}$\n\nSubstitute the first equation into the second equation:\n${ratio}a = a + ${adjustedDiff}$\n\nSubtract $a$ from both sides to isolate the variable $a$:\n${ratio}a - a = ${adjustedDiff}$\n${ratio - 1}a = ${adjustedDiff}$\n\nDivide both sides by $${ratio - 1}$:\n$a = \\frac{${adjustedDiff}}{${ratio - 1}}$\n$a = ${against}$\n\nSo, $${against.toLocaleString()}$ people voted against the proposal.\n\nLet's check the other values to see if they fit:\nIf $a = ${against}$, then $f = ${ratio}(${against}) = ${favor}$.\nCheck difference: $${favor} - ${against} = ${favor - against}$. This matches the second condition.\n\nWhy other options are incorrect:\nB. $${distractor2.toLocaleString()}$: If $${distractor2.toLocaleString()}$ voted against, then $f = ${ratio}(${distractor2}) = ${ratio * distractor2}$. The difference would be $${ratio * distractor2 - distractor2} = ${(ratio - 1) * distractor2}$, not $${adjustedDiff}$.\nC. $${distractor3.toLocaleString()}$: This is the number of people who voted *in favor*, not against.\nD. $${(favor * 2).toLocaleString()}$: This is an incorrect calculation, possibly from adding the difference to a wrong base value or misinterpreting the ratio.`
    };
  }
};

/**
 * Question ID: e3bbde69
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: 8, 1, 9, 1, results: 5, 1]
 * - Difficulty factors: [Substitution with decimals/fractions result]
 * - Distractor patterns: [-6, 4/17, 6/17, 4]
 * - Constraints: [Fraction answer]
 * - Question type: [Multiple Choice Text]
 * - Figure generation: [None]
 */