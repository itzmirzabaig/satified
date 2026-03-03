import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';



/**
 * Question ID: 6fca0144
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [tree age: specific value, years of treatment: consecutive years]
 * - Difficulty factors: [Understanding experimental scope - randomly selected from specific age group in specific location]
 * - Distractor patterns: [A=sample only, B=wrong age group, C=geographic over-generalization, D=correct specific group]
 * - Constraints: [Random assignment to groups within specific age cohort from specific habitat]
 * - Question type: [Conceptual - No figure needed]
 * - Figure generation: [None]
 */

export const generator_6fca0144 = {
  metadata: {
    // id: "6fca0144",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Evaluating Statistical Claims Observational Studies And Experiments",
    difficulty: "Hard"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate random values (MATCH ORIGINAL RANGES)
    const treeAge = getRandomInt(5, 25);
    const studyDuration = getRandomInt(2, 5);
    
    // Randomize context elements
    const locations = [
      { country: "South Africa", tree: "baobab tree", habitat: "baobab tree habitat" },
      { country: "Brazil", tree: "rubber tree", habitat: "rainforest reserve" },
      { country: "Australia", tree: "eucalyptus", habitat: "eucalyptus grove" },
      { country: "Canada", tree: "maple tree", habitat: "maple forest" }
    ];
    const location = getRandomElement(locations);
    
    const treatments = [
      { treatment1: "different watering patterns", treatment2: "fertilizer types", outcome: "growth rate" },
      { treatment1: "sunlight exposure levels", treatment2: "pruning techniques", outcome: "leaf density" },
      { treatment1: "soil composition types", treatment2: "drainage systems", outcome: "root development" }
    ];
    const treatment = getRandomElement(treatments);
    
    const professionals = ["scientist", "forestry researcher", "ecologist", "botanist"];
    const professional = getRandomElement(professionals);
    
    // STEP 2: Create options with tracking
    // Note: Original has confusing options B and D that appear similar - this tests careful reading
    // D is correct because it matches the specific age and specific habitat
    const specificGroup = `All the ${location.tree}s that were ${treeAge} years old in this ${location.habitat.split(' ').slice(-1)[0]}`;
    const wrongAgeGroup = `All the ${location.tree}s that were ${treeAge + 3} years old in this ${location.habitat.split(' ').slice(-1)[0]}`;
    const tooBroadGroup = `All the ${location.tree}s that were ${treeAge} years old in ${location.country}`;
    const sampleOnly = `All the ${location.tree}s that were selected in this ${location.habitat.split(' ').slice(-1)[0]}`;
    
    const optionsData = [
      { 
        text: sampleOnly, 
        isCorrect: false,
        reason: "since the sample was randomly selected from a population, results can be applied to the population, not just the sample"
      },
      { 
        text: wrongAgeGroup, 
        isCorrect: false,
        reason: `the sample was selected from trees that were ${treeAge} years old, not ${treeAge + 3} years old`
      },
      { 
        text: tooBroadGroup, 
        isCorrect: false,
        reason: `the sample was selected from a specific ${location.habitat}, not from all ${location.tree}s in ${location.country}`
      },
      { 
        text: specificGroup, 
        isCorrect: true,
        reason: `the sample was randomly selected from ${location.tree}s that were ${treeAge} years old in this specific ${location.habitat}`
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
      questionText: `For a ${location.habitat} in ${location.country}, a ${professional} randomly selected ${location.tree}s that were ${treeAge} years old and randomly assigned them to two groups. Each group was subjected to ${treatment.treatment1} for ${studyDuration} consecutive years to observe whether the treatment affects the trees' ${treatment.outcome}. Based on the design of the study, what is the largest group to which these results can be applied?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctLetter} is correct. When a study uses a randomly selected sample, the largest group to which the results can be applied is the population from which the sample was selected. The ${professional} randomly selected the trees from the ${location.tree}s in a certain ${location.habitat} that were ${treeAge} years old. Therefore, the largest group to which the results can be applied is all the ${location.tree}s that were ${treeAge} years old in this ${location.habitat.split(' ').slice(-1)[0]}. Choice ${incorrectOptions[0].letter} is incorrect because ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect because ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect because ${incorrectOptions[2].reason}.`
    };
  }
};