import questionsData from "./questions.json";

export interface Question {
  question: string;
  choices: string[];
  answer: number;
}

export const questions: Question[] = questionsData;

export function checkAnswer(userAnswer: number, correctAnswer: number): boolean {
  return userAnswer === correctAnswer;
}

export function calculateScore(correct: number, total: number): { score: number; percent: number } {
  const percent = Math.round((correct / total) * 100);
  return { score: correct, percent };
}

export function parseInput(input: string | null): number | null {
  if (input === null || input.trim() === "") return null;
  const num = parseInt(input);
  if (isNaN(num) || num < 1 || num > 4) return null;
  return num;
}

export function runQuiz(promptFn: (message: string) => string | null = prompt): number {
  let score = 0;

  console.log("=== 퀴즈를 시작합니다! ===\n");

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    console.log(`Q${i + 1}. ${q.question}`);
    q.choices.forEach((choice, idx) => {
      console.log(`  ${idx + 1}) ${choice}`);
    });

    let userAnswer: number | null = null;
    while (userAnswer === null) {
      const input = promptFn("답을 입력하세요 (1-4):");
      userAnswer = parseInput(input);
      if (userAnswer === null) {
        console.log("⚠️ 1~4 사이의 숫자를 입력해주세요.");
      }
    }

    if (checkAnswer(userAnswer, q.answer)) {
      console.log("✅ 정답!\n");
      score++;
    } else {
      console.log(`❌ 오답! 정답은 ${q.answer}) ${q.choices[q.answer - 1]}\n`);
    }
  }

  const result = calculateScore(score, questions.length);
  console.log("=== 결과 ===");
  console.log(`${questions.length}문제 중 ${result.score}문제 정답 (${result.percent}%)`);

  return score;
}
