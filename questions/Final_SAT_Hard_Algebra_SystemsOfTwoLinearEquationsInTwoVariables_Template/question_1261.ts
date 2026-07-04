import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 1261
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [slope: 2, intercepts: 1 and -8, answer: 2]
 * - Difficulty factors: [No solution from graph, identifying parameter]
 * - Distractor patterns: [Sign errors, wrong slope identification]
 * - Constraints: [a must equal slope]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two parallel lines]
 */

export const generator_1261 = {
  metadata: {
    id: "1261",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Systems Of Two Linear Equations In Two Variables",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    const slope = getRandomInt(2, 5);
    // Two DISTINCT, nonzero y-intercepts so the lines are parallel but not
    // coincident (parallel + distinct => the system has no solution).
    const b1 = getRandomInt(1, 4);
    let b2 = b1 - getRandomInt(2, 5); // strictly below b1, so b1 !== b2
    if (b2 === 0) b2 -= 1; // avoid a bare "+ 0" intercept; keeps b2 < 0 < b1

    // Viewing window. Use a symmetric x-range and derive the y-range from the
    // actual line values so BOTH lines are fully on-screen for every draw.
    const xMin = -4;
    const xMax = 4;
    const lineVals = [
      slope * xMin + b1, slope * xMax + b1,
      slope * xMin + b2, slope * xMax + b2
    ];
    const yLo = Math.min(0, ...lineVals);
    const yHi = Math.max(0, ...lineVals);
    // Round outward to a multiple of 5 and add a little headroom.
    const yMin = Math.floor((yLo - 2) / 5) * 5;
    const yMax = Math.ceil((yHi + 2) / 5) * 5;
    const yStep = (yMax - yMin) <= 30 ? 5 : 10;

    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=xMin, xmax=xMax;
      const ymin=yMin, ymax=yMax;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Grid lines + tick labels
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x!==0) s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      for(let y=Math.ceil(ymin/yStep)*yStep; y<=ymax; y+=yStep) {
        if(y!==0) s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      // Axes drawn last so they sit above the grid
      if(ymin<=0&&ymax>=0) s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      if(xmin<=0&&xmax>=0) s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      return s;
    })()}${
    (() => {
      // First line: y = slope*x + b1, clipped to the window.
      const xmin = xMin, xmax = xMax, ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      const pts = [];
      for(let i=0;i<=200;i++){
        const x = xmin + (xmax-xmin)*i/200;
        const y = slope*x + b1;
        if(y>=ymin && y<=ymax) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#3b82f6" stroke-width="2.5"/>';
    })()}${
    (() => {
      // Second line: y = slope*x + b2 (same slope, different intercept).
      const xmin = xMin, xmax = xMax, ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      const pts = [];
      for(let i=0;i<=200;i++){
        const x = xmin + (xmax-xmin)*i/200;
        const y = slope*x + b2;
        if(y>=ymin && y<=ymax) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="#ef4444" stroke-width="2.5"/>';
    })()}</svg></div>`;

    // The graph shows two parallel lines. One equation is given concretely;
    // the other has the unknown slope a. For no solution the slopes must match,
    // so a = slope.
    const correctAnswer = slope;

    // Distractor pool of classic errors, filtered so none collides with the
    // correct answer as a number.
    const distractorPool = [-slope, -1, 0, 1, slope - 1, slope + 1, 2 * slope];
    const distractorSet: number[] = [];
    for (const d of distractorPool) {
      if (d === correctAnswer) continue;
      if (distractorSet.includes(d)) continue;
      distractorSet.push(d);
      if (distractorSet.length === 3) break;
    }

    const optionsData = [
      { text: distractorSet[0].toString(), isCorrect: false },
      { text: distractorSet[1].toString(), isCorrect: false },
      { text: distractorSet[2].toString(), isCorrect: false },
      { text: correctAnswer.toString(), isCorrect: true }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;

    const eq1 = `y = ${slope}x + ${b1}`;
    const eq2 = `y = ax ${b2 < 0 ? '- ' + Math.abs(b2) : '+ ' + b2}`;

    return {
      questionText: `The graph of a system of two linear equations is shown, where $a$ is a constant. $$${eq1}$$ $$${eq2}$$ If the system of equations has no solution, what is the value of $a$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctAnswer.toString(),
      explanation: `Choice ${correctLetter} is correct. A system of two linear equations has no solution when the lines are parallel but distinct, which requires equal slopes and different $y$-intercepts. The first line $y = ${slope}x + ${b1}$ has slope $${slope}$, and the graph shows the second line parallel to it. Setting the slopes equal gives $a = ${slope}$. The $y$-intercepts $${b1}$ and $${b2}$ differ, so the lines never intersect and the system indeed has no solution.`
    };
  }
};
