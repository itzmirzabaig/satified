import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1391
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [ranges 0-10 for books, different ranges for two classes]
 * - Difficulty factors: [Reading box plots to find min/max, calculating range, finding difference]
 * - Distractor patterns: [N/A - fill in blank]
 * - Constraints: [Range = max - min for each class, positive difference between ranges]
 * - Question type: [Figure→Fill in the blank]
 */

export const generator_1391 = {
  metadata: {
    id: "1391",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate ranges for two classes
    const classAMin = getRandomInt(0, 3);
    const classAMax = classAMin + getRandomInt(4, 8);
    const rangeA = classAMax - classAMin;
    
    const classBMin = getRandomInt(1, 5);
    const classBMax = classBMin + getRandomInt(6, 12);
    const rangeB = classBMax - classBMin;
    
    // STEP 2: Generate quartiles for box plots
    const classAQ1 = classAMin + Math.floor((classAMax - classAMin) * 0.25);
    const classAMedian = classAMin + Math.floor((classAMax - classAMin) * 0.5);
    const classAQ3 = classAMin + Math.floor((classAMax - classAMin) * 0.75);
    
    const classBQ1 = classBMin + Math.floor((classBMax - classBMin) * 0.25);
    const classBMedian = classBMin + Math.floor((classBMax - classBMin) * 0.5);
    const classBQ3 = classBMin + Math.floor((classBMax - classBMin) * 0.75);
    
    // STEP 3: Build Mafs code for two box plots
    const xMin = Math.min(classAMin, classBMin) - 1;
    const xMax = Math.max(classAMax, classBMax) + 2;
    
    const _svg_0 = xMax; const _svg_1 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_1,xmax=_svg_0;
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classAMin))+'" y1="'+my(0.7)+'" x2="'+mx((classAQ1))+'" y2="'+my(0.7)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classAQ3))+'" y1="'+my(0.7)+'" x2="'+mx((classAMax))+'" y2="'+my(0.7)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classAMedian))+'" y1="'+my(0.4)+'" x2="'+mx((classAMedian))+'" y2="'+my(1.0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classBMin))+'" y1="'+my(-0.3)+'" x2="'+mx((classBQ1))+'" y2="'+my(-0.3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classBQ3))+'" y1="'+my(-0.3)+'" x2="'+mx((classBMax))+'" y2="'+my(-0.3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((classBMedian))+'" y1="'+my(-0.6)+'" x2="'+mx((classBMedian))+'" y2="'+my(0.0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((classAMedian))+'" y="'+my(1.4)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Class A</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((classBMedian))+'" y="'+my(-0.9)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Class B</text>';
    })()}</svg></div>`;
    
    // STEP 4: Calculate answer
    const difference = Math.abs(rangeB - rangeA);
    
    // STEP 5: Return question data
    return {
      questionText: "The two box plots show the distribution of number of books read over the summer by the students in two different English classes. What is the positive difference between the ranges of number of books read over the summer for the two classes?",
      figureCode: mafsCode,
      options: null,
      correctAnswer: difference.toString(),
      explanation: `The correct answer is ${difference}. The range is the difference between maximum and minimum values. Class A range is ${classAMax} - ${classAMin} = ${rangeA}; Class B range is ${classBMax} - ${classBMin} = ${rangeB}. The positive difference is |${rangeB} - ${rangeA}| = ${difference}.`
    };
  }
};
