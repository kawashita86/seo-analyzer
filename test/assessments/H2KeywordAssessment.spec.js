import H2KeywordAssessment from "../../src/assessments/seo/H2KeywordAssessment";
import Paper from "../../src/values/Paper.js";
import Factory from "../testHelpers/factory";
import Researcher from "../../src/researcher";

const i18n = Factory.buildJed();
const matchKeywordAssessment = new H2KeywordAssessment();

describe("An assessment for matching keywords in subheadings", () => {
  it("returns a bad score and appropriate feedback when none of the subheadings contain the keyphrase: no matches.", function () {
    const mockPaper = new Paper();
    const assessment = matchKeywordAssessment.getResult(
      mockPaper,
      Factory.buildMockResearcher(0),
      i18n
    );

    expect(assessment.getScore()).toEqual(0);
    expect(assessment.getText()).toEqual(
      "Not enough matches"
    );
  });

  it("returns a good score and appropriate feedback when 2 of the 8 subheadings contain the keyphrase.", function () {
    const mockPaper = new Paper();
    const assessment = matchKeywordAssessment.getResult(
      mockPaper,
      Factory.buildMockResearcher(10),
      i18n
    );

    expect(assessment.getScore()).toEqual(10);
    expect(assessment.getText()).toEqual(
      "Right number of H2 and keywords"
    );
  });

  it("returns a good score and appropriate feedback when 3 subheadings contain the keyphrase.", function () {
    const mockPaper = new Paper("<h2>keyword</h2><h2>keyword</h2><h2>keyword</h2>", {
      keyword: "keyword"
    });
    const researcher = new Researcher(mockPaper);
    const assessment = matchKeywordAssessment.getResult(
      mockPaper,
      researcher,
      i18n
    );

    expect(assessment.getScore()).toEqual(10);
    expect(assessment.getText()).toEqual(
      "Right number of H2 and keywords"
    );
  });

  it("returns a bad score and appropriate feedback when 2 subheadings contain the keyphrase.", function () {
    const mockPaper = new Paper("<h2>keyword</h2><h2>keyword</h2>", {
      keyword: "keyword"
    });
    const researcher = new Researcher(mockPaper);
    const assessment = matchKeywordAssessment.getResult(
      mockPaper,
      researcher,
      i18n
    );

    expect(assessment.getScore()).toEqual(0);
    expect(assessment.getText()).toEqual(
      "Not enough matches"
    );
  });

  it("checks isApplicable for a paper without text", function () {
    const isApplicableResult = new H2KeywordAssessment().isApplicable(new Paper("", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(false);
  });

  it("checks isApplicable for a paper without keyword", function () {
    const isApplicableResult = new H2KeywordAssessment().isApplicable(new Paper("<p>some text</p><h2>heading</h2><p>some more text</p>", {keyword: ""}));
    expect(isApplicableResult).toBe(false);
  });

  it("checks isApplicable for a paper without subheadings", function () {
    const isApplicableResult = new H2KeywordAssessment().isApplicable(new Paper("<p>some text</p><p>some more text</p>", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(true);
  });

  it("checks isApplicable for a paper without h2 subheadings", function () {
    const isApplicableResult = new H2KeywordAssessment().isApplicable(new Paper("<p>some text</p><h4>heading</h4><p>some more text</p>", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(true);
  });

  it("checks isApplicable for a paper with text and keyword", function () {
    const isApplicableResult = new H2KeywordAssessment().isApplicable(new Paper("<p>some text</p><h2>heading</h2><p>some more text</p>", {keyword: "some keyword"}));
    expect(isApplicableResult).toBe(true);
  });
});