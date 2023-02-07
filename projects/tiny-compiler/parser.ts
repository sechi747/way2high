import type { Token } from './tokenizer'
import { TokenTypes } from './tokenizer'

export enum NodeTypes {
  Program,
  CallExpression,
  NumberLiteral,
}

type ChildNode = NumberNode | CallExpressionNode

interface Node {
  type: NodeTypes
}

interface RootNode extends Node {
  body: ChildNode[]
}

interface NumberNode extends Node {
  value: string
}

interface CallExpressionNode extends Node {
  name: string
  params: ChildNode[]
}

function createRootNode(): RootNode {
  return {
    type: NodeTypes.Program,
    body: [],
  }
}

function createNumberNode(value: string): NumberNode {
  return {
    type: NodeTypes.NumberLiteral,
    value,
  }
}

function createCallExpressionNode(name: string): CallExpressionNode {
  return {
    type: NodeTypes.CallExpression,
    name,
    params: [],
  }
}

export function parser(tokens: Token[]) {
  let current = 0

  const rootNode = createRootNode()

  function generateNodes() {
    let token = tokens[current]

    if (token.type === TokenTypes.Number) {
      // return前先挪动指针
      current++
      return createNumberNode(token.value)
    }

    if (token.type === TokenTypes.Paren && token.value === '(') {
      // 识别到左括号后移动指针，获取表达式名称
      token = tokens[++current]
      const node = createCallExpressionNode(token.value)

      token = tokens[++current]
      while (!(token.type === TokenTypes.Paren && token.value === ')')) {
        // 递归调用，返回值为 NumberNode | CallExpressionNode
        node.params.push(generateNodes())
        // generateNodes()在return前已经挪动了指针，所以不是token = tokens[++current]
        token = tokens[current]
      }

      current++
      return node
    }

    throw new Error (`Illegal token: ${JSON.stringify(token)}`)
  }

  // 在指针到达末尾前一直循环
  while (current < tokens.length)
    rootNode.body.push(generateNodes())

  return rootNode
}
