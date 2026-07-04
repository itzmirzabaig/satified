import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 993
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x-values: 0-4, y-values: 7-12.2, slope: approximately -1.1, intercept: 12.2]
 * - Difficulty factors: [Reading scatterplot data, calculating predicted values from line of best fit, finding differences]
 * - Distractor patterns: [1 (correct difference), 2 (larger difference), 5 (much larger), 12 (raw y-value)]
 * - Constraints: [Must have scatterplot with line of best fit, need point at x=1 with y≈12]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Generate scatter points and line with negative slope]
 */

export const generator_993 = {
  metadata: {
    id: "993",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate line of best fit parameters
    const slope = -(getRandomInt(8, 13) / 10); // -0.8 to -1.3
    const intercept = getRandomInt(11, 14);

    // Calculate viewBox bounds
    const xMin = -0.5;
    const xMax = 5;
    const yMin = 2;
    const yMax = 18;

    // STEP 2: Compute the answer FIRST so the figure can encode it exactly.
    // The data point at x=1 sits a controlled whole-unit offset above the line,
    // so the "difference" read from the figure is an unambiguous integer.
    const predictedY = slope * 1 + intercept;          // true line value at x=1 (one decimal)
    const offset = getRandomInt(1, 2);                  // vertical gap: 1 or 2 units
    const clamp = (y: number) => Math.max(yMin, Math.min(yMax, y));
    const actualY = clamp(Math.round(predictedY) + offset); // integer gridline value
    const difference = Math.abs(actualY - predictedY);
    const roundedDifference = Math.round(difference);  // equals offset for every draw

    // STEP 3: Generate scatterplot data points hugging the line of best fit
    const jitter = () => getRandomInt(-2, 2);
    const onLine = (x: number) => clamp(Math.round(intercept + slope * x + jitter()));
    const points = [
      { x: 0,   y: onLine(0) },
      { x: 0.8, y: onLine(0.8) },
      { x: 1.0, y: actualY }, // the specific point at x=1
      { x: 1.6, y: onLine(1.6) },
      { x: 1.9, y: onLine(1.9) },
      { x: 2.2, y: onLine(2.2) },
      { x: 3.0, y: onLine(3.0) },
      { x: 3.6, y: onLine(3.6) },
      { x: 3.8, y: onLine(3.8) },
      { x: 4.0, y: onLine(4.0) }
    ];

    // STEP 4: Build SVG code
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      if(ymin<=0&&ymax>=0) s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.5"/>';
      if(xmin<=0&&xmax>=0) s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Grid lines
      for(let x=Math.ceil(xmin); x<=Math.floor(xmax); x++) {
        if(x===0) continue;
        s+='<line x1="'+mx(x)+'" y1="'+P+'" x2="'+mx(x)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(0)+14)+'" text-anchor="middle" font-size="9" fill="currentColor">'+x+'</text>';
      }
      for(let y=Math.ceil(ymin); y<=Math.floor(ymax); y++) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      // Line of best fit: y = slope*x + intercept, clipped to the plot band
      const pts = [];
      const xmin = xMin, xmax = xMax;
      const ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      for(let x=xmin; x<=xmax+1e-9; x+=(xmax-xmin)/100) {
        const y = slope*x + intercept;
        if(y>=ymin && y<=ymax) pts.push(mx(x)+','+my(y));
      }
      return '<polyline points="'+pts.join(' ')+'" fill="none" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      // Scatter data points
      const xmin = xMin, xmax = xMax;
      const ymin = yMin, ymax = yMax;
      const W = 400, H = 300, P = 40;
      const mx = (x) => P + (x-xmin)/(xmax-xmin)*(W-2*P);
      const my = (y) => H-P - (y-ymin)/(ymax-ymin)*(H-2*P);
      return points.map(p => '<circle cx="'+mx(p.x)+'" cy="'+my(p.y)+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>').join('');
    })()}</svg></div>`;
    
    // STEP 5: Create options (all computed live; distinct for every draw)
    const correctText = roundedDifference.toString();          // = offset (1 or 2)
    const predictedRounded = Math.round(predictedY);           // predicted-value read trap
    const rawText = actualY.toString();                        // raw y-coordinate read trap
    const predText = predictedRounded.toString();
    const overText = (roundedDifference + 3).toString();       // overestimated gap

    const optionsData = [
      { text: correctText, isCorrect: true, role: 'correct' as const },
      { text: rawText, isCorrect: false, role: 'raw' as const },
      { text: overText, isCorrect: false, role: 'over' as const },
      { text: predText, isCorrect: false, role: 'pred' as const }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const letterOf = (r: string) => shuffledOptions.find(o => o.role === r)!.letter;

    return {
      questionText: "The scatterplot shows the relationship between two variables, $x$ and $y$. A line of best fit for the data is also shown. Which of the following is closest to the difference between the $y$-coordinate of the data point with $x=1$ and the $y$-value predicted by the line of best fit at $x=1$?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The data point with $x=1$ has a $y$-coordinate of ${actualY}. The line of best fit predicts $y \\approx ${predictedY.toFixed(1)}$ at $x=1$. The difference is $|${actualY} - ${predictedY.toFixed(1)}| \\approx ${difference.toFixed(1)}$, which is closest to ${correctText}. Choice ${letterOf('raw')} is incorrect; it is the raw $y$-coordinate of the data point, not the difference. Choice ${letterOf('pred')} is incorrect; it is the predicted $y$-value from the line, not the difference. Choice ${letterOf('over')} is incorrect; it overestimates the vertical gap between the point and the line.`
    };
  }
};
