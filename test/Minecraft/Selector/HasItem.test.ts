import { expect } from 'chai'
import { Minecraft } from '../../../src/main'
import { SelectorItemAttribute } from '../../../src/Minecraft/Selector/ItemAttribute'


describe("HasItem", ()=>{
    it("empty parse1", ()=>{
        const selectortext = "@a[hasitem={}]"
        const selector = Minecraft.Selector.Selector.parse(selectortext)
        
        expect(selector.attributes.length).to.equal(1)

        const attr = selector.attributes[0]
        expect(attr.name).to.equal("hasitem")

        if (!(attr instanceof SelectorItemAttribute)) expect.fail('expected SelectorItemAttribute');

        expect(attr.values.length).to.equal(0)
    })
})