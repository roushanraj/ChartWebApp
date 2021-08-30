import { addition } from "./sample";

describe('Test Addition',()=>{
    it('Testing addition function',()=>{
        expect(addition(10,20)).toBe(30);
    });

});
