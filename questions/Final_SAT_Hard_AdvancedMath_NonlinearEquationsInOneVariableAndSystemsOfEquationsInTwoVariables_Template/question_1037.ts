import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1037
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [equation with reciprocals, 20/p = 20/q - 20/r - 20/s]
 * - Difficulty factors: [Divide by common factor, combine fractions, solve for q]
 * - Distractor patterns: [A: p+r+s, B: 20(p+r+s), C: prs/(pr+ps+rs)/correct, D: wrong with 20s]
 * - Constraints: [Harmonic mean type formula, combine reciprocals]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_1037 = {
  metadata: {
    id: "1037",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values preserving difficulty
    // Pattern: k/p = k/q - k/r - k/s, solve for q
    
    const k = getRandomInt(10, 30); // Common factor
    // Variables p, r, s will be generic
    
    // Divide by k: 1/p = 1/q - 1/r - 1/s
    // 1/q = 1/p + 1/r + 1/s = (rs + ps + pr)/(prs)
    // q = prs/(rs + ps + pr) = prs/(pr + ps + rs)
    
    const correctAnswer = `\\frac{prs}{pr+ps+rs}`;
    
    // STEP 2: Create distractors
    // Before: the wrong choices were k(p+r+s) and prs/(kp+kr+ks), which no
    // real solving slip produces, with vague reasons, and the explanation was
    // split over lines. Now each wrong choice comes from a named slip, three
    // of four slips are drawn each time, and the explanation is one paragraph.
    const slips = [
      { text: `$p+r+s$`, reason: `$p+r+s$ comes from taking the reciprocal of each term separately, but the reciprocal of $\\frac{1}{p}+\\frac{1}{r}+\\frac{1}{s}$ is not $p+r+s$` },
      { text: `$\\frac{pr+ps+rs}{prs}$`, reason: `$\\frac{pr+ps+rs}{prs}$ is the value of $\\frac{1}{q}$; the last step of taking the reciprocal was skipped` },
      { text: `$\\frac{prs}{rs-ps-pr}$`, reason: `$\\frac{prs}{rs-ps-pr}$ comes from keeping the minus signs when moving $\\frac{1}{r}$ and $\\frac{1}{s}$ to the other side, which gives $\\frac{1}{q}=\\frac{1}{p}-\\frac{1}{r}-\\frac{1}{s}$ instead of a sum` },
      { text: `$\\frac{prs}{${k}(pr+ps+rs)}$`, reason: `$\\frac{prs}{${k}(pr+ps+rs)}$ comes from writing $\\frac{${k}}{q}=\\frac{${k}(pr+ps+rs)}{prs}$ and then treating $\\frac{${k}}{q}$ as if it were $\\frac{1}{q}$` }
    ];
    const optionsData = [
      { text: `$${correctAnswer}$`, isCorrect: true, reason: '' },
      ...shuffle(slips).slice(0, 3).map(s => ({ ...s, isCorrect: false }))
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. Dividing both sides of the equation by ${k} gives $\\frac{1}{p}=\\frac{1}{q}-\\frac{1}{r}-\\frac{1}{s}$. Adding $\\frac{1}{r}$ and $\\frac{1}{s}$ to both sides gives $\\frac{1}{q}=\\frac{1}{p}+\\frac{1}{r}+\\frac{1}{s}=\\frac{rs+ps+pr}{prs}$. Taking the reciprocal of both sides gives $q=\\frac{prs}{pr+ps+rs}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;
    
    return {
      questionText: `$\\frac{${k}}{p} = \\frac{${k}}{q} - \\frac{${k}}{r} - \\frac{${k}}{s}$\n\nThe given equation relates the positive variables $p, q, r,$ and $s$. Which of the following is equivalent to $q$?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: explanation
    };
  }
};
