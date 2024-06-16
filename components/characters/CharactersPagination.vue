<template>
    <v-row class="mt-4">
      <v-col>
        <v-btn
          :disabled="!previous || isLoading"
          aria-label="Poprzednia"
          @click="$emit('previous-page')"
        >
          Poprzednia
        </v-btn>
      </v-col>
      <v-col class="text-right">
        <v-btn
          :disabled="!next || isLoading"
          aria-label="Następna"
          @click="$emit('next-page')"
        >
          Następna
        </v-btn>
      </v-col>
    </v-row>
  </template>
  <script setup lang="ts">
  defineProps<{
    previous: string | null;
    next: string | null;
    isLoading: boolean;
  }>();
  defineEmits(["previous-page", "next-page"]);
  </script>
  