<template>
  <div>
    <img src="/logo.svg" />

    <ul class="menu p-4 font-semibold text-stone-600">
      <li>
        <NuxtLink to="/home" class="text-primary bg-green-200/80">
          <Icon name="ic:outline-home" class="size-7" /> 
          Home
        </NuxtLink>
      </li>
 
      <li>

        <details>
          <summary>
            <Icon name="ic:outline-home" class="size-7" /> 
            My PCFs
          </summary>
          <ul>
            <li><a>My Publised PCFs</a></li>
            <li><a>Incoming Requests</a></li>
          </ul>
        </details>
      </li>

      <li>
        <a>
          <Icon name="hugeicons:discover-circle" class="size-7" /> 
          Browse PCFs
        </a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

</script>