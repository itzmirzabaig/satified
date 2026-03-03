import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question ID: 5218763
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [class size: 26, percent with 2+ siblings: 34.6%, total classes: 1,800]
 * - Difficulty factors: [Multi-step estimation, complementary percentage, scaling to population]
 * - Distractor patterns: [A: calculates "at least 2 siblings" instead of "fewer than 2", B: uses half the population incorrectly, D: gives total population without adjustment]
 * - Constraints: [Must calculate 65.4% of total population, 34.6% of 26 ≈ 9 students, so 17 have fewer]
 * - Question type: [Text→Multiple Choice Text]
 * - Figure generation: null (no figure in original)
 */

export const generator_5218763 = {
  metadata: {
    // id: "5218763",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Inference From Sample Statistics And Margin Of Error",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters matching original complexity
    // Class size around 26, percent with 2+ siblings around 30-40%
    const classSize = getRandomInt(22, 30);
    const percentAtLeastTwo = getRandomElement([32.1, 34.6, 37.5, 40.0, 28.6, 42.9]);
    const totalClasses = getRandomInt(1500, 2200);
    
    // STEP 2: Calculate key values
    const studentsWithAtLeastTwo = Math.round(classSize * percentAtLeastTwo / 100);
    const studentsWithFewerThanTwo = classSize - studentsWithAtLeastTwo;
    const percentWithFewerThanTwo = 100 - percentAtLeastTwo;
    
    const totalStudents = classSize * totalClasses;
    const estimateFewerThanTwo = studentsWithFewerThanTwo * totalClasses;
    const estimateAtLeastTwo = studentsWithAtLeastTwo * totalClasses;
    
    // STEP 3: Generate distractors with clear error patterns
    const distractorA = estimateAtLeastTwo; // Wrong: "at least" instead of "fewer than"
    const distractorB = Math.round(totalStudents / 2); // Wrong: half without reason
    const distractorD = totalStudents; // Wrong: total without adjustment
    
    const optionsData = [
      { text: `${distractorA.toLocaleString()}`, isCorrect: false, type: "atLeast" },
      { text: `${distractorB.toLocaleString()}`, isCorrect: false, type: "half" },
      { text: `${estimateFewerThanTwo.toLocaleString()}`, isCorrect: true, type: "correct" },
      { text: `${distractorD.toLocaleString()}`, isCorrect: false, type: "total" }
    ];
    
    // STEP 4: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect);
    const correctLetter = correctOption!.letter;
    
    // Map incorrect options by type for explanation
    const incorrectByType: Record<string, string> = {};
    shuffledOptions.filter(opt => !opt.isCorrect).forEach(opt => {
      incorrectByType[opt.type] = opt.letter;
    });
    
    // STEP 5: Build explanation
    const explanation = `Choice ${correctLetter} is correct. It is given that ${percentAtLeastTwo}% of ${classSize} students in the class reported that they had at least two siblings. Since ${percentAtLeastTwo}% of ${classSize} is ${studentsWithAtLeastTwo.toFixed(1).replace('.0', '')}, there must have been ${studentsWithAtLeastTwo} students in the class who reported having at least two siblings and ${studentsWithFewerThanTwo} students who reported that they had fewer than two siblings. It is also given that the average class size in the state is ${classSize} and that the class is representative of all classes in the state. This means that in each class in the state there are about ${studentsWithFewerThanTwo} students who have fewer than two siblings. Therefore, the best estimate of the number of students in the state who have fewer than two siblings is ${studentsWithFewerThanTwo} × (number of classes in the state), or ${studentsWithFewerThanTwo} × ${totalClasses.toLocaleString()} = ${estimateFewerThanTwo.toLocaleString()}. Choice ${incorrectByType['atLeast']} is incorrect because ${distractorA.toLocaleString()} is the best estimate for the number of students in the state who have at least, not fewer than, two siblings. Choice ${incorrectByType['half']} is incorrect because ${distractorB.toLocaleString()} is half of the estimated total number of students in the state; however, since the students in the class are representative of students in the classes in the state and more than half of the students have fewer than two siblings, more than half of the students in each class in the state have fewer than two siblings, too. Choice ${incorrectByType['total']} is incorrect because ${distractorD.toLocaleString()} is the estimated total number of students in the state.`;
    
    return {
      questionText: `In State X, a class consisting of ${classSize} students was surveyed and ${percentAtLeastTwo} percent of the students reported that they had at least two siblings. The average class size in the state is ${classSize}. If the students in this class are representative of students in the state's classes and there are ${totalClasses.toLocaleString()} classes in the state, which of the following best estimates the number of students in the state who have fewer than two siblings?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `${estimateFewerThanTwo.toLocaleString()}`,
      explanation: explanation
    };
  }
};

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

// File: generators/inference-from-sample-statistics-and-margin-of-error/916ffe9b.ts