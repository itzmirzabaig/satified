import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 9ee22c16
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 400 (triple-digit), female A: 202, female B: 20, male A: 34, male B: 144, total pop: 6,000]
 * - Difficulty factors: [Table interpretation, stratified sample scaling, total calculation across categories]
 * - Distractor patterns: [Calculation errors, using wrong denominator, forgetting to multiply by total]
 * - Constraints: [Must sum correct category across genders, then scale: (sample_count/sample_size) * total_pop]
 * - Question type: [Table→Fill in the blank]
 * - Figure generation: [HTML Table - must preserve table structure]
 */

export const generator_9ee22c16 = {
  metadata: {
    // id: "9ee22c16",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Total population: 4,000 to 10,000
    const totalPopulation = getRandomInt(40, 100) * 100;
    // Sample size: 300-500
    const sampleSize = getRandomInt(300, 500);
    // Candidate names
    const candidates = [
      { a: "Candidate A", b: "Candidate B", position: "mayor" },
      { a: "Candidate X", b: "Candidate Y", position: "council president" },
      { a: "Proposition 1", b: "Proposition 2", position: "ballot measure" }
    ];
    const candidate = getRandomElement(candidates);
    // Gender categories
    const gender1 = "Female";
    const gender2 = "Male";
    
    // Generate table values ensuring they sum to sampleSize
    // Total for Candidate A should be roughly 50-70% of sample (majority)
    const totalForA = getRandomInt(Math.floor(sampleSize * 0.5), Math.floor(sampleSize * 0.7));
    const totalForB = sampleSize - totalForA;
    
    // Split between genders (uneven split typical in samples)
    const gender1ForA = getRandomInt(Math.floor(totalForA * 0.6), Math.floor(totalForA * 0.9));
    const gender2ForA = totalForA - gender1ForA;
    const gender1ForB = getRandomInt(Math.floor(totalForB * 0.1), Math.floor(totalForB * 0.4));
    const gender2ForB = totalForB - gender1ForB;
    
    // Recalculate totals to ensure they match
    const gender1Total = gender1ForA + gender1ForB;
    const gender2Total = gender2ForA + gender2ForB;
    
    // STEP 2: Calculate correct answer
    const proportionForA = totalForA / sampleSize;
    const estimatedTotalForA = Math.round(proportionForA * totalPopulation);
    
    // STEP 3: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
  <thead>
    <tr style="border-bottom: 2px solid #333;">
      <th style="border: 1px solid currentColor; padding: 10px;">Gender</th>
      <th style="border: 1px solid currentColor; padding: 10px;">Plan to vote for ${candidate.a}</th>
      <th style="border: 1px solid currentColor; padding: 10px;">Plan to vote for ${candidate.b}</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border: 1px solid currentColor; padding: 10px; font-weight: bold;">${gender1}</td>
      <td style="border: 1px solid currentColor; padding: 10px;">${gender1ForA}</td>
      <td style="border: 1px solid currentColor; padding: 10px;">${gender1ForB}</td>
    </tr>
    <tr>
      <td style="border: 1px solid currentColor; padding: 10px; font-weight: bold;">${gender2}</td>
      <td style="border: 1px solid currentColor; padding: 10px;">${gender2ForA}</td>
      <td style="border: 1px solid currentColor; padding: 10px;">${gender2ForB}</td>
    </tr>
  </tbody>
</table>`;
    
    // STEP 4: Return question data (fill-in-the-blank)
    return {
      questionText: `A random sample of ${sampleSize} town voters were asked if they plan to vote for ${candidate.a} or ${candidate.b} for ${candidate.position}. The results were sorted by gender and are shown in the table below.Based on the table, what is the best estimate of the number of voters who plan to vote for ${candidate.a}?`,
      figureCode: tableCode, // Table is embedded in questionText
      options: null, // Fill-in-the-blank
      correctAnswer: estimatedTotalForA.toString(),
      explanation: `The correct answer is ${estimatedTotalForA.toLocaleString()}. According to the table, of ${sampleSize} voters randomly sampled, the total number of ${gender1.toLowerCase()} and ${gender2.toLowerCase()} voters who plan to vote for ${candidate.a} is ${totalForA}. The best estimate of the total number of voters in the town who plan to vote for ${candidate.a} is the fraction of voters in the sample who plan to vote for ${candidate.a}, ${totalForA}/${sampleSize}, multiplied by the total voter population of ${totalPopulation.toLocaleString()}. Therefore, the answer is (${totalForA}/${sampleSize})(${totalPopulation.toLocaleString()}) = ${estimatedTotalForA.toLocaleString()}.`
    };
  }
};