import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1125
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [h(x) = -16x² + 100x + 10]
 * - Difficulty factors: [Quadratic context, x-intercept interpretation]
 * - Distractor patterns: [A: initial height, B: max height, C: time at max, D: time when hits ground]
 * - Constraints: [Positive x-intercept is when projectile hits ground]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_1125 = {
  metadata: {
    id: "1125",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Functions",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // Before: the same fixed function every draw, x and the units were never defined,
    // the answer was always the landing time, and wrong choices had no reasons.
    // h(x) = -(x - T)(16x + k) lands at the whole number T. k is a multiple of 4 so the
    // vertex values are exact short decimals.
    const T = getRandomInt(5, 9);
    const k = getRandomElement([4, 8, 12, 16]);
    const b = 16 * T - k;
    const c = k * T;
    const vertexX = b / 32;
    const vertexY = c + (b * b) / 64;

    const features = [
      {
        key: 'land',
        asked: `the positive value of $x$ at which the graph crosses the $x$-axis`,
        text: `The time, in seconds, when the projectile hits the ground`,
        why: `The graph crosses the $x$-axis where $h(x)=0$, which means the height is $0$ feet, so the projectile is on the ground. Factoring gives $h(x)=-(x-${T})(16x+${k})$, so the positive solution is $x=${T}$. The projectile hits the ground ${T} seconds after launch.`,
        reason: `the time when the projectile hits the ground is the positive solution of $h(x)=0$, which is $x=${T}$`
      },
      {
        key: 'start',
        asked: `the $y$-coordinate of the $y$-intercept of the graph`,
        text: `The height, in feet, of the projectile when it is launched`,
        why: `The $y$-intercept occurs at $x=0$, which is the moment of launch. Since $h(0)=${c}$, the projectile is launched from a height of $${c}$ feet.`,
        reason: `the height at launch is the $y$-coordinate of the $y$-intercept, $h(0)=${c}$`
      },
      {
        key: 'peakTime',
        asked: `the $x$-coordinate of the vertex of the graph`,
        text: `The time, in seconds, when the projectile reaches its maximum height`,
        why: `The coefficient of $x^2$ is negative, so the parabola opens downward and its vertex is its highest point. The $x$-coordinate of the vertex is $x=-\\frac{${b}}{2(-16)}=${vertexX}$, so the projectile is highest ${vertexX} seconds after launch.`,
        reason: `the time at maximum height is the $x$-coordinate of the vertex, $x=${vertexX}$`
      },
      {
        key: 'peakHeight',
        asked: `the $y$-coordinate of the vertex of the graph`,
        text: `The maximum height, in feet, of the projectile`,
        why: `The coefficient of $x^2$ is negative, so the parabola opens downward and its vertex is its highest point. The vertex is at $x=-\\frac{${b}}{2(-16)}=${vertexX}$, and $h(${vertexX})=${vertexY}$, so the greatest height the projectile reaches is $${vertexY}$ feet.`,
        reason: `the maximum height is the $y$-coordinate of the vertex, $${vertexY}$ feet`
      }
    ];
    const target = getRandomElement(features);

    const optionsData = features.map(f => ({
      text: f.text,
      isCorrect: f.key === target.key,
      reason: f.key === target.key ? '' : f.reason
    }));

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    return {
      questionText: `The function $h$ is defined by $h(x)=-16x^2+${b}x+${c}$ and models the height, in feet, of a projectile $x$ seconds after it is launched, until it lands on the ground. When $y=h(x)$ is graphed in the $xy$-plane, what does ${target.asked} represent?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. ${target.why} ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
