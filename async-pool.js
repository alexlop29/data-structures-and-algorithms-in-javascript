class AsyncPool {

    constructor(){
        this.limit = 10;
        this.queue = [];
        this.activeCount = 0;
    }

    add(task){
        return new Promise((resolve, reject) => {
            this.queue.push(() => task().then(resolve).catch(reject));
            this.runNext();
        })
    };

    runNext(){
        if (this.activeCount >= this.limit || this.queue.length == 0) return;
        
        this.activeCount++;
        const task = this.queue.shift();

        task().finally(() => {
            this.activeCount--;
            this.runNext();
        });
    };
};

let pool = new AsyncPool();

async function task(){
    console.log('start task');
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('end task');
            resolve();
        }, 1000);
    });
}

for (let i = 0; i < 100; i++){
    pool.add(task);
}
