import {Fish} from "./fish";
import {Competition} from "./competition.model";
import {Member} from "./member.model";

export interface Hunting {
  id?: number;
  numberOfFish?: number;
  fish?: Fish;
  competition?: Competition;
  member?: Member;
  member_code?: number;
  competition_code?: string;
  fish_name?: string;
}
