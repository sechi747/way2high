import { expect, test } from 'vitest'
import { NodeTypes, parser } from './parser'
import { type Token, TokenTypes } from './tokenizer'

test('parser', () => {
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

  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2',
          },
          {
            type: NodeTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: NodeTypes.NumberLiteral,
                value: '4',
              },
              {
                type: NodeTypes.NumberLiteral,
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})

test('number literal', () => {
  const tokens: Token[] = [{ type: TokenTypes.Number, value: '2' }]
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.NumberLiteral,
        value: '2',
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})

test('call expression', () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2',
          },
          {
            type: NodeTypes.NumberLiteral,
            value: '4',
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})

test('double call expression', () => {
  const tokens: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'sum' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Number, value: '3' },
    { type: TokenTypes.Paren, value: ')' },
  ]
  const ast = {
    type: NodeTypes.Program,
    body: [
      {
        type: NodeTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '2',
          },
          {
            type: NodeTypes.NumberLiteral,
            value: '4',
          },
        ],
      },
      {
        type: NodeTypes.CallExpression,
        name: 'sum',
        params: [
          {
            type: NodeTypes.NumberLiteral,
            value: '1',
          },
          {
            type: NodeTypes.NumberLiteral,
            value: '3',
          },
        ],
      },
    ],
  }

  expect(parser(tokens)).toEqual(ast)
})
