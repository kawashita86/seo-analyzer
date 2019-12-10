export default (paper) => {
    const text = paper.getText();
    const keyword = paper.getKeyword();

    return text.substr(0, 300).includes(keyword);
}