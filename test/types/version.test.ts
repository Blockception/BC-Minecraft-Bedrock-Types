import { expect } from 'chai';
import { Version } from '../../src/types';

describe("Version", () => {
  it("parse", () => {
    const v = Version.parse("1.10");

    expect(v.major).to.equal(1);
    expect(v.minor).to.equal(10);
    expect(v.patch).to.equal(0);

    const v2 = Version.parse("1.16.220");

    expect(v2.major).to.equal(1);
    expect(v2.minor).to.equal(16);
    expect(v2.patch).to.equal(220);
  });

  it("from Array", () => {
    const v = Version.fromArray([1, 16, 220]);

    expect(v.major).to.equal(1);
    expect(v.minor).to.equal(16);
    expect(v.patch).to.equal(220);

    const vv = Version.fromArray([1, 16]);

    expect(vv.major).to.equal(1);
    expect(vv.minor).to.equal(16);
    expect(vv.patch).to.equal(0);
  })

  it("compare", () => {
    expect(Version.compare("1.10.0", "1.17.0")).to.equal(-1);
    expect(Version.compare("1.16.220", "1.10.0")).to.equal(1);
    expect(Version.compare([1, 10, 220], "1.10.0")).to.equal(1);

    expect(Version.compare({ major: 1, minor: 10, patch: 0 }, "1.17.0")).to.equal(-1);
    expect(Version.compare("1.16.220", { major: 1, minor: 10, patch: 0 })).to.equal(1);
    expect(Version.compare([1, 10, 220], { major: 1, minor: 10, patch: 0 })).to.equal(1);
  });
});