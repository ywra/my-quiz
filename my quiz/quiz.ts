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
