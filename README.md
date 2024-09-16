# Expression creator

The library for creating mathematical expressions.

## Features

- Generation of mathematical expressions according to templates. Each template within an expression
  can be configured individually.
- Writing mathematical expressions in raw, LaTeX and tree formats.
- Parsing mathematical expressions, including those containing templates.

### Nodes

- Constants, for example `5`, `2.9`, `e`, `π`.
- Symbols, for example `a`, `c`, `x0`.
- The unary operators: `+`, `-`, `√`.
- The binary operators: `+`, `-`, `*`, `/`, `**`, `√`.
- The functions, for example `log`, `sin`, `atan`, `cosech`, `floor`, etc.

### Templates

- Constant `<CT *ID*>`.
- Named constant `<NCT *ID*>`.
- Symbol `<VT *ID*>`.
- Unary operator `<UT *ID*>`.
- Binary operator `<BT *ID*>`.
- Function `<FT *ID*>`.

### Examples of expressions

- `a + ln(π ** b)`
- `b / sin(4 √ <FT FT1>(a, π))`
- `e <BT BT1> <FT FT1>(<NCT NCT1> <BT BT2> <UT UT1><VT VT1>)`

### Backus–Naur form

<details>

```Text
<zero>              ::= "0"
<not zero digit>    ::= "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
<digit>             ::= <zero> | <not zero digit>
<digits sequence>   ::= <digit> | <digit> <digits sequence>
<integer number>    ::= <zero> | <not zero digit> <digits sequence>
<fractional number> ::= <integer number> "." <digits sequence>
<number>            ::= <integer number> | <fractional number>

<letter>                     ::= ...
<letter or digit>            ::= <letter> | <digit>
<letters or digits sequence> ::= <letter or digit> | <letter or digit> <letters or digits sequence>
<identifier>                 ::= <letter> | <letter> <letters or digits sequence>

<binary additive sign>       ::= "+" | "-"
<binary additive>            ::=
    <binary multiplicative> <binary additive sign> <binary multiplicative>
    | <binary multiplicative>
<binary multiplicative sign> ::= "*" | "•" | "×" | "/" | "÷" | ":"
<binary multiplicative>      ::=
    <unary multiplicative> <binary multiplicative sign> <unary multiplicative>
    | <unary multiplicative>
<binary exponential sign>    ::= "^" | "**" | "↑" | "#" | "√"
<binary exponential>         ::=
    <unary exponential> <binary exponential sign> <unary exponential>
    | <unary exponential>
<binary template>            ::=
    <unary template> "<" "BT" <identifier> ">" <unary template>
    | <unary template>

<unary multiplicative sign> ::= "+" | "-"
<unary multiplicative>      ::=
    <binary exponential> <unary multiplicative sign> <binary exponential>
    | <binary exponential>
<unary exponential sign>    ::= "#" | "√"
<unary exponential>         ::=
    <binary template> <unary exponential sign> <binary template>
    | <binary template>
<unary template>            ::=
    <function template> "<" "UT" <identifier> ">" <function template>
    | <function template>

<parameters>                 ::= <expression> | <expression> "," <parameters>
<parameters and parentheses> ::= "(" ")" | "(" <parameters> ")"
<function template>          ::= "<" "FT" <identifier> ">" <parameters and parentheses> | <function>
<function>                   ::= <identifier> <parameters and parentheses> | <term>

<primary>                 ::= <identifier> | <number>
<variable template>       ::= "<" "VT" <identifier> ">"
<constant template>       ::= "<" "CT" <identifier> ">"
<named constant template> ::= "<" "NCT" <identifier> ">"
<primary template>        ::= <variable template> | <constant template> | <named constant template>
<modulus>                 ::= "|" <expression> "|"
<fractional part>         ::= "{" <expression> "}"
<ceil>                    ::= "⌈" <expression> "⌉" | "^[" <expression> | "]"
<floor>                   ::= "⌊" <expression> "⌋" | "[" <expression> | "]"
<brackets term>           ::= <modulus> | <fractional part> | <ceil> | <floor>
<term>                    ::=
    <primary>
    | <primary template>
    | <brackets term>
    | "(" <expression> ")"

<expression> ::= <binary additive>
```

</details>

## Getting started

An expression generation application was created to demonstrate using the library. The building
steps:

- Install packages with command `npm i`.
- Build an executable with command `npx tsc && npx tsc-alias && npm run compile`.
- *expression-creator.exe* is located in *build* directory.

