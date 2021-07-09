import { expect } from 'chai';
import { Selector } from './Selector';

describe("Selector", () => {
  it("parse1", () => {
    const offset = 0
    const text = "@a[tag=Sometag,scores={foo=1..}]";

    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);

    expect(sel.contains("tag")).to.be.true;
    expect(sel.contains("scores")).to.be.true;
  })

  it("parse2", () => {
    const offset = 5
    const text = "@a[x=~0.5,y=50,z=~50,r=50,rm=3,tag=something,tag=!foo]";

    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);

    expect(sel.contains("x")).to.be.true;
    expect(sel.contains("y")).to.be.true;
    expect(sel.contains("z")).to.be.true;
    expect(sel.contains("r")).to.be.true;
    expect(sel.contains("rm")).to.be.true;
    expect(sel.contains("tag")).to.be.true;
  })
})

function testBaseParse(text: string, offset: number, selector: Selector) {
  for (let I = 0; I < selector.attributes.length; I++) {
    const attr = selector.attributes[I];

    expect(attr.offset).to.equal(offset + text.indexOf(attr.toString()), `offset is not correct: '${text}' offset: '${offset}' found it at: '${attr.offset}' of ${attr.toString()}`)
  }

  const required = text.indexOf('scores={');

  if (required >= 0) {
    for (let I = 0; I < selector.scores.length; I++) {
      const attr = selector.scores[I];

      expect(attr.offset).to.equal(offset + text.indexOf(attr.toString()), `offset is not correct: '${text}' offset: '${offset}' found it at: '${attr.offset}' of ${attr.toString()}`)
    }
  }
}