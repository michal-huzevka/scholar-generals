import MoveUnitHandler from 'js/core/stepHandlers/MoveUnitHandler';
import EndTurnHandler from 'js/core/stepHandlers/EndTurnHandler';

class StepMaster {
    constructor() {
        this.handlers = [
            new MoveUnitHandler(),
            new EndTurnHandler()
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