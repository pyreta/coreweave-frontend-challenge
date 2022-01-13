export const makeRandomString = (length) => {
  let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  const result = [];
  for (let i = 0; i < length; i++) {
    const randomIdx = Math.floor(Math.random() * charactersLength);
    result.push(characters[randomIdx]);
  }
  return result.join('');

};

export const swapCase = (letters) => {
  let newLetters = [];
  for (let i = 0; i < letters.length; i++) {
    if (letters[i] === letters[i].toLowerCase()) {
      newLetters.push(letters[i].toUpperCase());
    } else {
      newLetters.push(letters[i].toLowerCase());
    }
  }
  return newLetters.join('');
};

export const shuffle = (string) => {
  let a = string.split(""),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
};