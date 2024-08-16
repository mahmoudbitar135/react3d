import { COMPLETE_ROTATION, NO_CHANGE } from "../components/constants/constants";

export const apply_new_rotation = (new_rotation, current_rotation) => {
    const newXRotation = new_rotation[0];
    const newYRotation = new_rotation[1];
    const newZRotation = new_rotation[2];

    const xRotation = (newXRotation === NO_CHANGE ? 0 : (newXRotation - (current_rotation[0] % COMPLETE_ROTATION))) + current_rotation[0];
    const yRotation = (newYRotation === NO_CHANGE ? 0 : (newYRotation - (current_rotation[1] % COMPLETE_ROTATION))) + current_rotation[1];
    const zRotation = (newZRotation === NO_CHANGE ? 0 : (newZRotation - (current_rotation[2] % COMPLETE_ROTATION))) + current_rotation[2];

    return [xRotation, yRotation, zRotation];
}

export const apply_new_position = (new_position, current_position) => {
    const newXPosition = new_position[0];
    const newYPosition = new_position[1];
    const newZPosition = new_position[2];

    const xPosition = (newXPosition === NO_CHANGE ? 0 : (newXPosition - current_position[0])) + current_position[0];
    const yPosition = (newYPosition === NO_CHANGE ? 0 : (newYPosition - current_position[1])) + current_position[1];
    const zPosition = (newZPosition === NO_CHANGE ? 0 : (newZPosition - current_position[2])) + current_position[2];

    return [xPosition, yPosition, zPosition];
}

export const getScoreTitle = (score) => {
    switch (score) {
        case 15:
            return `Unstoppable!`;
        case 14:
        case 13:
            return `Outstanding!`;
        case 12:
        case 11:
        case 10:
            return `Well done!`;
        case 9:
        case 8:
        case 7:
            return `Nice work!`;
        default:
            return `Good effort!`;
    }
}


export const isMobile = () => {
    return window.innerWidth <= 767;
}
