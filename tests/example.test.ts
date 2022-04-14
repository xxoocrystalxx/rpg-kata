import { add, Character, Melee, Ranged, Things } from '../src/example'

describe('Example Test:', () => {
    test('should add two numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
})

describe('iteration one test:', () => {

    const char1 = new Character(100);
    const char2 = new Character(100);
    const char3 = new Character(100);

    test('create character test', () => {
        expect(char1.getHealth()).toBe(1000);
        expect(char1.getLevel()).toBe(1);
        expect(char1.getAlive()).toBe(true)
    })

    test('damage ', () => {
        char2.damage(char1,500);
        expect(char1.getHealth()).toBe(500);
        char2.damage(char1,500);
        expect(char1.getHealth()).toBe(0);
        expect(char1.getAlive()).toBe(false);
        //char1 is dead
    })

    test('heal', () => {
        char2.damage(char3,500);
        char3.heal(char3,200);
        expect(char3.getHealth()).toBe(700)
        char3.heal(char3,500);
        expect(char3.getHealth()).toBe(1000)
        char1.heal(char1,500);
        expect(char1.getHealth()).toBe(0)
    })

})

describe ('iteration two test: ', () => {
    const char1 = new Character(100)
    const char2 = new Character(100)

    test('A Character cannot Deal Damage to itself', () => {
        char1.damage(char1,400)
        expect(char1.getHealth()).toBe(1000)
    })

    test('A Character can only Heal itself', () => {
        char1.damage(char2,400)
        char1.heal(char2,200)
        expect(char2.getHealth()).toBe(600)
        char2.heal(char2,200)
        expect(char2.getHealth()).toBe(800)
    })

    test('If the target is 5 o more', () => {
        char1.setLevel(6)
        char2.damage(char1,200)
        expect(char1.getHealth()).toBe(900)
        char1.damage(char2,200)
        expect(char2.getHealth()).toBe(500)
    })

})

describe ('iteration three', () => {
    test('Ranged attack', () => {
       const melee = new Melee()
       const ranged = new Ranged()
       melee.damage(ranged, 100)
       if(melee.getDistance(ranged) < melee.getRange()) {
            expect(ranged.getHealth()).toBe(900)
       } else{
           expect(ranged.getHealth()).toBe(1000)
       }
    })
})

describe ('iteration four: factions test', () => {
        const char1 = new Ranged()
        const char2 = new Ranged()
        const char3 = new Ranged()
    test('Characters may belong to one or more Factions', () => {
        expect(char1.getFaction()).toBe("")
        char1.joinFaction("Hello")
        expect(char1.getFaction()).toBe("Hello")
        char1.leaveFaction()
        expect(char1.getFaction()).toBe("")
    })

    test('Allies cannot Deal Damage to one another', () => {
        char1.joinFaction("Hello")
        char2.joinFaction("Hello")
        char1.damage(char2, 200)
        expect(char2.getHealth()).toBe(1000)
    })

    test('Allies can Heal one another', () => {
        char3.damage(char1, 500)
        char2.heal(char1,200)
        expect(char1.getHealth()).toBe(700)
    })
})

describe('Iteration Five ', () => {
    const char1 = new Ranged()
    const tree = new Things("Tree",2000)

    test('thigs test', () => {
        char1.damage(tree, 2000)
        expect(tree.getHealth()).toBe(0)
        expect(tree.isAlive()).toBe("Destroyed")
    })
})