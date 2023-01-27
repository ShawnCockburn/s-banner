import meow from "meow";
import clipboard from "clipboardy";
import {
  CharacterValues,
  charactersSeparator,
  CharactersJoin,
  CharacterShape,
  getChar,
  Character,
} from "./characters.js";

function appendNewChar<
  Char1 extends CharacterShape,
  Char2 extends CharacterShape
>(char: Char1, newChar: Char2) {
  const newCharArray = newChar.split("\n");
  const charArray = char.split("\n");

  const appendedCharArray = charArray.map((char, index) => {
    return char + newCharArray[index];
  });

  return appendedCharArray.join("\n") as CharactersJoin<Char1, Char2>;
}

function buildStringFromChars<Chars extends CharacterValues[]>(chars: Chars) {
  let string: CharacterShape = charactersSeparator;
  let charArr = [...chars];
  while (charArr.length > 0) {
    const char = charArr.shift() as CharacterValues;
    string = appendNewChar(string, char);
    string = appendNewChar(string, charactersSeparator);
  }
  return string;
}

function replaceCharWithInput(char = "", blank = "", fill = "") {
  const replaceBlank = char.replace(/\*/g, blank);
  const replaceFill = replaceBlank.replace(/#/g, fill);
  return replaceFill;
}

function convertStringToCharString(string = "") {
  const chars = string.split("") as Character[];
  const charStrings = chars.map((char) => getChar(char));
  return buildStringFromChars(charStrings);
}

function makeBanner(string = "", blank = "", fill = "") {
  return replaceCharWithInput(convertStringToCharString(string), blank, fill);
}

const cli = meow(
  `
	Usage
	  $ s-banner "<banner text wrapped in quotes>" --blank <blank> --fill <fill>

	Options
	  --blank, -b  The character to use for blank spaces
    --fill, -f  The character to use for filled spaces

	Examples
	  $ s-banner "hi" --blank ⬛️ --fill ⬜️
⬛️⬜️⬛️⬜️⬛️⬜️⬜️⬜️⬛️
⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬛️
⬛️⬜️⬜️⬜️⬛️⬛️⬜️⬛️⬛️
⬛️⬜️⬛️⬜️⬛️⬛️⬜️⬛️⬛️
⬛️⬜️⬛️⬜️⬛️⬜️⬜️⬜️⬛️

	  $ s-banner "hi" --blank ⬛️ --fill ⬜️ --clipboard

`,
  {
    importMeta: import.meta,
    flags: {
      blank: {
        type: "string",
        alias: "b",
        required: true,
      },
      fill: {
        type: "string",
        alias: "f",
        required: true,
      },
      clipboard: {
        type: "boolean",
        alias: "c",
      },
    },
  }
);

if (cli.input.length !== 1) {
  cli.showHelp();
  process.exit(0);
}

const output = makeBanner(cli.input[0], cli.flags.blank, cli.flags.fill);

if (cli.flags.clipboard) {
  clipboard.writeSync(output);
  console.log("Banner copied to clipboard");
} else console.log(output);
