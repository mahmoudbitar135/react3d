import { QUESTIONS_BANK } from "./components/constants/content";

export const getRandomQuestions = (count) => {
    // Shuffle the questions.
    const shuffled = [...QUESTIONS_BANK].sort(() => 0.5 - Math.random());

    return shuffled.slice(0, count);
}
