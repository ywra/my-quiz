import { describe, test, expect } from "bun:test";
import { questions, checkAnswer, calculateScore, parseInput } from "./quiz";

describe("Bug 1: 타입 에러 - answer가 number여야 함", () => {
  test("questions.json의 answer는 모두 number 타입이어야 한다", () => {
    for (const q of questions) {
      // 버그: answer가 string이면 typeof === "string"이 되어 실패
      expect(typeof q.answer).toBe("number");
    }
  });

  test("checkAnswer에서 number 비교가 정상 동작해야 한다", () => {
    // 버그: answer가 string "2"이면 2 === "2"는 false
    expect(checkAnswer(2, 2)).toBe(true);
    expect(checkAnswer(1, 2)).toBe(false);
  });
});

describe("Bug 2: 로직 에러 - 정답일 때 score가 증가해야 함", () => {
  test("5문제 중 3문제 정답이면 score는 3이어야 한다", () => {
    const answers = [true, false, true, true, false];
    let score = 0;

    for (const isCorrect of answers) {
      // 버그: 오답일 때 score++하면 score가 2가 됨
      if (isCorrect) score++;
    }

    expect(score).toBe(3);
  });

  test("전부 정답이면 score === total이어야 한다", () => {
    let score = 0;
    const total = 5;

    for (let i = 0; i < total; i++) {
      const isCorrect = checkAnswer(2, 2); // 항상 정답
      if (isCorrect) score++;
    }

    const result = calculateScore(score, total);
    expect(result.score).toBe(5);
    expect(result.percent).toBe(100);
  });

  test("전부 오답이면 score === 0이어야 한다", () => {
    let score = 0;
    const total = 5;

    for (let i = 0; i < total; i++) {
      const isCorrect = checkAnswer(1, 2); // 항상 오답
      if (isCorrect) score++;
    }

    const result = calculateScore(score, total);
    expect(result.score).toBe(0);
    expect(result.percent).toBe(0);
  });
});

describe("Bug 3: 엣지 케이스 - 잘못된 입력 처리", () => {
  test("null 입력 시 null을 반환해야 한다", () => {
    // 버그: parseInt(null)은 NaN → 비교 실패 + undefined 출력
    expect(parseInput(null)).toBeNull();
  });

  test("빈 문자열 입력 시 null을 반환해야 한다", () => {
    expect(parseInput("")).toBeNull();
    expect(parseInput("  ")).toBeNull();
  });

  test("범위 밖 숫자 입력 시 null을 반환해야 한다", () => {
    expect(parseInput("0")).toBeNull();
    expect(parseInput("5")).toBeNull();
    expect(parseInput("-1")).toBeNull();
  });

  test("문자 입력 시 null을 반환해야 한다", () => {
    expect(parseInput("abc")).toBeNull();
  });

  test("유효한 입력(1-4)은 숫자를 반환해야 한다", () => {
    expect(parseInput("1")).toBe(1);
    expect(parseInput("2")).toBe(2);
    expect(parseInput("3")).toBe(3);
    expect(parseInput("4")).toBe(4);
  });
});
