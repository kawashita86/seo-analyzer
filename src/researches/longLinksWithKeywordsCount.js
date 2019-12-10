import getAnchors from "yoastseo/src/stringProcessing/getAnchorsFromText.js";

export default (paper) => {
  const text = paper.getText();
  const keyword = paper.getKeyword();

  const links = getAnchors(text);
  return links.reduce((acc, link) => {
    if (link.includes(keyword) && link.length >= 4) {
      return acc + 1
    }
    return acc
  }, 0);
}