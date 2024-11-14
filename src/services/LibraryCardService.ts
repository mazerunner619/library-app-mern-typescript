import { ILibraryCardModel } from "../daos/LibraryCardDao";
import LibraryCardDao from "../daos/LibraryCardDao";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardNotExistError } from "../utils/LibraryErrors";

export const registerLibraryCard = async (
  card: ILibraryCard
): Promise<ILibraryCardModel> => {
  try {
    const data = new LibraryCardDao(card);
    const newCard = await data.save();
    return newCard;
  } catch (error: any) {
    let cardExists = await LibraryCardDao.findOne({ user: card.user });
    if (cardExists) {
      return cardExists;
    }
    throw error;
  }
};

export const findLibraryCard = async (
  cardId: string
): Promise<ILibraryCardModel> => {
  try {
    const card = await LibraryCardDao.findById(cardId);
    if (card) return card;
    throw new LibraryCardNotExistError("library card does does not exist");
  } catch (error: any) {
    throw error;
  }
};
