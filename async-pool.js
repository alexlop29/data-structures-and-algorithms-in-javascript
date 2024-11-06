class AsyncPool {
    constructor(){
        this.limit = 10;
        this.queue = [];
        this.inProgress = 0;
    };

    async add(task){
        this.queue.push(task);
        await this.runNext();
    };

    async runNext(){
        if (this.inProgress >= 10 || this.queue.length == 0) return;
        const task = this.queue.shift();
        this.inProgress++;
        await task();
        this.inProgress--;
        this.runNext();
    };
};

let pool = new AsyncPool();

const task = async() => {
    console.log('start task');
    await setTimeout(() => {
        console.log("end task");
    }, "1 second");
}

for (let i = 0; i < 20; i++){
    pool.add(task);
}
