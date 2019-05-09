
/**
 * Calculates the characters of a certain text.
 *
 * @param {string} text The text to be counted.
 * @returns {int} The characters count of the given text.
 */
export default function( text ) {
    return (text .match(/o/g)||[]).length;
}