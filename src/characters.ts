import { String } from "ts-toolbelt";

// Description: This file contains the characters that will be used.
// * = blank
// # = filled

export const separator = "*" as const;
export const charactersSeparator = `${separator}
${separator}
${separator}
${separator}
${separator}` as const;

const alphabet = {
  a: `
*#*
#*#
###
#*#
#*#
`,
  b: `
##*
#*#
###
#*#
##*
`,
  c: `
*##
#**
#**
#**
*##
`,
  d: `
##*
#*#
#*#
#*#
##*
`,
  e: `
###
#**
###
#**
###
`,
  f: `
###
#**
###
#**
#**
`,
  g: `
*##
#**
#**
#*#
*##
`,
  h: `
#*#
#*#
###
#*#
#*#
`,
  i: `
###
*#*
*#*
*#*
###
`,
  j: `
###
**#
**#
**#
##*
`,
  k: `
#*#
##*
#**
##*
#*#
`,
  l: `
#**
#**
#**
#**
###
`,
  m: `
*#*#*
#*#*#
#*#*#
#*#*#
#*#*#
`,
  n: `
*#*
#*#
#*#
#*#
#*#
`,
  o: `
*#*
#*#
#*#
#*#
*#*
`,
  p: `
##*
#*#
##*
#**
#**
`,
  q: `
*#*
#*#
#*#
#*#
*##
`,
  r: `
##*
#*#
##*
#*#
#*#
`,
  s: `
*##
#**
*##
**#
##*
`,
  t: `
###
*#*
*#*
*#*
*#*
`,
  u: `
#*#
#*#
#*#
#*#
*#*
`,
  v: `
#*#
#*#
#*#
*#*
*#*
`,
  w: `
#*#*#
#*#*#
#*#*#
#*#*#
*#*#*
`,
  x: `
#*#
#*#
*#*
#*#
#*#
`,
  y: `
#*#
#*#
*#*
*#*
*#*
`,
  z: `
###
**#
*#*
#**
###
`,
} as const;

const numbers = {
  "0": `
###
#*#
#*#
#*#
###
`,
  "1": `
*#*
##*
*#*
*#*
###
`,
  "2": `
*#*
#*#
**#
*#*
###
`,
  "3": `
###
**#
*##
**#
###
`,
  "4": `
**#
*#*
#*#
###
**#
`,
  "5": `
###
#**
###
**#
###
`,
  "6": `
###
#**
###
#*#
###
`,
  "7": `
###
**#
*#*
*#*
*#*
`,
  "8": `
###
#*#
###
#*#
###
`,
  "9": `
###
#*#
###
**#
###
`,
} as const;

const symbols = {
  ".": `
***
***
***
***
#**
`,
  ",": `
***
***
***
*#*
#**
`,
  ":": `
***
*#*
***
*#*
***
`,
  ";": `
***
*#*
***
*#*
#**
`,
  "?": `
###
**#
*#*
***
*#*
`,
  "!": `
*#*
*#*
*#*
***
*#*
`,
  " ": charactersSeparator,
} as const;

export const characters = {
  ...alphabet,
  ...numbers,
  ...symbols,
} as const;

export type Trim<
  Input extends string,
  _TrimChars extends string = "\n" | "\r" | " "
> = Input extends `${_TrimChars}${infer Rest}`
  ? Trim<Rest, _TrimChars>
  : Input extends `${infer Rest}${_TrimChars}`
  ? Trim<Rest, _TrimChars>
  : Input;

export type Character = keyof typeof characters;

export type CharacterValuesRaw = typeof characters[Character];

export type CharacterValues = Trim<CharacterValuesRaw>;

export type CharacterShape = `${string}
${string}
${string}
${string}
${string}`;

type SplitCharacterValues<Char extends CharacterShape> = String.Split<
  Char,
  "\n"
>;

export type CharactersJoin<
  Char1 extends CharacterShape,
  Char2 extends CharacterShape
> = `${SplitCharacterValues<Char1>[0]}${typeof separator}${SplitCharacterValues<Char2>[0]}
${SplitCharacterValues<Char1>[1]}${typeof separator}${SplitCharacterValues<Char2>[1]}
${SplitCharacterValues<Char1>[2]}${typeof separator}${SplitCharacterValues<Char2>[2]}
${SplitCharacterValues<Char1>[3]}${typeof separator}${SplitCharacterValues<Char2>[3]}
${SplitCharacterValues<Char1>[4]}${typeof separator}${SplitCharacterValues<Char2>[4]}`;

// export type CharacterValuesJoin<
//   Input extends CharacterValues[],
//   _Acc extends CharacterShape = typeof charactersSeparator,
//   _Rest extends CharacterValues[] = List.Tail<Input>
// > = _Rest extends [undefined]
//   ? _Acc
//   : CharacterValuesJoin<_Rest, CharactersJoin<_Acc, List.Head<Input>>>;

export const getChar = <Char1 extends Character>(char: Char1) =>
  characters[char.toLowerCase() as Character].trim() as Trim<
    typeof characters[Char1]
  >;
