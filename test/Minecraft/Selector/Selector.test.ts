import { expect } from "chai";
import { Selector } from "../../../src/Minecraft/Selector";
import { Attribute } from "../../../src/Minecraft/Selector/Attributes/Attribute";

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
    const text = "@a[x=~0.5,y=50,z=~50,r=50,rm=3,tag=something]";

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

  it("parse3", () => {
    const offset = 5;
    const text = "@e[family=]";

    const sel = Selector.parse(text, offset);
    testBaseParse(text, offset, sel);
  });

  it("parse spaces test", () => {
    const offset = 5;
    const text = "@a[x =~0.5, y=50, z =~50,r =50, rm =3,tag =something,tag =!foo]";

    const sel = Selector.parse(text, offset);

    expect(sel.type).to.equal("@a");
    contains(sel, "x");
    contains(sel, "y");
    contains(sel, "z");
    contains(sel, "r");
    contains(sel, "rm");
    contains(sel, "tag");
  });
});

function contains(sel: Selector, attr: string) {
  expect(sel.contains(attr), `Contains ${attr}`).to.be.true;
}

function testBaseParse(text: string, offset: number, selector: Selector) {
  selector.forEach((attr, value) => {
    expect(attr).to.be.a("string");

    switch (attr) {
      default:
        const find = `!${Attribute.toString(value)}`;
        const index = text.indexOf(find);

        expect(index).to.be.greaterThan(-1);
        expect(index).to.be.equal(offset + value.offset);

        break;
      case "scores":
      case "hasitem":
        expect(value).to.be.a("object");
        break;
    }
  });
}
