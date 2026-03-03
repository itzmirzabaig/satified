import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: 431c3038
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [hiking: 200/30min, biking: 150/30min, total: 1900]
 * - Difficulty factors: [Unit conversion, setting up linear equation]
 * - Distractor patterns: [A: solving for half-periods not hours, B: wrong period count, C: subtraction error, D: correct]
 * - Constraints: [Answer must be integer hours]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */

export const generator_431c3038 = {
  metadata: {
    // id: "431c3038",
    assessment: "SAT",
    domain: "Algebra",
    skill: "Linear Equations In Two Variable",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // STEP 1: Generate parameters
    const calHike30 = getRandomInt(150, 250);
    const calBike30 = getRandomInt(100, 200);
    const calHikeHour = calHike30 * 2;
    const calBikeHour = calBike30 * 2;
    const bikeHours = getRandomInt(1, 3);
    const hikeHours = getRandomInt(2, 6);
    const totalCal = calBikeHour * bikeHours + calHikeHour * hikeHours;
    
    // STEP 2: Create options
    const wrong1 = (totalCal / calHike30).toFixed(2); // Using 30-min rate as hourly
    const wrong2 = ((totalCal - calBike30) / calHike30).toFixed(2); // Wrong period count
    const wrong3 = hikeHours + bikeHours; // Adding instead of solving
    
    const optionsData = [
      { text: `$${wrong1}$`, isCorrect: false },
      { text: `$${wrong2}$`, isCorrect: false },
      { text: `$${wrong3}$`, isCorrect: false },
      { text: `$${hikeHours}$`, isCorrect: true }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    
    return {
      questionText: `In an article about exercise, it is estimated that a ${getRandomInt(140, 180)}-pound adult uses ${calHike30} calories for every 30 minutes of hiking and ${calBike30} calories for every 30 minutes of bicycling. An adult who weighs 160 pounds has completed ${bikeHours} hour${bikeHours > 1 ? 's' : ''} of bicycling. Based on the article, how many hours should the adult hike to use a total of ${totalCal} calories from bicycling and hiking?`,
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: correctLetter,
      explanation: `Choice ${correctLetter} is correct. First, calculate hourly rates:\n- Hiking: ${calHike30} cal/30 min × 2 = ${calHikeHour} cal/hour\n- Bicycling: ${calBike30} cal/30 min × 2 = ${calBikeHour} cal/hour\n\nCalories from ${bikeHours} hour${bikeHours > 1 ? 's' : ''} of bicycling: ${calBikeHour} × ${bikeHours} = ${calBikeHour * bikeHours} calories.\n\nLet $h$ = hours of hiking needed:\n$${calBikeHour * bikeHours} + ${calHikeHour}h = ${totalCal}$\n${calHikeHour}h = ${totalCal - calBikeHour * bikeHours}\n$h = ${hikeHours}$`
    };
  }
};

// File: generators/LinearEquationsInTwoVariable/sat-62ef6f73.ts
/**
 * Question ID: 62ef6f73
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [2 squares, 6 triangles, side lengths r and t, total perimeter: 210]
 * - Difficulty factors: [Calculating perimeters, setting up equation]
 * - Distractor patterns: [A: wrong calculations, B: counting shapes not perimeters, C: correct, D: reversed quantities]
 * - Constraints: [Clean equation setup]
 * - Question type: [Multiple choice text]
 * - Figure generation: [None]
 */
