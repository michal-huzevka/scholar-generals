import MoveOneSpaceHandler from 'js/game/core/stepHandlers/MoveOneSpaceHandler';
import EndTurnHandler from 'js/game/core/stepHandlers/EndTurnHandler';
import AttackUnitHandler from 'js/game/core/stepHandlers/AttackUnitHandler';
import KillUnitHandler from 'js/game/core/stepHandlers/KillUnitHandler';
import ExhaustUnitHandler from 'js/game/core/stepHandlers/ExhaustUnitHandler';

class StepMaster {
    constructor() {
        this.handlers = [
            new MoveOneSpaceHandler(),
            new EndTurnHandler(),
            new AttackUnitHandler(),
            new ExhaustUnitHandler(),
            new KillUnitHandler(),
        ];
    }

    computeStep(step, state, remainingSteps) {
        let result = null; // every step type must have a handler

        this.handlers.forEach((handler) => {
            if (handler.getStepType() === step.type) {
                result = handler.computeStep(step, state, remainingSteps);
            }
        });

        const stepCounter = result.state.get('stepCounter') + 1;

        result.state = result.state
            .set('stepCounter', stepCounter)
            .set('lastStep', step);
        return result;
    }
}

export default StepMaster;