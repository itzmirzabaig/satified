import { getRandomInt, getRandomElement } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1150
 * 
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Functions (Structure of Expressions)
 * - Logic: Identify which function explicitly displays its maximum value for x >= 0 as a constant.
 * - Scenario 1: Growth (base > 1). Increases forever. No max.
 * - Scenario 2: Decay (0 < base < 1). Max at x=0.
 *   - Form A(b)^x: Max is A. A is displayed. (Correct)
 *   - Form A(b)^x + C: Max is A+C. Neither A nor C is the full max. (Incorrect)
 */

export const generator_1150 = {
  metadata: {
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Fixed: the answer was always "II only" with the same two function shapes, the
    // stem was unclear, the explanation used HTML headings and bold, bases printed as
    // 1.10, and wrong choices had no reasons. Each equation is now one of three kinds:
    //   decay:   A(b)^x with 0<b<1, maximum A at x=0, displayed as the coefficient
    //   growth:  A(b)^x+C with b>1, no maximum value
    //   shifted: A(b)^x+C with 0<b<1, maximum A+C at x=0, not displayed
    type Kind = 'decay' | 'growth' | 'shifted';
    const decayBase = () => Number((getRandomInt(10, 19) * 0.05).toFixed(2)); // 0.5 to 0.95
    const growthBase = () => Number((getRandomInt(11, 19) / 10).toFixed(1));  // 1.1 to 1.9

    const build = (name: 'f' | 'g', kind: Kind, coeff: number) => {
      const c = getRandomInt(20, 50);
      if (kind === 'decay') {
        const b = decayBase();
        return {
          displays: true,
          eq: `${name}(x)=${coeff}(${b})^x`,
          work: `the base $${b}$ is between $0$ and $1$ and the coefficient is positive, so $${name}$ decreases as $x$ increases and reaches its maximum value at $x=0$. That value is $${name}(0)=${coeff}(${b})^0=${coeff}$, which is the coefficient in the equation.`,
          why: `$${name}(0)=${coeff}$ is its coefficient`
        };
      }
      if (kind === 'growth') {
        const b = growthBase();
        return {
          displays: false,
          eq: `${name}(x)=${coeff}(${b})^x+${c}`,
          work: `the base $${b}$ is greater than $1$ and the coefficient is positive, so $${name}$ increases without bound as $x$ increases and has no maximum value.`,
          why: `$${name}$ increases without bound and has no maximum value`
        };
      }
      const b = decayBase();
      const max = coeff + c;
      return {
        displays: false,
        eq: `${name}(x)=${coeff}(${b})^x+${c}`,
        work: `the base $${b}$ is between $0$ and $1$ and the coefficient is positive, so $${name}$ decreases as $x$ increases and reaches its maximum value at $x=0$. That value is $${name}(0)=${coeff}(${b})^0+${c}=${coeff}+${c}=${max}$, which does not appear as a constant or coefficient in the equation.`,
        why: `its maximum value is $${name}(0)=${coeff}+${c}=${max}$, which does not appear in the equation`
      };
    };

    // Choose the answer first, then equation kinds that produce it.
    const nonDisplaying = (): Kind => getRandomElement<Kind>(['growth', 'shifted']);
    const correctText = getRandomElement(['I only', 'II only', 'I and II', 'Neither I nor II']);
    let kind1: Kind;
    let kind2: Kind;
    if (correctText === 'I only') { kind1 = 'decay'; kind2 = nonDisplaying(); }
    else if (correctText === 'II only') { kind1 = nonDisplaying(); kind2 = 'decay'; }
    else if (correctText === 'I and II') { kind1 = 'decay'; kind2 = 'decay'; }
    else { kind1 = nonDisplaying(); kind2 = kind1 === 'growth' ? 'shifted' : 'growth'; }

    const a1 = getRandomInt(10, 30);
    let a2 = getRandomInt(5, 40);
    while (a2 === a1) a2 = getRandomInt(5, 40);

    const one = build('f', kind1, a1);
    const two = build('g', kind2, a2);

    const missing = (numeral: string, item: typeof one) => `equation ${numeral} does not display a maximum value, since ${item.why}`;
    const present = (numeral: string, item: typeof one) => `equation ${numeral} does display its maximum value, since ${item.why}`;

    const reasonFor = (text: string): string => {
      if (text === 'I only') return !one.displays ? missing('I', one) : `it leaves out equation II, which also displays its maximum value, since ${two.why}`;
      if (text === 'II only') return !two.displays ? missing('II', two) : `it leaves out equation I, which also displays its maximum value, since ${one.why}`;
      if (text === 'I and II') return !one.displays ? `it includes equation I, which does not display a maximum value, since ${one.why}` : `it includes equation II, which does not display a maximum value, since ${two.why}`;
      return one.displays ? present('I', one) : present('II', two);
    };

    // Keep the conventional order of the numeral choices.
    const orderedOptions = ['I only', 'II only', 'I and II', 'Neither I nor II'].map((text, index) => ({
      text,
      isCorrect: text === correctText,
      reason: text === correctText ? '' : reasonFor(text),
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = orderedOptions.find(o => o.isCorrect)!;
    const incorrectOptions = orderedOptions.filter(o => !o.isCorrect);

    const conclusion = correctText === 'I and II'
      ? 'Therefore, both equations display their maximum values.'
      : correctText === 'Neither I nor II'
        ? 'Therefore, neither equation displays a maximum value.'
        : `Therefore, only equation ${correctText === 'I only' ? 'I' : 'II'} displays its maximum value.`;

    return {
      questionText: `The functions $f$ and $g$ are defined by the given equations, where $x \\geq 0$. Which of the following equations displays, as a constant or coefficient, the maximum value of the function it defines?\n\nI. $${one.eq}$\nII. $${two.eq}$`,
      figureCode: null,
      options: orderedOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. For equation I, ${one.work} For equation II, ${two.work} ${conclusion} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};