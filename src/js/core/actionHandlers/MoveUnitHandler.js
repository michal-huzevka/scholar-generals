class MoveUnitHandler {
    getActionType() {
        return 'MOVE_UNIT';
    }

    computeAction(action, state) {
        return [action];
    }
}

export default MoveUnitHandler;