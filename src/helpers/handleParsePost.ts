export const handleParsePost = (rawPost: string) => {
  let modPost = rawPost.split('\n');

  const getAllIndexes = (str: string, char: string) => {
    const indexes = [];
    let index = str.indexOf(char);

    while (index !== -1) {
      indexes.push(index);
      index = str.indexOf(char, index + 1);
    }

    return indexes;
  };

  const fitClosingTag = (line: string, sym: string, tag: string) => {
    for (;;) {
      let allIndexes = getAllIndexes(line, sym);
      const i = 0;
      if (
        allIndexes.length &&
        line.slice(0, 2) !== sym &&
        line.charAt(allIndexes[i] - 1) !== ' '
      ) {
        line =
          line.slice(0, allIndexes[i]) + tag + line.slice(allIndexes[i] + 2);
      } else if (allIndexes.length && line.slice(0, 2) === sym) {
        line =
          line.slice(0, allIndexes[i]) +
          tag.replace('/', '') +
          line.slice(allIndexes[i] + 2);
      }
      if (!allIndexes.length) break;
    }

    return line;
  };

  // *This fits in anchor tags
  const fitLinkTag = (line: string) => {
    for (;;) {
      let allStartIndexes = getAllIndexes(line, '[');
      const checkForLinks = getAllIndexes(line, '](').length;

      if (!checkForLinks) break;

      let closeTagIndex = 0;
      let linkStartIndex = 0;
      let linkEndIndex = 0;

      for (let i = allStartIndexes[0]; i < line.length; i++) {
        // *This loop checks for the end index, where the closing anchor tag will be appended
        // *The loops breaks if a ] is encountered without a follow (. This is to prevent bugs should the user makes use of [...]
        if (line[i] === ']') {
          if (line[i + 1] === '(') {
            closeTagIndex = i;
            linkStartIndex = i + 2;
            break;
          } else {
            allStartIndexes = allStartIndexes.splice(allStartIndexes[0], 1);

            if (allStartIndexes.length) continue;
            else break;
          }
        }
      }

      if (linkStartIndex > 0) {
        for (let i = linkStartIndex; i < line.length; i++) {
          if (line[i] === ')') {
            linkEndIndex = i;
            break;
          }
        }
      }

      if (linkStartIndex > 0 && closeTagIndex > 0 && linkEndIndex > 0) {
        let url = line.slice(linkStartIndex, linkEndIndex);
        url = url.toLowerCase().includes('https://') ? url : `https://${url}`;

        line =
          line.slice(0, allStartIndexes[0]) +
          `<a href="${url}" target="_blank">` +
          line.slice(allStartIndexes[0] + 1, closeTagIndex) +
          '</a>' +
          line.slice(linkEndIndex + 1);
      }
    }

    return line;
  };

  modPost = modPost.map((mP) => {
    if (mP.includes('##') && !mP.includes('###'))
      return `<h2>${mP.slice(2)}</h2>`;
    else if (mP.includes('###')) return `<h3>${mP.slice(3)}</h3>`;
    else if (mP.includes('![') && mP.charAt(mP.length - 1) === ')') {
      const altText = mP.slice(2, mP.indexOf(']'));
      const url = mP.slice(mP.indexOf('(') + 1, mP.indexOf(')'));
      return `<div class='img_wrapper'><img alt="${altText}" src='${url}' /></div>`;
    }
    mP = mP.replaceAll(' **', ' <strong>');
    mP = mP.replaceAll(' ~~', ' <s>');
    mP = mP.replaceAll(' --', ' <u>');
    mP = mP.replaceAll(' __', ' <em>');
    mP = fitClosingTag(mP, '**', '</strong>');
    mP = fitClosingTag(mP, '~~', '</s>');
    mP = fitClosingTag(mP, '--', '</u>');
    mP = fitClosingTag(mP, '__', '</em>');
    mP = fitLinkTag(mP);
    return `<p>${mP}</p>`;
  });

  return modPost.join('\n');
};
