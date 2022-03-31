import { add } from '../src/example'

describe('Example Test:', () => {
    test('should add two numbers', () => {
        expect(add(1, 2)).toBe(3)
    })
})
