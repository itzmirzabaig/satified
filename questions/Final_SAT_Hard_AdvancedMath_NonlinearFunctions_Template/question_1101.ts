import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1101
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Exponentials)
 * - Concept: Understanding asymptotes vs. minimums.
 * - Logic: Exponential functions on the real domain (unbounded) strictly increase or decrease. 
 *          They approach an asymptote but never reach a minimum/maximum value.
 *          Function I has a horizontal asymptote at y = K.
 *          Function II has a y-intercept at y = K.
 *          Neither has a minimum value.
 */

export const generator_1101 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // The answer used to be "Neither I nor II" on every draw. Each function is now
    // independently a quadratic with vertex value K (a true minimum) or an
    // exponential where K is only an asymptote or intercept, so all four
    // answers occur.
    const K = -1 * getRandomInt(2, 9);

    const quadratic = (name: string) => {
      const a = getRandomInt(2, 5);
      const h = getRandomInt(1, 6);
      return {
        has: true,
        tex: `${name}(x)=${a}(x-${h})^2${K}`,
        analysis: `Function ${name === 'f' ? 'I' : 'II'} is a quadratic with a positive leading coefficient, so its graph opens upward and its least value is at the vertex $(${h}, ${K})$. It has a minimum value of $${K}$.`,
        miss: '',
      };
    };

    // f: exponential whose horizontal asymptote is y = K, approached but never reached.
    const expI = () => {
      const a = getRandomInt(2, 6);
      const b = getRandomInt(2, 5);
      const up = getRandomInt(0, 1) === 0;
      const tex = `f(x)=${up ? '' : '-'}${a}(${b})^{x}${K}`;
      const analysis = up
        ? `Function I is exponential. The term $${a}(${b})^{x}$ is always positive and approaches $0$ as $x$ decreases, so $f(x)$ is always greater than $${K}$ and gets arbitrarily close to it without reaching it. It has no minimum value.`
        : `Function I is exponential. The term $-${a}(${b})^{x}$ is always negative and decreases without bound as $x$ increases, so $f(x)$ has no minimum value. The line $y=${K}$ is only a horizontal asymptote.`;
      return { has: false, tex, analysis, miss: `function I has no minimum value, since $y=${K}$ is only its horizontal asymptote` };
    };

    // g: exponential whose y-intercept is K; it decreases without bound.
    const expII = () => {
      const b = getRandomInt(2, 6);
      return {
        has: false,
        tex: `g(x)=${K}(${b})^{x}`,
        analysis: `Function II is exponential with a negative coefficient and a base greater than $1$, so it decreases without bound as $x$ increases. The value $${K}$ is only its $y$-intercept, so it has no minimum value.`,
        miss: `function II has no minimum value, since $${K}$ is only its $y$-intercept`,
      };
    };

    const fnI = getRandomInt(0, 1) === 0 ? quadratic('f') : expI();
    const fnII = getRandomInt(0, 1) === 0 ? quadratic('g') : expII();

    const hasMsgI = `function I does have a minimum value of $${K}$`;
    const hasMsgII = `function II also has a minimum value of $${K}$`;

    const reasonFor = (wantI: boolean, wantII: boolean): string => {
      const problems: string[] = [];
      if (wantI && !fnI.has) problems.push(fnI.miss);
      if (!wantI && fnI.has) problems.push(hasMsgI);
      if (wantII && !fnII.has) problems.push(fnII.miss);
      if (!wantII && fnII.has) problems.push(fnI.has ? hasMsgII : `function II does have a minimum value of $${K}$`);
      return problems.join(', and ');
    };

    const optionsData = [
      { text: `I only`, isCorrect: fnI.has && !fnII.has, reason: reasonFor(true, false) },
      { text: `II only`, isCorrect: !fnI.has && fnII.has, reason: reasonFor(false, true) },
      { text: `I and II`, isCorrect: fnI.has && fnII.has, reason: reasonFor(true, true) },
      { text: `Neither I nor II`, isCorrect: !fnI.has && !fnII.has, reason: reasonFor(false, false) }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correct = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      // Was "has(have) a minimum value at"; K is a value of the function, not an x.
      questionText: `Which of the following functions has a minimum value of $${K}$?<br/><br/>I. $${fnI.tex}$<br/>II. $${fnII.tex}$`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correct.text,
      // Was multiline HTML with bold headings and no reasons for the wrong choices.
      explanation: `Choice ${correct.letter} is correct. ${fnI.analysis} ${fnII.analysis} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};