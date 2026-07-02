import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 1397
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [medians: 22-27 kg (double-digit, clustered around mid-20s), whiskers extend ~2-4 units from quartiles]
 * - Difficulty factors: [Reading box plots, comparing medians vs means, understanding what box plots can/cannot show]
 * - Distractor patterns: [A/B confuse mean with median; A/B assume we can calculate/estimate mean from box plot]
 * - Constraints: [Median is the vertical line in the box; range is box extent; cannot determine mean from box plot alone]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Two box plots side by side, different centers and spreads]
 */

export const generator_1397 = {
  metadata: {
    id: "1397",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random medians (the vertical line inside each box)
    // Ensure they're different enough to have a clear answer
    const group1Median = getRandomInt(24, 32);
    const group2Median = group1Median + getRandomInt(2, 6); // Group 1 will be greater
    
    // STEP 2: Generate quartiles and whiskers for each box plot
    // Box extends from Q1 to Q3, whiskers to min/max
    const group1Q1 = group1Median - getRandomInt(3, 6);
    const group1Q3 = group1Median + getRandomInt(2, 5);
    const group1Min = group1Q1 - getRandomInt(2, 5);
    const group1Max = group1Q3 + getRandomInt(2, 5);
    
    const group2Q1 = group2Median - getRandomInt(3, 6);
    const group2Q3 = group2Median + getRandomInt(2, 5);
    const group2Min = group2Q1 - getRandomInt(2, 5);
    const group2Max = group2Q3 + getRandomInt(2, 5);
    
    // STEP 3: Build Mafs code for two box plots
    // Box plot: whisker (line), box (polygon), median (thick line)
    const xMin = Math.min(group1Min, group2Min) - 2;
    const xMax = Math.max(group1Max, group2Max) + 2;
    
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
      return '<line x1="'+mx((group1Min))+'" y1="'+my(0.7)+'" x2="'+mx((group1Q1))+'" y2="'+my(0.7)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((group1Q3))+'" y1="'+my(0.7)+'" x2="'+mx((group1Max))+'" y2="'+my(0.7)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((group1Median))+'" y1="'+my(0.4)+'" x2="'+mx((group1Median))+'" y2="'+my(1.0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((group2Min))+'" y1="'+my(-0.3)+'" x2="'+mx((group2Q1))+'" y2="'+my(-0.3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((group2Q3))+'" y1="'+my(-0.3)+'" x2="'+mx((group2Max))+'" y2="'+my(-0.3)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<line x1="'+mx((group2Median))+'" y1="'+my(-0.6)+'" x2="'+mx((group2Median))+'" y2="'+my(0.0)+'" stroke="currentColor" stroke-width="2"/>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((group1Median))+'" y="'+my(1.4)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Group 1</text>';
    })()}${(() => {
      const xmin=(xMin),xmax=(xMax);
      const ymin=-1,ymax=2;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx((group2Median))+'" y="'+my(-0.9)+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Group 2</text>';
    })()}</svg></div>`;

    // STEP 4: Create options - only median comparison is verifiable from box plots
    const correctText = "The median mass of group 1 is greater than the median mass of group 2.";
    const optionsData = [
      { text: `The mean mass of group 1 is greater than the mean mass of group 2.`, isCorrect: false, reason: "confuses mean with median; cannot determine mean from box plot alone" },
      { text: `The mean mass of group 1 is less than the mean mass of group 2.`, isCorrect: false, reason: "confuses mean with median; cannot determine mean from box plot alone" },
      { text: `The median mass of group 1 is greater than the median mass of group 2.`, isCorrect: true },
      { text: `The median mass of group 1 is less than the median mass of group 2.`, isCorrect: false, reason: "reverses the median comparison" }
    ];
    
    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 6: Return question data
    return {
      questionText: "The box plots summarize the masses, in kilograms, of two groups of gazelles. Based on the box plots, which of the following statements must be true?",
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. The median of a data set in a box plot is the vertical line within the box. Group 1's median is ${group1Median} kg, and Group 2's is ${group2Median} kg. Since ${group1Median} > ${group2Median}, the median mass of group 1 is greater. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`
    };
  }
};
