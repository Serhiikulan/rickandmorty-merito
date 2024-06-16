import type { Character } from "@/types/Character"
export type CharacterList = {
    info: {
        count: number;
        pages: number;
        next: string | null;
        prev: string | null;
    };
    results: Character[];
};