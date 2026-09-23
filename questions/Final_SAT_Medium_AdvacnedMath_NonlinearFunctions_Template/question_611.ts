import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 611
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Graph interpretation - ratio of values
 * - Number ranges: Quadratic growth from (0,6) to (1,9)
 * - Difficulty: Medium - reading graph points and calculating ratio
 * - Figure: Mafs graph with points (0,6) and (1,9)
 * - Distractor patterns: Wrong point selection, ratio inversion
 *
 * FIXED (figure was axes + two dots, no graph — same as Q602): the curve
 * was never drawn, so the "read off the graph" question had nothing to
 * read. Now draws the exponential curve y = c·ratio^x through both marked
 * points (0, c) and (1, yAt1) out to x = 5, matching the stem's described
 * growth. Everything else is untouched.
 */

export const generator_611 = {
  metadata: {
    id: "611",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Read-off-the-graph ratio question. The student reads the integer y-values
    // at x=0 (= c) and x=1 (= yAt1) off the graph and computes yAt1 / c.
    // To keep that exact ratio a clean number that appears among the options, we
    // choose the ratio FIRST and derive c and yAt1 as integers whose exact
    // quotient equals it (c is even and the ratio is a clean half-integer, so
    // yAt1 = c * ratioValue is always an integer and yAt1 / c === ratioValue).
    const ratioValue = getRandomElement([1.5, 2, 2.5, 3]);
    const c = getRandomElement([4, 6, 8, 10]); // even y-intercept -> integer yAt1
    const yAt1 = c * ratioValue; // y when x=1 (exact integer)

    // ---- Figure: exponential growth y = c * ratio^x, x in [0, 5] ----
    // Passes exactly through the two marked points (0, c) and (1, yAt1).
    const W = 450, H = 300, P = 45;
    const xmin = -0.5, xmax = 5.5, ymin = -0.5, ymax = yAt1 + 6;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    const f = (x: number) => c * Math.pow(ratioValue, x);
    const pts: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const x = (5 * i) / 60;
      pts.push(`${mx(x).toFixed(1)},${my(f(x)).toFixed(1)}`);
    }
    const curve = `<polyline points="${pts.join(' ')}" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;

    const y0 = Math.max(ymin, Math.min(ymax, 0));
    const x0 = Math.max(xmin, Math.min(xmax, 0));
    const axes =
      `<line x1="${P}" y1="${my(y0)}" x2="${W - P}" y2="${my(y0)}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(x0)}" y1="${P}" x2="${mx(x0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    // Ticks: x every 1 (0..5), y every 2 up to yAt1+6 (keeps labels readable
    // at the largest draws: c=10, ratio=3 -> ymax = 36, 18 labels at step 2).
    let ticks = '';
    for (let x = 0; x <= 5; x++) {
      ticks += `<line x1="${mx(x)}" y1="${my(y0)}" x2="${mx(x)}" y2="${my(y0) + 4}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(x)}" y="${my(y0) + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    const yStep = ymax > 20 ? 5 : 2;
    for (let y = yStep; y <= Math.floor(ymax); y += yStep) {
      ticks += `<line x1="${mx(x0) - 4}" y1="${my(y)}" x2="${mx(x0)}" y2="${my(y)}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(x0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    // The two read-off points, marked.
    const dot0 = `<circle cx="${mx(0)}" cy="${my(c)}" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>`;
    const dot1 = `<circle cx="${mx(1)}" cy="${my(yAt1)}" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>`;

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      axes + ticks + curve + dot0 + dot1 + `</svg></div>`;
    
    // Format a clean decimal without trailing-zero artifacts (3.0 -> "3", 1.25 -> "1.25").
    const fmt = (n: number) => Number(n.toFixed(2)).toString();

    const ratio = fmt(yAt1 / c);             // exact ratio, equals ratioValue
    const ratioHalf = fmt((yAt1 / c) / 2);   // distractor: halves the ratio
    const ratioDouble = fmt((yAt1 / c) * 2); // distractor: doubles the ratio
    const ratioPlusOne = fmt((yAt1 / c) + 1); // distractor: adds 1 to the ratio
    
    const questionText = `The graph gives the estimated population $y$, in thousands, of a town $x$ years since 2003, where $0 \\leq x \\leq 5$. Which of the following best describes the increase in the estimated population from $x = 0$ to $x = 1$?`;
    
    const correctAnswer = `The estimated population at $x=1$ is ${ratio} times the estimated population at $x=0$.`;
    
    const optionsData = [
      { text: `The estimated population at $x=1$ is ${ratioHalf} times the estimated population at $x=0$.`, isCorrect: false, reason: "underestimates the ratio" },
      { text: `The estimated population at $x=1$ is ${ratio} times the estimated population at $x=0$.`, isCorrect: true },
      { text: `The estimated population at $x=1$ is ${ratioPlusOne} times the estimated population at $x=0$.`, isCorrect: false, reason: "adds 1 to the ratio instead of calculating correctly" },
      { text: `The estimated population at $x=1$ is ${ratioDouble} times the estimated population at $x=0$.`, isCorrect: false, reason: "doubles the correct ratio" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctLetter = shuffledOptions.find(o => o.isCorrect)!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. From the graph, at $x=0$, $y=${c}$ and at $x=1$, $y=${yAt1}$. The ratio is $${yAt1}/${c}=${ratio}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer,
      explanation
    };
  }
};