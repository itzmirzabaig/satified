import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1064
 *
 * ANALYSIS:
 * - Domain: Advanced Math
 * - Skill: Nonlinear Equations (System)
 * - Visual: Parabola f(x) shown. g(x) described but NOT shown.
 * - Math: f(x) = -(1/2)(x-h)^2 + k, g(x) = -m x + c.
 *   Setting them equal and multiplying by -2: (x-h)^2 = 2m x + 2(k-c),
 *   which factors as (x-p)(x-q) = 0.
 *
 * Fix: before, h = 4 and g = -x + k were fixed, so the two solutions were
 * always 2 and 8 (only k changed, and it cancels). The stem also said
 * "shown in the xy-plane above", and the explanation was a multiline block
 * without the "The correct answer is N." lead. Now the vertex h, the slope
 * of g and the roots are built from p and q, and the explanation is plain
 * sentences.
 */

export const generator_1064 = {
  metadata: {
    id: "1064",
    assessment: "SAT",
    domain: "Advanced Math",
    skill: "Nonlinear Equations In One Variable And Systems Of Equations In Two Variables",
    difficulty: "Hard"
  },

  generate: (): QuestionData => {
    // 1. Math configuration, built backward from the two solutions p < q.
    // p + q = 2h + 2m, so p = h + m - s and q = h + m + s.
    // d = 2(k - c) = h^2 - pq = s^2 - 2hm - m^2 must be even, so s and m share parity.
    let h = 4, m = 1, s = 3;
    for (let t = 0; t < 100; t++) {
      h = getRandomInt(3, 5);
      m = getRandomInt(1, 2);
      s = getRandomInt(1, 4);
      if ((s - m) % 2 !== 0) continue;
      if (h + m - s < 1) continue;
      break;
    }
    const p = h + m - s;
    const q = h + m + s;
    const d = s * s - 2 * h * m - m * m; // 2(k - c)
    const k = getRandomInt(8, 14);
    const c = k - d / 2;

    const askGreatest = getRandomInt(0, 1) === 1;
    const answer = askGreatest ? q : p;
    const superlative = askGreatest ? 'greatest' : 'least';

    const mx = m === 1 ? 'x' : `${m}x`;
    const ma = m === 1 ? 'a' : `${m}a`;
    const twoMa = `${2 * m}a`;
    const sumPQ = p + q;
    const prodPQ = p * q;
    const rhs = d === 0 ? twoMa : d > 0 ? `${twoMa}+${d}` : `${twoMa}-${-d}`;
    // Step that moves the constants: subtract k from both sides.
    const cMinusK = c - k;
    const rhsAfterK = cMinusK === 0 ? `-${ma}` : cMinusK > 0 ? `-${ma}+${cMinusK}` : `-${ma}-${-cMinusK}`;

    // 2. SVG configuration
    const width = 400;
    const height = 400;
    const margin = 40;

    const xMin = -2, xMax = 2 * h + 2;
    const yMin = -2, yMax = k + 2;

    const plotWidth = width - 2 * margin;
    const plotHeight = height - 2 * margin;

    const scaleX = (x: number) => margin + ((x - xMin) / (xMax - xMin)) * plotWidth;
    const scaleY = (y: number) => margin + plotHeight - ((y - yMin) / (yMax - yMin)) * plotHeight;

    let grid = '';
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const xPos = scaleX(x);
      const opacity = x === 0 ? "0.8" : "0.15";
      const strokeWidth = x === 0 ? "2" : "1";
      grid += `<line x1="${xPos}" y1="${margin}" x2="${xPos}" y2="${height - margin}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${strokeWidth}" />`;
      if (x % 2 === 0 && x !== 0) {
        grid += `<text x="${xPos}" y="${scaleY(0) + 15}" text-anchor="middle" font-family="sans-serif" font-size="12" fill="currentColor" opacity="0.7">${x}</text>`;
      }
    }
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y += 2) {
      const yPos = scaleY(y);
      const opacity = y === 0 ? "0.8" : "0.15";
      const strokeWidth = y === 0 ? "2" : "1";
      grid += `<line x1="${margin}" y1="${yPos}" x2="${width - margin}" y2="${yPos}" stroke="currentColor" stroke-opacity="${opacity}" stroke-width="${strokeWidth}" />`;
      if (y !== 0) {
        grid += `<text x="${scaleX(0) - 8}" y="${yPos + 4}" text-anchor="end" font-family="sans-serif" font-size="12" fill="currentColor" opacity="0.7">${y}</text>`;
      }
    }

    // f(x) = -(1/2)(x-h)^2 + k
    const points: string[] = [];
    for (let i = 0; i <= (xMax - xMin) * 20; i++) {
      const x = xMin + i / 20;
      const y = -0.5 * Math.pow(x - h, 2) + k;
      if (y >= yMin) points.push(`${scaleX(x).toFixed(2)},${scaleY(y).toFixed(2)}`);
    }
    const pathData = points.join(' ');

    const svgContent = `
      <div style="width: 100%; max-width: 400px; margin: 0 auto; color: inherit;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block;">
            ${grid}
            <polyline points="${pathData}" fill="none" stroke="currentColor" stroke-width="2.5" />
            <circle cx="${scaleX(h)}" cy="${scaleY(k)}" r="4" fill="currentColor" />
        </svg>
      </div>
    `;

    const explanation =
      `The correct answer is ${answer}. ` +
      `Since $f(a)=g(a)$, set the two expressions equal to each other: $-\\frac{1}{2}(a-${h})^{2}+${k}=-${ma}+${c}$. ` +
      `Subtracting ${k} from both sides gives $-\\frac{1}{2}(a-${h})^{2}=${rhsAfterK}$. ` +
      `Multiplying both sides by $-2$ gives $(a-${h})^{2}=${rhs}$. ` +
      `Expanding the left side gives $a^{2}-${2 * h}a+${h * h}=${rhs}$, ` +
      `and moving every term to the left side gives $a^{2}-${sumPQ}a+${prodPQ}=0$. ` +
      `This factors as $(a-${p})(a-${q})=0$, so $a=${p}$ or $a=${q}$. ` +
      `The ${superlative} of these values is ${answer}.`;

    return {
      questionText: `The graph of the function $f$, defined by $f(x)=-\\frac{1}{2}(x-${h})^{2}+${k}$, is shown in the $xy$-plane. The function $g$ (not shown) is defined by $g(x)=-${mx}+${c}$. If $f(a)=g(a)$, what is the ${superlative} possible value of $a$?`,
      figureCode: svgContent,
      options: [],
      correctAnswer: String(answer),
      explanation
    };
  }
};
