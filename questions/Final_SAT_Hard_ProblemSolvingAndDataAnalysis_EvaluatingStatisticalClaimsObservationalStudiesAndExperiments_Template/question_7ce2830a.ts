import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



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

export const generator_7ce2830a = {
  metadata: {
    // id: "7ce2830a",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const sampleSize = getRandomInt(25, 50);
    
    // Randomize context elements
    const professionals = ["psychologist", "education researcher", "cognitive scientist", "learning specialist"];
    const professional = getRandomElement(professionals);
    
    const interventions = [
      { activity: "playing a certain educational game", skill: "adding fractions", improvement: "accuracy when adding fractions" },
      { activity: "using an interactive math app", skill: "solving linear equations", improvement: "speed in solving equations" },
      { activity: "participating in a peer tutoring program", skill: "reading comprehension", improvement: "reading assessment scores" },
      { activity: "completing daily problem sets", skill: "geometric reasoning", improvement: "geometry test performance" }
    ];
    const intervention = getRandomElement(interventions);
    
    const schoolTypes = ["middle schools", "high schools", "elementary schools"];
    const schoolType = getRandomElement(schoolTypes);
    
    const gradeLevels: Record<string, string> = {
      "middle schools": "middle school",
      "high schools": "high school", 
      "elementary schools": "elementary school"
    };
    const gradeLevel = gradeLevels[schoolType];
    
    // STEP 2: Create options with tracking
    const optionsData = [
      { 
        text: `The ${sampleSize} students in the sample`, 
        isCorrect: false,
        reason: "this represents only the sample, not the largest generalizable population"
      },
      { 
        text: "All students at the school", 
        isCorrect: true,
        reason: "the random sample was drawn from all students at this specific school, making this the largest generalizable population"
      },
      { 
        text: `All ${gradeLevel} students in the city`, 
        isCorrect: false,
        reason: "the sample was drawn from only one school, not all schools in the city"
      },
      { 
        text: "All students in the city", 
        isCorrect: false,
        reason: "the sample was from one specific school and grade level, not representative of all students citywide"
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
      questionText: `A ${professional} designed and conducted a study to determine whether ${intervention.activity} increases ${gradeLevel} students' ${intervention.skill}. For the study, the ${professional} chose a random sample of ${sampleSize} students from all of the students at one of the ${schoolType} in a large city. The ${professional} found that students who ${intervention.activity.split(' ')[0]} the ${intervention.activity.split(' ').slice(2).join(' ')} showed significant improvement in ${intervention.improvement}. What is the largest group to which the results of the study can be generalized?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. The largest group to which the results of a study can be generalized is the population from which the random sample was chosen. In this case, the ${professional} chose a random sample from all students at one particular ${schoolType.slice(0, -1)}. Therefore, the largest group to which the results can be generalized is all the students at the school. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};

/**
 * Question ID: aa43b41f
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [yes: 28%, no: 70% (doesn't sum to 100% - implies "don't know/no opinion" or rounding)]
 * - Difficulty factors: [Understanding voluntary response bias, non-random sampling]
 * - Distractor patterns: [A=percentages don't sum (mathematically wrong reason), B=not random sample (correct), C=expects 50/50 split, D=time constraint]
 * - Constraints: [Voluntary response poll, specific media audience, self-selection bias]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */