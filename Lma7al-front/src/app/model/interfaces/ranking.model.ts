import { Competition } from "./competition.model";
import { Member } from "./member.model";

export interface Ranking {
    id: CompetitionMember;
    rank?: Number;
    score?: Number;
    competition?: Competition;
    member?: Member;
}

export interface CompetitionMember {
    competitionCode: String,
    memberNum: Number
}