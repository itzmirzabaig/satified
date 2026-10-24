import { getRandomInt, shuffle } from '../../utils/math';
import type { QuestionData } from '../../study/types';

/**
 * Question 464
 *
 * ORIGINAL ANALYSIS:
 * - Number ranges: [table values 44-87, totals 131-152]
 * - Difficulty factors: [Reading specific row/column, conditional probability]
 * - Distractor patterns: [A: wrong numerator (10), C: wrong school numerator, D: wrong denominator (Valley vs Foothill)]
 * - Constraints: [5 year columns, consistent row/column totals, target year is 2010]
 * - Question type: [Multi-column Table → HTML Table]
 * - Figure generation: [Generate yearly data with trends]
 */

export const generator_464 = {
  metadata: {
    id: "464",
    assessment: "SAT",
    domain: "Problem Solving And Data Analysis",
    skill: "Probability And Conditional Probability",
    difficulty: "Easy"
  },

  generate: (): QuestionData => {
    // The year and school are chosen at random (it was always Valley in
    // 2010). Wrong choices: the other school's share of that year, the ratio
    // of the two schools that year, and the share of the school's own
    // five-year total that came from that year (the classic mix-up of which
    // group is the condition). The difference of the two rows, which no
    // likely slip produces, was dropped. Redraw until the four values differ.
    const years = [2008, 2009, 2010, 2011, 2012];
    let foothill: number[] = [], valley: number[] = [];
    let yi = 0, isValley = true;
    let mine: number[] = [], theirs: number[] = [];
    let vals: number[] = [];
    do {
      foothill = years.map(() => getRandomInt(55, 95));
      valley = years.map(() => getRandomInt(35, 95));
      yi = getRandomInt(0, 4);
      isValley = getRandomInt(0, 1) === 1;
      mine = isValley ? valley : foothill;
      theirs = isValley ? foothill : valley;
      const tot = mine[yi] + theirs[yi];
      const sumMine = mine.reduce((a, b) => a + b, 0);
      vals = [mine[yi] / tot, theirs[yi] / tot, mine[yi] / theirs[yi], mine[yi] / sumMine];
    } while (new Set(vals.map(v => v.toFixed(9))).size < 4);

    const totals = years.map((_, i) => foothill[i] + valley[i]);
    const tableCode = `<table><thead><tr><th>High school</th>${years.map(y => `<th>${y}</th>`).join('')}</tr></thead><tbody><tr><td>Foothill</td>${foothill.map(v => `<td>${v}</td>`).join('')}</tr><tr><td>Valley</td>${valley.map(v => `<td>${v}</td>`).join('')}</tr><tr><td>Total</td>${totals.map(v => `<td>${v}</td>`).join('')}</tr></tbody></table>`;

    const year = years[yi];
    const me = isValley ? 'Valley' : 'Foothill';
    const them = isValley ? 'Foothill' : 'Valley';
    const total = totals[yi];
    const sumMine = mine.reduce((a, b) => a + b, 0);
    const f = (a: number, b: number) => `\\frac{${a}}{${b}}`;
    const correctText = f(mine[yi], total);

    const optionsData = [
      { text: correctText, isCorrect: true, reason: '' },
      { text: f(theirs[yi], total), isCorrect: false, reason: `$${f(theirs[yi], total)}$ is the fraction of the students who completed an internship in ${year} who were from ${them} High School` },
      { text: f(mine[yi], theirs[yi]), isCorrect: false, reason: `$${f(mine[yi], theirs[yi])}$ compares the ${mine[yi]} students from ${me} High School to the ${theirs[yi]} students from ${them} High School; the denominator must be all ${total} students from ${year}` },
      { text: f(mine[yi], sumMine), isCorrect: false, reason: `$${f(mine[yi], sumMine)}$ is the fraction of the ${sumMine} ${me} High School students with internships in the five years who completed theirs in ${year}` }
    ];

    const shuffledOptions = shuffle(optionsData).map((opt, index) => ({
      ...opt,
      letter: String.fromCharCode(65 + index)
    }));

    const correctOption = shuffledOptions.find(o => o.isCorrect)!;
    const incorrectOptions = shuffledOptions.filter(o => !o.isCorrect);

    const explanation = `Choice ${correctOption.letter} is correct. The condition "Of the students who completed a summer internship in ${year}" sets the denominator: only the ${total} students from ${year} are considered. Of these, ${mine[yi]} were from ${me} High School. Therefore, the fraction is $${correctText}$. ${incorrectOptions.map(o => `Choice ${o.letter} is incorrect because ${o.reason}.`).join(' ')}`;

    return {
      questionText: `The table shows the number of students from two different high schools who completed summer internships in each of five years. No student attended both schools. Of the students who completed a summer internship in ${year}, which of the following represents the fraction of students who were from ${me} High School?`,
      figureCode: tableCode,
      options: shuffledOptions.map(o => o.text),
      correctAnswer: correctText,
      explanation: explanation
    };
  }
};
