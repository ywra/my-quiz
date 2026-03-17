import { questions, checkAnswer, calculateScore, parseInput } from "./quiz";

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
    const input = prompt("답을 입력하세요 (1-4):");
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
