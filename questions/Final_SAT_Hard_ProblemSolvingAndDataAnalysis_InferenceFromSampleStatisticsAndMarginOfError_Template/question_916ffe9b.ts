import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 916ffe9b
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [poll size: 803, Cruz votes: 483, Smith votes: 320, total voters: 6,424]
 * - Difficulty factors: [Proportion calculation, scaling to population, vote margin calculation]
 * - Distractor patterns: [A: raw difference in sample (483-320=163), C: just Cruz's expected votes, D: incorrectly calculated winner votes]
 * - Constraints: [Must calculate expected votes for both, then find difference]
 * - Question type: [Table→Multiple Choice Text]
 * - Figure generation: [HTML table with randomized vote counts preserving proportions]
 */

export const generator_916ffe9b = {
  metadata: {
    // id: "916ffe9b",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate poll parameters
    // Create realistic poll numbers where proportions work out cleanly
    const pollSize = getRandomInt(700, 900);
    
    // Generate Cruz percentage between 55-65% for realistic lead
    const cruzPercent = getRandomInt(58, 65);
    const cruzVotesPoll = Math.round(pollSize * cruzPercent / 100);
    const smithVotesPoll = pollSize - cruzVotesPoll;
    
    // Ensure clean numbers for total election size
    const scaleFactor = getRandomInt(7, 12);
    const totalVoters = pollSize * scaleFactor;
    
    // STEP 2: Calculate expected values
    const cruzExpected = Math.round(totalVoters * cruzVotesPoll / pollSize);
    const smithExpected = totalVoters - cruzExpected;
    const marginOfVictory = cruzExpected - smithExpected;
    
    // STEP 3: Calculate distractors with specific error patterns
    const distractorA = cruzVotesPoll - smithVotesPoll; // Raw poll difference (wrong)
    const distractorC = cruzExpected; // Just Cruz votes, not margin (wrong)
    const distractorD = totalVoters - cruzExpected; // Smith's votes instead of margin (wrong)
    
    const optionsData = [
      { text: `${distractorA.toLocaleString()}`, isCorrect: false, type: "rawDiff" },
      { text: `${marginOfVictory.toLocaleString()}`, isCorrect: true, type: "correct" },
      { text: `${distractorC.toLocaleString()}`, isCorrect: false, type: "cruzOnly" },
      { text: `${distractorD.toLocaleString()}`, isCorrect: false, type: "smithVotes" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // Map incorrect options by type
    const incorrectByType: Record<string, string> = {};
    shuffledOptions.filter(opt => !opt.isCorrect).forEach(opt => {
      incorrectByType[opt.type] = opt.letter;
    });
    
    // STEP 5: Build HTML table
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr style="border-bottom: 2px solid #333;">
          <th style="border: 1px solid currentColor; padding: 10px;">Candidate</th>
          <th style="border: 1px solid currentColor; padding: 10px;">Votes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 10px;">Angel Cruz</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${cruzVotesPoll}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 10px;">Terry Smith</td>
          <td style="border: 1px solid currentColor; padding: 10px;">${smithVotesPoll}</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 6: Build explanation with detailed reasoning
    const explanation = `Choice ${correctLetter} is correct. It's given that ${cruzVotesPoll} out of ${pollSize} voters responded that they would vote for Angel Cruz. Therefore, the proportion of voters from the poll who responded they would vote for Angel Cruz is \\\\frac{${cruzVotesPoll}}{${pollSize}}. It's also given that there are a total of ${totalVoters.toLocaleString()} voters in the election. Therefore, the total number of people who would be expected to vote for Angel Cruz is ${totalVoters.toLocaleString()} \\\\times \\\\frac{${cruzVotesPoll}}{${pollSize}}, or ${cruzExpected.toLocaleString()}. Since ${cruzExpected.toLocaleString()} of the ${totalVoters.toLocaleString()} total voters would be expected to vote for Angel Cruz, it follows that ${totalVoters.toLocaleString()} - ${cruzExpected.toLocaleString()}, or ${smithExpected.toLocaleString()} voters would be expected not to vote for Angel Cruz. The difference in the number of votes for and against Angel Cruz is ${cruzExpected.toLocaleString()} - ${smithExpected.toLocaleString()}, or ${marginOfVictory.toLocaleString()} votes. Therefore, if ${totalVoters.toLocaleString()} people vote in the election, Angel Cruz would be expected to win by ${marginOfVictory.toLocaleString()} votes.`;
    
    return {
      questionText: `The table shows the results of a poll. A total of ${pollSize} voters selected at random were asked which candidate they would vote for in the upcoming election. According to the poll, if ${totalVoters.toLocaleString()} people vote in the election, by how many votes would Angel Cruz be expected to win?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${marginOfVictory.toLocaleString()}`,
      explanation: explanation
    };
  }
};