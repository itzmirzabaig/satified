import type { QuestionData, QuestionGenerator } from './types';

// ── METADATA FROM FOLDER NAMES ────────────────────────────────────────────────
const FOLDER_META: Record<string, { difficulty: string; domain: string; skill: string }> = {
  'Final_SAT_Easy_AdvancedMath_EquivalentExpressions_Template': { difficulty: 'Easy', domain: 'Advanced Math', skill: 'Equivalent Expressions' },
  'Final_SAT_Easy_AdvancedMath_NonlinearEquationsInOneVariableAndSystemsOfEquationsInTwoVariables_Template': { difficulty: 'Easy', domain: 'Advanced Math', skill: 'Nonlinear Equations In One Variable And Systems Of Equations In Two Variables' },
  'Final_SAT_Easy_AdvancedMath_NonlinearFunctions_Template': { difficulty: 'Easy', domain: 'Advanced Math', skill: 'Nonlinear Functions' },
  'Final_SAT_Easy_Algebra_LinearEquationsInOneVariable_Template': { difficulty: 'Easy', domain: 'Algebra', skill: 'Linear Equations In One Variable' },
  'Final_SAT_Easy_Algebra_LinearEquationsInTwoVariable_Template': { difficulty: 'Easy', domain: 'Algebra', skill: 'Linear Equations In Two Variable' },
  'Final_SAT_Easy_Algebra_LinearFunctions_Template': { difficulty: 'Easy', domain: 'Algebra', skill: 'Linear Functions' },
  'Final_SAT_Easy_Algebra_LinearInequalitiesInOneOrTwoVariables_Template': { difficulty: 'Easy', domain: 'Algebra', skill: 'Linear Inequalities In One Or Two Variables' },
  'Final_SAT_Easy_Algebra_SystemsOfTwoLinearEquationsInTwoVariables_Template': { difficulty: 'Easy', domain: 'Algebra', skill: 'Systems Of Two Linear Equations In Two Variables' },
  'Final_SAT_Easy_GeometryAndTrigonometry_AreaAndVollume_Template': { difficulty: 'Easy', domain: 'Geometry And Trigonometry', skill: 'Area And Volume' },
  'Final_SAT_Easy_GeometryAndTrigonometry_Circles_Template': { difficulty: 'Easy', domain: 'Geometry And Trigonometry', skill: 'Circles' },
  'Final_SAT_Easy_GeometryAndTrigonometry_LinesAnglesAndTriangles_Template': { difficulty: 'Easy', domain: 'Geometry And Trigonometry', skill: 'Lines Angles And Triangles' },
  'Final_SAT_Easy_GeometryAndTrigonometry_RightTrianglesAndTrigonometry_Template': { difficulty: 'Easy', domain: 'Geometry And Trigonometry', skill: 'Right Triangles And Trigonometry' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_EvaluatingStatisticalClaimsObservationalStudiesAndExperiments_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Evaluating Statistical Claims Observational Studies And Experiments' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_InferenceFromSampleStatisticsAndMarginOfError_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Inference From Sample Statistics And Margin Of Error' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_OnevariableDataDistributionsAndMeasuresOfCenterAndSpread_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'One-Variable Data Distributions And Measures Of Center And Spread' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_Percentages_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Percentages' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_ProbabilityAndConditionalProbability_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Probability And Conditional Probability' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_RatiosRatesProportionalRelationshipsAndUnits_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Ratios Rates Proportional Relationships And Units' },
  'Final_SAT_Easy_ProblemSolvingAndDataAnalysis_TwoVariableDataModelsAndScatterplots_Template': { difficulty: 'Easy', domain: 'Problem Solving And Data Analysis', skill: 'Two-Variable Data Models And Scatterplots' },
  'Final_SAT_Hard_AdvancedMath_EquivalentExpressions_Template': { difficulty: 'Hard', domain: 'Advanced Math', skill: 'Equivalent Expressions' },
  'Final_SAT_Hard_AdvancedMath_NonlinearEquationsInOneVariableAndSystemsOfEquationsInTwoVariables_Template': { difficulty: 'Hard', domain: 'Advanced Math', skill: 'Nonlinear Equations In One Variable And Systems Of Equations In Two Variables' },
  'Final_SAT_Hard_AdvancedMath_NonlinearFunctions_Template': { difficulty: 'Hard', domain: 'Advanced Math', skill: 'Nonlinear Functions' },
  'Final_SAT_Hard_Algebra_LinearEquationsInOneVariable_Template': { difficulty: 'Hard', domain: 'Algebra', skill: 'Linear Equations In One Variable' },
  'Final_SAT_Hard_Algebra_LinearEquationsInTwoVariable_Template': { difficulty: 'Hard', domain: 'Algebra', skill: 'Linear Equations In Two Variable' },
  'Final_SAT_Hard_Algebra_LinearFunctions_Template': { difficulty: 'Hard', domain: 'Algebra', skill: 'Linear Functions' },
  'Final_SAT_Hard_Algebra_LinearInequalitiesInOneOrTwoVariables_Template': { difficulty: 'Hard', domain: 'Algebra', skill: 'Linear Inequalities In One Or Two Variables' },
  'Final_SAT_Hard_Algebra_SystemsOfTwoLinearEquationsInTwoVariables_Template': { difficulty: 'Hard', domain: 'Algebra', skill: 'Systems Of Two Linear Equations In Two Variables' },
  'Final_SAT_Hard_GeometryAndTrigonometry_AreaAndVollume_Template': { difficulty: 'Hard', domain: 'Geometry And Trigonometry', skill: 'Area And Volume' },
  'Final_SAT_Hard_GeometryAndTrigonometry_Circles_Template': { difficulty: 'Hard', domain: 'Geometry And Trigonometry', skill: 'Circles' },
  'Final_SAT_Hard_GeometryAndTrigonometry_LinesAnglesAndTriangles_Template': { difficulty: 'Hard', domain: 'Geometry And Trigonometry', skill: 'Lines Angles And Triangles' },
  'Final_SAT_Hard_GeometryAndTrigonometry_RightTrianglesAndTrigonometry_Template': { difficulty: 'Hard', domain: 'Geometry And Trigonometry', skill: 'Right Triangles And Trigonometry' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_EvaluatingStatisticalClaimsObservationalStudiesAndExperiments_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Evaluating Statistical Claims Observational Studies And Experiments' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_InferenceFromSampleStatisticsAndMarginOfError_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Inference From Sample Statistics And Margin Of Error' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_OnevariableDataDistributionsAndMeasuresOfCenterAndSpread_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'One-Variable Data Distributions And Measures Of Center And Spread' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_Percentages_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Percentages' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_ProbabilityAndConditionalProbability_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Probability And Conditional Probability' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_RatiosRatesProportionalRelationshipsAndUnits_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Ratios Rates Proportional Relationships And Units' },
  'Final_SAT_Hard_ProblemSolvingAndDataAnalysis_TwoVariableDataModelsAndScatterplots_Template': { difficulty: 'Hard', domain: 'Problem Solving And Data Analysis', skill: 'Two-Variable Data Models And Scatterplots' },
  'Final_SAT_Medium_AdvacnedMath_NonlinearFunctions_Template': { difficulty: 'Medium', domain: 'Advanced Math', skill: 'Nonlinear Functions' },
  'Final_SAT_Medium_AdvancedMath_EquivalentExpressions_Template': { difficulty: 'Medium', domain: 'Advanced Math', skill: 'Equivalent Expressions' },
  'Final_SAT_Medium_AdvancedMath_NonlinearEquationsInOneVariableAndSystemsOfEquationsInTwoVariables_Template': { difficulty: 'Medium', domain: 'Advanced Math', skill: 'Nonlinear Equations In One Variable And Systems Of Equations In Two Variables' },
  'Final_SAT_Medium_Algebra_LinearEquationsInOneVariable_Template': { difficulty: 'Medium', domain: 'Algebra', skill: 'Linear Equations In One Variable' },
  'Final_SAT_Medium_Algebra_LinearEquationsInTwoVariable_Template': { difficulty: 'Medium', domain: 'Algebra', skill: 'Linear Equations In Two Variable' },
  'Final_SAT_Medium_Algebra_LinearFunctions_Template': { difficulty: 'Medium', domain: 'Algebra', skill: 'Linear Functions' },
  'Final_SAT_Medium_Algebra_LinearInequalitiesInOneOrTwoVariables_Template': { difficulty: 'Medium', domain: 'Algebra', skill: 'Linear Inequalities In One Or Two Variables' },
  'Final_SAT_Medium_Algebra_SystemsOfTwoLinearEquationsInTwoVariables_Template': { difficulty: 'Medium', domain: 'Algebra', skill: 'Systems Of Two Linear Equations In Two Variables' },
  'Final_SAT_Medium_GeometryAndTrigonometry_AreaAndVollume_Template': { difficulty: 'Medium', domain: 'Geometry And Trigonometry', skill: 'Area And Volume' },
  'Final_SAT_Medium_GeometryAndTrigonometry_Circles_Template': { difficulty: 'Medium', domain: 'Geometry And Trigonometry', skill: 'Circles' },
  'Final_SAT_Medium_GeometryAndTrigonometry_LinesAnglesAndTriangles_Template': { difficulty: 'Medium', domain: 'Geometry And Trigonometry', skill: 'Lines Angles And Triangles' },
  'Final_SAT_Medium_GeometryAndTrigonometry_RightTrianglesAndTrigonometry_Template': { difficulty: 'Medium', domain: 'Geometry And Trigonometry', skill: 'Right Triangles And Trigonometry' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_EvaluatingStatisticalClaimsObservationalStudiesAndExperiments_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Evaluating Statistical Claims Observational Studies And Experiments' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_InferenceFromSampleStatisticsAndMarginOfError_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Inference From Sample Statistics And Margin Of Error' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_OnevariableDataDistributionsAndMeasuresOfCenterAndSpread_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'One-Variable Data Distributions And Measures Of Center And Spread' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_Percentages_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Percentages' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_ProbabilityAndConditionalProbability_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Probability And Conditional Probability' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_RatiosRatesProportionalRelationshipsAndUnits_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Ratios Rates Proportional Relationships And Units' },
  'Final_SAT_Medium_ProblemSolvingAndDataAnalysis_TwoVariableDataModelsAndScatterplots_Template': { difficulty: 'Medium', domain: 'Problem Solving And Data Analysis', skill: 'Two-Variable Data Models And Scatterplots' },
};

const isGraphCode = (s: string) =>
  ['<Plot','<Circle','<Polygon','<Point','<Mafs','Math.pow','Math.sin','Math.cos']
    .some(k => s.includes(k));

const sanitize = (text: string): string => {
  if (!text) return text;
  text = text.replace(/\\{3,}([a-zA-Z])/g, '\\$1');
  text = text.replace(/\\{1,}%\$(?!\$)/g, '%');
  const getDollarPositions = (t: string): number[] => {
    const pos: number[] = [];
    for (let i = 0; i < t.length; i++) {
      if (t[i] !== '$') continue;
      const prevEsc = i > 0 && t[i-1] === '\\';
      const prevDollar = i > 0 && t[i-1] === '$';
      const nextDollar = i < t.length - 1 && t[i+1] === '$';
      if (!prevEsc && !prevDollar && !nextDollar) pos.push(i);
    }
    return pos;
  };
  const proseWords = ['greater','than','the','of','and','is','in','to',
    'subscribed','customers','newsletter','number','months','after','where',
    'each','total','measure','angle','demand','selling','price','units',
    'cost','original','correct','incorrect','when','was','purchased',
    'value','account','company','population','years','since','dollars',
    'paid','earned','spent','invested','rate','per','given','based',
    'model','represents','function','graph','point','line','table'];
  const proseScore = (s: string): number => {
    const lower = s.toLowerCase();
    let score = (s.match(/ /g) || []).length;
    proseWords.forEach(w => { if (lower.includes(w)) score += 3; });
    score -= (s.match(/\^/g) || []).length * 4;
    score -= (s.match(/\\/g) || []).length * 3;
    score -= (s.match(/\{/g) || []).length * 2;
    score -= (s.match(/[=<>]/g) || []).length;
    return score;
  };
  let dollarPos = getDollarPositions(text);
  let safetyLimit = 8;
  while (dollarPos.length % 2 !== 0 && safetyLimit-- > 0) {
    let worstPos = -1, maxScore = -999;
    for (let k = 0; k < dollarPos.length - 1; k += 2) {
      const block = text.slice(dollarPos[k] + 1, dollarPos[k + 1]);
      const sc = proseScore(block);
      if (sc > maxScore) { maxScore = sc; worstPos = dollarPos[k]; }
    }
    if (dollarPos.length % 2 === 1) {
      const lastBlock = text.slice(dollarPos[dollarPos.length - 1] + 1);
      const sc = proseScore(lastBlock) + 8;
      if (sc > maxScore) { maxScore = sc; worstPos = dollarPos[dollarPos.length - 1]; }
    }
    if (worstPos < 0) break;
    text = text.slice(0, worstPos) + '\\$' + text.slice(worstPos + 1);
    dollarPos = getDollarPositions(text);
  }
  return text;
};

const autoWrap = (t: string): string => {
  if (!t) return '';
  t = sanitize(t);
  if (t.includes('\\(') || t.includes('$')) return t;
  const triggers = ['\\frac','\\sqrt','\\text','\\cdot','\\times','\\div',
    '\\alpha','\\beta','\\gamma','\\theta','\\pi','\\sum','\\int','\\infty',
    '\\pm','\\leq','\\geq','\\neq','\\approx','^{','_{'];
  return triggers.some(k => t.includes(k)) ? `\\(${t}\\)` : t;
};

const getOptText = (o: string | {text:string}): string =>
  typeof o === 'string' ? o : (o as any).text ?? String(o);

const resolveCorrect = (ca: any, opts: (string|{text:string})[]): number => {
  if (typeof ca === 'number') return ca;
  const s = String(ca).trim();
  const i = opts.findIndex(o => getOptText(o).trim() === s);
  return i !== -1 ? i : (isNaN(parseInt(s,10)) ? 0 : parseInt(s,10));
};

const isFillIn = (d: QuestionData) => !d.options || d.options.length === 0;

interface QEntry { path: string; folder: string; difficulty: string; domain: string; skill: string; }

class QuestionTester {
  private allModules: Record<string, ()=>Promise<any>> = {};
  private index: QEntry[] = [];
  private filtered: number[] = [];
  private cursor = 0;
  private cache = new Map<string, any>();
  private currentData: QuestionData | null = null;
  private submitted = false;
  private selectedOpt: number | null = null;
  private userInput = '';
  private flipped = false;
  private selDiff:string|null=null; private selDomain:string|null=null; private selSkill:string|null=null;
  private domainSkills = new Map<string, Set<string>>();
  private graphRoots = new Map<string, any>();
  private currentEntry: QEntry | null = null;

  private cardInner!: HTMLElement;
  private qContent!: HTMLElement;
  private aContent!: HTMLElement;
  private counter: HTMLElement | null = null;
  private prevBtn!: HTMLAnchorElement;
  private nextBtn!: HTMLAnchorElement;
  private submitBtn!: HTMLButtonElement;
  private flipBtn!: HTMLButtonElement;
  private filterEl!: HTMLElement;

  private mobSubmitBtn: HTMLButtonElement | null = null;
  private mobFlipBtn: HTMLButtonElement | null = null;

  constructor() {
    this.cardInner = document.getElementById('flip-card-inner')!;
    this.qContent = document.getElementById('question-content')!;
    this.aContent = document.getElementById('answer-content')!;
    this.counter = document.getElementById('question-counter');
    this.prevBtn = document.getElementById('prev-btn') as HTMLAnchorElement;
    this.nextBtn = document.getElementById('next-btn') as HTMLAnchorElement;
    this.submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
    this.flipBtn = document.getElementById('flip-btn') as HTMLButtonElement;
    this.filterEl = document.getElementById('filter-container')!;

    this.mobSubmitBtn = document.getElementById('mob-submit-btn') as HTMLButtonElement;
    this.mobFlipBtn = document.getElementById('mob-flip-btn') as HTMLButtonElement;

    this.prevBtn.addEventListener('click', (e) => { e.preventDefault(); if(!this.prevBtn.classList.contains('disabled')) this.navigate(-1); });
    this.nextBtn.addEventListener('click', (e) => { e.preventDefault(); if(!this.nextBtn.classList.contains('disabled')) this.navigate(1); });
    this.submitBtn.addEventListener('click', () => this.submitAnswer());
    this.flipBtn.addEventListener('click', () => this.toggleFlip());

    this.mobSubmitBtn?.addEventListener('click', () => this.submitAnswer());
    this.mobFlipBtn?.addEventListener('click', () => this.toggleFlip());

    document.addEventListener('mob-swipe-next', () => this.navigate(1));
    document.addEventListener('mob-swipe-prev', () => this.navigate(-1));

    // Arrow key navigation — main study page
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      // Don't fire if typing in an input or if practice panel is open
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;
      const practiceOpen = document.querySelector('.pt-overlay.open');
      if (practiceOpen) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); if (!this.nextBtn.classList.contains('disabled')) this.navigate(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); if (!this.prevBtn.classList.contains('disabled')) this.navigate(-1); }
    });

    // Ctrl+Q: open dev bug panel
    document.addEventListener('dev-bug-panel', () => this.showBugPanel());

    // Main card q-jump dropdown — click to open/close (delegated since card is rebuilt each time)
    document.addEventListener('click', (e) => {
      const dd = document.getElementById('q-jump-dd');
      if (!dd) return;
      const selected = dd.querySelector('.dd-selected');
      if (selected && (e.target === selected || selected.contains(e.target as Node))) {
        dd.classList.toggle('is-open');
      } else if (!dd.contains(e.target as Node)) {
        dd.classList.remove('is-open');
      }
    });

    this.init();
  }

  private practiceEngine: PracticeTestEngine | null = null;

  private init() {
    this.allModules = import.meta.glob('../questions/**/*.ts');
    for (const path of Object.keys(this.allModules)) {
      const parts = path.split('/');
      const folder = parts[parts.length - 2];
      const meta = FOLDER_META[folder];
      if (!meta) continue;
      this.index.push({ path, folder, ...meta });
      if (!this.domainSkills.has(meta.domain)) this.domainSkills.set(meta.domain, new Set());
      this.domainSkills.get(meta.domain)!.add(meta.skill);
    }
    this.buildFilters();
    // Build filter list and load first question immediately
    this.filtered = this.index.map((_, i) => i);
    this.cursor = 0;
    this.updateUI();
    // Load first question right away
    if (this.filtered.length > 0) {
      this.loadAndRender(0);
    } else {
      this.showReadyState();
    }
    // Init practice engine
    this.practiceEngine = new PracticeTestEngine(this.index, this.allModules);
  }

  private showReadyState() {
    this.qContent.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:16px;opacity:0.6">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
        <p style="font-size:15px;font-weight:600;text-align:center">Press Next to load your first question</p>
      </div>`;
    this.submitBtn.disabled = true;
    this.flipBtn.disabled = true;
  }

  private buildFilters() {
    const diffs = ['Easy','Medium','Hard'].filter(d => this.index.some(q => q.difficulty===d));
    const domains = [...new Set(this.index.map(q=>q.domain))].sort();
    const skills = [...new Set(this.index.map(q=>q.skill))].sort();

    const mk = (id: string, label: string, opts: string[]) => {
      const radioOpts = [
        `<div title="all"><input id="${id}-all" name="${id}" type="radio" checked/><label class="dd-option" for="${id}-all" data-txt="${label} (All)" data-val="${label} (All)"></label></div>`,
        ...opts.map((o, i) =>
          `<div title="${o}"><input id="${id}-opt-${i}" name="${id}" type="radio"/><label class="dd-option dd-option-item" for="${id}-opt-${i}" data-txt="${o}" data-val="${o}"></label></div>`)
      ].join('');
      return `
        <div class="filter-group">
          <div class="dd-select" id="${id}">
            <div class="dd-selected">
              <span class="dd-selected-text">${label} (All)</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="dd-arrow">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
              </svg>
            </div>
            <div class="dd-options">${radioOpts}</div>
          </div>
        </div>`;
    };

    this.filterEl.innerHTML = `<div class="filters">${mk('difficulty-filter','Difficulty',diffs)}${mk('domain-filter','Domain',domains)}${mk('skill-filter','Skill',skills)}</div>`;

    this.filterEl.querySelectorAll('.dd-select').forEach(dd => {
      const id = dd.id;
      dd.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          const input = e.target as HTMLInputElement;
          const label = dd.querySelector(`label[for="${input.id}"]`) as HTMLElement;
          const txt = label?.dataset.txt || 'All';
          const isAll = input.id.endsWith('-all');
          (dd.querySelector('.dd-selected-text') as HTMLElement).textContent = txt;
          const val = isAll ? null : txt;
          if (id === 'difficulty-filter') { this.selDiff = val; this.applyFilters(); }
          else if (id === 'domain-filter') { this.selDomain = val; this.selSkill = null; this.refreshSkills(); this.applyFilters(); }
          else if (id === 'skill-filter') { this.selSkill = val; this.applyFilters(); }
        });
      });
    });

    this.buildBurgerOpts('mob-diff-opts', 'mob-diff-badge', diffs, 'diff');
    this.buildBurgerOpts('mob-domain-opts', 'mob-domain-badge', domains, 'domain');
    this.buildBurgerOpts('mob-skill-opts', 'mob-skill-badge', skills, 'skill');
  }

  private buildBurgerOpts(containerId: string, badgeId: string, opts: string[], kind: 'diff' | 'domain' | 'skill') {
    const container = document.getElementById(containerId);
    const badge = document.getElementById(badgeId);
    if (!container) return;

    const allBtn = document.createElement('button');
    allBtn.className = 'mob-opt-btn mob-opt-active';
    allBtn.textContent = 'All';
    allBtn.type = 'button';
    allBtn.addEventListener('click', () => {
      container.querySelectorAll('.mob-opt-btn').forEach(b => b.classList.remove('mob-opt-active'));
      allBtn.classList.add('mob-opt-active');
      if (badge) { badge.textContent = 'All'; badge.classList.add('is-all'); }
      if (kind === 'diff')   { this.selDiff = null; this.applyFilters(); }
      if (kind === 'domain') { this.selDomain = null; this.selSkill = null; this.refreshSkills(); this.refreshBurgerSkills(); this.applyFilters(); }
      if (kind === 'skill')  { this.selSkill = null; this.applyFilters(); }
    });
    container.appendChild(allBtn);

    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'mob-opt-btn';
      btn.textContent = opt;
      btn.type = 'button';
      btn.addEventListener('click', () => {
        container.querySelectorAll('.mob-opt-btn').forEach(b => b.classList.remove('mob-opt-active'));
        btn.classList.add('mob-opt-active');
        const short = opt.length > 12 ? opt.slice(0, 11) + '…' : opt;
        if (badge) { badge.textContent = short; badge.classList.remove('is-all'); }
        if (kind === 'diff')   { this.selDiff = opt; this.applyFilters(); }
        if (kind === 'domain') { this.selDomain = opt; this.selSkill = null; this.refreshSkills(); this.refreshBurgerSkills(); this.applyFilters(); }
        if (kind === 'skill')  { this.selSkill = opt; this.applyFilters(); }
      });
      container.appendChild(btn);
    });
  }

  private refreshBurgerSkills() {
    const container = document.getElementById('mob-skill-opts');
    const badge = document.getElementById('mob-skill-badge');
    if (!container) return;
    container.innerHTML = '';
    if (badge) { badge.textContent = 'All'; badge.classList.add('is-all'); }
    const skills = this.selDomain && this.domainSkills.has(this.selDomain)
      ? [...this.domainSkills.get(this.selDomain)!].sort()
      : [...new Set(this.index.map(q=>q.skill))].sort();
    this.buildBurgerOpts('mob-skill-opts', 'mob-skill-badge', skills, 'skill');
  }

  private refreshSkills() {
    const dd = document.getElementById('skill-filter');
    if (!dd) return;
    const skills = this.selDomain && this.domainSkills.has(this.selDomain)
      ? [...this.domainSkills.get(this.selDomain)!].sort()
      : [...new Set(this.index.map(q=>q.skill))].sort();
    const opts = dd.querySelector('.dd-options');
    if (!opts) return;
    opts.innerHTML = `<div title="all"><input id="skill-filter-all" name="skill-filter" type="radio" checked/><label class="dd-option" for="skill-filter-all" data-txt="Skill (All)" data-val="Skill (All)"></label></div>`
      + skills.map((s,i) => `<div title="${s}"><input id="skill-filter-opt-${i}" name="skill-filter" type="radio"/><label class="dd-option dd-option-item" for="skill-filter-opt-${i}" data-txt="${s}" data-val="${s}"></label></div>`).join('');
    (dd.querySelector('.dd-selected-text') as HTMLElement).textContent = 'Skill (All)';
    opts.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        const input = e.target as HTMLInputElement;
        const label = dd.querySelector(`label[for="${input.id}"]`) as HTMLElement;
        const txt = label?.dataset.txt || 'Skill (All)';
        const isAll = input.id.endsWith('-all');
        (dd.querySelector('.dd-selected-text') as HTMLElement).textContent = txt;
        this.selSkill = isAll ? null : txt;
        this.applyFilters();
      });
    });
  }

  private applyFilters() {
    this.filtered = this.index.map((_,i)=>i).filter(i=>{
      const q=this.index[i];
      if(this.selDiff &&q.difficulty!==this.selDiff) return false;
      if(this.selDomain&&q.domain !==this.selDomain) return false;
      if(this.selSkill &&q.skill !==this.selSkill) return false;
      return true;
    });
    this.cursor=0;
    this.filtered.length>0?this.loadAndRender():this.showError('No questions match the selected filters.');
  }

  private async loadAndRender(dir: number = 0) {
    this.cleanGraphs();
    this.submitted=false; this.selectedOpt=null; this.userInput='';
    this.submitBtn.disabled=true; this.flipBtn.disabled=true;
    this.flipBtn.textContent='Reveal';
    if (this.mobSubmitBtn) { this.mobSubmitBtn.disabled=true; this.mobSubmitBtn.textContent='Submit'; }
    if (this.mobFlipBtn)   { this.mobFlipBtn.disabled=true; this.mobFlipBtn.textContent='Reveal'; }
    if(this.flipped){this.cardInner.classList.remove('flipped');this.flipped=false;}
    const entry=this.index[this.filtered[this.cursor]];
    this.currentEntry=entry;
    this.updateUI();
    try {
      let mod=this.cache.get(entry.path);
      if(!mod){mod=await this.allModules[entry.path]();this.cache.set(entry.path,mod);}
      const key=Object.keys(mod).find(k=>k.startsWith('generator_'));
      if(!key) throw new Error('no generator');
      this.currentData=mod[key].generate();
    } catch { this.showError('Failed to load — try Next or Regenerate.'); return; }
    this.renderQuestion();
    this.typeset();
    // Slide the card in from the correct direction
    if (dir !== 0) {
      const slideClass = dir > 0 ? 'slide-in-right' : 'slide-in-left';
      const card = document.getElementById('flip-card');
      if (card) {
        card.classList.remove('slide-in-left', 'slide-in-right');
        void card.offsetWidth; // force reflow so animation replays
        card.classList.add(slideClass);
      }
    }
  }

  private renderQuestion() {
    const d=this.currentData!;
    const fillIn=isFillIn(d);
    // Build the jump dropdown options for the main card
    const jumpOpts = this.filtered.map((globalIdx, i) => {
      const entry = this.index[globalIdx];
      return `<div class="dd-option dd-option-item q-jump-opt" data-qi="${i}" data-txt="Q${i+1}" data-val="Q${i+1}" style="${i===this.cursor?'font-weight:700;':''}">${i+1}. ${entry.skill}</div>`;
    }).join('');
    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const bugHref = isMobile
      ? 'mailto:bmirza113@gmail.com?subject=Bug%2FError%20Report'
      : 'https://mail.google.com/mail/?view=cm&fs=1&to=bmirza113@gmail.com&su=Bug%2FError%20Report';
    const feedHref = isMobile
      ? 'mailto:bmirza113@gmail.com?subject=Feedback'
      : 'https://mail.google.com/mail/?view=cm&fs=1&to=bmirza113@gmail.com&su=Feedback';
    let h=`<div class="question-header">
      <div class="question-header-left">
        <h3>Question</h3>
        <span class="q-counter-inline" id="question-counter-inline"></span>
        <div class="q-jump-wrap">
          <div class="dd-select" id="q-jump-dd">
            <div class="dd-selected" style="padding:4px 8px;font-size:12px;">
              <span class="dd-selected-text">Q${this.cursor+1} of ${this.filtered.length}</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" class="dd-arrow">
                <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
              </svg>
            </div>
            <div class="dd-options" id="q-jump-opts" style="max-height:260px;overflow-y:auto;min-width:200px;">${jumpOpts}</div>
          </div>
        </div>
      </div>
      <div class="question-header-right">
        <a href="${bugHref}" target="_blank" class="BugButton" id="bug-btn-inline">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 43 42" class="bugsvg">
            <path stroke-width="4" stroke="currentColor" d="M20 7H23C26.866 7 30 10.134 30 14V28.5C30 33.1944 26.1944 37 21.5 37C16.8056 37 13 33.1944 13 28.5V14C13 10.134 16.134 7 20 7Z"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M18 2V7"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M25 2V7"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M31 22H41"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M2 22H12"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M12.5785 15.2681C3.5016 15.2684 4.99951 12.0004 5 4"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M12.3834 29.3877C3.20782 29.3874 4.72202 32.4736 4.72252 40.0291"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M30.0003 14.8974C39.0545 15.553 37.7958 12.1852 38.3718 4.20521"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M29.9944 29.7379C39.147 29.1188 37.8746 32.2993 38.4568 39.8355"></path>
          </svg>
          <span class="bug-tooltip">Report Bug</span>
        </a>
        <a href="${feedHref}" target="_blank" class="FeedbackButton" id="feedback-btn-inline">Feedback</a>
        <button id="regenerate-btn" class="btn-regen" title="Regenerate">
          <svg class="regen-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
          </svg>
        </button>
      </div>
    </div>
    <div class="question-text">${this.fmt(d.questionText)}</div>`;

    if(d.figureCode){
      const code=d.figureCode;
      if(code.trim().startsWith('<table')||code.trim().startsWith('<div')){
        h+=`<div class="figure">${code}</div>`;
      } else {
        const gid=`mg-${Date.now()}`;
        h+=`<div class="figure mafs-container" id="${gid}"></div>`;
        setTimeout(()=>this.mountGraph(gid,code,400),50);
      }
    }

    if(fillIn){
      h+=`<div class="fill-in-blank">
        <label class="fill-label">Your Answer:</label>
        <input id="fill-input" class="fill-input" type="text"
               placeholder="Type your answer here…"
               autocomplete="off" autocorrect="off" spellcheck="false">
      </div>`;
    } else if(d.options?.length){
      h+=`<ul class="options">`;
      d.options.forEach((opt,i)=>{
        const letter=String.fromCharCode(65+i);
        const txt=getOptText(opt);
        if(isGraphCode(txt)){
          const oid=`og-${Date.now()}-${i}`;
          h+=`<li class="option option-graph" data-index="${i}" role="button" tabindex="0">
            <span class="option-letter">${letter}.</span>
            <div id="${oid}" class="mafs-container option-mafs"></div></li>`;
          setTimeout(()=>this.mountGraph(oid,txt,300),100);
        } else {
          h+=`<li class="option" data-index="${i}" role="button" tabindex="0">
            <span class="option-letter">${letter}.</span>
            <span class="option-text">${autoWrap(txt)}</span></li>`;
        }
      });
      h+=`</ul>`;
    }

    this.qContent.innerHTML=h;

    const inlineCounter = document.getElementById('question-counter-inline');
    if (inlineCounter && this.counter) inlineCounter.textContent = this.counter.textContent;

    // Wire question-jump dropdown in main card
    document.querySelectorAll('#q-jump-opts .q-jump-opt').forEach(el => {
      el.addEventListener('click', () => {
        const qi = parseInt((el as HTMLElement).dataset.qi ?? '0', 10);
        const dd = document.getElementById('q-jump-dd');
        dd?.classList.remove('is-open');
        if (!isNaN(qi)) {
          const dir = qi > this.cursor ? 1 : -1;
          this.cursor = qi;
          this.loadAndRender(dir);
        }
      });
    });

    const regenBtn = document.getElementById('regenerate-btn')!;
    let regenCooldown = false;
    regenBtn.addEventListener('click', e => {
      e.stopPropagation();
      regenCooldown = true;
      regenBtn.classList.add('regen-clicked');
      this.loadAndRender();
    });
    regenBtn.addEventListener('mouseleave', () => { regenCooldown = false; regenBtn.classList.remove('regen-clicked'); });
    regenBtn.addEventListener('mouseenter', () => { if (regenCooldown) regenBtn.classList.add('regen-clicked'); });

    if(fillIn){
      const inp=document.getElementById('fill-input') as HTMLInputElement;
      inp.addEventListener('input',()=>{
        this.userInput=inp.value.trim();
        this.submitBtn.disabled=this.userInput.length===0;
        if (this.mobSubmitBtn) this.mobSubmitBtn.disabled=this.userInput.length===0;
      });
      inp.addEventListener('keydown',(e:KeyboardEvent)=>{
        if(e.key==='Enter'&&this.userInput.length>0) this.submitAnswer();
      });
    } else {
      this.attachOpts();
    }
  }

  private renderAnswer() {
    const d=this.currentData!;
    const fillIn=isFillIn(d);
    let ok=false, correctDisplay='';

    if(fillIn){
      const norm=(s:string)=>s.trim().toLowerCase().replace(/\.0+$/,'');
      const correct=String(d.correctAnswer).trim();
      ok=norm(this.userInput)===norm(correct);
      correctDisplay=autoWrap(correct);
    } else {
      const ci=resolveCorrect(d.correctAnswer,d.options);
      ok=this.selectedOpt===ci;
      const letter=String.fromCharCode(65+ci);
      correctDisplay=`${letter}. <span class="option-text">${autoWrap(getOptText(d.options[ci]))}</span>`;
    }

    let h=`<div class="answer-section ${ok?'correct':'incorrect'}">
      <h3>${ok?'✓ Correct!':'✗ Incorrect'}</h3>
      <p class="correct-answer-display"><strong>Correct Answer:</strong> ${correctDisplay}</p>`;
    if(fillIn&&!ok)
      h+=`<p class="your-answer-display"><strong>Your Answer:</strong> ${this.userInput||'(blank)'}</p>`;
    if(d.explanation)
      h+=`<div class="explanation"><strong>Explanation:</strong><br>${this.fmtExp(d.explanation)}</div>`;
    h+=`</div>`;
    this.aContent.innerHTML=h;
    this.typeset();
  }

  private attachOpts(){
    const opts=this.qContent.querySelectorAll<HTMLElement>('.option');
    opts.forEach(o=>{
      const pick=(e:Event)=>{
        if(this.submitted)return;
        e.stopPropagation();
        this.selectedOpt=parseInt(o.dataset.index!,10);
        opts.forEach(x=>x.classList.remove('selected'));
        o.classList.add('selected');
        this.submitBtn.disabled=false;
        if (this.mobSubmitBtn) this.mobSubmitBtn.disabled=false;
      };
      o.addEventListener('click',pick);
      o.addEventListener('keypress',(e:KeyboardEvent)=>{if(e.key==='Enter'||e.key===' ')pick(e);});
    });
  }

  private submitAnswer(){
    if(!this.currentData)return;
    const fillIn=isFillIn(this.currentData);
    if(!fillIn&&this.selectedOpt===null)return;
    if(fillIn&&!this.userInput)return;
    this.submitted=true;
    this.submitBtn.disabled=true;
    this.flipBtn.disabled=false;
    if (this.mobSubmitBtn) this.mobSubmitBtn.disabled=true;
    if (this.mobFlipBtn) this.mobFlipBtn.disabled=false;
    if(!fillIn){
      const ci=resolveCorrect(this.currentData.correctAnswer,this.currentData.options);
      this.qContent.querySelectorAll<HTMLElement>('.option').forEach((o,i)=>{
        o.style.cursor='default';
        if(i===ci)o.classList.add('correct-answer');
        if(i===this.selectedOpt&&i!==ci)o.classList.add('wrong-answer');
      });
    } else {
      const inp=document.getElementById('fill-input') as HTMLInputElement|null;
      if(inp)inp.disabled=true;
    }
    this.renderAnswer();
    setTimeout(()=>this.toggleFlip(),350);
  }

  private toggleFlip(){
    this.flipped=!this.flipped;
    this.cardInner.classList.toggle('flipped');
    const label = this.flipped ? 'Back to Question' : 'Reveal';
    this.flipBtn.textContent=label;
    if (this.mobFlipBtn) this.mobFlipBtn.textContent=label;
    setTimeout(()=>this.typeset(),100);
  }

  private async navigate(dir:number){
    const n=this.cursor+dir;
    if(n<0||n>=this.filtered.length)return;
    this.cursor=n;
    await this.loadAndRender(dir);
  }

  private fmt(t:string){return autoWrap(sanitize(String(t||''))).replace(/\n/g,'<br>');}
  private fmtExp(t:string){
    return autoWrap(sanitize(t.replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>'))).replace(/\n/g,'<br>');
  }

  private async mountGraph(id:string,code:string,h=400){
    const el=document.getElementById(id);
    if(!el)return;
    el.style.height=`${h}px`;
    try {
      const [React,{createRoot},{default:GR}]=await Promise.all([
        import('react'),import('react-dom/client'),import('./GraphRenderer')
      ]);
      const root=createRoot(el);
      this.graphRoots.set(id,root);
      root.render(React.createElement(GR,{code,height:h,zoom:true}));
    } catch { el.innerHTML='<div class="mafs-error">Graph unavailable</div>'; }
  }

  private cleanGraphs(){this.graphRoots.forEach(r=>{try{r.unmount()}catch(_){}});this.graphRoots.clear();}

  private updateUI(){
    const text = `${this.cursor+1} / ${this.filtered.length}`;
    if (this.counter) this.counter.textContent = text;
    const inlineCounter = document.getElementById('question-counter-inline');
    if (inlineCounter) inlineCounter.textContent = text;
    const atStart = this.cursor === 0;
    const atEnd   = this.cursor === this.filtered.length - 1;
    this.prevBtn.classList.toggle('disabled', atStart);
    this.nextBtn.classList.toggle('disabled', atEnd);
  }

  private showError(msg:string){this.qContent.innerHTML=`<p class="error-msg">${msg}</p>`;}
  private typeset(){(window as any).MathJax?.typesetPromise?.().catch(()=>{});}

  private showBugPanel() {
    if (!this.currentEntry) return;
    const entry = this.currentEntry;
    const filePath = entry.path.replace('./', '');
    const fileName = filePath.split('/').pop() ?? filePath;
    const dir = filePath.includes('/') ? filePath.substring(0, filePath.lastIndexOf('/')) : '.';

    const existing = document.getElementById('bug-panel');
    if (existing) existing.remove();

    // Build list of all question IDs from the full index
    const allIds: { id: string; globalIdx: number }[] = this.index.map((e, i) => {
      const fn = e.path.split('/').pop() ?? '';
      const id = fn.replace(/^question_/, '').replace(/\.ts$/, '');
      return { id, globalIdx: i };
    });

    const panel = document.createElement('div');
    panel.id = 'bug-panel';
    panel.innerHTML = `
      <div id="bug-panel-backdrop"></div>
      <div id="bug-panel-inner">
        <div id="bug-panel-header">
          <span>🐛 Source <kbd style="font-size:10px;opacity:0.6;background:rgba(255,255,255,0.1);padding:2px 6px;border-radius:4px;border:1px solid rgba(255,255,255,0.2)">Ctrl+Q</kbd></span>
          <button id="bug-panel-close">✕</button>
        </div>
        <div id="bug-panel-body">
          <p class="bug-hint" style="margin-bottom:14px;opacity:0.55;font-size:11px;letter-spacing:0.04em">CURRENT QUESTION SOURCE</p>
          <div class="bug-copy-row">
            <label>File</label>
            <span style="font-family:monospace;font-size:12px;color:#cdd6f4">${fileName}</span>
          </div>
          <div class="bug-copy-row" style="margin-top:10px">
            <label>Directory</label>
            <span style="font-family:monospace;font-size:11px;opacity:0.6">${dir}</span>
          </div>
          <div class="bug-copy-row" style="margin-top:10px">
            <label>Question ID</label>
            <button id="bug-copy-path-btn">Copy ID</button>
          </div>
          <input id="bug-path-box" readonly value="${fileName.replace(/^question_/, '').replace(/\.ts$/, '')}" />

          <div style="margin-top:20px;border-top:1px solid rgba(255,255,255,0.12);padding-top:16px">
            <p class="bug-hint" style="margin-bottom:10px;opacity:0.55;font-size:11px;letter-spacing:0.04em">JUMP TO QUESTION ID <span style="opacity:0.5">(${allIds.length} total)</span></p>
            <input id="bug-id-search" type="text" placeholder="Search question ID…" autocomplete="off" spellcheck="false"
              style="width:100%;box-sizing:border-box;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.18);border-radius:6px;color:#cdd6f4;font-family:monospace;font-size:13px;padding:8px 10px;outline:none;margin-bottom:8px;" />
            <div id="bug-id-list"
              style="max-height:220px;overflow-y:auto;border:1px solid rgba(255,255,255,0.1);border-radius:6px;background:rgba(0,0,0,0.25);">
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(panel);
    document.getElementById('bug-panel-close')!.onclick = () => panel.remove();
    document.getElementById('bug-panel-backdrop')!.onclick = () => panel.remove();

    const pathBox = document.getElementById('bug-path-box') as HTMLInputElement;
    document.getElementById('bug-copy-path-btn')!.onclick = () => {
      navigator.clipboard.writeText(pathBox.value).then(() => {
        const btn = document.getElementById('bug-copy-path-btn')!;
        btn.textContent = 'Copied!';
        setTimeout(() => btn.textContent = 'Copy ID', 1500);
      });
    };

    // Question ID search logic
    const searchInput = document.getElementById('bug-id-search') as HTMLInputElement;
    const listEl = document.getElementById('bug-id-list')!;
    let highlightedIdx = -1;

    const renderList = (filter: string) => {
      const trimmed = filter.trim().toLowerCase();
      const matches = trimmed
        ? allIds.filter(e => e.id.toLowerCase().includes(trimmed))
        : allIds;
      highlightedIdx = matches.length > 0 ? 0 : -1;

      listEl.innerHTML = matches.slice(0, 200).map((e, i) => {
        const isHighlighted = i === 0 && trimmed;
        return `<div class="bug-id-item" data-gidx="${e.globalIdx}"
          style="padding:7px 12px;font-family:monospace;font-size:13px;color:#cdd6f4;cursor:pointer;
                 border-bottom:1px solid rgba(255,255,255,0.05);
                 ${isHighlighted ? 'background:rgba(100,180,255,0.15);' : ''}
                 transition:background 0.1s;"
          onmouseenter="this.style.background='rgba(255,255,255,0.1)'"
          onmouseleave="this.style.background='${isHighlighted ? 'rgba(100,180,255,0.15)' : ''}'"
          >${e.id}</div>`;
      }).join('');

      if (matches.length > 200) {
        listEl.insertAdjacentHTML('beforeend', `<div style="padding:6px 12px;font-size:11px;opacity:0.4;text-align:center">${matches.length - 200} more…</div>`);
      }
    };

    const jumpToQuestion = (globalIdx: number) => {
      panel.remove();
      // Reset all filters so all questions are visible
      this.selDiff = null; this.selDomain = null; this.selSkill = null;
      // Rebuild filtered with no active filters
      this.filtered = this.index.map((_, i) => i);
      // Jump directly to the question
      const pos = this.filtered.indexOf(globalIdx);
      this.cursor = pos !== -1 ? pos : 0;
      this.loadAndRender();
    };

    listEl.addEventListener('click', (e) => {
      const item = (e.target as HTMLElement).closest('.bug-id-item') as HTMLElement | null;
      if (!item) return;
      const gidx = parseInt(item.dataset.gidx ?? '-1');
      if (gidx >= 0) jumpToQuestion(gidx);
    });

    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const first = listEl.querySelector('.bug-id-item') as HTMLElement | null;
        if (first) {
          const gidx = parseInt(first.dataset.gidx ?? '-1');
          if (gidx >= 0) jumpToQuestion(gidx);
        }
      } else if (e.key === 'Escape') {
        panel.remove();
      }
    });

    searchInput.addEventListener('input', () => renderList(searchInput.value));

    // Initial render
    renderList('');
    // Focus search input
    setTimeout(() => searchInput.focus(), 50);
  }
}

