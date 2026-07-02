import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question 587
 * 
 * ORIGINAL ANALYSIS:
 * - Type: Rational function vertical shift (figure-based)
 * - Number ranges: Function 8/x shifted up 5
 * - Difficulty: Medium - visual transformation recognition
 * - Figure: Mafs graph of rational function with vertical shift
 */

export const generator_587 = {
  metadata: {
    id: "587",
    assessment: "SAT",
    domain: "AdvancedMath",
    skill: "Nonlinear Functions",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    const numerator = getRandomInt(6, 12);
    const shift = getRandomInt(3, 8);
    
    const questionText = `The graph of the rational function $f$ is shown, where $y=f(x)$ and $x \\geq 0$. Which of the following is the graph of $y=f(x)+${shift}$, where $x \\geq 0$?`;
    
    // For this type, we'd typically have 4 graph options
    // The correct one is the shifted version
    
    const _svg_0 = 15 + shift;
    const correctGraph = `<div style="display:inline-block;width:100%;max-width:260px;"><svg viewBox="0 0 240 180" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=_svg_0;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              let s='<rect width="240" height="180" fill="transparent"/>';
              s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1"/>';
              s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1"/>';
              return s;
            })()}${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=(15 + shift);
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              const pts=[];
              const dmn=[-1, 11];
              for(let x=dmn[0];x<=dmn[1];x+=(dmn[1]-dmn[0])/80){
                const y=(numerator);
                if(isFinite(y)&&y>=ymin-5&&y<=ymax+5)pts.push(mx(x)+','+my(y));
                else if(pts.length>0)pts.push(null);
              }
              let svgPts=[];
              let seg=[];
              for(const p of pts){if(p===null){if(seg.length>1)svgPts.push(seg);seg=[];}else seg.push(p);}
              if(seg.length>1)svgPts.push(seg);
              return svgPts.map(s=>'<polyline points="'+s.join(' ')+'" fill="none" stroke="#2563eb" stroke-width="2"/>').join('');
            })()}</svg></div>`;
    
    const distractorA = `<div style="display:inline-block;width:100%;max-width:260px;"><svg viewBox="0 0 240 180" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              let s='<rect width="240" height="180" fill="transparent"/>';
              s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1"/>';
              s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1"/>';
              return s;
            })()}${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              const pts=[];
              const dmn=[-1, 11];
              for(let x=dmn[0];x<=dmn[1];x+=(dmn[1]-dmn[0])/80){
                const y=(numerator);
                if(isFinite(y)&&y>=ymin-5&&y<=ymax+5)pts.push(mx(x)+','+my(y));
                else if(pts.length>0)pts.push(null);
              }
              let svgPts=[];
              let seg=[];
              for(const p of pts){if(p===null){if(seg.length>1)svgPts.push(seg);seg=[];}else seg.push(p);}
              if(seg.length>1)svgPts.push(seg);
              return svgPts.map(s=>'<polyline points="'+s.join(' ')+'" fill="none" stroke="#2563eb" stroke-width="2"/>').join('');
            })()}</svg></div>`;
    const distractorB = `<div style="display:inline-block;width:100%;max-width:260px;"><svg viewBox="0 0 240 180" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              let s='<rect width="240" height="180" fill="transparent"/>';
              s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1"/>';
              s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1"/>';
              return s;
            })()}${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              const pts=[];
              const dmn=[-1, 11];
              for(let x=dmn[0];x<=dmn[1];x+=(dmn[1]-dmn[0])/80){
                const y=(numerator);
                if(isFinite(y)&&y>=ymin-5&&y<=ymax+5)pts.push(mx(x)+','+my(y));
                else if(pts.length>0)pts.push(null);
              }
              let svgPts=[];
              let seg=[];
              for(const p of pts){if(p===null){if(seg.length>1)svgPts.push(seg);seg=[];}else seg.push(p);}
              if(seg.length>1)svgPts.push(seg);
              return svgPts.map(s=>'<polyline points="'+s.join(' ')+'" fill="none" stroke="#2563eb" stroke-width="2"/>').join('');
            })()}</svg></div>`;
    const distractorC = `<div style="display:inline-block;width:100%;max-width:260px;"><svg viewBox="0 0 240 180" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              let s='<rect width="240" height="180" fill="transparent"/>';
              s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1"/>';
              s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1"/>';
              return s;
            })()}${(() => {
              const xmin=-1,xmax=11;
              const ymin=-1,ymax=15;
              const W=240,H=180,P=25;
              const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
              const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
              const pts=[];
              const dmn=[-1, 11];
              for(let x=dmn[0];x<=dmn[1];x+=(dmn[1]-dmn[0])/80){
                const y=(numerator);
                if(isFinite(y)&&y>=ymin-5&&y<=ymax+5)pts.push(mx(x)+','+my(y));
                else if(pts.length>0)pts.push(null);
              }
              let svgPts=[];
              let seg=[];
              for(const p of pts){if(p===null){if(seg.length>1)svgPts.push(seg);seg=[];}else seg.push(p);}
              if(seg.length>1)svgPts.push(seg);
              return svgPts.map(s=>'<polyline points="'+s.join(' ')+'" fill="none" stroke="#2563eb" stroke-width="2"/>').join('');
            })()}</svg></div>`;
    
    const optionsData = [
      { figureCode: distractorA, isCorrect: false, reason: "no shift" },
      { figureCode: distractorB, isCorrect: false, reason: "horizontal shift wrong direction" },
      { figureCode: distractorC, isCorrect: false, reason: "shift down instead of up" },
      { figureCode: correctGraph, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    const explanation = `Choice ${correctLetter} is correct. The function $y=f(x)+${shift}$ represents a vertical shift of the original function $f(x)=\\frac{${numerator}}{x}$ upward by ${shift} units. The asymptote moves from $y=0$ to $y=${shift}$, and all points shift up by ${shift} units. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;
    
    return {
      questionText,
      figureCode: null,
      options: shuffledOptions.map(o => ({ figureCode: o.figureCode })),
      correctAnswer: correctGraph,
      explanation
    };
  }
};
