
<template>
  <div class="card card-compact bg-base-100 min-h-[70vh]">
    <div class="card-body">
      <h3 class="card-title">Recent Processed Requests</h3>

      <div class="overflow-x-auto">
        <table class="table table-sm">
          <!-- head -->
          <thead>
            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Data Owner</th>
              <th>Version</th>
              <th>Date Processed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody class="cursor-pointer">

            <tr class="hover" @click="navigateTo('/home/123')">
              <th>abc1</th>
              <td>product1</td>
              <td>Door Card</td>
              <td>Company A</td>
              <td>1</td>
              <td>07/005/2024</td>
              <td>
                <span class="font-bold text-primary">Approved</span>
              </td>
            </tr>

            <tr class="hover" @click="navigateTo('/home/123')">
              <th>abc1</th>
              <td>product1</td>
              <td>Windshield</td>
              <td>Company B</td>
              <td>1</td>
              <td>07/005/2024</td>
              <td>
                <span class="font-bold text-error">Denied</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr>
    <div class="py-3 px-4 flex justify-between">
      <span></span>

      <div class="flex text-sm opacity-90">
        <div class="mt-1.5">
          Row Per Page:
          <select class="select select-xs">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>
        </div>

        <div class="flex space-x-2">
          <button class="btn btn-sm btn-circle btn-ghost">
            <Icon name="fe:arrow-left" class="size-5" />
          </button>
          <span class="mt-1.5">1-3 of 3</span>
          <div class="btn btn-sm btn-circle btn-ghost">
            <Icon name="fe:arrow-right" class="size-5" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const table = ref()

const data = [
  {}
]
</script>