<template>
    <div>
      <CharactersFilter
        :is-loading="isLoading"
        @search="searchHeroes"
        @update:start-date="(val: Date | null) => (startDate = val)"
        @update:end-date="(val: Date | null) => (endDate = val)"
      />
      <CharactersTable :characters="filteredCharacters" :is-loading="isLoading" />
      <CharactersPagination
        :previous="previous"
        :next="next"
        :is-loading="isLoading"
        @next-page="nextPage"
        @previous-page="previousPage"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import { useCharacters } from "@/composables/useCharacters";
  import type { Character } from "@/@types/Character";
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);
  
  const {
    characters,
    isLoading,
    previous,
    next,
    fetchCharacters,
    searchCharacters,
    nextPage,
    previousPage,
  } = useCharacters();
  
  const filteredCharacters = computed<Character[]>(() => {
    let filtered = characters.value;
  
    const filterByStartDate = (character: Character) => {
      if (!startDate.value) return true;
      const start = new Date(startDate.value);
      const createdDate = new Date(character.created);
      return createdDate >= start;
    };
  
    const filterByEndDate = (character: Character) => {
      if (!endDate.value) return true;
      const end = new Date(endDate.value);
      const createdDate = new Date(character.created);
      return createdDate <= end;
    };
  
    filtered = filtered.filter(
      (character) => filterByStartDate(character) && filterByEndDate(character),
    );
  
    return filtered;
  });
  
  const searchHeroes = (query: string, status: string) => {
    if ((query && query.trim() !== "") || status) {
      searchCharacters(
        query ? query.trim() : "",
        status ? status.toLowerCase() : "",
      );
    } else {
      fetchCharacters();
    }
  };
  
  fetchCharacters();
  </script>
  