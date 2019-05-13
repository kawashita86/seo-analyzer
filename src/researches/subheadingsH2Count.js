import {getSubheadingsH2} from "../stringProcessing/getSubheadings";

export default (paper) => {
  return getSubheadingsH2(paper.getText()).length;
}