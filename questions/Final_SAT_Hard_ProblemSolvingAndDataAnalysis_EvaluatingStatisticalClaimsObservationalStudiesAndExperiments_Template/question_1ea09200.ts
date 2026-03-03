import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 1ea09200
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [sample size: 40, positive responses: 32 (80%)]
 * - Difficulty factors: [Understanding sampling vs population, generalization limits]
 * - Distractor patterns: [A=sample only, C=all students (over-generalization), D=county (geographic over-generalization)]
 * - Constraints: [Random sample from specific grade at specific school]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */

export const generator_1ea09200 = {
  metadata: {
    // id: "1ea09200",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    // Original: 40 students, 32 said helpful (80%)
    // We'll randomize sample size (30-60) and percentage (60-90%)
    const sampleSize = getRandomInt(30, 60);
    const percentPositive = getRandomInt(60, 90);
    const positiveResponses = Math.round(sampleSize * percentPositive / 100);
    
    // Randomize context elements
    const grades = ["fourth-grade", "fifth-grade", "sixth-grade", "seventh-grade", "eighth-grade"];
    const grade = getRandomElement(grades);
    
    const surveyTopics = [
      "morning announcements",
      "lunch menu options", 
      "school library services",
      "after-school programs",
      "technology use in classrooms"
    ];
    const topic = getRandomElement(surveyTopics);
    
    const positiveAdjectives = ["helpful", "satisfactory", "useful", "beneficial", "enjoyable"];
    const adjective = getRandomElement(positiveAdjectives);
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { 
        text: `The ${sampleSize} students who were surveyed`, 
        isCorrect: false,
        reason: "represents the sample only, not the largest applicable population"
      },
      { 
        text: `All ${grade} students at the school`, 
        isCorrect: true,
        reason: "this is the population from which the random sample was drawn"
      },
      { 
        text: "All students at the school", 
        isCorrect: false,
        reason: "the sample only included one specific grade, so results cannot generalize to all grades"
      },
      { 
        text: `All ${grade} students in the county in which the school is located`, 
        isCorrect: false,
        reason: "the sample was taken from only one school, not all schools in the county"
      }
    ];
    
    // STEP 3: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);
    
    // STEP 4: Return question data
    return {
      questionText: `A sample of ${sampleSize} ${grade} students was selected at random from a certain school. The ${sampleSize} students completed a survey about the ${topic}, and ${positiveResponses} thought the ${topic} were ${adjective}. Which of the following is the largest population to which the results of the survey can be applied?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The question asks to identify the largest population to which the survey results can be generalized. The sample was drawn specifically from "${grade} students" at "a certain school". Since the sample was randomly selected from this specific group, the results can be generalized to all ${grade} students at that school. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};

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