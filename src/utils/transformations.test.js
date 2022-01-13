import { makeRandomString, swapCase, shuffle } from "./transformations";

describe("transformations", () => {
  describe("makeRandomString", () => {
    it("generates a random string of the correct length", () => {
      expect(makeRandomString(5)).toHaveLength(5);
      expect(makeRandomString(17)).toHaveLength(17);
      expect(makeRandomString(28)).toHaveLength(28);
    });
  });

  describe("swapCase", () => {
    it("handles letters correctly", () => {
      expect(swapCase("TeStInG")).toEqual("tEsTiNg");
      expect(swapCase("ALLCAPS")).toEqual("allcaps");
    });

    it("handles numbers correctly", () => {
      expect(swapCase("TeS78tInG")).toEqual("tEs78TiNg");
      expect(swapCase("ALL213CAPS")).toEqual("all213caps");
    });
  });

  describe("shuffle", () => {
    it("maintains correct size", () => {
      expect(shuffle("TeStInG")).toHaveLength("TeStInG".length);
    });

    it("maintains correct elements", () => {
      expect(shuffle("TeSt")).toContain("T");
      expect(shuffle("TeSt")).toContain("e");
      expect(shuffle("TeSt")).toContain("S");
      expect(shuffle("TeSt")).toContain("t");
    });
  });
})