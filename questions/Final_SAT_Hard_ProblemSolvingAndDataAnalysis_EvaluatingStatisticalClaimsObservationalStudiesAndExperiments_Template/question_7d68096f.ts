import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 7d68096f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hours: 3-5 vs >5, points: 6-13 vs 14+, counts: 6,4,10,4,26,30,10,30,40]
 * - Difficulty factors: [Table interpretation, understanding sampling scope vs subset shown]
 * - Distractor patterns: [A=subset condition, B=specific sample size mentioned, C=subset of sample, D=full population]
 * - Constraints: [Random sample from tournament, table shows subset with practice hours ≥ X]
 * - Question type: [Table included - conceptual question about generalization]
 * - Figure generation: [HTML Table showing practice hours vs points]
 */

export const generator_7d68096f = {
  metadata: {
    // id: "7d68096f",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Generate table data - need values that create a 2x2 contingency table with totals
    // Original structure: 3-5 hours vs >5 hours, and 6-13 points vs 14+ points
    
    const lowHoursMin = getRandomInt(2, 4); // "at least X" threshold
    const midHours = getRandomInt(lowHoursMin + 1, lowHoursMin + 3); // 3-5 range start
    
    // Cell counts for the table
    const cell1 = getRandomInt(4, 8); // low hours, low points
    const cell2 = getRandomInt(2, 6); // low hours, high points
    const row1Total = cell1 + cell2;
    
    const cell3 = getRandomInt(2, 6); // high hours, low points
    const cell4 = getRandomInt(20, 32); // high hours, high points (larger to show trend)
    const row2Total = cell3 + cell4;
    
    const col1Total = cell1 + cell3;
    const col2Total = cell2 + cell4;
    const grandTotal = row1Total + row2Total;
    
    // Randomize context
    const contexts = [
      { event: "trivia tournament", variable1: "points scored", variable2: "hours practiced" },
      { event: "debate competition", variable1: "round scores", variable2: "weekly preparation hours" },
      { event: "chess tournament", variable1: "match ratings", variable2: "study hours" },
      { event: "coding competition", variable1: "problem scores", variable2: "practice hours" }
    ];
    const context = getRandomElement(contexts);
    
    const scoreThreshold = getRandomInt(10, 18); // threshold for point categories
    
    // STEP 2: Build HTML table string
    const tableCode = `<table style="border-collapse: collapse; margin: 20px auto; text-align: center;">
      <thead>
        <tr>
          <th style="border: 1px solid currentColor; padding: 8px;">${context.variable2}</th>
          <th style="border: 1px solid currentColor; padding: 8px;">${lowHoursMin} to ${scoreThreshold - 1} ${context.variable1}</th>
          <th style="border: 1px solid currentColor; padding: 8px;">${scoreThreshold} or more ${context.variable1}</th>
          <th style="border: 1px solid currentColor; padding: 8px;">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">${midHours} to ${midHours + 2} hours</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${cell1}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${cell2}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${row1Total}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">More than ${midHours + 2} hours</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${cell3}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${cell4}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${row2Total}</td>
        </tr>
        <tr>
          <td style="border: 1px solid currentColor; padding: 8px;">Total</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${col1Total}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${col2Total}</td>
          <td style="border: 1px solid currentColor; padding: 8px;">${grandTotal}</td>
        </tr>
      </tbody>
    </table>`;
    
    // STEP 3: Create options with tracking
    const optionsData = [
      { 
        text: `All teams in the ${context.event} that scored ${scoreThreshold} or more ${context.variable1} in the round`, 
        isCorrect: false,
        reason: "the sample was selected from all teams, not just high-scoring teams"
      },
      { 
        text: `The ${grandTotal} teams in the sample`, 
        isCorrect: false,
        reason: "results from a random sample can be generalized to the population, not just the sample itself"
      },
      { 
        text: `The teams in the sample that practiced for at least ${lowHoursMin} hours per week`, 
        isCorrect: false,
        reason: "results can be generalized to the full population, not just a subset of the sample"
      },
      { 
        text: `All teams in the ${context.event}`, 
        isCorrect: true,
        reason: "since teams were selected at random from all teams in the tournament, results apply to all teams"
      }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 5: Return question data
    return {
      questionText: `A ${context.event} organizer wanted to study the relationship between the number of ${context.variable1} a team scores in a round and the number of hours that a team practices each week. For the study, the organizer selected teams at random from all teams in a certain ${context.event}. The table displays the information for the teams in the sample that practiced for at least ${lowHoursMin} hours per week. Which of the following is the largest population to which the results of the study can be generalized?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. ${correctOption.reason}. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: 7ce2830a
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 35]
 * - Difficulty factors: [Understanding scope of random sample from specific school]
 * - Distractor patterns: [A=sample only, C=city (too broad), D=all students (includes non-middle school)]
 * - Constraints: [Random sample from one middle school in large city]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */