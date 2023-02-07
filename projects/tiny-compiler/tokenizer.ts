export enum TokenTypes {
  Paren,
  Name,
  Number,
}

export interface Token {
  type: TokenTypes
  value: string
}

export function tokenizer(code: string) {
  const tokens: Token[] = []
  let current = 0

  // 在指针到达末尾前一直循环
  while (current < code.length) {
    let char = code[current]

    //  忽略空格
    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    if (char === '(') {
      tokens.push({ type: TokenTypes.Paren, value: char })
      current++
      continue
    }

    if (char === ')') {
      tokens.push({ type: TokenTypes.Paren, value: char })
      current++
      continue
    }

    const LETTER = /[a-z]/i
    if (LETTER.test(char)) {
      let letter = ''
      while (LETTER.test(char) && current < code.length) {
        // 注意顺序：先拼接后移动指针
        letter += char
        char = code[++current]
      }
      tokens.push({ type: TokenTypes.Name, value: letter })
    }

    const NUMBER = /[0-9]/
    if (NUMBER.test(char)) {
      let number = ''
      while (NUMBER.test(char) && current < code.length) {
        number += char
        char = code[++current]
      }
      tokens.push({ type: TokenTypes.Number, value: number })
    }
  }

  return tokens
}
