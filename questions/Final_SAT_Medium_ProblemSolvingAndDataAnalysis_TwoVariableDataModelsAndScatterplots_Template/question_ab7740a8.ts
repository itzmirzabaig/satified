import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';

/**
 * Question ID: ab7740a8
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 1-4, y varies by table]
 * - Difficulty factors: [Identifying nonlinear relationship in tables]
 * - Distractor patterns: [A (linear +3), B (linear +4), C (linear +5), D (exponential doubling)]
 * - Constraints: [Option D must show exponential pattern (6, 12, 24, 48)]
 * - Question type: [Table Options→Multiple Choice Text]
 * - Figure generation: [null - tables in options]
 */

export const generator_ab7740a8 = {
  metadata: {
    // id: "ab7740a8",
    assessment: "SAT",
    test: "Math",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Medium"
  },
  
  generate: (): QuestionData => {
    // Generate base values for linear tables
    const startA = getRandomInt(6, 10);
    const diffA = getRandomInt(3, 5);
    
    const startB = getRandomInt(3, 6);
    const diffB = getRandomInt(3, 5);
    
    const startC = getRandomInt(6, 10);
    const diffC = getRandomInt(4, 7);
    
    // Exponential table D
    const startD = getRandomInt(3, 8);
    
    // Build tables
    const tableA = `<table style="border-collapse: collapse; margin: 10px;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">1</th><th style="border: 1px solid currentColor; padding: 8px;">2</th><th style="border: 1px solid currentColor; padding: 8px;">3</th><th style="border: 1px solid currentColor; padding: 8px;">4</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">y</td><td style="border: 1px solid currentColor; padding: 8px;">${startA}</td><td style="border: 1px solid currentColor; padding: 8px;">${startA + diffA}</td><td style="border: 1px solid currentColor; padding: 8px;">${startA + 2*diffA}</td><td style="border: 1px solid currentColor; padding: 8px;">${startA + 3*diffA}</td></tr></tbody></table>`;
    
    const tableB = `<table style="border-collapse: collapse; margin: 10px;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">1</th><th style="border: 1px solid currentColor; padding: 8px;">2</th><th style="border: 1px solid currentColor; padding: 8px;">3</th><th style="border: 1px solid currentColor; padding: 8px;">4</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">y</td><td style="border: 1px solid currentColor; padding: 8px;">${startB}</td><td style="border: 1px solid currentColor; padding: 8px;">${startB + diffB}</td><td style="border: 1px solid currentColor; padding: 8px;">${startB + 2*diffB}</td><td style="border: 1px solid currentColor; padding: 8px;">${startB + 3*diffB}</td></tr></tbody></table>`;
    
    const tableC = `<table style="border-collapse: collapse; margin: 10px;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">1</th><th style="border: 1px solid currentColor; padding: 8px;">2</th><th style="border: 1px solid currentColor; padding: 8px;">3</th><th style="border: 1px solid currentColor; padding: 8px;">4</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">y</td><td style="border: 1px solid currentColor; padding: 8px;">${startC}</td><td style="border: 1px solid currentColor; padding: 8px;">${startC + diffC}</td><td style="border: 1px solid currentColor; padding: 8px;">${startC + 2*diffC}</td><td style="border: 1px solid currentColor; padding: 8px;">${startC + 3*diffC}</td></tr></tbody></table>`;
    
    const tableD = `<table style="border-collapse: collapse; margin: 10px;"><thead><tr><th style="border: 1px solid currentColor; padding: 8px;">x</th><th style="border: 1px solid currentColor; padding: 8px;">1</th><th style="border: 1px solid currentColor; padding: 8px;">2</th><th style="border: 1px solid currentColor; padding: 8px;">3</th><th style="border: 1px solid currentColor; padding: 8px;">4</th></tr></thead><tbody><tr><td style="border: 1px solid currentColor; padding: 8px;">y</td><td style="border: 1px solid currentColor; padding: 8px;">${startD}</td><td style="border: 1px solid currentColor; padding: 8px;">${startD * 2}</td><td style="border: 1px solid currentColor; padding: 8px;">${startD * 4}</td><td style="border: 1px solid currentColor; padding: 8px;">${startD * 8}</td></tr></tbody></table>`;
    
    const optionsData = [
      { text: `Table A<br/>${tableA}`, isCorrect: false, label: "A" },
      { text: `Table B<br/>${tableB}`, isCorrect: false, label: "B" },
      { text: `Table C<br/>${tableC}`, isCorrect: false, label: "C" },
      { text: `Table D<br/>${tableD}`, isCorrect: true, label: "D" }
    ];
    
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));
    
    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);
    
    // Find which original option is D (the exponential one)
    const originalD = optionsData.find(o => o.label === "D");
    
    return {
      questionText: "In which of the following tables is the relationship between the values of $x$ and their corresponding $y$-values nonlinear?",
      figureCode: null,
      options: shuffledOptions.map(o => ({ text: o.text })),
      correctAnswer: `Table ${correctLetter}`,
      explanation: `Choice ${correctLetter} is correct. In the table showing the relationship ${startD} → ${startD * 2} → ${startD * 4} → ${startD * 8}, the $y$-values double for each step, indicating an exponential (nonlinear) relationship. All other tables show a constant difference (linear).`
    };
  }
};

/**
 * Question ID: 90ba8f98
 * 
 * ORIGINAL ANALYSIS:
 * - Number ranges: [x: 0.5-6.5, y: 2-13, slope: ~1.93]
 * - Difficulty factors: [Estimating slope from steep positive trend]
 * - Distractor patterns: [0, 1/2, 1, 2 (correct)]
 * - Constraints: [Slope approximately 2]
 * - Question type: [Figure→Multiple Choice Text]
 * - Figure generation: [Scatterplot with steep positive line]
 */