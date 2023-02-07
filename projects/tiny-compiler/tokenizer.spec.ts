import { expect, test } from 'vitest'
import { type Token, TokenTypes, tokenizer } from './tokenizer'

test('tokenizer', () => {
  const code = '(add 2 (subtract 4 2))'
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})

test('left paren', () => {
  const code = '('
  const tokens: Token[] = [{ type: TokenTypes.Paren, value: '(' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('right paren', () => {
  const code = ')'
  const tokens: Token[] = [{ type: TokenTypes.Paren, value: ')' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('name', () => {
  const code = 'add'
  const tokens: Token[] = [{ type: TokenTypes.Name, value: 'add' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('number', () => {
  const code = '23'
  const tokens: Token[] = [{ type: TokenTypes.Number, value: '23' }]

  expect(tokenizer(code)).toEqual(tokens)
})

test('mixed', () => {
  const code = '(add 1 2)'
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
  ]

  expect(tokenizer(code)).toEqual(tokens)
})
