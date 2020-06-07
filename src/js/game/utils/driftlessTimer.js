let isStopped;
let start = new Date().getTime();
let time = 0;

// LIMITATION: can only be used in one place at a time
export const startTimer = (callback, interval) => {
    isStopped = false;
    const instance = () => {
        if (isStopped) {
            return;
        }
        callback();
        time += interval;
        var diff = (new Date().getTime() - start) - time;
        
        setTimeout(instance, (interval - diff));
    };

    setTimeout(instance, interval);
};

export const stopTimer = () => isStopped = true;