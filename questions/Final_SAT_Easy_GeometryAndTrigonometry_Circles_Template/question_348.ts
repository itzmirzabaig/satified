import { getRandomInt, getRandomElement, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';
import React from 'react';
import { QuestionTester } from './QuestionTester';
/**
 * Question 348
 * Circle with perpendicular radii - arc length calculation
 */

export const generator_348 = {
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

    // STEP 2: Calculate correct arc length
    const arcLength = (centralAngle / 360) * circumference;

    // STEP 3: Build the figure. It used to be a Mafs graph whose x axis was
    // stretched, so the circle drew as an ellipse, every label showed twice
    // ("OO", "AA", "CC"), and nothing marked the right angle the explanation
    // reads from the figure. This SVG draws a true circle with a right-angle
    // mark, turned to a random multiple of 30 degrees.
    const cx = 120, cy = 120, r = 85;
    const a0 = getRandomInt(0, 11) * 30;
    const pt = (deg: number, dist: number) => {
      const t = (deg * Math.PI) / 180;
      return [+(cx + dist * Math.cos(t)).toFixed(1), +(cy - dist * Math.sin(t)).toFixed(1)];
    };
    const [ax, ay] = pt(a0, r);
    const [qx, qy] = pt(a0 + 90, r);
    const [m1x, m1y] = pt(a0, 13);
    const [m2x, m2y] = pt(a0 + 45, 13 * Math.SQRT2);
    const [m3x, m3y] = pt(a0 + 90, 13);
    const [alx, aly] = pt(a0, r + 17);
    const [clx, cly] = pt(a0 + 90, r + 17);
    const [olx, oly] = pt(a0 + 225, 17);
    const figureCode = `<div style="width:100%;max-width:260px;margin:0 auto;"><svg viewBox="0 0 240 240" style="width:100%;height:auto;display:block;font-family:serif;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="2"/>
  <path d="M ${ax} ${ay} A ${r} ${r} 0 0 0 ${qx} ${qy}" fill="none" stroke="#3b82f6" stroke-width="4"/>
  <line x1="${cx}" y1="${cy}" x2="${ax}" y2="${ay}" stroke="currentColor" stroke-width="2"/>
  <line x1="${cx}" y1="${cy}" x2="${qx}" y2="${qy}" stroke="currentColor" stroke-width="2"/>
  <polyline points="${m1x},${m1y} ${m2x},${m2y} ${m3x},${m3y}" fill="none" stroke="currentColor" stroke-width="1.5"/>
  <circle cx="${cx}" cy="${cy}" r="3" fill="currentColor"/>
  <circle cx="${ax}" cy="${ay}" r="3" fill="currentColor"/>
  <circle cx="${qx}" cy="${qy}" r="3" fill="currentColor"/>
  <text x="${olx}" y="${oly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">O</text>
  <text x="${alx}" y="${aly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">A</text>
  <text x="${clx}" y="${cly + 5}" text-anchor="middle" font-size="16" font-style="italic" fill="currentColor">C</text>
</svg></div>`;

    // STEP 4: Create distractors. Each is a real slip; the old 120 degree
    // choice was rounded (20 gave 7, not 6.67) and the figure has no 120
    // degree angle. The circumference is a multiple of 4, so all are whole.
    const optionsData = [
      { text: arcLength.toString(), isCorrect: true, reason: '' },
      { text: (circumference * 3 / 4).toString(), isCorrect: false, reason: `it is the length of major arc $AC$, which is $\\frac{270}{360}$ of the circumference, not the minor arc` },
      { text: (circumference / 2).toString(), isCorrect: false, reason: `it is half the circumference, which is the length of an arc with a central angle of $180^\\circ$, not $90^\\circ$` },
      { text: circumference.toString(), isCorrect: false, reason: `it is the circumference of the whole circle, not the length of minor arc $AC$` }
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
    const explanation = `Choice ${correctLetter} is correct. In the circle shown, $O$ is the center and $\\angle AOC$ is a central angle. The figure marks $\\angle AOC$ as a right angle, so its measure is $${centralAngle}^\\circ$. The length of minor arc $\\widehat{AC}$ is $\\frac{${centralAngle}}{360}$ of the circumference. Since the circumference is ${circumference}, the arc length is $\\frac{${centralAngle}}{360}(${circumference}) = ${arcLength}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    // STEP 7: Return question data
    return {
      questionText: `The circle shown with center $O$ has a circumference of $${circumference}$. What is the length of minor arc $\\widehat{AC}$?`,
      figureCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: arcLength.toString(),
      explanation: explanation
    };
  }
};