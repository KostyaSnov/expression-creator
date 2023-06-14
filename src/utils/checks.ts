const isDigit = (char: string): boolean => /^\p{N}$/u.test(char);


const isLetter = (char: string): boolean => /^\p{L}$/u.test(char);


const isSpace = (string: string): boolean => /^\s$/.test(string);


export { isDigit, isLetter, isSpace };

