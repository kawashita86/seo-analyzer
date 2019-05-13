import linksWithKeywordsCount from "../../src/researches/linksWithKeywordsCount";
import Paper from "yoastseo/src/values/Paper";
import Factory from "../testHelpers/factory";

describe("Matching keyphrase in subheadings", () => {
  it("Link without keywords", () => {
    const paper = new Paper(
      "<h2>Start of post</h2><p><a href='link.php'>link</a>First alinea, not much text for some reason.</p>" +
      "<h2>Delve deeper!</h2><p><a href='link.php'>link</a>More text here.</p>" +
      "<h4>Even more?<a href='link.php'>link</a></h4><p>Yes, even more.</p>",
      {
        keyword: "key"
      },
    );
    const researcher = Factory.buildMockResearcher({
      keyphraseForms: [["key"]],
      synonymsForms: [],
    });
    const result = linksWithKeywordsCount(paper, researcher);

    // Would be 3 if the h4 was counted too.
    expect(result).toBe(0);
  });

  it("Link with 1 keyword", () => {
    const paper = new Paper(
      "<p>First alinea, not much text for some reason.</p>" +
      "<p>More text here.<a href='key.php'>key</a></p>" +
      "<p>Yes, even more.</p>",
      {
        keyword: "key"
      },
    );
    const researcher = Factory.buildMockResearcher({
      keyphraseForms: [["key"]],
      synonymsForms: [],
    });
    const result = linksWithKeywordsCount(paper, researcher);

    // Would be 3 if the h4 was counted too.
    expect(result).toBe(1);
  });
});