<template>
  <div data-theme="retro" class="drawer lg:drawer-open">
    <input :id="drawerID" type="checkbox" v-model="drawer" class="drawer-toggle" />
    <div class="drawer-content bg-base-200">
      <div class="p-5">
        <slot />
      </div>
    </div> 
    <div class="drawer-side">
      <label :for="drawerID" aria-label="close sidebar" class="drawer-overlay"></label>
      
      <Sidebar class="w-80 min-h-full bg-base-100" />
    </div>
  </div>

  <NuxtLoadingIndicator :height="4" />
</template>

<script lang="ts" setup>
import Sidebar from './default/Sidebar.vue'

const drawerID = 'navbar-drawer'
const drawer = ref(false)

provide('sidebar:toggle', () => drawer.value = !drawer.value)

</script>