Built
[expression-creator.exe](https://github.com/KostyaSnov/expression-creator/releases/download/1.0.0/expression-creator.exe)
is attached to release 1.0.0.

The application needs *creatorConfig.json* file along with an executable. The configuration
structure:

```JSON
{
    "numberExpressions": 42,
    "pathToDocumentPattern": "path\\to\\document\\pattern.tex",
    "expressionPattern": "__number__. __expression__",
    "outPath": "path\\to\\output\\file.tex",
    "expressionTemplates": [
        "<VT VT1> + <VT VT2> + <VT VT3> + <VT VT4>",
        "<VT VT1> * <VT VT2> * <VT VT3> * <VT VT4>"
    ]
}

```

- *numberExpressions*. A number of the generated expressions.
- *pathToDocumentPattern*. A path to a LaTeX document pattern. All occurrences of *\_\_document\_\_*
  will be replaced with the generated expressions.
- *expressionPattern*. An expression pattern. All occurrences of *\_\_number\_\_* will be replaced
  with an expression number. All occurrences of *\_\_expression\_\_* will be replaced with a
  generated expression.
- *outPath*. A path to an output file with the generated expressions.
- *expressionTemplates*. An array of templated expressions. A templated expression is chosen from
  the array in a uniform distribution for each expression separately. A templated expression must
  contain no more than 4 symbol templates.

<details>
<summary>Document pattern example</summary>

```Text
\documentclass{article}
\usepackage{amsmath}

\begin{document}
__document__
\end{document}
```

</details>

## Generation example

<details>
<summary>Configuration</summary>

```JSON
{
    "numberExpressions": 10,
    "pathToDocumentPattern": "documentPattern.tex",
    "expressionPattern": "__number__) \\ $__expression__$ \\bigskip \\par",
    "outPath": "expressions.tex",
    "expressionTemplates": [
        "<UT UT1><CT CT1> <BT BT1> <VT VT1> <BT BT2> (<FT FT1>(<VT VT2>) <BT BT3> <NCT NCT1>)",
        "(<VT VT1> <BT BT1> <NCT NCT1>) <BT BT2> <VT VT2> <BT BT3> <FT FT1>(<CT CT1>)"
    ]
}

```

</details>

<details>
<summary>Document pattern</summary>

```Text
\documentclass{article}
\usepackage{amsmath}

\begin{document}
__document__
\end{document}
```

</details>

<details>
<summary>Generated expressions in raw LaTeX</summary>

```Text
\documentclass{article}
\usepackage{amsmath}

\begin{document}
1) \ $\left( \sqrt{1} \right)^{a}\mathbin{+}\left\{ b \right\}^{\pi}$ \bigskip \par
2) \ $\frac{\sqrt[{a\mathbin{\cdot}\pi}]{b}}{\operatorname{cosec}{e}}$ \bigskip \par
3) \ $\sqrt[{6}]{a}\mathbin{+}\left( \operatorname{th}{b} \right)^{\pi}$ \bigskip \par
4) \ $\left( \left( -\pi \right)^{a} \right)^{\operatorname{sh}{b}\mathbin{-}\pi}$ \bigskip \par
5) \ $\frac{a\mathbin{+}\pi}{b}\mathbin{-}\operatorname{sin}{3}$ \bigskip \par
6) \ $\left( \frac{a}{\pi}\mathbin{-}b \right)\mathbin{\cdot}\left| e \right|$ \bigskip \par
7) \ $\sqrt[{-2\mathbin{-}a}]{\left\lfloor b \right\rfloor\mathbin{+}\pi}$ \bigskip \par
8) \ $a\mathbin{\cdot}\pi\mathbin{\cdot}b\mathbin{\cdot}\operatorname{cosec}{-4}$ \bigskip \par
9) \ $\left( \sqrt{2} \right)^{a}\mathbin{+}\operatorname{th}{b}\mathbin{-}\pi$ \bigskip \par
10) \ $\frac{-3}{a}\mathbin{\cdot}\left( \operatorname{arth}{b}\mathbin{+}\pi \right)$ \bigskip \par
\end{document}
```

</details>

<details>
<summary>Generated expressions in compiled LaTeX</summary>

<p align="center">
    <img
        src="https://github.com/user-attachments/assets/24a0fa74-77b6-420e-8259-59d921d9493b"
        alt="compiled LaTeX"
    />
</p>

</details>
