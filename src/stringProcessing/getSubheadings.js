export function getSubheadingsH2(text) {
  const regex = /<h2.*?>(.*?)<\/h2>/ig;

  return (text.match(regex) || []);
}
