<template>
    <div>
      <v-data-table
        :items="characters"
        :headers="headers"
        :items-per-page="20"
        :show-current-page="false"
        :loading="isLoading"
        hide-default-footer
      >
        <template #item.status="{ item }">
          <v-chip :color="statusColor(item.status)">
            {{ item.status }}
          </v-chip>
        </template>
        <template #item.created="{ item }">
          {{ formatDate(item.created) }}
        </template>
        <template #item.image="{ item }">
          <v-img :src="item.image" max-width="50" :alt="item.name" />
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { format } from "date-fns";
  import { pl } from "date-fns/locale";
  import type { VDataTable } from "vuetify/components";
  import type { Character } from "@/@types/Character";
  
  defineProps<{
    characters: Character[];
    isLoading: boolean;
  }>();
  
  const headers: VDataTable["$props"]["headers"] = [
    { title: "Nazwa", align: "start", key: "name" },
    { title: "Gatunek", align: "end", key: "species" },
    { title: "Status", align: "end", key: "status" },
    { title: "Data utworzenia", align: "end", key: "created" },
    { title: "Zdjęcie", align: "start", key: "image" },
  ];
  
  const statusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "alive":
        return "green";
      case "dead":
        return "red";
      default:
        return "grey";
    }
  };
  
  const formatDate = (dateString: Date) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return format(date, "PPP", { locale: pl });
  };
  </script>
  