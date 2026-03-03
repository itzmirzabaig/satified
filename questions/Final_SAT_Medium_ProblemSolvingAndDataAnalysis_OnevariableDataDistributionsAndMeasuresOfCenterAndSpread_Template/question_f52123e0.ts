import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: f52123e0
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [scores: 23-52]
 * - Difficulty factors: [Calculating range as max - min]
 * - Distractor patterns: [Using median instead, using mean instead]
 * - Constraints: [Range is simple difference]
 * - Question type: [Text→Fill in the blank]
 * - Figure generation: [None]
 */

export const generator_f52123e0 = {
  metadata: {
    // id: "f52123e0",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Onevariable Data Distributions And Measures Of Center And Spread",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate 7 scores with clear min and max
    const minScore = getRandomInt(20, 35);
    const maxScore = minScore + getRandomInt(25, 35);
    
    const middleScores = [
      minScore + getRandomInt(3, 6),
      minScore + getRandomInt(3, 6),
      minScore + getRandomInt(8, 12),
      minScore + getRandomInt(10, 15),
      minScore + getRandomInt(12, 20)
    ].sort((a, b) => a - b);
    
    const scores = [minScore, ...middleScores, maxScore];
    const range = maxScore - minScore;
    
    return {
      questionText: `What is the range of the 7 scores shown?\n\n**Scores:** ${scores.join(', ')}`,
      figureCode: null,
      options: null,
      correctAnswer: range.toString(),
      explanation: `Range is the difference between the largest (${maxScore}) and smallest (${minScore}) values: $${maxScore} - ${minScore} = ${range}$. The range measures the spread of the data from minimum to maximum.`
    };
  }
};

/**
 * Question ID: 96924
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [15 horses, weight adjustment: -10 pounds]
 * - Difficulty factors: [Understanding which statistic is robust to outlier changes]
 * - Distractor patterns: [Thinking all change, confusing range/mean/std dev effects]
 * - Constraints: [Only median of ordered data is unchanged by extreme value adjustment]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: [None]
 */