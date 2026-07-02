import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 25fc031a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [units sold: represented in histograms]
 * - Difficulty factors: [Comparing standard deviation from histogram shape]
 * - Distractor patterns: [Confusing center with spread, thinking wider range = higher std dev]
 * - Constraints: [Tighter cluster = lower std dev regardless of position]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Mafs Histogram]
 */

export const generator_25fc031a = {
  metadata: {
    // id: "25fc031a",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate histogram data
    // Company A: Tight distribution (low std dev)
    const centerA = getRandomInt(15, 20);
    const heightsA = [
      getRandomInt(10, 15),
      getRandomInt(12, 16),
      getRandomInt(18, 22),
      getRandomInt(17, 21),
      getRandomInt(19, 23)
    ]; // Tight cluster
    
    // Company B: Wide distribution (high std dev)
    const centerB = centerA + getRandomInt(4, 8);
    const heightsB = [
      getRandomInt(15, 19),
      getRandomInt(16, 20),
      getRandomInt(17, 21),
      getRandomInt(19, 23),
      getRandomInt(20, 24)
    ]; // Wider spread
    
    // Calculate viewBox
    const xMin = Math.min(centerA - 1, centerB - 1) - 1;
    const xMax = Math.max(centerA + heightsA.length, centerB + heightsB.length) + 1;
    const yMax = Math.max(...heightsA, ...heightsB) + 3;
    
    // STEP 2: Build Mafs histogram code (using polygons to represent bars)
    const _svg_0 = yMax; const _svg_1 = xMax; const _svg_2 = xMin;
    const mafsCode = `<div style="width:100%;max-width:450px;margin:0 auto;"><svg viewBox="0 0 400 350" style="width:100%;height:auto;display:block;" xmlns="http://www.w3.org/2000/svg">${(() => {
      const xmin=_svg_2,xmax=_svg_1;
      const ymin=-1,ymax=_svg_0;
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      let s='';
      // Axes
      s+='<line x1="'+P+'" y1="'+my(0)+'" x2="'+(W-P)+'" y2="'+my(0)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      s+='<line x1="'+mx(0)+'" y1="'+P+'" x2="'+mx(0)+'" y2="'+(H-P)+'" stroke="currentColor" stroke-width="1.2" opacity="0.5"/>';
      return s;
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=-1,ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${centerA + 2.5})+'" y="'+my(${yMax - 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Company A</text>';
    })()}${(() => {
      const xmin=${xMin},xmax=${xMax};
      const ymin=-1,ymax=${yMax};
      const W=400,H=350,P=45;
      const mx=(x)=>P+(x-xmin)/(xmax-xmin)*(W-2*P);
      const my=(y)=>H-P-(y-ymin)/(ymax-ymin)*(H-2*P);
      return '<text x="'+mx(${centerB + 2.5})+'" y="'+my(${yMax - 1})+'" text-anchor="middle" font-size="13" font-style="italic" fill="currentColor">Company B</text>';
    })()}</svg></div>`;
    
    // STEP 3: Create options
    const optionsData = [
      { text: `The standard deviation of number of units sold for company A is less than the standard deviation of number of units sold for company B.`, isCorrect: true },
      { text: `The standard deviation of number of units sold for company A is greater than the standard deviation of number of units sold for company B.`, isCorrect: false },
      { text: `The standard deviation of number of units sold for company A is equal to the standard deviation of number of units sold for company B.`, isCorrect: false },
      { text: `There is not enough information to compare the standard deviations.`, isCorrect: false }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `The histograms summarize the distributions of number of units sold, in thousands, for company A and company B. Which statement best compares the standard deviations of number of units sold for these companies?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Standard deviation measures how far values are from the mean. Company A's histogram shows most values clustered tightly around the center, while Company B's histogram shows more values further from the center. Therefore, Company A has a smaller standard deviation. Choice ${incorrectOptions[0].letter} is incorrect because Company A's distribution is tighter, not wider. Choice ${incorrectOptions[1].letter} is incorrect because the distributions clearly have different spreads. Choice ${incorrectOptions[2].letter} is incorrect because the shape of the histograms provides sufficient information to compare standard deviations.`
    };
  }
};