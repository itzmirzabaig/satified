import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c81b6c57
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: small integers, constants: varied]
 * - Difficulty factors: [Distribution, combining like terms, setting up equation from coefficient comparison]
 * - Distractor patterns: [Calculation errors, wrong distribution, sign errors]
 * - Constraints: [Must expand and compare all coefficients]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */

export const generator_c81b6c57 = {
  metadata: {
    // id: "c81b6c57",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Equivalent Expressions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Work backwards from answer
    const p = getRandomInt(5, 15);
    const k = getRandomInt(3, 6);
    const m = getRandomInt(5, 12);
    const n = getRandomInt(10, 20);
    
    // Calculate the target linear coefficient
    const linearCoeff = 3 * p - n * (p + k);
    const constant = 3 * m;
    
    // STEP 2: Create distractor values for p
    const distractorP1 = p - 4;
    const distractorP2 = p + 6;
    const distractorP3 = p + 148;
    
    const optionsData = [
      { text: distractorP1.toString(), isCorrect: false, reason: `if $p = ${distractorP1}$, the expression would be equivalent to $6x^2 ${3 * distractorP1 - n * (distractorP1 + k) >= 0 ? '+' : ''}${3 * distractorP1 - n * (distractorP1 + k)}x + ${constant}$` },
      { text: p.toString(), isCorrect: true },
      { text: distractorP2.toString(), isCorrect: false, reason: `if $p = ${distractorP2}$, the expression would be equivalent to $6x^2 ${3 * distractorP2 - n * (distractorP2 + k) >= 0 ? '+' : ''}${3 * distractorP2 - n * (distractorP2 + k)}x + ${constant}$` },
      { text: distractorP3.toString(), isCorrect: false, reason: `if $p = ${distractorP3}$, the expression would be equivalent to $6x^2 ${3 * distractorP3 - n * (distractorP3 + k) >= 0 ? '+' : ''}${3 * distractorP3 - n * (distractorP3 + k)}x + ${constant}$` }
    ];
    
    // STEP 3: Shuffle
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 4: Question text
    const questionText = `In the expression $3(2x^{2} + px + ${m}) - ${n}x(p + ${k})$, $p$ is a constant. This expression is equivalent to the expression $6x^{2} ${linearCoeff >= 0 ? '+' : ''}${linearCoeff}x + ${constant}$. What is the value of $p$?`;
    
    // STEP 5: Explanation
    const explanation = `Choice ${correctLetter} is correct. Expand the first expression:

Distribute the 3: $3(2x^{2} + px + ${m}) = 6x^{2} + 3px + ${3*m}$

Distribute $-${n}x$: $-${n}x(p + ${k}) = -${n}px - ${n*k}x$

Combine: $6x^{2} + 3px + ${3*m} - ${n}px - ${n*k}x$

Combine like terms for $x$: $(3p - ${n}p - ${n*k})x = (${3 - n}p - ${n*k})x = (${3 - n}p - ${n*k})x$

Set equal to target linear coefficient ${linearCoeff}:
$$(${3 - n})p - ${n*k} = ${linearCoeff}$$
$$${3 - n}p = ${linearCoeff + n*k}$$
$$p = ${p}$$

Choice ${incorrectOptions[0].letter} is incorrect; ${incorrectOptions[0].reason}.
Choice ${incorrectOptions[1].letter} is incorrect; ${incorrectOptions[1].reason}.
Choice ${incorrectOptions[2].letter} is incorrect; ${incorrectOptions[2].reason}.`;
    
    return {
      questionText: questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: p.toString(),
      explanation: explanation
    };
  }
};

/**
 * Question ID: e51bf5b1
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [coefficients: varied, constants: multiples of b]
 * - Difficulty factors: [Factor theorem application, testing values, finding valid b]
 * - Distractor patterns: [Non-integer b values, zero or negative b when positive required]
 * - Constraints: [b must be positive integer, only one option works]
 * - Question type: [Multiple choice]
 * - Figure generation: [None]
 */