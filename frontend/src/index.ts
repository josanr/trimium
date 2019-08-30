interface Index {
    render(): string
}


class View implements Index{
    private readonly text: string;
    constructor(text: string){
        this.text = text;
    }
    render(): string {
        return this.text;
    }
}


const view = new View("Hello");

console.log(view.render());