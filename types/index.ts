import {z} from "zod";
import {insertComicSchema} from "../lib/validators";

export type Comic = z.infer<typeof insertComicSchema> & {
    id: string;
    rating: string;
    createdAt: Date;
    
}

