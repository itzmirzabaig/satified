import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../types';
import React from 'react';
import { QuestionTester } from './QuestionTester';
/**
 * Question ID: 23c5fcce
 * Circle with perpendicular radii - arc length calculation
 */

export const generator_23c5fcce = {
  metadata: {
    assessment: "SAT",
    domain: "Geometry And Trigonometry",
    skill: "Circles",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // STEP 1: Generate circle parameters
    const centralAngle = 90; // Fixed for perpendicular radii
    const divisor = 360 / centralAngle;
    const baseCircumference = getRandomInt(2, 8);
    const circumference = baseCircumference * divisor;
    const radius = circumference / (2 * Math.PI);

    // STEP 2: Calculate correct arc length
    const arcLength = (centralAngle / 360) * circumference;

    // STEP 3: Build COMPLETE Mafs code
    const mafsCode = `
<Mafs viewBox={{ x: [-${radius * 1.5}, ${radius * 1.5}], y: [-${radius * 1.5}, ${radius * 1.5}] }}>
  <Coordinates.Cartesian subdivisions={2} />
  <Circle center={[0, 0]} radius={${radius}} color="black" />
  <Line.Segment point1={[0, 0]} point2={[${radius}, 0]} color="blue" />
  <Line.Segment point1={[0, 0]} point2={[0, ${radius}]} color="blue" />
  <Plot.Parametric t={[0, ${centralAngle} * (Math.PI / 180)]} xy={(t) => [${radius} * Math.cos(t), ${radius} * Math.sin(t)]} color="red" weight={4} />
  <Point x={0} y={0} color="black" />
  <Point x={${radius}} y={0} color="black" />
  <Point x={0} y={${radius}} color="black" />
  <LaTeX tex="O" at={[-0.5, -0.5]} />
  <LaTeX tex="A" at={[${radius + 0.5}, -0.5]} />
  <LaTeX tex="C" at={[-0.5, ${radius + 0.5}]} />
</Mafs>`;

    // STEP 4: Create distractors
    const distractorAngles = [120, 180, 360];
    const distractorLengths = distractorAngles.map(angle => 
      Math.round((angle / 360) * circumference)
    );
    
    const optionsData = [
      { text: arcLength.toString(), isCorrect: true },
      { text: distractorLengths[0].toString(), isCorrect: false, reason: "uses wrong central angle (120°)" },
      { text: distractorLengths[1].toString(), isCorrect: false, reason: "uses semicircle (180°)" },
      { text: distractorLengths[2].toString(), isCorrect: false, reason: "uses full circumference (360°)" }
    ];

    // STEP 5: Shuffle and assign letters
    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(opt => opt.isCorrect)!;
    const correctLetter = correctOption.letter;
    const incorrectOptions = shuffledOptions.filter(opt => !opt.isCorrect);

    // STEP 6: Build explanation
    const explanation = `Choice ${correctLetter} is correct. In the circle shown, O is the center and ∠AOC is a central angle. From the figure, the two radii that meet to form ∠AOC are perpendicular, so the measure of ∠AOC is ${centralAngle}°. The length of minor arc $\\widehat{AC}$ is $\\frac{${centralAngle}}{360}$ of the circumference. Since the circumference is ${circumference}, the arc length is $\\frac{${centralAngle}}{360} \\times ${circumference} = ${arcLength}$. Choice ${incorrectOptions[0].letter} is incorrect; it ${incorrectOptions[0].reason}. Choice ${incorrectOptions[1].letter} is incorrect; it ${incorrectOptions[1].reason}. Choice ${incorrectOptions[2].letter} is incorrect; it ${incorrectOptions[2].reason}.`;

    // STEP 7: Return question data
    return {
      questionText: `The circle shown with center $O$ has a circumference of $${circumference}$. What is the length of minor arc $\\widehat{AC}$?`,
      figureCode: mafsCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: arcLength.toString(),
      explanation: explanation
    };
  }
};