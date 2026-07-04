import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1455
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [quadratic coefficient: -1.674, linear: 19.76, constant: 745.73]
 * - Difficulty factors: [Recognizing parabola opens downward, identifying correct signs]
 * - Distractor patterns: [Wrong sign on quadratic, wrong sign on linear, wrong sign on constant, combinations]
 * - Constraints: [Negative quadratic coefficient = opens down, positive constant = positive y-intercept]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Parabola opening downward]
 */

export const generator_1455 = {
  metadata: {
    id: "1455",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Generate a downward opening parabola: y = -ax² + bx + c
    const a = getRandomInt(1, 3);
    const aDecimal = getRandomInt(1, 9);
    const aCoeff = -1 * parseFloat(`${a}.${aDecimal}`); // negative for downward
    
    const b = getRandomInt(10, 30);
    const bDecimal = getRandomInt(1, 9);
    const bCoeff = parseFloat(`${b}.${bDecimal}`); // positive linear
    
    const c = getRandomInt(600, 900);
    const cDecimal = getRandomInt(1, 99);
    const cConst = parseFloat(`${c}.${cDecimal}`); // positive constant
    
    // STEP 2: Sample the curve over the 10-year period and derive the y-window
    // from the actual data so the parabola and scatter points are on-screen.
    const f = (x: number) => aCoeff * x * x + bCoeff * x + cConst;
    const xMin = 0;
    const xMax = 10;

    // Scatter points: one per year, jittered slightly off the exact curve so it
    // reads as data rather than a perfect line.
    const dataPoints = [];
    for (let x = 0; x <= 10; x++) {
      const jitter = (getRandomInt(0, 10) - 5); // +/-5 million MWh
      dataPoints.push({ x, y: f(x) + jitter });
    }

    // y-window: span the sampled curve values plus the jittered points, padded.
    const curveYs: number[] = [];
    for (let x = xMin; x <= xMax; x += 0.5) curveYs.push(f(x));
    const allYs = curveYs.concat(dataPoints.map(p => p.y));
    const dataMin = Math.min(...allYs);
    const dataMax = Math.max(...allYs);
    const pad = Math.max(20, (dataMax - dataMin) * 0.1);
    const yMin = Math.floor((dataMin - pad) / 10) * 10;
    const yMax = Math.ceil((dataMax + pad) / 10) * 10;

    // STEP 3: Build the SVG scatterplot with the modeling parabola.
    const W = 400, H = 300, P = 45;
    const mx = (x: number) => P + (x - xMin) / (xMax - xMin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - yMin) / (yMax - yMin) * (H - 2 * P);

    // Axes (x-axis along the bottom of the plot, y-axis at the left edge).
    let axes = '';
    axes += `<line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;
    axes += `<line x1="${P}" y1="${P}" x2="${P}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    // X-axis ticks/labels (years), placed just below the x-axis.
    let xTicks = '';
    for (let x = 0; x <= 10; x += 2) {
      xTicks += `<line x1="${mx(x)}" y1="${H - P}" x2="${mx(x)}" y2="${H - P + 4}" stroke="currentColor" stroke-width="1"/>`;
      xTicks += `<text x="${mx(x)}" y="${H - P + 16}" text-anchor="middle" font-size="9" fill="currentColor">${x}</text>`;
    }

    // Y-axis ticks/labels, at rounded values inside the window.
    let yTicks = '';
    const yStep = Math.max(10, Math.round((yMax - yMin) / 5 / 10) * 10);
    for (let y = yMin; y <= yMax; y += yStep) {
      yTicks += `<line x1="${P - 4}" y1="${my(y)}" x2="${P}" y2="${my(y)}" stroke="currentColor" stroke-width="1"/>`;
      yTicks += `<text x="${P - 7}" y="${my(y) + 3}" text-anchor="end" font-size="9" fill="currentColor">${y}</text>`;
    }

    // Modeling parabola (smooth polyline sampled across the window).
    const curvePts: string[] = [];
    for (let x = xMin; x <= xMax + 1e-9; x += (xMax - xMin) / 100) {
      curvePts.push(`${mx(x).toFixed(2)},${my(f(x)).toFixed(2)}`);
    }
    const curve = `<polyline points="${curvePts.join(' ')}" fill="none" stroke="#3b82f6" stroke-width="2"/>`;

    // Scatter points.
    const dots = dataPoints
      .map(p => `<circle cx="${mx(p.x).toFixed(2)}" cy="${my(p.y).toFixed(2)}" r="3" fill="#3b82f6" stroke="white" stroke-width="1"/>`)
      .join('');

    // Axis titles.
    const titles =
      `<text x="${(P + (W - P)) / 2}" y="${H - 6}" text-anchor="middle" font-size="9" fill="currentColor">Years</text>` +
      `<text transform="rotate(-90, 12, ${H / 2})" x="12" y="${H / 2}" text-anchor="middle" font-size="9" fill="currentColor">Millions of MWh</text>`;

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;font-family:sans-serif;" xmlns="http://www.w3.org/2000/svg"><rect width="${W}" height="${H}" fill="transparent"/>${axes}${xTicks}${yTicks}${curve}${dots}${titles}</svg></div>`;
    
    // STEP 4: Create options
    // All combinations of signs
    const absACoeff = Math.abs(aCoeff);
    
    const optionsData = [
      { text: `y=${absACoeff}x^2+${bCoeff}x-${cConst}`, isCorrect: false, reason: "has a positive quadratic coefficient, which would make the parabola open upward" },
      { text: `y=${aCoeff}x^2-${bCoeff}x-${cConst}`, isCorrect: false, reason: "has negative linear coefficient and negative constant" },
      { text: `y=${absACoeff}x^2+${bCoeff}x+${cConst}`, isCorrect: false, reason: "has a positive quadratic coefficient, which would make the parabola open upward" },
      { text: `y=${aCoeff}x^2+${bCoeff}x+${cConst}`, isCorrect: true }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // STEP 6: Return question data
    return {
      questionText: `The scatterplot below shows the amount of electric energy generated, in millions of megawatt-hours, by nuclear sources over a 10‑year period. Of the following equations, which best models the data in the scatterplot?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `y=${aCoeff}x^2+${bCoeff}x+${cConst}`,
      explanation: `Choice ${correctLetter} is correct. The scatterplot shows a downward-opening parabola (negative $x^2$ coefficient) with a positive y-intercept around ${Math.round(cConst)}. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
