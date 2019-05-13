import LinkWithKeywordAssessment from "../../src/assessments/seo/LinkWithKeywordAssessment";
import Paper from "yoastseo/src/values/Paper";
import Factory from "../testHelpers/factory";

const i18n = Factory.buildJed();
const linkWithKeywordAssessment = new LinkWithKeywordAssessment();

describe("An assessment for matching keywords in subheadings", () => {
  it("returns a bad score and appropriate feedback when none of the links contain the keyphrase: no matches.", function () {
    const mockPaper = new Paper();
    const assessment = linkWithKeywordAssessment.getResult(
      mockPaper,
      Factory.buildMockResearcher(0),
      i18n
    );

    expect(assessment.getScore()).toEqual(0);
    expect(assessment.getText()).toEqual(
      "Not enough links with keywords"
    );
  });

  it("returns a good score and appropriate feedback when 7 links contain the keyphrase.", function () {
    const mockPaper = new Paper();
    const assessment = linkWithKeywordAssessment.getResult(
      mockPaper,
      Factory.buildMockResearcher(7),
      i18n
    );

    expect(assessment.getScore()).toEqual(5);
    expect(assessment.getText()).toEqual(
      "Right number of links with keywords"
    );
  });

  it("checks isApplicable for a paper without text", function () {
    const isApplicableResult = new LinkWithKeywordAssessment().isApplicable(new Paper("", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(false);
  });

  it("checks isApplicable for a paper without keyword", function () {
    const isApplicableResult = new LinkWithKeywordAssessment().isApplicable(new Paper("<p><a href='link.php'>link</a>some text</p><h2>heading</h2><p>some more text</p>", {keyword: ""}));
    expect(isApplicableResult).toBe(false);
  });

  it("checks isApplicable for a paper without links", function () {
    const isApplicableResult = new LinkWithKeywordAssessment().isApplicable(new Paper("<p>some text</p><p>some more text</p>", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(true);
  });

  it("checks isApplicable for a paper with links and keywords", function () {
    const isApplicableResult = new LinkWithKeywordAssessment().isApplicable(new Paper("<p>some text<a>some keyword</a></p><h2>heading</h2><p>some more text</p>", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(true);
  });
});