import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 4626102e
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values 22-26 for set A, adding constant 56 to create set B]
 * - Difficulty factors: [Understanding effect of adding constant on median vs range]
 * - Distractor patterns: [Student may think range changes or median stays same]
 * - Constraints: [Adding constant shifts median by that constant, range (max-min) unchanged]
 * - Question type: [Figure→Multiple Choice Text]
 */

export const generator_4626102e = {
  metadata: {
    // id: "4626102e",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate data set A (consecutive or near-consecutive integers)
    const startValue = getRandomInt(15, 35);
    const valuesA = [startValue, startValue + 1, startValue + 2, startValue + 3, startValue + 4];
    
    // Generate frequencies for dot plot
    const frequencies = valuesA.map(() => getRandomInt(1, 4));
    
    // STEP 2: Calculate statistics for set A
    const medianA = valuesA[2]; // Middle value
    const rangeA = valuesA[4] - valuesA[0];
    
    // STEP 3: Add constant to create set B
    const constant = getRandomInt(40, 70);
    const valuesB = valuesA.map(v => v + constant);
    const medianB = medianA + constant;
    const rangeB = rangeA; // Unchanged
    
    // STEP 4: Build Mafs code for dot plot of set A
    const generateDots = (vals: number[], freqs: number[], yBase: number) => {
      return vals.map((v, i) => {
        return Array.from({length: freqs[i]}, (_, j) => 
          `<Point x={${v}} y={${yBase + j * 0.15}} />`
        ).join('\n    ');
      }).join('\n    ');
    };
    
    const xMin = startValue - 2;
    const xMax = startValue + 6;
    
    const _svg_0 = xMax; const _svg_1 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 420 180" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_1, xmax=_svg_0;
      const W=420, H=180, P=30;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const cy_base=H-P-10;
      const dotR=6;
      let s='';
      // X axis
      s+='<line x1="'+P+'" y1="'+(H-P)+'" x2="'+(W-P)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.5"/>';
      // X tick labels
      const step=Math.max(1,Math.ceil((xmax-xmin)/10));
      for(let x=Math.ceil(xmin/step)*step;x<=xmax;x+=step){
        s+='<text x="'+mx(x)+'" y="'+(H-P+15)+'" text-anchor="middle" font-size="10" fill="currentColor">'+x+'</text>';
        s+='<line x1="'+mx(x)+'" y1="'+(H-P)+'" x2="'+mx(x)+'" y2="'+(H-P+4)+'" stroke="currentColor" stroke-width="1"/>';
      }
      // Dots from valuesA and frequencies
      valuesA.forEach((v,i)=>{
        for(let j=0;j<frequencies[i];j++){
          const cx=mx(v), cy=cy_base-j*(dotR*2+2);
          s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+dotR+'" fill="currentColor" stroke="none" opacity="0.7"/>';
        }
      });
      return s;
    })()}</svg></div>`;
    
    // STEP 5: Create options
    const correctText = "Median B greater, ranges equal.";
    
    const optionsData = [
      { text: "Medians equal, ranges equal.", isCorrect: false },
      { text: "Medians equal, range B greater.", isCorrect: false },
      { text: "Median B greater, ranges equal.", isCorrect: true },
      { text: "Median B greater, range B greater.", isCorrect: false }
    ];
    
    // STEP 6: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    // STEP 7: Return question data
    return {
      questionText: `Data Set A: ${valuesA.join(', ')}. The dot plot represents the values in data set A. Data set B is created by adding ${constant} to each of the values in data set A. Which correctly compares medians and ranges?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctText,
      explanation: `Choice ${correctLetter} is correct. Adding a constant (${constant}) to every value increases the median from ${medianA} to ${medianB} but leaves the range unchanged (${rangeA} = ${rangeB}). The range is calculated as max - min, and both max and min increase by the same constant, so their difference stays the same.`
    };
  }
};

/**
 * Question ID: 98958ae8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [Set A: 75 objects, mean 25; Set B: 50 objects, mean 65]
 * - Difficulty factors: [Weighted average of combined data sets, careful with different sample sizes]
 * - Distractor patterns: [Simple average of means: (25+65)/2 = 45, or wrong weighting]
 * - Constraints: [Combined mean = (sumA + sumB) / (countA + countB)]
 * - Question type: [Text→Fill in the blank]
 */

// File: generators/onevariable-data-distributions/98958ae8.ts