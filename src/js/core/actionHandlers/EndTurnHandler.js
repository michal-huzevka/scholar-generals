class EndTurnHandler {
    getActionType() {
        return 'END_TURN';
    }

    computeAction(action, state) {
        return [{
            type: 'END_TURN'
        }];
    }
}

export default EndTurnHandler;