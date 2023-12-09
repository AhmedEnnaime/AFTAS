import { IdentityDocumentType } from "../enums/identityDocumentType.enum";
import { Ranking } from "./ranking.model";

export interface Member {
    num?: Number;
    name?: String;
    familyName?: String;
    accessionDate?: Date;
    nationality?: String;
    identityDocument?: IdentityDocumentType;
    identityNumber?: String;
    rankings?: Ranking[]; 
}