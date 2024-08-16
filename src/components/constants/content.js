import { MOON_MOVES } from "../Moon";
import { EARTH_MOVES } from '../Earth';
import { ASTRONAUT_MOVES } from "../Astronaut";
import { isMobile } from "../../utils/common";

export const QUESTIONS_BANK = [
    {
        id: 1,
        question: 'The Earth is the fourth planet from the Sun?',
        options: ['True', 'False'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'The capital of Australia is Sydney?',
        options: ['True', 'False'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'The Great Wall of China is visible from space?',
        options: ['True', 'False'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'The chemical symbol for iron is Fe?',
        options: ['True', 'False'],
        answer_index: 0,
    },
    {
        id: 1,
        question: 'Shakespeare wrote "Romeo and Juliet?',
        options: ['True', 'False'],
        answer_index: 0,
    },
    {
        id: 1,
        question: 'Penguins can fly?',
        options: ['True', 'False'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'The human body has three blood groups: A, B, and O.',
        options: ['True', 'False'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'I am the largest land animal and have a trunk. Who am I?',
        options: ['Hippo', 'Elephant', 'Bear'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'Which planet is known as the Red Planet?',
        options: ['Mars', 'Jupiter', 'Venus'],
        answer_index: 0,
    },
    {
        id: 1,
        question: 'Who wrote the play "Hamlet"?',
        options: ['Charles Dickens', 'Mark Twain', 'William Shakespeare'],
        answer_index: 2,
    },
    {
        id: 1,
        question: 'How many continents are there in the world?',
        options: ['6', '7', '8'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'What is the largest ocean on Earth?',
        options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean'],
        answer_index: 2,
    },
    {
        id: 1,
        question: 'What is the chemical symbol for gold?',
        options: ['Ag', 'Au', 'Gd'],
        answer_index: 1,
    },
    {
        id: 1,
        question: 'What is the smallest country in the world?',
        options: ['Monaco', 'San Marino', 'Vatican City'],
        answer_index: 2,
    },
    {
        id: 1,
        question: 'What year did the Titanic sink?',
        options: ['1912', '1920', '1915'],
        answer_index: 0,
    },
    {
        id: 1,
        question: 'What is the longest river in the world?',
        options: ['Amazon River', 'Mississippi River', 'Nile River'],
        answer_index: 2,
    },
];

export const getContentConfig = () => {
    const alignment = isMobile() ? 'center' : undefined;

    return [
        {
            id: 0,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.INITIAL_MOVE.key,
            earth_movement: EARTH_MOVES.INITIAL_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.INITIAL_MOVE.key,
        },
        {// Question 1
            id: 1,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FIRST_MOVE.key,
            earth_movement: EARTH_MOVES.FIRST_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FIRST_MOVE.key,
        },
        {
            id: 2,
            alignment: alignment || 'left',
            moon_movement: MOON_MOVES.SECOND_MOVE.key,
            earth_movement: EARTH_MOVES.SECOND_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.SECOND_MOVE.key,
        },
        {
            id: 3,
            alignment: alignment || 'right',
            moon_movement: MOON_MOVES.THIRD_MOVE.key,
            earth_movement: EARTH_MOVES.THIRD_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.THIRD_MOVE.key,
        },
        {
            id: 4,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FORTH_MOVE.key,
            earth_movement: EARTH_MOVES.FORTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.THIRD_MOVE.key,
        },
        {
            id: 5,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FORTH_MOVE.key,
            earth_movement: EARTH_MOVES.FORTH_NEXT_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FORTH_MOVE.key,
        },
        {
            id: 6,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FIFTH_MOVE.key,
            earth_movement: EARTH_MOVES.FIFTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FORTH_MOVE.key,
        },
        {
            id: 7,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FIFTH_MOVE.key,
            earth_movement: EARTH_MOVES.FIFTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FIFTH_MOVE.key,
        },
        {
            id: 8,
            alignment: alignment || 'left',
            moon_movement: MOON_MOVES.FIFTH_MOVE.key,
            earth_movement: EARTH_MOVES.SEXTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FIFTH_MOVE.key,
        },
        {
            id: 9,
            alignment: alignment || 'left',
            moon_movement: MOON_MOVES.FIFTH_MOVE.key,
            earth_movement: EARTH_MOVES.SEVENTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FIFTH_MOVE.key,
        },
        {
            id: 10,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.FIFTH_MOVE.key,
            earth_movement: EARTH_MOVES.EIGHTH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.FIFTH_MOVE.key,
        },
        {
            id: 11,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.SEXTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.SEXTH_MOVE.key,
        },
        {
            id: 12,
            alignment: alignment || 'right',
            moon_movement: MOON_MOVES.SEXTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.SEXTH_MOVE.key,
        },
        {
            id: 13,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.SEVENTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.SEVENTH_MOVE.key,
        },
        {
            id: 14,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.SEVENTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.EIGHTH_MOVE.key,
        },
        {
            id: 15,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.SEVENTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.NINETH_MOVE.key,
        },
        {
            id: 16,
            alignment: alignment || 'center',
            moon_movement: MOON_MOVES.SEVENTH_MOVE.key,
            earth_movement: EARTH_MOVES.NINETH_MOVE.key,
            astronaut_movement: ASTRONAUT_MOVES.TENTH.key,
        },
    ];
}