// ══════════════════════════════════════════════════════════════════════════════
// PRACTICE TEST ENGINE
// ══════════════════════════════════════════════════════════════════════════════

interface PTQuestion {
  path: string;
  folder: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  domain: string;
  skill: string;
  data: QuestionData | null;
  selectedOpt: number | null;
  userInput: string;
  submitted: boolean;
}

// Domain+skill targets per module (22 questions):
// Algebra:8, AdvMath:7, PSDA:4, Geo:3
const PT_DOMAIN_COUNTS: Record<string,number> = {
  'Algebra': 8,
  'Advanced Math': 7,
  'Problem Solving And Data Analysis': 4,
  'Geometry And Trigonometry': 3,
};

// Module 1 (adaptive): 18 Easy, 4 Medium — same regardless of path
// Module 2 Hard path: 12 Medium, 10 Hard
// Module 2 Easy path: 16 Easy, 6 Medium
// Non-adaptive each module: ~7 Easy, 9-10 Medium, 6-7 Hard

function buildModuleQuestions(
  allIndex: QEntry[],
  allModules: Record<string,(()=>Promise<any>)>,
  difficulties: {diff: 'Easy'|'Medium'|'Hard', count: number}[],
): PTQuestion[] {
  // Build a pool grouped by difficulty+domain
  const pool: Record<string, QEntry[]> = {};
  for (const e of allIndex) {
    const key = `${e.difficulty}::${e.domain}`;
    if (!pool[key]) pool[key] = [];
    pool[key].push(e);
  }

  // Shuffle helper
  const shuffle = <T>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  const questions: PTQuestion[] = [];
  const usedPaths = new Set<string>();

  // Build per difficulty, then distribute by domain
  for (const { diff, count } of difficulties) {
    const domainEntries: Record<string,QEntry[]> = {};
    for (const [domain, target] of Object.entries(PT_DOMAIN_COUNTS)) {
      const key = `${diff}::${domain}`;
      domainEntries[domain] = shuffle(pool[key] || []).filter(e => !usedPaths.has(e.path));
    }

    // Allocate proportionally to domain targets
    const totalTarget = Object.values(PT_DOMAIN_COUNTS).reduce((a,b)=>a+b,0); // 22
    const domainAlloc: Record<string,number> = {};
    let remaining = count;

    const domains = Object.keys(PT_DOMAIN_COUNTS);
    for (let i = 0; i < domains.length; i++) {
      const d = domains[i];
      if (i === domains.length - 1) {
        domainAlloc[d] = remaining;
      } else {
        const alloc = Math.round(PT_DOMAIN_COUNTS[d] / totalTarget * count);
        domainAlloc[d] = alloc;
        remaining -= alloc;
      }
    }

    for (const domain of domains) {
      let need = domainAlloc[domain];
      const available = domainEntries[domain];
      for (let i = 0; i < Math.min(need, available.length); i++) {
        usedPaths.add(available[i].path);
        questions.push({
          path: available[i].path,
          folder: available[i].folder,
          difficulty: available[i].difficulty as 'Easy'|'Medium'|'Hard',
          domain: available[i].domain,
          skill: available[i].skill,
          data: null,
          selectedOpt: null,
          userInput: '',
          submitted: false,
        });
      }
    }
  }

  // Shuffle the final list so domains/skills are interleaved nicely
  return shuffle(questions);
}

