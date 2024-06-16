import axios from "axios";
import { ref } from "vue";
import type { Character } from "@/@types/Character"

export function useCharacters() {
    const characters = ref<Character[]>([]);
    const next = ref<string | null>(null);
    const previous = ref<string | null>(null);
    const baseUrl = "https://rickandmortyapi.com/api/character";
    const isLoading = ref<boolean>(false);

    const fetchCharacters = async (url?: string) => {
        isLoading.value = true;
        await axios.get(url || baseUrl)
            .then((response) => {
                characters.value = response.data.results;
                next.value = response.data.info.next;
                previous.value = response.data.info.prev;
            })
            .catch((error) => console.error("Error fetch characters:", error))
            .finally(() => (isLoading.value = false));
    };

    const searchCharacters = async (nameQuery: string, statusQuery: string) => {
        isLoading.value = true;
        await axios
            .get(baseUrl, {
                params: {
                    name: nameQuery,
                    status: statusQuery,
                },
            })
            .then((response) => {
                characters.value = response.data.results;
                next.value = response.data.info.next;
                previous.value = response.data.info.prev;
            })
            .catch((error) => {
                characters.value = [];
                next.value = null;
                previous.value = null;
                console.error("Error searching characters:", error);
            })
            .finally(() => (isLoading.value = false));
    };

    const nextPage = () => {
        if (next.value) fetchCharacters(next.value);
    };

    const previousPage = () => {
        if (previous.value) fetchCharacters(previous.value);
    };

    return {
        characters,
        next,
        previous,
        fetchCharacters,
        searchCharacters,
        nextPage,
        previousPage,
        isLoading,
    };
}
