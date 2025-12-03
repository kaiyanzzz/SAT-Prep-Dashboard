import { NextRequest, NextResponse } from 'next/server';

// Mock plans - in production, this would use Google GenAI
const MOCK_PLANS: Record<string, string> = {
  'Balanced Approach': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 1: Foundations (Weeks 1-2)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Diagnostic Baseline:</strong> Complete full-length Practice Test 1 on Bluebook to set your starting score.</li>
        <li><strong class="text-slate-900 font-bold">Core Concepts:</strong> Dedicate 60% of time to Heart of Algebra and Standard English Conventions.</li>
        <li><strong class="text-slate-900 font-bold">Daily Habit:</strong> 15 minutes of vocabulary practice using the 'Essential Words' module.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 2: Application (Weeks 3-6)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Timed Drills:</strong> Transition to timed mini-sections for Reading & Writing.</li>
        <li><strong class="text-slate-900 font-bold">Data Analysis:</strong> Focus on 'Problem Solving & Data' module; master Desmos regressions.</li>
        <li><strong class="text-slate-900 font-bold">Review Cycle:</strong> Every Friday, review the Error Log from the week's practice questions.</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 3: Mastery (Weeks 7-8)</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Full Simulation:</strong> Take Practice Tests 3 & 4 under strict exam conditions (8:00 AM start).</li>
        <li><strong class="text-slate-900 font-bold">Triage:</strong> Stop learning new concepts; focus solely on refining accuracy in your strongest areas.</li>
      </ul>
    </div>
  `,
  'Math Intensive': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 1-3: The Algebra Engine</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Concept Deep Dive:</strong> Master Linear Equations and Systems. These make up ~35% of the math section.</li>
        <li><strong class="text-slate-900 font-bold">Desmos Mastery:</strong> Complete the 'Calculator Hacks' module. Learn to solve systems without algebra.</li>
        <li><strong class="text-slate-900 font-bold">Drill:</strong> 30 math problems per day, focusing on "Heart of Algebra".</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 4-6: Advanced & Geometry</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Non-Linear Functions:</strong> Study quadratics, vertex form, and exponential growth/decay.</li>
        <li><strong class="text-slate-900 font-bold">Geometry Sprint:</strong> Memorize volume formulas and special right triangles (30-60-90).</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 7-8: Speed & Accuracy</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Hard Module Practice:</strong> Exclusively practice "Hard" difficulty questions to prepare for Module 2 adaptation.</li>
        <li><strong class="text-slate-900 font-bold">Timed Sets:</strong> Complete 22-question sets in under 35 minutes.</li>
      </ul>
    </div>
  `,
  'Reading & Writing Intensive': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 1-2: Grammar Rules</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">The "Big 4" Rules:</strong> Master punctuation (commas, semicolons, colons, dashes). This is the quickest way to gain points.</li>
        <li><strong class="text-slate-900 font-bold">Sentence Structure:</strong> Learn to identify independent vs. dependent clauses instantly.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 3-5: Rhetoric & Craft</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Function Questions:</strong> Practice identifying the purpose of a sentence (e.g., "illustrate a claim").</li>
        <li><strong class="text-slate-900 font-bold">Vocabulary:</strong> Focus on "Words in Context". Don't memorize definitions; analyze surrounding clues.</li>
      </ul>
    </div>
    <div>
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Weeks 6-8: Logical Reasoning</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Inference Tasks:</strong> Practice "Command of Evidence" questions. Always find the strict proof in the text.</li>
        <li><strong class="text-slate-900 font-bold">Pacing Strategy:</strong> Practice skipping difficult "Literature" passages and doing "Grammar" questions first.</li>
      </ul>
    </div>
  `,
  'Speed & Strategy': `
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 1: Elimination & Triage</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">POE (Process of Elimination):</strong> Never look for the right answer first. Eliminate 2 obviously wrong answers immediately.</li>
        <li><strong class="text-slate-900 font-bold">Skipping Drill:</strong> Practice identifying "Time Sink" questions and skipping them within 10 seconds.</li>
      </ul>
    </div>
    <div class="mb-6">
      <h4 class="font-bold text-indigo-700 mb-3 text-lg">Phase 2: Shortcut Mastery</h4>
      <ul class="list-disc pl-5 space-y-2 text-gray-600 text-sm">
        <li><strong class="text-slate-900 font-bold">Desmos Only:</strong> Solve entire math sections using ONLY the graphing calculator to build speed.</li>
        <li><strong class="text-slate-900 font-bold">Answer Choices First:</strong> For reading, read the answers before the passage to know what to look for.</li>
      </ul>
    </div>
  `
};

export async function POST(request: NextRequest) {
  try {
    const { weeks, focus } = await request.json();

    if (!weeks || !focus) {
      return NextResponse.json(
        { error: 'Missing required fields: weeks and focus' },
        { status: 400 }
      );
    }

    // In production, you would use Google GenAI here:
    // const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    // const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    // const prompt = `Generate a ${weeks}-week SAT study plan focused on ${focus}...`;
    // const result = await model.generateContent(prompt);
    // const html = result.response.text();

    // For now, return mock plan
    const html = MOCK_PLANS[focus] || MOCK_PLANS['Balanced Approach'];

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ html, focus, weeks });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate study plan' },
      { status: 500 }
    );
  }
}