// ─────────────────────────────────────────────────────────────────────────────

class PracticeTestEngine {
  private overlay: HTMLElement;
  private panel: HTMLElement;

  // Screens
  private screenHome: HTMLElement;
  private screenInfo: HTMLElement;
  private screenTest: HTMLElement;
  private screenModEnd: HTMLElement;
  private screenResults: HTMLElement;

  // State
  private adaptive = false;
  private module1: PTQuestion[] = [];
  private module2: PTQuestion[] = [];
  private currentModule = 1;
  private cursor = 0;
  private timerSecs = 35 * 60;
  private timerInterval: ReturnType<typeof setInterval> | null = null;
  private timerHidden = false;
  private graphRoots = new Map<string, any>();

  private allIndex: QEntry[];
  private allModules: Record<string,(()=>Promise<any>)>;

  constructor(allIndex: QEntry[], allModules: Record<string,(()=>Promise<any>)>) {
    this.allIndex = allIndex;
    this.allModules = allModules;

    this.overlay    = document.getElementById('pt-overlay')!;
    this.panel      = document.getElementById('pt-panel')!;
    this.screenHome = document.getElementById('pt-home')!;
    this.screenInfo = document.getElementById('pt-info')!;
    this.screenTest = document.getElementById('pt-test')!;
    this.screenModEnd = document.getElementById('pt-mod-end')!;
    this.screenResults = document.getElementById('pt-results')!;

    this.bindButtons();
  }

