import Chance from "chance";
import { IMessage } from "./types";

const chance = new Chance();

export const generateMessage = (): IMessage => {
  const wordsNum = chance.natural({ min: 1, max: 20 });
  const body = chance.sentence({ words: wordsNum });
  return {
    id: chance.word({ length: 15 }),
    body,
    date: Date.now(),
    author: "Sylwia Spencer",
    fromMe: false,
  };
};
