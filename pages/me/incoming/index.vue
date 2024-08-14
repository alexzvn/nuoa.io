<template>
  <DataViewPaginate class="min-h-[60vh]">
    <template #title>
      <div class="flex justify-between space-x-3 px-3">
        <h3 class="card-title font-bold">Current Requests</h3>
      </div>
      <hr>
    </template>

    <table class="table">
      <thead>
        <tr>
          <th>Request No</th>
          <th>Requester ID</th>
          <th>PCF ID</th>
          <th>Requested Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="item, i of requests" class="hover">
          <th>{{ i + 1 }}</th>
          <td>{{ item.requestId.split(',')[1] }}</td>
          <td>{{ item.requestId.split(',')[0] }}</td>
          <td>{{ item.dateRequested.split('-').reverse().join('/') }}</td>
          <td>
            <NuxtLink :to="`/me/incoming/${item.requestId}`" class="link text-blue-600" style="display: block; width: 5rem;">
              <p>View detail</p>
            </NuxtLink>
          </td>
        </tr>

      </tbody>
    </table>
  </DataViewPaginate>
</template>

<script lang="ts" setup>
import { useAuthenticator } from '@aws-amplify/ui-vue'
import type { MandeInstance } from 'mande'
import DataViewPaginate from '~/components/DataViewPaginate.vue'
import type { RequestAccess } from '~/composables/useMande';
import type { Authenticator } from '~/global'

const api = inject<MandeInstance>('api')!
const auth = useAuthenticator() as Authenticator

const requests = ref<RequestAccess[]>([])

onMounted(async () => {
  const response = await api.get<{ requests: RequestAccess[] }>('/request', {
    query: {  status: 'pending' }
  })

  requests.value = response.requests
})
</script>