import { getRandomInt } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 522
 * FIXED (earlier):
 * - Fixed Type Error: Removed unsafe addition of potential 'undefined' in loop.
 * - Simplified logic: Generates data points linearly in one pass.
 * - ensures graph structure is monotonic (increasing) to prevent visual confusion.
 *
 * FIXED (review):
 * - Choices read "2003 and2004" (missing space); now "2003 and 2004".
 * - Every non winning interval had the SAME change, and no wrong choice had a
 *   reason. Small changes are now distinct and each wrong choice names its
 *   change (and the "greatest numbers, not greatest change" slip).
 * - Points are labeled with their values so the changes can be read exactly.
 * - "line graph above" and the hyphenated "3-D" wording replaced.
 */

export const generator_522 = {
  metadata: {
    id: "522",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Two Variable Data Models And Scatterplots",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // 1. Intervals between the years listed. The 2004 to 2008 gap is not a
    // pair of consecutive calendar years, so it is not a choice; its change is
    // kept below the winning change so the question stays unambiguous.
    const intervalDefinitions = [
      { label: "2003 and 2004", startYear: 2003, endYear: 2004, isGap: false },
      { label: "2004 and 2008", startYear: 2004, endYear: 2008, isGap: true },
      { label: "2008 and 2009", startYear: 2008, endYear: 2009, isGap: false },
      { label: "2009 and 2010", startYear: 2009, endYear: 2010, isGap: false },
      { label: "2010 and 2011", startYear: 2010, endYear: 2011, isGap: false }
    ];

    const validOptionIndices = [0, 2, 3, 4];
    const winningIndex = validOptionIndices[getRandomInt(0, validOptionIndices.length - 1)];

    const maxChangeVal = getRandomInt(15, 25);
    // Three distinct small changes for the other choices.
    const smallChanges: number[] = [];
    while (smallChanges.length < 3) {
      const v = getRandomInt(2, 7);
      if (!smallChanges.includes(v)) smallChanges.push(v);
    }

    // 2. Data points
    let currentCount = getRandomInt(3, 8);
    const dataPoints = [{ year: 2003, count: currentCount }];
    const changes: Record<string, number> = {};
    let smallIdx = 0;

    intervalDefinitions.forEach((interval, idx) => {
      let addAmount: number;
      if (interval.isGap) {
        addAmount = getRandomInt(8, 12);
      } else if (idx === winningIndex) {
        addAmount = maxChangeVal;
      } else {
        addAmount = smallChanges[smallIdx++];
      }
      currentCount += addAmount;
      dataPoints.push({ year: interval.endYear, count: currentCount });
      changes[interval.label] = addAmount;
    });

    const countOf = (year: number) => dataPoints.find(d => d.year === year)!.count;

    // 3. SVG
    const width = 450;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Axis starts one year early so the 2003 point and its value label sit
    // clear of the vertical axis.
    const minYear = 2002;
    const maxYear = 2011;
    const maxCount = Math.max(...dataPoints.map(d => d.count));
    const yMax = Math.ceil((maxCount + 5) / 10) * 10;

    const getX = (year: number) => margin.left + ((year - minYear) / (maxYear - minYear)) * chartWidth;
    const getY = (count: number) => margin.top + chartHeight - (count / yMax) * chartHeight;

    const gridLines = [];
    for (let v = 0; v <= yMax; v += 10) {
      const y = getY(v);
      gridLines.push(`
        <line x1="${margin.left}" y1="${y}" x2="${width - margin.right}" y2="${y}" stroke="currentColor" stroke-opacity="0.1" stroke-width="1" />
        <text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="12" fill="currentColor">${v}</text>
      `);
    }

    let pathD = `M ${getX(dataPoints[0].year)} ${getY(dataPoints[0].count)}`;
    dataPoints.forEach((d, i) => {
      if (i === 0) return;
      pathD += ` L ${getX(d.year)} ${getY(d.count)}`;
    });

    const circles = dataPoints.map(d =>
      `<circle cx="${getX(d.year)}" cy="${getY(d.count)}" r="4" fill="#3b82f6" stroke="white" stroke-width="2" />`
    ).join('');

    // Value labels to the upper left of each point (the line rises to the right).
    const valueLabels = dataPoints.map(d =>
      `<text x="${getX(d.year) - 6}" y="${getY(d.count) - 8}" text-anchor="end" font-size="11" fill="currentColor">${d.count}</text>`
    ).join('');

    const xLabels = dataPoints.map(d =>
      `<text x="${getX(d.year)}" y="${height - 15}" text-anchor="middle" font-size="11" fill="currentColor">${d.year}</text>`
    ).join('');

    const svgContent = `
      <svg viewBox="0 0 ${width} ${height}" style="width: 100%; height: auto; font-family: sans-serif; user-select: none;">
        ${gridLines.join('')}
        <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <line x1="${margin.left}" y1="${height - margin.bottom}" x2="${width - margin.right}" y2="${height - margin.bottom}" stroke="currentColor" stroke-width="2"/>
        <path d="${pathD}" fill="none" stroke="#3b82f6" stroke-width="2" />
        ${circles}
        ${valueLabels}
        ${xLabels}
        <text transform="rotate(-90, ${15}, ${height/2})" x="${15}" y="${height/2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Number of Movies</text>
        <text x="${margin.left + chartWidth/2}" y="${height - 2}" text-anchor="middle" font-size="12" font-weight="bold" fill="currentColor">Year</text>
      </svg>
    `;

    // 4. Options in time order, each wrong one with its own reason.
    const winner = intervalDefinitions[winningIndex];
    const lastIndex = intervalDefinitions.length - 1;
    const optionsList = intervalDefinitions
      .map((interval, idx) => ({ interval, idx }))
      .filter(({ interval }) => !interval.isGap)
      .map(({ interval, idx }, index) => {
        const ch = changes[interval.label];
        const a = countOf(interval.startYear), b = countOf(interval.endYear);
        let reason = '';
        if (idx !== winningIndex) {
          reason = idx === lastIndex
            ? `${interval.label} have the greatest numbers of movies on the graph, but the change between them is only $${b} - ${a} = ${ch}$ movies`
            : `the change between ${interval.label} is only $${b} - ${a} = ${ch}$ movies, which is less than ${maxChangeVal}`;
        }
        return {
          text: interval.label,
          isCorrect: idx === winningIndex,
          reason,
          letter: String.fromCharCode(65 + index)
        };
      });

    const correctOption = optionsList.find(o => o.isCorrect)!;
    const incorrectOptions = optionsList.filter(o => !o.isCorrect);
    const wa = countOf(winner.startYear), wb = countOf(winner.endYear);

    return {
      questionText: "The line graph shows the number of movies released in 3D in several years. Between which two consecutive years was there the greatest change in the number of movies released in 3D?",
      figureCode: `<div style="width:100%;max-width:460px;margin:0 auto;">${svgContent}</div>`,
      options: optionsList.map(o => o.text),
      correctAnswer: correctOption.text,
      explanation: `Choice ${correctOption.letter} is correct. The change between two years is the difference between the numbers of movies released in those years, which is shown by the steepest segment of the graph. Between ${winner.label}, the number of movies changed from ${wa} to ${wb}, a change of $${wb} - ${wa} = ${maxChangeVal}$ movies, the greatest change among the choices. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`
    };
  }
};
