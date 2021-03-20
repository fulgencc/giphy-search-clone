/**
 * Function that maps an array of gifs to rows of 4.
 * @param {object} gifs An array of gifs.
 * @returns an array of arrays with four gifs in each subarray.
 */
export const mapGifsToRows = (gifs) => {
  let div = 4;
  let gifRows = [];
  let row = [];
  gifs.forEach((gif, index) => {
    if ((index + 1) % div === 0 || index === gifs.length - 1) {
      row.push(gif);
      gifRows.push(row);
      row = []
    }
    else {
      row.push(gif);
    }
  })

  return gifRows;
}