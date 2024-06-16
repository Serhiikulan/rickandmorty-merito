<template>
    <v-row>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="searchQuery"
          label="Wyszukaj po nazwie"
          clearable
          :disabled="isLoading"
          @input="debounceSearch"
          @click:clear="handleSearch"
        />
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="statusFilter"
          :items="statusItems"
          :disabled="isLoading"
          label="Filtracja po statusie"
          clearable
          @update:model-value="handleSearch"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="formatedStartDate"
              label="Data utworzenia od"
              prepend-icon="mdi-calendar"
              :disabled="isLoading"
              v-bind="props"
            />
          </template>
          <v-date-picker
            v-model="startDate"
            no-title
            color="primary"
            show-adjacent-months
            hide-weekdays
            @update:model-value="handleStartDateUpdate"
          >
            <template #actions>
              <v-btn v-if="startDate" aria-label="Wyczyść datę" @click="clearStartDate">Wyczyść datę</v-btn>
            </template>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
        >
          <template #activator="{ props }">
            <v-text-field
              v-model="formatedEndDate"
              label="Data utworzenia do"
              prepend-icon="mdi-calendar"
              :disabled="isLoading"
              readonly
              v-bind="props"
            />
          </template>
          <v-date-picker
            v-model="endDate"
            no-title
            color="primary"
            show-adjacent-months
            hide-weekdays
            @update:model-value="handleEndDateUpdate"
          >
            <template #actions>
              <v-btn v-if="endDate" aria-label="Wyczyść datę" @click="clearEndDate">Wyczyść datę</v-btn>
            </template>
          </v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from "vue";
  import { format } from "date-fns";
  import { pl } from "date-fns/locale";
  import { useDebounceFn } from "@vueuse/core";
  
  defineProps<{
    isLoading: boolean;
  }>();
  
  const emit = defineEmits(["search", "update:startDate", "update:endDate"]);
  
  const statusItems: readonly string[] = ["Alive", "Dead", "Unknown"];
  const searchQuery = ref<string>("");
  const statusFilter = ref<string | null>(null);
  const startDate = ref<Date | null>(null);
  const endDate = ref<Date | null>(null);
  
  const clearStartDate = () => {
    startDate.value = null;
    handleStartDateUpdate();
  };
  
  const clearEndDate = () => {
    endDate.value = null;
    handleEndDateUpdate();
  };
  const debounceSearch = useDebounceFn(() => {
    handleSearch();
  }, 600);
  const handleSearch = () => {
    emit("search", searchQuery.value, statusFilter.value);
  };
  
  const handleEndDateUpdate = () => {
    emit("update:endDate", endDate.value);
  };
  
  const handleStartDateUpdate = () => {
    emit("update:startDate", startDate.value);
  };
  
  const formatedStartDate = computed(() => {
    return startDate.value ? formatDate(startDate.value) : null;
  });
  
  const formatedEndDate = computed(() => {
    return endDate.value ? formatDate(endDate.value) : null;
  });
  
  const formatDate = (date: Date) => {
    return format(date, "PPP", { locale: pl });
  };
  </script>