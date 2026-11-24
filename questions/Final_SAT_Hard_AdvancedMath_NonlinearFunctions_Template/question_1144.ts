import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1144
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [f(x) = a√(x+b), through (-24,0), f(24)<0]
 * - Difficulty factors: [Square root function, domain constraints, sign analysis]
 * - Distractor patterns: [A: f(0)=24, B: f(0)=-24, C: a>b, D: a<b]
 * - Constraints: [b=24, a<0, so a<b]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1144 = {
  metadata: {
    id: "1144",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Fixed: the stem never said a and b are constants or that the point is on the
    // graph; the explanation never derived b; wrong choices had no reasons; and the
    // answer was always a<b. A second case (positive zero, positive output) makes
    // the answer a>b on some draws. Math uses \lt and \gt because a raw "<b" is
    // parsed by the page as an HTML bold tag, which cut off the choice and explanation.
    const k = getRandomInt(15, 30);
    const negativeCase = getRandomInt(0, 1) === 1;

    // Case 1: zero at x=-k, so b=k, and f<0 gives a<0, so a<0<b.
    // Case 2: zero at x=k, so b=-k, and f>0 gives a>0, so b<0<a.
    const b = negativeCase ? k : -k;
    const zeroX = -b;
    const evalPoint = negativeCase ? getRandomInt(20, 40) : k + getRandomInt(5, 20);
    const radicand = evalPoint + b;
    const signText = negativeCase ? '\\lt 0' : '\\gt 0';

    const optionsData = negativeCase
      ? [
          { text: `$f(0)=${k}$`, isCorrect: false, reason: `$${k}$ is the value of $b$, but $f(0)=a\\sqrt{${k}}$ is negative because $a\\lt 0$` },
          { text: `$f(0)=-${k}$`, isCorrect: false, reason: `$-${k}$ is the opposite of $b$, and $f(0)=a\\sqrt{${k}}$ equals $-${k}$ only for the single value $a=-\\sqrt{${k}}$, so it need not be true` },
          { text: `$a\\gt b$`, isCorrect: false, reason: `it reverses the inequality, since $a$ is negative and $b=${k}$ is positive` },
          { text: `$a\\lt b$`, isCorrect: true, reason: '' }
        ]
      : [
          { text: `$f(0)=${k}$`, isCorrect: false, reason: `$${k}$ is the $x$-coordinate of the given point, but $f(0)=a\\sqrt{-${k}}$ is not a real number, so $0$ is not in the domain of $f$` },
          { text: `$f(0)=-${k}$`, isCorrect: false, reason: `$-${k}$ is the value of $b$, but $f(0)=a\\sqrt{-${k}}$ is not a real number, so $0$ is not in the domain of $f$` },
          { text: `$a\\gt b$`, isCorrect: true, reason: '' },
          { text: `$a\\lt b$`, isCorrect: false, reason: `it reverses the inequality, since $a$ is positive and $b=-${k}$ is negative` }
        ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const signStep = negativeCase
      ? `Since $\\sqrt{${radicand}}$ is positive and the product $a\\sqrt{${radicand}}$ is negative, $a$ must be negative. Therefore $a\\lt 0\\lt ${k}$, so $a\\lt b$.`
      : `Since $\\sqrt{${radicand}}$ is positive and the product $a\\sqrt{${radicand}}$ is positive, $a$ must be positive. Therefore $-${k}\\lt 0\\lt a$, so $a\\gt b$.`;

    return {
      questionText: `The function $f$ is defined by $f(x)=a\\sqrt{x+b}$, where $a$ and $b$ are constants. In the $xy$-plane, the graph of $y=f(x)$ passes through the point $(${zeroX}, 0)$, and $f(${evalPoint})${signText}$. Which of the following must be true?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Because the graph passes through $(${zeroX}, 0)$, $a\\sqrt{${zeroX}+b}=0$. Since $f(${evalPoint})$ is not $0$, $a$ is not $0$, so $\\sqrt{${zeroX}+b}=0$ and $b=${b}$. Then $f(${evalPoint})=a\\sqrt{${evalPoint}${b < 0 ? '' : '+'}${b}}=a\\sqrt{${radicand}}$. ${signStep} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
