import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: be00d896
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [various patterns: constant, linear, exponential, clustered]
 * - Difficulty factors: [Comparing mean and median across different distributions]
 * - Distractor patterns: [Symmetric distributions where mean=median]
 * - Constraints: [Must identify right-skewed distribution for mean > median]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */

export const generator_be00d896 = {
  metadata: {
    // id: "be00d896",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate different distribution types
    
    // A: Constant (mean = median)
    const constVal = getRandomInt(3, 8);
    const setA = Array(9).fill(constVal);
    
    // B: Linear/Symmetric (mean = median)
    const startB = getRandomInt(0, 3) * 10;
    const setB = Array.from({length: 9}, (_, i) => startB + i * 10);
    
    // C: Exponential/Right-skewed (mean > median) - THE CORRECT ONE
    const baseC = getRandomInt(2, 4);
    const setC = Array.from({length: 9}, (_, i) => Math.pow(baseC, i + 1));
    
    // D: Clustered with outlier on right but balanced (mean ≈ median or mean < median)
    const clusterVal = getRandomInt(100, 300);
    const setD = [
      clusterVal - 100, clusterVal + 7, clusterVal + 7,
      clusterVal + 107, clusterVal + 107, clusterVal + 107,
      clusterVal + 207, clusterVal + 307, clusterVal + 307
    ];
    
    // Calculate means and medians
    const meanC = setC.reduce((a, b) => a + b, 0) / 9;
    const medianC = setC[4]; // 5th value
    
    const optionsData = [
      { text: setA.join(', '), isCorrect: false, label: 'A' },
      { text: setB.join(', '), isCorrect: false, label: 'B' },
      { text: setC.join(', '), isCorrect: true, label: 'C' },
      { text: setD.join(', '), isCorrect: false, label: 'D' }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    return {
      questionText: `For which of the following data sets is the mean greater than the median?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. Choice C contains the data set {${setC.join(', ')}}. The median of this data set is ${medianC}. The mean is $\\\\frac{${setC.join('+')}}{9} = ${Math.round(meanC)}$. Since ${Math.round(meanC)} > ${medianC}, the mean is greater than the median. This occurs because the data is right-skewed by exponential growth, where the larger values pull the mean upward more than the median. Choice ${incorrectOptions[0].letter} is incorrect because constant values have equal mean and median. Choice ${incorrectOptions[1].letter} is incorrect because symmetric distributions have equal mean and median. Choice ${incorrectOptions[2].letter} is incorrect because that distribution is roughly symmetric or left-skewed.`
    };
  }
};

/**
 * Question ID: 560fab82
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [values: 19-25, frequencies: 1-7]
 * - Difficulty factors: [Identifying minimum from frequency table]
 * - Distractor patterns: [Value with lowest frequency, second lowest value]
 * - Constraints: [Minimum is lowest value with frequency > 0]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table]
 */