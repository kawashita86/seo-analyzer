import Researcher from "yoastseo/src/researcher.js";
import charCountIntText from "./researches/charCountIntText";

export const ResearcherCustom = function (paper) {
  this.researcherCustom = new Researcher(paper);
  this.researcherCustom.addResearch("charCount", charCountIntText);
  return this.researcherCustom;
};