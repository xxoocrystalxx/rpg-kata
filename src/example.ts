
export const add = (a: number, b: number): number => {
    return a + b
}

const characters: Character[] = [] ;

function maps(char: Character): void {
    characters.push(char)
    if (characters.length >1) {
        for (let i = 0 ; i< characters.length;i++){
            //random distance beetween 1 and 10
            const distance: number = Math.floor(Math.random() * 10) + 1
            characters[i].setDistance(char, distance)
            char.setDistance(characters[i],distance)
        }    
    }
}

export class Things {

    private status: string;

    constructor(private name: string, private health: number){
        this.name = name;
        this.health = health
        this.status = "Alive"
    }

    public getName(): string {
        return this.name
    }
    
    public setHealth(value: number) :void {
        this.health = value;
        if(this.health <= 0){
            this.status = "Destroyed"
        }
    }

    public getHealth() : number {
        return this.health
    }

    public isAlive(): string {
        return this.status
    }

}

export class Character {

    private health: number;
    private level: number;
    private alive: boolean;
    //array di distanza di questo personaggio con gli altri personaggi creati
    private distance: Map<Character,number>;
    private faction: string;

    constructor(private range: number){
        this.health = 1000;
        this.level= 1;
        this.alive= true;
        this.range = range
        this.distance = new Map<Character,number>()
        this.faction = ""
        maps(this)
    }

    public getHealth(): number{
        return this.health
    }

    public getFaction(): string {
        return this.faction
    }

    public joinFaction(name: string): void {
        this.faction = name;
    }

    public leaveFaction(): void {
        this.faction = ""
    }

    public getDistance(char: Character): number {
        const distance = this.distance.get(char)
        if(distance == undefined){
            throw new Error ("char undefined")
        } else {
            return distance
        }
    }

    public setDistance(char: Character, metres: number): void {
        this.distance.set(char, metres)
    }

    public getLevel(): number {
        return this.level;
    }

    public getAlive(): boolean {
        return this.alive;
    }

    public getRange(): number {
        return this.range
    }

    public setLevel(value: number): void {
        this.level = value
    }

    public addHealth(value: number): void {
        if(this.alive){
            this.health += value
            if(this.health > 1000) {
                this.health = 1000
            }
        }
    }

    public decreaseHealth(value : number): void {
        this.health -= value
        if(this.health <= 0) {
            this.alive = false;
            this.health = 0;
        }
    }

    public damage(char: Character|Things, value: number): void {
        if(char!=this && (char instanceof Character)){
            if(this.getFaction() != char.getFaction() || char.getFaction()== ""){
                const levels = char.getLevel() - this.getLevel()
                if(this.getDistance(char) < this.range){
                    if(levels >= 5) {
                        char.decreaseHealth(value/2);
                    } else if (levels <= -5){
                        char.decreaseHealth(value+value*0.5);
                    } else {
                        char.decreaseHealth(value);
                    }
                }
            }
        }else if(char instanceof Things){
            char.setHealth(char.getHealth() - value)
        }   
    }

    public heal(char: Character, value: number): void {
        if(char == this || (char.getFaction() == this.getFaction() && char.getFaction() != "")) {
            char.addHealth(value)
        }
    }
}

export class Melee extends Character {
    public constructor() {
        super(2);
    }
}

export class Ranged extends Character {
    public constructor() {
        super(20);
    }
}