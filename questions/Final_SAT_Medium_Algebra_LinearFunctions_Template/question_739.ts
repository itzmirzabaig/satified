import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 739
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [system cost: 100, game cost: 25 per game, points: (0,100), (1,125)]
 * - Difficulty factors: [Interpreting slope in context]
 * - Distractor patterns: [B = y-intercept interpretation, C = wrong cost, D = wrong cost]
 * - Constraints: [Must have Mafs figure]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs graph with line and points]
 *
 * FIXED (figure showed only two dots — no graph, same class as Q602/Q611):
 * the figure drew axes plus two points and never the line, but the stem
 * says "the graph of the function" and the explanation cites points on it.
 * Now draws the line y = fixedCost + perItemCost*x across x in [0, 5] with
 * the two marked points ON it. The x-axis sits at the plot bottom (y = 0 is
 * below the cost window — standard for cost graphs). Question logic untouched.
 */

export const generator_739 = {
  metadata: {
    id: "739",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values
    // Fixed cost (y-intercept): 80-150
    const fixedCost = getRandomInt(80, 150);
    // Cost per item (slope): 15-40
    const perItemCost = getRandomInt(15, 40);
    // Show range up to 5 items
    const maxItems = 5;
    
    // STEP 2: Figure — the line y = fixedCost + perItemCost*x with the two
    // marked points (0, fixedCost) and (1, fixedCost + perItemCost) on it.
    const W = 450, H = 300, P = 45;
    const xmin = -0.5, xmax = maxItems + 0.5;
    const ymin = fixedCost - 20, ymax = fixedCost + perItemCost * maxItems + 20;
    const mx = (x: number) => P + (x - xmin) / (xmax - xmin) * (W - 2 * P);
    const my = (y: number) => H - P - (y - ymin) / (ymax - ymin) * (H - 2 * P);

    const f = (x: number) => fixedCost + perItemCost * x;
    const lineSvg = `<line x1="${mx(0)}" y1="${my(f(0))}" x2="${mx(maxItems)}" y2="${my(f(maxItems))}" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/>`;

    // y = 0 is always below the window (ymin >= 60), so the x-axis is the
    // plot's bottom edge.
    const axes =
      `<line x1="${P}" y1="${H - P}" x2="${W - P}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>` +
      `<line x1="${mx(0)}" y1="${P}" x2="${mx(0)}" y2="${H - P}" stroke="currentColor" stroke-width="1.5"/>`;

    // Ticks: x every 1 (0..5), y every 25 within the window.
    let ticks = '';
    for (let x = 0; x <= maxItems; x++) {
      ticks += `<line x1="${mx(x)}" y1="${H - P}" x2="${mx(x)}" y2="${H - P + 4}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(x)}" y="${H - P + 15}" text-anchor="middle" font-size="10" fill="currentColor">${x}</text>`;
    }
    const yStart = Math.ceil(ymin / 25) * 25;
    for (let y = yStart; y <= ymax; y += 25) {
      ticks += `<line x1="${mx(0) - 4}" y1="${my(y)}" x2="${mx(0)}" y2="${my(y)}" stroke="currentColor" stroke-width="1"/>`;
      ticks += `<text x="${mx(0) - 8}" y="${my(y) + 3}" text-anchor="end" font-size="10" fill="currentColor">${y}</text>`;
    }

    const dots =
      `<circle cx="${mx(0)}" cy="${my(f(0))}" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>` +
      `<circle cx="${mx(1)}" cy="${my(f(1))}" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>`;

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">` +
      axes + ticks + lineSvg + dots + `</svg></div>`;
    
    // STEP 3: Create options
    // Note: perItemCost (15-40) and fixedCost (80-150) are disjoint ranges,
    // so no two options can ever collide.
    const optionsData = [
      { text: `Each game costs \\$${perItemCost}.`, isCorrect: true },
      { text: `The video game system costs \\$${fixedCost}.`, isCorrect: false, reason: "interprets the y-intercept (the starting cost) instead of the slope" },
      { text: `The video game system costs \\$${perItemCost}.`, isCorrect: false, reason: "confuses the per-game cost with the system cost" },
      { text: `Each game costs \\$${fixedCost}.`, isCorrect: false, reason: "confuses the fixed system cost with the per-game cost" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect);
    const correctLetter = correctOption!.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `The graph of the function $f$, where $y=f(x)$, gives the total cost $y$, in dollars, for a certain video game system and $x$ games. What is the best interpretation of the slope of the graph in this context?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Each game costs \\$${perItemCost}.`,
      explanation: `Choice ${correctLetter} is correct. The slope represents the change in total cost per game. The graph passes through $(0, ${fixedCost})$ and $(1, ${perItemCost + fixedCost})$, so for each additional game the cost increases by \\$${perItemCost} (${perItemCost + fixedCost} - ${fixedCost} = ${perItemCost}). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};