  private bindButtons() {
    // Open panel — brick + mobile
    const brickBtn = document.getElementById('brick-btn');
    const mobBtn   = document.getElementById('mob-create-test-btn');
    const openPanel = () => this.open();

    brickBtn?.addEventListener('click', () => {
      const mush = document.getElementById('mario-mush');
      if (!mush) { openPanel(); return; }
      // Mushroom pops up and stays visible until panel is closed
      mush.classList.add('popped');
      setTimeout(() => openPanel(), 520); // wait for animation then open panel
    });
    brickBtn?.addEventListener('keydown', (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') openPanel(); });
    mobBtn?.addEventListener('click', () => {
      // close burger
      const cb = document.getElementById('mob-burger-checkbox') as HTMLInputElement|null;
      if (cb) cb.checked = false;
      openPanel();
    });

    // Close
    document.getElementById('pt-close')?.addEventListener('click', () => this.close());
    this.overlay.addEventListener('click', (e) => { if (e.target === this.overlay) this.close(); });

    // Home → Info
    document.getElementById('pt-info-btn')?.addEventListener('click', () => this.showScreen('info'));
    document.getElementById('pt-info-back')?.addEventListener('click', () => this.showScreen('home'));

    // Adaptive toggle
    const adaptiveCb = document.getElementById('pt-adaptive-toggle') as HTMLInputElement|null;
    const adaptiveDesc = document.getElementById('pt-adaptive-desc');
    adaptiveCb?.addEventListener('change', () => {
      this.adaptive = adaptiveCb.checked;
      if (adaptiveDesc) adaptiveDesc.textContent = this.adaptive
        ? 'On — Module 2 difficulty adjusts to your Module 1 score'
        : 'Off — equal difficulty both modules';
    });

    // Begin
    document.getElementById('pt-begin-btn')?.addEventListener('click', () => this.beginTest());

    // Test nav
    document.getElementById('pt-prev-btn')?.addEventListener('click', () => this.navigate(-1));
    document.getElementById('pt-next-btn')?.addEventListener('click', () => this.navigate(1));

    // Timer toggle
    document.getElementById('pt-timer-toggle')?.addEventListener('click', () => this.toggleTimer());

    // Practice test jump dropdown — click to open/close
    this.overlay.addEventListener('click', (e) => {
      const dd = document.getElementById('pt-jump-dd');
      if (!dd) return;
      const selected = dd.querySelector('.dd-selected');
      if (selected && (e.target === selected || selected.contains(e.target as Node))) {
        dd.classList.toggle('is-open');
        e.stopPropagation();
        return;
      }
      // Check if click was inside the options list (but not on a dd-option item)
      const optsEl = dd.querySelector('.dd-options');
      if (optsEl && optsEl.contains(e.target as Node)) {
        // click on an option item is handled below via delegated listener
        return;
      }
      if (!dd.contains(e.target as Node)) {
        dd.classList.remove('is-open');
      }
    });

    // Delegated listener for pt-jump-opts options (ensures clicks fire even through z-index stacking)
    this.overlay.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const opt = target.closest('#pt-jump-opts .dd-option') as HTMLElement | null;
      if (!opt) return;
      e.stopPropagation();
      const idx = parseInt(opt.dataset.idx ?? '-1', 10);
      if (isNaN(idx) || idx < 0) return;
      const dd = document.getElementById('pt-jump-dd');
      dd?.classList.remove('is-open');
      this.cursor = idx;
      this.renderCurrentQuestion();
    });

    // Desmos inside panel — reuse main Desmos instance
    document.getElementById('pt-calc-btn')?.addEventListener('click', () => {
      const mainCalcToggle = document.getElementById('calc-toggle');
      mainCalcToggle?.click();
    });

    // Continue to module 2
    document.getElementById('pt-continue-btn')?.addEventListener('click', () => this.startModule2());

    // Arrow key navigation inside practice test
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const practiceOpen = this.overlay.classList.contains('open');
      if (!practiceOpen) return;
      const testVisible = !this.screenTest.classList.contains('pt-screen-hidden');
      if (!testVisible) return;
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); this.navigate(1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); this.navigate(-1); }
    });
  }

  open() {
    this.overlay.classList.add('open');
    this.overlay.setAttribute('aria-hidden', 'false');
    this.showScreen('home');
  }

  close() {
    this.overlay.classList.remove('open');
    this.overlay.setAttribute('aria-hidden', 'true');
    this.stopTimer();
    // Hide mushroom when panel closes
    const mush = document.getElementById('mario-mush');
    mush?.classList.remove('popped');
    // Clear all test data to free memory and prevent slowdown
    this.resetTestData();
  }

  private resetTestData() {
    // Unmount any graph roots
    this.graphRoots.forEach(r => { try { r.unmount(); } catch(_) {} });
    this.graphRoots.clear();
    // Clear module data
    this.module1 = [];
    this.module2 = [];
    this.currentModule = 1;
    this.cursor = 0;
    // Reset DOM immediately — don't keep any rendered question data in memory
    const ptQContent = document.getElementById('pt-q-content');
    if (ptQContent) ptQContent.innerHTML = '';
    const ptResultsList = document.getElementById('pt-results-list');
    if (ptResultsList) ptResultsList.innerHTML = '<div class="loading" id="pt-results-loading" style="display:none"><div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div></div><p>Building results…</p></div>';
    const ptJumpOpts = document.getElementById('pt-jump-opts');
    if (ptJumpOpts) ptJumpOpts.innerHTML = '';
    // Reset score display
    const scoreNum = document.getElementById('pt-score-num');
    if (scoreNum) scoreNum.textContent = '—';
    const scoreSvg = document.getElementById('pt-score-svg');
    if (scoreSvg) scoreSvg.innerHTML = '';
    const domainBreakdown = document.getElementById('pt-domain-breakdown');
    if (domainBreakdown) domainBreakdown.innerHTML = '';
  }

  private showScreen(name: 'home'|'info'|'test'|'modend'|'results') {
    const map: Record<string, HTMLElement> = {
      home: this.screenHome, info: this.screenInfo,
      test: this.screenTest, modend: this.screenModEnd,
      results: this.screenResults,
    };
    for (const [k, el] of Object.entries(map)) {
      el.classList.toggle('pt-screen-hidden', k !== name);
    }
    // Expand panel to near-fullscreen for test, modend, results screens
    const panel = this.overlay.querySelector('.pt-panel') as HTMLElement | null;
    const isFullscreen = ['test', 'modend', 'results'].includes(name);
    panel?.classList.toggle('pt-panel-fullscreen', isFullscreen);
  }

  private beginTest() {
    // Build modules based on adaptive setting
    if (this.adaptive) {
      // Adaptive Module 1: 18 Easy, 4 Medium
      this.module1 = buildModuleQuestions(this.allIndex, this.allModules, [
        { diff: 'Easy', count: 18 },
        { diff: 'Medium', count: 4 },
      ]);
    } else {
      // Non-adaptive Module 1: ~7 Easy, 9 Medium, 6 Hard
      this.module1 = buildModuleQuestions(this.allIndex, this.allModules, [
        { diff: 'Easy', count: 7 },
        { diff: 'Medium', count: 9 },
        { diff: 'Hard', count: 6 },
      ]);
    }

    this.module2 = []; // built after module 1 if adaptive
    this.currentModule = 1;
    this.cursor = 0;
    this.startTimer(35 * 60);

    document.getElementById('pt-module-label')!.textContent = 'Module 1 of 2';
    this.populateJumpMenu();
    this.showScreen('test');
    this.renderCurrentQuestion();
  }

  private get currentModuleQuestions(): PTQuestion[] {
    return this.currentModule === 1 ? this.module1 : this.module2;
  }

  private navigate(dir: number) {
    const qs = this.currentModuleQuestions;
    const next = this.cursor + dir;
    if (next < 0 || next >= qs.length) {
      // At last question going forward → check all answered
      if (dir > 0 && this.cursor === qs.length - 1) {
        const unanswered = qs.filter(q => q.selectedOpt === null && !q.userInput).length;
        if (unanswered > 0) {
          this.showNotAnswered(unanswered);
          return;
        }
        this.endModule();
      }
      return;
    }
    this.cursor = next;
    this.renderCurrentQuestion();
    this.updateJumpMenu();
  }

  private showNotAnswered(count: number) {
    const area = document.getElementById('pt-q-content')!;
    const msg = document.createElement('div');
    msg.style.cssText = 'position:absolute;top:0;left:0;right:0;padding:10px 16px;background:#c0392b;color:#fff;font-size:13px;font-weight:600;text-align:center;z-index:20;border-radius:8px;margin:8px 16px;';
    msg.textContent = `${count} question${count>1?'s':''} still unanswered. Please answer all questions before continuing.`;
    const container = document.getElementById('pt-question-area')!;
    container.style.position = 'relative';
    container.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
  }

  private async renderCurrentQuestion() {
    const qs = this.currentModuleQuestions;
    const q = qs[this.cursor];
    if (!q) return;

    // Update counter
    document.getElementById('pt-q-counter')!.textContent = `${this.cursor + 1} / ${qs.length}`;
    const prevBtn = document.getElementById('pt-prev-btn') as HTMLButtonElement;
    const nextBtn = document.getElementById('pt-next-btn') as HTMLButtonElement;
    prevBtn.disabled = this.cursor === 0;
    const isLast = this.cursor === qs.length - 1;
    nextBtn.textContent = isLast ? 'Finish Module →' : 'Next →';

    // Load if not loaded
    if (!q.data) {
      const area = document.getElementById('pt-q-content')!;
      area.innerHTML = '<div class="loading"><div class="spinner"><div></div><div></div><div></div><div></div><div></div><div></div></div><p>Loading…</p></div>';
      try {
        const mod = await this.allModules[q.path]();
        const key = Object.keys(mod).find(k => k.startsWith('generator_'));
        if (!key) throw new Error('no generator');
        q.data = mod[key].generate() as QuestionData;
      } catch {
        document.getElementById('pt-q-content')!.innerHTML = '<p class="error-msg">Failed to load question.</p>';
        return;
      }
    }

    this.renderQHTML(q);
    this.updateJumpMenu();
  }

  private renderQHTML(q: PTQuestion) {
    const d = q.data!;
    const fillIn = !d.options || d.options.length === 0;

    let h = `<div class="question-header">
      <div class="question-header-left">
        <h3>Question ${this.cursor + 1}</h3>
      </div>
      <div class="question-header-right">
        <a href="${/Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'mailto:bmirza113@gmail.com?subject=Bug%2FError%20Report' : 'https://mail.google.com/mail/?view=cm&fs=1&to=bmirza113@gmail.com&su=Bug%2FError%20Report'}" target="_blank" class="BugButton">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 43 42" class="bugsvg">
            <path stroke-width="4" stroke="currentColor" d="M20 7H23C26.866 7 30 10.134 30 14V28.5C30 33.1944 26.1944 37 21.5 37C16.8056 37 13 33.1944 13 28.5V14C13 10.134 16.134 7 20 7Z"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M18 2V7"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M25 2V7"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M31 22H41"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M2 22H12"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M12.5785 15.2681C3.5016 15.2684 4.99951 12.0004 5 4"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M12.3834 29.3877C3.20782 29.3874 4.72202 32.4736 4.72252 40.0291"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M30.0003 14.8974C39.0545 15.553 37.7958 12.1852 38.3718 4.20521"></path>
            <path stroke-linecap="round" stroke-width="4" stroke="currentColor" d="M29.9944 29.7379C39.147 29.1188 37.8746 32.2993 38.4568 39.8355"></path>
          </svg>
          <span class="bug-tooltip">Report Bug</span>
        </a>
      </div>
    </div>
    <div class="question-text">${autoWrap(sanitize(String(d.questionText || '')))}</div>`;

    if (d.figureCode) {
      const gid = `ptg-${this.cursor}-${this.currentModule}`;
      if (d.figureCode.trim().startsWith('<table') || d.figureCode.trim().startsWith('<div')) {
        h += `<div class="figure">${d.figureCode}</div>`;
      } else {
        h += `<div class="figure mafs-container" id="${gid}" style="height:300px"></div>`;
        setTimeout(() => this.mountGraph(gid, d.figureCode!, 300), 80);
      }
    }

    if (fillIn) {
      const val = q.userInput || '';
      h += `<div class="fill-in-blank">
        <label class="fill-label">Your Answer:</label>
        <input id="pt-fill-input" class="fill-input" type="text"
               placeholder="Type your answer…"
               value="${val.replace(/"/g, '&quot;')}"
               autocomplete="off" autocorrect="off" spellcheck="false">
      </div>`;
    } else if (d.options?.length) {
      h += `<ul class="options">`;
      d.options.forEach((opt, i) => {
        const letter = String.fromCharCode(65 + i);
        const txt = getOptText(opt);
        const selected = q.selectedOpt === i ? ' selected' : '';
        h += `<li class="option${selected}" data-index="${i}" role="button" tabindex="0">
          <span class="option-letter">${letter}.</span>
          <span class="option-text">${autoWrap(txt)}</span></li>`;
      });
      h += `</ul>`;
    }

    document.getElementById('pt-q-content')!.innerHTML = h;

    // Wire up fill-in
    if (fillIn) {
      const inp = document.getElementById('pt-fill-input') as HTMLInputElement;
      inp.addEventListener('input', () => { q.userInput = inp.value.trim(); this.updateJumpMenu(); });
    } else {
      // Wire up options
      document.querySelectorAll('#pt-q-content .option').forEach(o => {
        o.addEventListener('click', () => {
          if (o instanceof HTMLElement) {
            document.querySelectorAll('#pt-q-content .option').forEach(x => x.classList.remove('selected'));
            o.classList.add('selected');
            q.selectedOpt = parseInt(o.dataset.index!, 10);
            this.updateJumpMenu();
          }
        });
      });
    }

    (window as any).MathJax?.typesetPromise?.().catch(() => {});
  }

  private async mountGraph(id: string, code: string, h = 300) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.height = `${h}px`;
    try {
      const [React, { createRoot }, { default: GR }] = await Promise.all([
        import('react'), import('react-dom/client'), import('./GraphRenderer')
      ]);
      if (this.graphRoots.has(id)) { try { this.graphRoots.get(id).unmount(); } catch {} }
      const root = createRoot(el);
      this.graphRoots.set(id, root);
      root.render(React.createElement(GR, { code, height: h, zoom: true }));
    } catch { el.innerHTML = '<div class="mafs-error">Graph unavailable</div>'; }
  }

  private populateJumpMenu() {
    const opts = document.getElementById('pt-jump-opts');
    if (!opts) return;
    opts.innerHTML = '';
    const qs = this.currentModuleQuestions;
    qs.forEach((q, i) => {
      const answered = q.selectedOpt !== null || q.userInput.length > 0;
      const div = document.createElement('div');
      div.className = 'dd-option' + (answered ? ' answered' : '');
      div.dataset.idx = String(i);
      div.textContent = `Q${i + 1}`;
      opts.appendChild(div);
    });
    const label = document.getElementById('pt-jump-selected-text');
    if (label) label.textContent = `Q${this.cursor + 1}`;
  }

  private styleJumpOptions() {
    const opts = document.getElementById('pt-jump-opts');
    if (!opts) return;
    const qs = this.currentModuleQuestions;
    Array.from(opts.querySelectorAll<HTMLElement>('.dd-option')).forEach((el, i) => {
      const q = qs[i];
      if (!q) return;
      const answered = q.selectedOpt !== null || q.userInput.length > 0;
      el.classList.toggle('answered', answered);
    });
  }

  private updateJumpMenu() {
    this.styleJumpOptions();
    const label = document.getElementById('pt-jump-selected-text');
    if (label) label.textContent = `Q${this.cursor + 1}`;
  }

  private endModule() {
    this.stopTimer();
    if (this.currentModule === 1) {
      document.getElementById('pt-mod-end-title')!.textContent = 'Module 1 Complete';
      document.getElementById('pt-mod-end-msg')!.textContent = "Great work! When you're ready, continue to Module 2.";
      this.showScreen('modend');
    } else {
      this.showResults();
    }
  }

  private startModule2() {
    if (this.adaptive) {
      const mod1Score = this.calcModuleScore(this.module1);
      const hardPath = mod1Score / (18*10+4*20) >= 0.57;
      this.module2 = hardPath
        ? buildModuleQuestions(this.allIndex, this.allModules, [{ diff: 'Medium', count: 12 }, { diff: 'Hard', count: 10 }])
        : buildModuleQuestions(this.allIndex, this.allModules, [{ diff: 'Easy', count: 16 }, { diff: 'Medium', count: 6 }]);
    } else {
      this.module2 = buildModuleQuestions(this.allIndex, this.allModules, [
        { diff: 'Easy', count: 7 }, { diff: 'Medium', count: 9 }, { diff: 'Hard', count: 6 },
      ]);
    }
    this.currentModule = 2;
    this.cursor = 0;
    this.startTimer(35 * 60);
    document.getElementById('pt-module-label')!.textContent = 'Module 2 of 2';
    this.populateJumpMenu();
    this.showScreen('test');
    this.renderCurrentQuestion();
  }

  private calcModuleScore(qs: PTQuestion[]): number {
    const pts: Record<string, number> = { Easy: 10, Medium: 20, Hard: 30 };
    return qs.reduce((sum, q) => {
      if (!q.data) return sum;
      const fillIn = !q.data.options || q.data.options.length === 0;
      const norm = (s: string) => s.trim().toLowerCase().replace(/\.0+$/, '');
      const correct = fillIn
        ? norm(q.userInput) === norm(String(q.data.correctAnswer))
        : q.selectedOpt === resolveCorrect(q.data.correctAnswer, q.data.options);
      return sum + (correct ? (pts[q.difficulty] ?? 10) : 0);
    }, 0);
  }

  private showResults() {
    // ── Score calculation ────────────────────────────────────────────────────
    const rawScore = this.calcModuleScore(this.module1) + this.calcModuleScore(this.module2);
    let maxRaw: number, ceiling: number;
    if (this.adaptive) {
      const hardPath = this.calcModuleScore(this.module1) / (18*10+4*20) >= 0.57;
      maxRaw = hardPath ? 800 : 540;
      ceiling = hardPath ? 800 : 600;
    } else {
      maxRaw = 860; ceiling = 800;
    }
    const overallPct = Math.min(1, rawScore / maxRaw);
    const scaledScore = Math.round((200 + overallPct * (ceiling - 200)) / 10) * 10;

    document.getElementById('pt-score-num')!.textContent = String(scaledScore);
    document.getElementById('pt-score-sub')!.textContent = '/ 800';

    // ── Show screen first so elements are in DOM ─────────────────────────────
    this.showScreen('results');

    // ── Domain stats ─────────────────────────────────────────────────────────
    const DOMAIN_COLORS: Record<string, string> = {
      'Algebra':                           '#4e9af1',
      'Advanced Math':                     '#a855f7',
      'Problem Solving And Data Analysis': '#10b981',
      'Geometry And Trigonometry':         '#f97316',
    };
    const DOMAIN_SHORT: Record<string, string> = {
      'Algebra': 'Algebra',
      'Advanced Math': 'Adv. Math',
      'Problem Solving And Data Analysis': 'PSDA',
      'Geometry And Trigonometry': 'Geo & Trig',
    };
    const allQs = [...this.module1, ...this.module2];
    const domainStats: Record<string, { correct: number; total: number }> = {};
    for (const q of allQs) {
      if (!q.data) continue;
      if (!domainStats[q.domain]) domainStats[q.domain] = { correct: 0, total: 0 };
      domainStats[q.domain].total++;
      const fillIn = !q.data.options || q.data.options.length === 0;
      const norm = (s: string) => s.trim().toLowerCase().replace(/\.0+$/, '');
      const correct = fillIn
        ? norm(q.userInput) === norm(String(q.data.correctAnswer))
        : q.selectedOpt === resolveCorrect(q.data.correctAnswer, q.data.options);
      if (correct) domainStats[q.domain].correct++;
    }

    // ── Circle graph ─────────────────────────────────────────────────────────
    const svgEl = document.getElementById('pt-score-svg') as unknown as SVGSVGElement | null;
    const tooltipEl = document.getElementById('pt-ring-tooltip')!;
    if (svgEl) {
      svgEl.innerHTML = '';
      const cx = 100, cy = 100;
      const domains = Object.keys(DOMAIN_COLORS);
      // 5 rings: outermost = overall, then 4 domains inner to outer
      const rings = [
        { label: 'Overall', pct: overallPct, color: '#f59e0b', r: 90 },
        ...domains.map((d, i) => {
          const st = domainStats[d] || { correct: 0, total: 0 };
          return {
            label: DOMAIN_SHORT[d] || d,
            pct: st.total > 0 ? st.correct / st.total : 0,
            color: DOMAIN_COLORS[d],
            r: 73 - i * 15,
          };
        }),
      ];

      const makeArcPath = (r: number, pct: number): string => {
        if (pct <= 0) return '';
        const safePct = Math.min(pct, 0.9999);
        const startX = cx + r * Math.cos(-Math.PI / 2);
        const startY = cy + r * Math.sin(-Math.PI / 2);
        const angle = -Math.PI / 2 + safePct * 2 * Math.PI;
        const endX = cx + r * Math.cos(angle);
        const endY = cy + r * Math.sin(angle);
        const large = safePct > 0.5 ? 1 : 0;
        return `M ${startX.toFixed(2)} ${startY.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${endX.toFixed(2)} ${endY.toFixed(2)}`;
      };

      // Draw background tracks
      for (const ring of rings) {
        const track = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        track.setAttribute('cx', String(cx));
        track.setAttribute('cy', String(cy));
        track.setAttribute('r', String(ring.r));
        track.setAttribute('fill', 'none');
        track.setAttribute('stroke', ring.color);
        track.setAttribute('stroke-width', '11');
        track.setAttribute('stroke-opacity', '0.15');
        svgEl.appendChild(track);
      }

      // Draw animated arcs
      for (const ring of rings) {
        if (ring.pct > 0) {
          const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
          arc.setAttribute('fill', 'none');
          arc.setAttribute('stroke', ring.color);
          arc.setAttribute('stroke-width', '11');
          arc.setAttribute('stroke-linecap', 'round');
          // Animate via stroke-dasharray
          const circ = 2 * Math.PI * ring.r;
          const fillLen = ring.pct * circ;
          arc.setAttribute('d', makeArcPath(ring.r, ring.pct));
          arc.setAttribute('stroke-dasharray', `${circ}`);
          arc.setAttribute('stroke-dashoffset', `${circ}`);
          arc.style.transition = 'stroke-dashoffset 1.1s cubic-bezier(0.4, 0, 0.2, 1)';
          svgEl.appendChild(arc);
          // Trigger animation
          setTimeout(() => arc.setAttribute('stroke-dashoffset', `${circ - fillLen}`), 120);

          // Percentage label at midpoint of arc
          if (ring.pct > 0.08) {
            const midAngle = -Math.PI / 2 + ring.pct * Math.PI;
            const lx = cx + ring.r * Math.cos(midAngle);
            const ly = cy + ring.r * Math.sin(midAngle);
            const pctLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            pctLabel.setAttribute('x', lx.toFixed(1));
            pctLabel.setAttribute('y', ly.toFixed(1));
            pctLabel.setAttribute('text-anchor', 'middle');
            pctLabel.setAttribute('dominant-baseline', 'central');
            pctLabel.setAttribute('font-size', '9');
            pctLabel.setAttribute('font-weight', '700');
            pctLabel.setAttribute('fill', ring.color);
            pctLabel.textContent = `${Math.round(ring.pct * 100)}%`;
            svgEl.appendChild(pctLabel);
          }
        }

        // Invisible hover target — always add for ALL rings (including 0%)
        const hitCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        hitCircle.setAttribute('cx', String(cx));
        hitCircle.setAttribute('cy', String(cy));
        hitCircle.setAttribute('r', String(ring.r));
        hitCircle.setAttribute('fill', 'none');
        hitCircle.setAttribute('stroke', 'transparent');
        hitCircle.setAttribute('stroke-width', '18');
        hitCircle.style.cursor = 'pointer';
        const ringLabel = ring.label;
        const ringPctStr = `${Math.round(ring.pct * 100)}%`;
        hitCircle.addEventListener('mouseenter', () => {
          tooltipEl.textContent = `${ringLabel}: ${ringPctStr}`;
          tooltipEl.classList.add('visible');
        });
        hitCircle.addEventListener('mouseleave', () => tooltipEl.classList.remove('visible'));
        svgEl.appendChild(hitCircle);
      }
    }

    // ── Domain breakdown list ────────────────────────────────────────────────
    const breakdown = document.getElementById('pt-domain-breakdown')!;
    breakdown.innerHTML = '';
    for (const [domain, color] of Object.entries(DOMAIN_COLORS)) {
      const st = domainStats[domain] || { correct: 0, total: 0 };
      const pct = st.total > 0 ? Math.round(st.correct / st.total * 100) : 0;
      const row = document.createElement('div');
      row.className = 'pt-domain-row';
      row.innerHTML = `
        <span class="pt-domain-swatch" style="background:${color}"></span>
        <span class="pt-domain-name">${DOMAIN_SHORT[domain] || domain}</span>
        <span class="pt-domain-pct">${pct}%</span>`;
      breakdown.appendChild(row);
    }

    // ── Results list — single card navigator with prev/next ──────────────────
    const list = document.getElementById('pt-results-list')!;
    const loadingEl = document.getElementById('pt-results-loading')!;
    list.innerHTML = '';
    list.appendChild(loadingEl);
    loadingEl.style.display = 'flex';
    loadingEl.style.flexDirection = 'column';
    loadingEl.style.alignItems = 'center';
    loadingEl.style.padding = '40px';

    const buildResultItems = () => {
      loadingEl.style.display = 'none';

      // Collect all questions from both modules — include all, even if data not loaded yet
      const allResultQs: Array<{ q: PTQuestion; modNum: number; qIndex: number }> = [];
      this.module1.forEach((q, i) => { allResultQs.push({ q, modNum: 1, qIndex: i }); });
      this.module2.forEach((q, i) => { allResultQs.push({ q, modNum: 2, qIndex: i }); });

      if (allResultQs.length === 0) return;

      let resultCursor = 0;

      // Build the navigator container
      list.innerHTML = `
        <div class="pt-result-nav">
          <button class="pt-result-nav-btn" id="pt-result-prev">← Back</button>
          <span class="pt-result-nav-counter" id="pt-result-counter">1 / ${allResultQs.length}</span>
          <button class="pt-result-nav-btn" id="pt-result-next">Next →</button>
        </div>
        <div class="pt-result-card-wrap" id="pt-result-card-wrap">
          <div class="pt-result-card" id="pt-result-card"></div>
        </div>`;

      const renderCard = (idx: number) => {
        const { q, modNum, qIndex } = allResultQs[idx];
        // Scroll card wrap back to top on navigation
        const cardWrap = document.getElementById('pt-result-card-wrap');
        if (cardWrap) cardWrap.scrollTop = 0;

        if (!q.data) {
          // Question was never loaded (user skipped to end before reaching it)
          const card = document.getElementById('pt-result-card')!;
          card.innerHTML = `<div class="pt-result-card-header"><span class="pt-result-card-module">Module ${modNum} · Q${qIndex + 1}</span><span class="pt-result-card-status" style="color:#999">— Not reached</span></div><div class="pt-result-card-body" style="opacity:0.5;font-size:14px">This question was not loaded during the test.</div>`;
          document.getElementById('pt-result-counter')!.textContent = `${idx + 1} / ${allResultQs.length}`;
          const prevBtn = document.getElementById('pt-result-prev') as HTMLButtonElement;
          const nextBtn = document.getElementById('pt-result-next') as HTMLButtonElement;
          if (prevBtn) prevBtn.disabled = idx === 0;
          if (nextBtn) nextBtn.disabled = idx === allResultQs.length - 1;
          return;
        }
        const d = q.data!;
        const fillIn = !d.options || d.options.length === 0;
        const norm = (s: string) => s.trim().toLowerCase().replace(/\.0+$/, '');
        const correct = fillIn
          ? norm(q.userInput) === norm(String(d.correctAnswer))
          : q.selectedOpt === resolveCorrect(d.correctAnswer, d.options);

        const iconColor = correct ? '#27ae60' : '#e74c3c';
        const icon = correct ? '✓' : '✗';

        let answersHTML = '';
        if (fillIn) {
          answersHTML = `<p style="margin-bottom:6px"><strong>Your answer:</strong> ${q.userInput || '(blank)'}</p>
                         <p><strong>Correct answer:</strong> ${autoWrap(String(d.correctAnswer))}</p>`;
        } else {
          const ci = resolveCorrect(d.correctAnswer, d.options);
          const correctTxt = getOptText(d.options[ci]);
          const yourTxt = q.selectedOpt !== null ? getOptText(d.options[q.selectedOpt]) : '(none)';
          // Show all options with highlighting
          const optionsHTML = d.options.map((opt, i) => {
            const letter = String.fromCharCode(65 + i);
            const txt = getOptText(opt);
            const isCorrect = i === ci;
            const isYours = i === q.selectedOpt;
            let style = '';
            if (isCorrect) style = 'background:rgba(39,174,96,0.15);border-left:3px solid #27ae60;';
            else if (isYours && !isCorrect) style = 'background:rgba(231,76,60,0.15);border-left:3px solid #e74c3c;';
            return `<div class="pt-result-option" style="${style}">${letter}. ${autoWrap(txt)}</div>`;
          }).join('');
          answersHTML = `
            <div class="pt-result-options">${optionsHTML}</div>
            <p style="margin-top:10px;margin-bottom:4px"><strong>Your answer:</strong> ${autoWrap(String(yourTxt))}</p>
            <p><strong>Correct answer:</strong> ${autoWrap(correctTxt)}</p>`;
        }

        const card = document.getElementById('pt-result-card')!;
        card.innerHTML = `
          <div class="pt-result-card-header">
            <span class="pt-result-card-module">Module ${modNum} · Q${qIndex + 1}</span>
            <span class="pt-result-card-status" style="color:${iconColor}">${icon} ${correct ? 'Correct' : 'Incorrect'}</span>
            <span class="pt-result-card-diff pt-diff-${q.difficulty.toLowerCase()}">${q.difficulty}</span>
          </div>
          <div class="pt-result-card-body">
            <div class="question-text" style="margin-bottom:16px;font-size:15px;line-height:1.65">${autoWrap(sanitize(String(d.questionText || '')))}</div>
            ${answersHTML}
            ${d.explanation ? `<div class="explanation" style="margin-top:14px;padding-top:12px;border-top:1px solid var(--card-shadow-a)"><strong>Explanation:</strong><br>${autoWrap(sanitize(d.explanation))}</div>` : ''}
          </div>`;

        // Typeset math
        (window as any).MathJax?.typesetPromise?.([card]).catch(() => {});

        // Update counter
        document.getElementById('pt-result-counter')!.textContent = `${idx + 1} / ${allResultQs.length}`;

        // Update buttons
        const prevBtn = document.getElementById('pt-result-prev') as HTMLButtonElement;
        const nextBtn = document.getElementById('pt-result-next') as HTMLButtonElement;
        prevBtn.disabled = idx === 0;
        nextBtn.disabled = idx === allResultQs.length - 1;
      };

      renderCard(0);

      // Wire up nav buttons — use closest() to handle clicks on button text nodes too
      document.getElementById('pt-result-prev')?.addEventListener('click', () => {
        if (resultCursor > 0) { resultCursor--; renderCard(resultCursor); }
      });
      document.getElementById('pt-result-next')?.addEventListener('click', () => {
        if (resultCursor < allResultQs.length - 1) { resultCursor++; renderCard(resultCursor); }
      });
    };

    // Defer to let circle animation start first
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(buildResultItems, { timeout: 1200 });
    } else {
      setTimeout(buildResultItems, 200);
    }
  }



  // ── TIMER ──────────────────────────────────────────────────────────────────
  private startTimer(secs: number) {
    this.stopTimer();
    this.timerSecs = secs;
    this.renderTimer();
    this.timerInterval = window.setInterval(() => {
      this.timerSecs--;
      this.renderTimer();
      if (this.timerSecs <= 0) {
        this.stopTimer();
        this.endModule();
      }
    }, 1000) as unknown as ReturnType<typeof setInterval>;
  }

  private stopTimer() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval as unknown as number);
      this.timerInterval = null;
    }
  }

  private renderTimer() {
    const m = Math.floor(this.timerSecs / 60);
    const s = this.timerSecs % 60;
    const display = document.getElementById('pt-timer-display');
    if (display) {
      display.textContent = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
      display.classList.toggle('warning', this.timerSecs < 5 * 60);
    }
  }

  private toggleTimer() {
    this.timerHidden = !this.timerHidden;
    const bar = document.getElementById('pt-timer-bar')!;
    bar.classList.toggle('hidden-timer', this.timerHidden);
    const btn = document.getElementById('pt-timer-toggle')!;
    btn.textContent = this.timerHidden ? 'Show' : 'Hide';
    btn.setAttribute('aria-label', this.timerHidden ? 'Show timer' : 'Hide timer');
  }
}

document.addEventListener('DOMContentLoaded', () => new QuestionTester());