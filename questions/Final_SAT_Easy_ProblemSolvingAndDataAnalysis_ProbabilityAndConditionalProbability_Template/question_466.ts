import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 466
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [white, orange, brown buttons; total = sum]
 * - Difficulty factors: [Basic probability from text description]
 * - Distractor patterns: [P(orange), P(brown), P(not white)]
 * - Constraints: [Three colors, calculate P(white)]
 * - Question type: [No figure -> Text options]
 * - Figure generation: [None]
 */

export const generator_466 = {
  metadata: {
    id: "466",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate(): QuestionData {
    // The asked-about color is chosen at random (it was always white). All
    // four choices share the denominator, the total; the correct one used to
    // be reduced when possible while the others were not, which gave it away.
    // Wrong choices: the other two colors and "not the asked-about color."
    // Redraw until the four numerators differ.
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    let whiteCount = 0, orangeCount = 0, brownCount = 0, totalCount = 0;
    let colors: { name: string; n: number }[] = [];
    let t = 0;
    do {
      whiteCount = getRandomInt(5, 12);
      orangeCount = getRandomInt(1, 4);
      brownCount = getRandomInt(6, 15);
      totalCount = whiteCount + orangeCount + brownCount;
      colors = [
        { name: 'white', n: whiteCount },
        { name: 'orange', n: orangeCount },
        { name: 'brown', n: brownCount }
      ];
      t = getRandomInt(0, 2);
    } while (new Set([...colors.map(c => c.n), totalCount - colors[t].n]).size < 4);

    const target = colors[t];
    const others = colors.filter((_, i) => i !== t);
    const f = (k: number) => `\\frac{${k}}{${totalCount}}`;
    const article = (w: string) => (/^[aeiou]/i.test(w) ? 'an' : 'a');
    const correctText = f(target.n);

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      ...others.map(c => ({ text: f(c.n), isCorrect: false, reason: `$${f(c.n)}$ is the probability of selecting ${article(c.name)} ${c.name} button, not ${article(target.name)} ${target.name} one` })),
      { text: f(totalCount - target.n), isCorrect: false, reason: `$${f(totalCount - target.n)}$ is the probability of selecting a button that is not ${target.name}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const d = gcd(target.n, totalCount);
    const reduction = d > 1 ? `, which is equivalent to $\\frac{${target.n / d}}{${totalCount / d}}$` : '';
    const explanation = `Choice ${correctOption.letter} is correct. There ${target.n === 1 ? 'is 1' : `are ${target.n}`} ${target.name} ${target.n === 1 ? 'button' : 'buttons'} out of ${totalCount} buttons, so the probability of selecting ${article(target.name)} ${target.name} button is $${correctText}$${reduction}. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `There are ${totalCount} buttons in a bag: ${whiteCount} white buttons, ${orangeCount} orange ${orangeCount === 1 ? 'button' : 'buttons'}, and ${brownCount} brown buttons. If one of these buttons is selected at random, what is the probability of selecting ${article(target.name)} ${target.name} button?`,
      figureCode: null,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
