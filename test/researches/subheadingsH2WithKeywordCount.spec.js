import subheadingsH2WithKeywordCount from "../../src/researches/subheadingsH2WithKeywordCount";
import Paper from "yoastseo/src/values/Paper";
import Factory from "../testHelpers/factory";

describe("Matching keyphrase in subheadings", () => {
  it("h2 subheadings without keywords", () => {
    const paper = new Paper(
      "<h2>Start of post</h2><p>First alinea, not much text for some reason.</p>" +
      "<h2>Delve deeper!</h2><p>More text here.</p>" +
      "<h4>Even more?</h4><p>Yes, even more.</p>",
      {},
    );
    const researcher = Factory.buildMockResearcher({
      keyphraseForms: [],
      synonymsForms: [],
    });
    const result = subheadingsH2WithKeywordCount(paper, researcher);

    // Would be 3 if the h4 was counted too.
    expect(result).toBe(0);
  });

  it("h2 subheadings with 1 keywords", () => {
    const paper = new Paper(
      "<h2>Start of post key</h2><p>First alinea, not much text for some reason.</p>" +
      "<h2>Delve deeper!</h2><p>More text here.</p>" +
      "<h4>Even more?</h4><p>Yes, even more.</p>",
      {},
    );
    const researcher = Factory.buildMockResearcher({
      keyphraseForms: [["key"]],
      synonymsForms: [],
    });
    const result = subheadingsH2WithKeywordCount(paper, researcher);

    // Would be 3 if the h4 was counted too.
    expect(result).toBe(1);
  });
});