import { expect } from "chai";
import { SelectorScoreAttribute } from '../../src/Minecraft/Selector/ScoreAttribute';
import { Selector } from "../../src/Minecraft/Selector/Selector";

describe("Selector", () => {
  it("parse1", () => {
    const offset = 0;
    const text = "@a[tag=Sometag,scores={foo=1..}]";

    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);

    expect(sel.type).to.equal("@a");
    expect(sel.contains("tag")).to.be.true;
    expect(sel.contains("scores")).to.be.true;
  });

  it("parse2", () => {
    const offset = 5;
    const text = "@a[x=~0.5,y=50,z=~50,r=50,rm=3,tag=something,tag=!foo]";

    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);

    expect(sel.type).to.equal("@a");
    expect(sel.contains("x")).to.be.true;
    expect(sel.contains("y")).to.be.true;
    expect(sel.contains("z")).to.be.true;
    expect(sel.contains("r")).to.be.true;
    expect(sel.contains("rm")).to.be.true;
    expect(sel.contains("tag")).to.be.true;
  });

  it("is valid type", () => {
    expect(Selector.isValidType("@a")).to.be.true;
    expect(Selector.isValidType("@s")).to.be.true;
    expect(Selector.isValidType("@c")).to.be.true;
    expect(Selector.isValidType("@v")).to.be.true;
    expect(Selector.isValidType("@e")).to.be.true;
    expect(Selector.isValidType("@p")).to.be.true;
    expect(Selector.isValidType("@r")).to.be.true;
    expect(Selector.isValidType("@initiator")).to.be.true;

    expect(Selector.isValidType("@x")).to.be.false;
  });

  it("parse3", ()=>{
    const offset = 5;
    const text = "@e[family=]";
    
    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);
  })

  it("parse spaces test", () => {
    const offset = 5;
    const text = "@a[x =~0.5, y=50, z =~50,r =50, rm =3,tag =something,tag =!foo]";

    const sel = Selector.parse(text, offset);

    expect(sel.type).to.equal("@a");
    expect(sel.contains("x")).to.be.true;
    expect(sel.contains("y")).to.be.true;
    expect(sel.contains("z")).to.be.true;
    expect(sel.contains("r")).to.be.true;
    expect(sel.contains("rm")).to.be.true;
    expect(sel.contains("tag")).to.be.true;
  });
});

function testBaseParse(text: string, offset: number, selector: Selector) {
  for (let I = 0; I < selector.attributes.length; I++) {
    const attr = selector.attributes[I];
    const found_offset = offset + text.indexOf(attr.name)
    
    expect(attr.offset).to.equal(found_offset,`offset is not correct: '${text}' offset: '${offset}' found it at: '${attr.offset}' of ${attr.toString()}`);
  }

  const required = text.indexOf("scores={");

  if (required >= 0) {
    const scores = selector.get("scores")[0];

    if (SelectorScoreAttribute.is(scores)) {
      for (let I = 0; I < scores.values.length; I++) {
        const attr = scores.values[I];
        const found_offset = offset + text.indexOf(attr.name)

        expect(attr.offset).to.equal(found_offset, `offset is not correct: '${text}' offset: '${offset}' found it at: '${attr.offset}' of ${attr.toString()}`);
      }
    }
  }
}
