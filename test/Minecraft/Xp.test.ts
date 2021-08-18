import { expect } from "chai";
import { XP } from "../../src/Minecraft/Xp";

describe("XP", () => {
  it("is", () => {
    expect(XP.is("13")).to.be.true;
    expect(XP.is("1000")).to.be.true;
    expect(XP.is("-1000")).to.be.true;

    expect(XP.is("13L")).to.be.true;
    expect(XP.is("1000L")).to.be.true;
    expect(XP.is("-1000L")).to.be.true;

    expect(XP.is("13.64")).to.be.false;
    expect(XP.is("1000.74")).to.be.false;
    expect(XP.is("-1000.26")).to.be.false;

    expect(XP.is("13.15376L")).to.be.false;
    expect(XP.is("1000.546L")).to.be.false;
    expect(XP.is("-1000.123L")).to.be.false;

    expect(XP.is("asdb")).to.be.false;
    expect(XP.is("xpL")).to.be.false;
    expect(XP.is("-aL")).to.be.false;
  });

  it("isLevel", () => {
    expect(XP.isLevel("13")).to.be.false;
    expect(XP.isLevel("1000")).to.be.false;
    expect(XP.isLevel("-1000")).to.be.false;

    expect(XP.isLevel("13L")).to.be.true;
    expect(XP.isLevel("1000L")).to.be.true;
    expect(XP.isLevel("-1000L")).to.be.true;

    expect(XP.isLevel("13l")).to.be.true;
    expect(XP.isLevel("1000l")).to.be.true;
    expect(XP.isLevel("-1000l")).to.be.true;
  });

  it("parse", () => {
    expect(XP.parse("13")).to.equal(13);
    expect(XP.parse("1000")).to.equal(1000);
    expect(XP.parse("-1000")).to.equal(-1000);

    expect(XP.parse("13L")).to.equal(13);
    expect(XP.parse("1000L")).to.equal(1000);
    expect(XP.parse("-1000L")).to.equal(-1000);
  });
});
