import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1005
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-8, y: 2-26, slope: ~3.14, intercept: ~0.8]
 * - Difficulty factors: [Identifying line equation from nearly perfect linear data]
 * - Distractor patterns: [A (correct: 3x+0.8), B (swapped), C (wrong sign slope), D (wrong sign slope)]
 * - Constraints: [Strong positive linear trend, y-intercept near 0.8]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with strong positive linear trend]
 */

export const generator_1005 = {
  metadata: {
    id: "1005",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    // The displayed best-fit equation uses an integer slope and a decimal intercept.
    const dispSlope = getRandomInt(2, 4);        // integer slope 2, 3, or 4
    const intercept = getRandomInt(5, 12) / 10;  // 0.5 to 1.2

    // STEP 2: Generate nearly linear points scattered around y = dispSlope*x + intercept
    const points = [];
    for (let x = 1; x <= 8; x++) {
      const noise = getRandomInt(-1, 1); // small scatter, keeps a clear positive trend
      const y = Math.round((dispSlope * x + intercept + noise) * 10) / 10;
      points.push({ x, y });
    }

    // Calculate viewBox bounds so every point and the line stay on-screen
    const xMin = 0;
    const xMax = 9;
    const yMin = 0;
    const yMax = Math.max(30, Math.ceil((dispSlope * 8 + intercept + 2) / 5) * 5);

    // STEP 3: Build SVG scatterplot with data points AND the best-fit line
    const _svg_0 = yMax; const _svg_1 = yMin; const _svg_2 = xMax; const _svg_3 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="300" fill="transparent"/>${(() => {
      const xmin=_svg_3, xmax=_svg_2;
      const ymin=_svg_1, ymax=_svg_0;
      const W=400, H=300, P=40;
      const mx=(x)=>Math.round((P+(x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my=(y)=>Math.round((H-P-(y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
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
      for(let y=Math.ceil(ymin); y<=Math.floor(ymax); y+=5) {
        if(y===0) continue;
        s+='<line x1="'+P+'" y1="'+my(y)+'" x2="'+(W-P)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="0.3" stroke-dasharray="2,3" opacity="0.4"/>';
        s+='<text x="'+(mx(0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="9" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${
    (() => {
      // Best-fit line: y = dispSlope*x + intercept, drawn across the x-range
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => Math.round((P + (x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my = (y) => Math.round((H-P - (y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
      const x1 = xmin, x2 = xmax;
      const y1 = dispSlope * x1 + intercept;
      const y2 = dispSlope * x2 + intercept;
      return '<line x1="'+mx(x1)+'" y1="'+my(y1)+'" x2="'+mx(x2)+'" y2="'+my(y2)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${
    (() => {
      // Data points as blue markers
      const xmin = (xMin);
      const xmax = (xMax);
      const ymin = (yMin);
      const ymax = (yMax);
      const W = 400, H = 300, P = 40;
      const mx = (x) => Math.round((P + (x-xmin)/(xmax-xmin)*(W-2*P))*100)/100;
      const my = (y) => Math.round((H-P - (y-ymin)/(ymax-ymin)*(H-2*P))*100)/100;
      return points.map(p => '<circle cx="'+mx(p.x)+'" cy="'+my(p.y)+'" r="4" fill="#3b82f6" stroke="white" stroke-width="1.5"/>').join('');
    })()}</svg></div>`;

    // STEP 4: Create options
    const correctEquation = `y = ${dispSlope}x + ${intercept.toFixed(1)}`;
    const swappedEquation = `y = ${intercept.toFixed(1)}x + ${dispSlope}`;
    const negativeSlope1 = `y = -${intercept.toFixed(1)}x + ${dispSlope}`;
    const negativeSlope2 = `y = -${dispSlope}x + ${intercept.toFixed(1)}`;
    
    const optionsData = [
      { text: correctEquation, isCorrect: true },
      { text: swappedEquation, isCorrect: false },
      { text: negativeSlope1, isCorrect: false },
      { text: negativeSlope2, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const dx = points[7].x - points[0].x;
    const rise = Math.round((points[7].y - points[0].y) * 10) / 10;
    const approxSlope = (rise / dx).toFixed(2);

    return {
      questionText: "Which of the following could be the equation for a line of best fit for the data shown in the scatterplot above?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctEquation,
      explanation: `Choice ${correctLetter} is correct. The slope is positive and approximately $(${points[7].y} - ${points[0].y}) / (${points[7].x} - ${points[0].x}) = ${rise} / ${dx} \\approx ${approxSlope}$. The $y$-intercept is close to ${intercept.toFixed(1)}. Choice ${correctLetter} is the best fit. Choice ${incorrectOptions[0].letter} is incorrect; it swaps the slope and intercept. Choices ${incorrectOptions[1].letter} and ${incorrectOptions[2].letter} are incorrect; the slope is positive, not negative.`
    };
  }
};
