import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: c4ea43ef
 * 
 * ANALYSIS:
 * - Domain: Algebra
 * - Skill: Linear Equations In Two Variables
 * - Context: Work/Wages (Rate x Time = Earnings).
 * - Logic: The graph represents combinations of hours to reach a fixed total 's'.
 *          Equation: (RateA * HoursA) + (RateB * HoursB) = s.
 *          Intercepts represent working ONLY one job.
 *          x-intercept (hA, 0) -> s = RateA * hA.
 *          y-intercept (0, hB) -> s = RateB * hB.
 * - Fixes: Added axis labels, ensured integer intercepts via LCM, fixed explanation logic.
 */

export const generator_c4ea43ef = {
  metadata: {
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // 1. Generate Rates
    // Rate A (x-axis context)
    const rateA = getRandomInt(10, 25); 
    // Rate B (y-axis context) - make it different
    let rateB = getRandomInt(10, 25);
    while (rateB === rateA) rateB = getRandomInt(10, 25);

    // 2. Generate Total 's'
    // Calculate LCM to ensure integer intercepts
    const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
    const lcm = (rateA * rateB) / gcd(rateA, rateB);
    
    // Scale LCM to a realistic total earnings number (e.g. $100 - $600)
    const multiplier = getRandomInt(3, 8);
    const s = lcm * multiplier;

    // 3. Calculate Intercepts (Hours)
    const xInt = s / rateA; // Max hours for Job A
    const yInt = s / rateB; // Max hours for Job B

    // 4. Options
    const correctVal = s;
    // Distractor: RateA * yInt (Mixing up axes)
    const dist1 = rateA * yInt;
    // Distractor: RateB * xInt (Mixing up axes)
    const dist2 = rateB * xInt;
    // Distractor: Sum of rates * sum of intercepts (Nonsense)
    const dist3 = (rateA + rateB) * 10;

    const optionsData = [
      { text: `$${correctVal}$`, isCorrect: true },
      { text: `$${dist1}$`, isCorrect: false },
      { text: `$${dist2}$`, isCorrect: false },
      { text: `$${dist3}$`, isCorrect: false }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;

    // 5. Build SVG Graph
    const width = 400;
    const height = 350;
    const margin = { top: 20, right: 40, bottom: 60, left: 60 };
    
    const plotWidth = width - margin.left - margin.right;
    const plotHeight = height - margin.top - margin.bottom;

    const xMax = xInt + Math.ceil(xInt * 0.2);
    const yMax = yInt + Math.ceil(yInt * 0.2);

    const scaleX = (x: number) => margin.left + (x / xMax) * plotWidth;
    const scaleY = (y: number) => margin.top + plotHeight - (y / yMax) * plotHeight;

    let svgContent = '';
    
    // Grid & Ticks
    // Y-Axis
    for (let i = 0; i <= yMax; i += Math.ceil(yMax/5)) {
        const yPos = scaleY(i);
        svgContent += `<line x1="${margin.left}" y1="${yPos}" x2="${width - margin.right}" y2="${yPos}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i > 0) svgContent += `<text x="${margin.left - 10}" y="${yPos + 5}" text-anchor="end" font-size="12" fill="currentColor">${i}</text>`;
    }
    // X-Axis
    for (let i = 0; i <= xMax; i += Math.ceil(xMax/5)) {
        const xPos = scaleX(i);
        svgContent += `<line x1="${xPos}" y1="${margin.top}" x2="${xPos}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />`;
        if (i > 0) svgContent += `<text x="${xPos}" y="${margin.top + plotHeight + 20}" text-anchor="middle" font-size="12" fill="currentColor">${i}</text>`;
    }

    // Main Axes
    svgContent += `
        <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${width - margin.right}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2" />
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" stroke="currentColor" stroke-width="2" />
        <text x="${margin.left - 10}" y="${margin.top + plotHeight + 5}" text-anchor="end" font-size="12" fill="currentColor">0</text>
    `;

    // Axis Labels
    svgContent += `
        <text x="${width / 2}" y="${height - 15}" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">Hours Worked at Job A</text>
        <text transform="rotate(-90)" x="${-height / 2}" y="${20}" text-anchor="middle" font-weight="bold" font-size="14" fill="currentColor">Hours Worked at Job B</text>
    `;

    // The Line
    svgContent += `<line x1="${scaleX(0)}" y1="${scaleY(yInt)}" x2="${scaleX(xInt)}" y2="${scaleY(0)}" stroke="currentColor" stroke-width="3" />`;

    // Intercept Points & Labels
    svgContent += `
        <circle cx="${scaleX(0)}" cy="${scaleY(yInt)}" r="5" fill="currentColor" />
        <text x="${scaleX(0) + 15}" y="${scaleY(yInt) + 5}" font-size="12" fill="currentColor" font-weight="bold">(0, ${yInt})</text>
        
        <circle cx="${scaleX(xInt)}" cy="${scaleY(0)}" r="5" fill="currentColor" />
        <text x="${scaleX(xInt)}" y="${scaleY(0) - 15}" text-anchor="middle" font-size="12" fill="currentColor" font-weight="bold">(${xInt}, 0)</text>
    `;

    const finalFigure = `
      <div style="width: 100%; max-width: 500px; margin: 0 auto;">
        <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; display: block; color: inherit;">
          ${svgContent}
        </svg>
      </div>
    `;

    // 6. Explanation
    return {
      questionText: `Avery earns ${rateA} per hour at Job A and ${rateB} per hour at Job B. The graph represents all combinations of hours Avery can work to earn a total of $s$ dollars. What is the value of $s$?`,
      figureCode: finalFigure,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `
        The x-axis represents hours worked at Job A, and the y-axis represents hours worked at Job B.
        <br/><br/>
        1. <strong>Identify an intercept:</strong>
        Look at the x-intercept $(${xInt}, 0)$. This point represents working ${xInt} hours at Job A and 0 hours at Job B.
        <br/>
        2. <strong>Calculate total earnings ($s$):</strong>
        Since Avery works only at Job A in this scenario, multiply the hours by the rate for Job A ($${rateA}/hr):
        $$ s = (\\text{Hours}_A) \\times (\\text{Rate}_A) $$
        $$ s = ${xInt} \\times ${rateA} = ${s} $$
        <br/>
        (You can verify this with the y-intercept: $${yInt} \\text{ hours} \\times $${rateB}/\\text{hr} = $${yInt * rateB}$, which also equals $${s}$.)
      `
    };
  }
};