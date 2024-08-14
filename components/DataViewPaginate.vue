<template>
  <div class="card card-compact bg-base-100 shadow">
    <div class="card-body">
      <slot name="title">
        <h3 class="card-title" v-if="title">{{ title }}</h3>
      </slot>

      <div class="overflow-x-auto" v-bind="$attrs">
        <slot />
      </div>
    </div>

    <hr>
    <slot name="footer">
      <div class="py-3 px-4 flex justify-between">
        <span></span>

        <div class="flex text-sm opacity-90">
          <div class="mt-1.5">
            Row Per Page:
            <select v-model="limit" class="select select-xs">
              <option v-for="item in perPage" :value="item" :selected="item == limit">{{ item }}</option>
            </select>
          </div>

          <div class="flex space-x-2">
            <button class="btn btn-sm btn-circle btn-ghost">
              <Icon name="fe:arrow-left" class="size-5" @click="page = page <= 1 ? 1 : page - 1" />
            </button>
            <span class="mt-1.5">Page {{ page }}</span>
            <div class="btn btn-sm btn-circle btn-ghost" @click="page++">
              <Icon name="fe:arrow-right" class="size-5" />
            </div>
          </div>
        </div>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  title: { type: String },
  perPage: { type: Array as PropType<number[]>, default: () => [10, 20, 30, 50, 100, 200, 500] },
})

const page = defineModel('page', {
  type: Number,
  default: 1,
})

const limit = defineModel('limit', {
  type: Number,
  default: 10,
})
</script>