import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
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
    
    // STEP 2: Build Mafs code
    const _svg_0 = fixedCost + perItemCost * maxItems + 20; const _svg_1 = fixedCost - 20; const _svg_2 = maxItems + 1;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 300" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=-1,xmax=_svg_2;
      const ymin=_svg_1,ymax=_svg_0;
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Border
      s+='<rect x="'+P+'" y="'+P+'" width="'+(W-2*P)+'" height="'+(H-2*P)+'" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.3"/>';
      // X axis
      const y0=Math.max(ymin,Math.min(ymax,0));
      s+='<line x1="'+P+'" y1="'+my(y0)+'" x2="'+(W-P)+'" y2="'+my(y0)+'" stroke="currentColor" stroke-width="1.5"/>';
      // Y axis
      const x0=Math.max(xmin,Math.min(xmax,0));
      s+='<line x1="'+mx(x0)+'" y1="'+P+'" x2="'+mx(x0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // X tick labels
      const xstep=Math.ceil((xmax-xmin)/8);
      for(let x=Math.ceil(xmin/xstep)*xstep;x<=xmax;x+=xstep){
        s+='<line x1="'+mx(x)+'" y1="'+my(y0)+'" x2="'+mx(x)+'" y2="'+(my(y0)+4)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+mx(x)+'" y="'+(my(y0)+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
      }
      // Y tick labels
      const ystep=Math.ceil((ymax-ymin)/6);
      for(let y=Math.ceil(ymin/ystep)*ystep;y<=ymax;y+=ystep){
        s+='<line x1="'+(mx(x0)-4)+'" y1="'+my(y)+'" x2="'+mx(x0)+'" y2="'+my(y)+'" stroke="currentColor" stroke-width="1"/>';
        s+='<text x="'+(mx(x0)-8)+'" y="'+(my(y)+3)+'" text-anchor="end" font-size="10" fill="currentColor">'+y+'</text>';
      }
      return s;
    })()}${(() => {
      const xmin=-1,xmax=(maxItems + 1);
      const ymin=(fixedCost - 20),ymax=(fixedCost + perItemCost * maxItems + 20);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(0),cy=my((fixedCost));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}${(() => {
      const xmin=-1,xmax=(maxItems + 1);
      const ymin=(fixedCost - 20),ymax=(fixedCost + perItemCost * maxItems + 20);
      const W=400,H=300,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      const cx=mx(1),cy=my((perItemCost + fixedCost));
      return '<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="#2563eb" stroke="white" stroke-width="1"/>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `Each game costs $${perItemCost}.`, isCorrect: true },
      { text: `The video game system costs $${fixedCost}.`, isCorrect: false, reason: "interprets the y-intercept instead of the slope" },
      { text: `The video game system costs $${perItemCost}.`, isCorrect: false, reason: "confuses the per-item cost with the system cost" },
      { text: `Each game costs $${fixedCost}.`, isCorrect: false, reason: "confuses the fixed cost with the per-item cost" }
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
      correctAnswer: `Each game costs $${perItemCost}.`,
      explanation: `Choice ${correctLetter} is correct. The slope represents the change in total cost per game. The graph shows that for each additional game, the cost increases by $${perItemCost} ($${perItemCost + fixedCost} - $${fixedCost} = $${perItemCost}). Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
