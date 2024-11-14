import { Request, Response } from "express";
import { findLibraryCard, registerLibraryCard } from "../services/LibraryCardService";
import { ILibraryCard } from "../models/LibraryCard";
import { LibraryCardNotExistError } from "../utils/LibraryErrors";

export const getLibraryCard = async(req:Request, res:Response) => {
    const {cardId} = req.params;
    try {
        const libraryCard = await findLibraryCard(cardId);
        res.status(200).json({message:'fetched library card', libraryCard});
    } catch (error) {
        if(error instanceof LibraryCardNotExistError)
            res.status(404).json({message:'library card does not exist, please register! for one', error})
        else res.status(500).json({message:'cannot fetch library card', error});
    }
}

export const createLibraryCard = async(req:Request, res:Response) => {
    const card:ILibraryCard = req.body;
    try {
        const libraryCard = await registerLibraryCard(card);
        res.status(200).json({message:'created library card', libraryCard});
    } catch (error) {
        res.status(500).json({message:'cannot create library card', error});
    }
}