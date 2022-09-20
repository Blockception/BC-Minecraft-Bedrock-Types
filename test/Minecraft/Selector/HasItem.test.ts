import { expect } from "chai";
import { Selector } from "../../../src/Minecraft/Selector";
import { Attribute } from "../../../src/Minecraft/Selector/Attributes/Attribute";
import { HasItemAttribute, HasItemData, HasItemSet } from "../../../src/Minecraft/Selector/Attributes/HasItem";

interface TestData {
  selector: string;
  expectedHasItem: HasItemSet<string>[];
}

describe("Checking HasItem processing", () => {
  const testData: TestData[] = [
    {
      selector: "@a[hasitem={item=minecraft:stone}]",
      expectedHasItem: [
        {
          item: "minecraft:stone",
        },
      ],
    },
    {
      selector: "@a[hasitem=[{item=minecraft:stone}]]",
      expectedHasItem: [
        {
          item: "minecraft:stone",
        },
      ],
    },
    {
      selector: "@a[hasitem=[{item=minecraft:stone},{quantity=1}]]",
      expectedHasItem: [
        {
          item: "minecraft:stone",
        },
        {
          quantity: "1",
        },
      ],
    },
  ];

  testData.forEach((data) => {
    describe(`Selector: ${data.selector}`, () => {
      const selector = Selector.parse(data.selector);

      it("Parsed properly", () => {
        expect(selector).to.not.be.undefined;
      });

      if (selector === undefined) return;
      const hasItems = selector.get("hasitem");

      it("Correct amount of hasItem entries", () => {
        expect(hasItems.length).to.equal(data.expectedHasItem.length);
      });

      it("Matches expected data", () => {
        if (hasItems.length !== data.expectedHasItem.length) expect.fail("HasItem length mismatch");

        for (let i = 0; i < hasItems.length; i++) {
          const item = hasItems[i];
          const expected = data.expectedHasItem[i];

          EqualProperty("data", item, expected);
          EqualProperty("item", item, expected);
          EqualProperty("location", item, expected);
          EqualProperty("quantity", item, expected);
          EqualProperty("slot", item, expected);
        }
      });
    });
  });
});

function EqualProperty<T extends HasItemAttribute>(field: T, attr: Attribute<HasItemData>, expected: HasItemSet<string>) {
  const values = (attr.value[field] || []) as Array<Attribute<HasItemData>>;
  const casted = values.map((v) => v.value);
  const find = expected[field];

  expect(casted, field).to.include(find);
}
