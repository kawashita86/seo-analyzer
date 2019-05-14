import subheadingsH2Count from "../../src/researches/subheadingsH2Count";
import Paper from "../../src/values/Paper.js";
import Factory from "../testHelpers/factory";

describe("Matching keyphrase in subheadings", () => {
  it("matches only h2 subheadings", () => {
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
    const result = subheadingsH2Count(paper, researcher);

    // Would be 3 if the h4 was counted too.
    expect(result).toBe(2);
  });

/*  it("matching is stricter with languages that do not support function words", () => {
    // There is no function word support for Afrikaans.
    const paper = new Paper("<h2>So ’n groot hond</h2>", {
      keyword: "So ’n groot huis",
      locale: "af",
    });
    const researcher = Factory.buildMockResearcher({
      keyphraseForms: [["So"], ["’n"], ["groot"], ["huis"], ["hond"]],
      synonymsForms: [],
    });

    // All the words should match and since hond !== huis the expected result is 0.
    expect(subheadingsH2Count(paper, researcher).matches).toBe(0);

    // There is function word support for English.
    paper._attributes.locale = "en_US";
    // More than 50% should match. With 1 of the 4 words mismatching the expected result is 1.
    expect(subheadingsH2Count(paper, researcher).matches).toBe(1);
  });*/
});