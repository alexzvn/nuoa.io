<template>
  <DataViewPaginate class="min-h-[60vh]" v-model:limit="search.limit" v-model:page="search.page">
    <template #title>
      <div class="flex justify-between space-x-3 px-3">
        <div class="flex space-x-3">
          <h3 class="card-title font-bold">My published PCFs</h3>
          <div class="flex space-x-2">
            <select v-model="search.type" class="input input-bordered input-sm">
              <option v-for="label, key in searchTypes" :value="key">{{ label }}</option>
            </select>
            <label class="input input-bordered input-sm flex items-center gap-2">
              <input v-model="search.term" type="text" class="grow" placeholder="Search"/>
              <Icon name="ic:search" />
            </label>
          </div>
        </div>
        <NuxtLink to="/me/published/create" class="btn btn-sm btn-success">New PCF</NuxtLink>
      </div>
      <hr>
    </template>

    <table class="table">
      <thead>
        <tr>
          <th>PCF ID</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Amount</th>
          <th>Emission per Unit</th>
          <th>version</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="pcf of pcfs" class="hover cursor-pointer" @click="navigateTo(`/me/published/${pcf.pcfId}`)">
          <th>{{ pcf.pcfId }}</th>
          <td>{{ pcf.productId }}</td>
          <td>{{ pcf.productName }}</td>
          <td>{{ pcf.amount }}</td>
          <td>{{ pcf.emissionPerUnit }}</td>
          <td>{{ pcf.version }}</td>
          <td>
            <a class="text-success" v-if="pcf.pcfStatus === 'active'">Active</a>
            <a class="text-error" v-else-if="pcf.pcfStatus === 'deprecated'">Deprecated</a>
            <a class="text-warning" v-else>{{ pcf.pcfStatus }}</a>
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
import type { Authenticator } from '~/global'

useBreadcrumb('All published PCFs')

const searchTypes = {
  productName: 'Name',
  pcfId: 'ID',
  productId: 'Product ID',
}

const search = reactive({
  term: '',
  type: 'productId' as keyof typeof searchTypes,
  page: 1,
  limit: 10
})

const query = computed(() => {
  const query: Record<string, string> = {}

  if (search.term) {
    query[search.type] = search.term
  }

  const page = search.page >= 1 ? search.page : 1
  const offset = (page - 1) * search.limit

  query.limit = search.limit.toString()
  query.offset = offset.toString()

  return query
})

const getData = async () => {
  const { pcfs } = await api.get<{ pcfs: PCF[], lastEvaluatedKey?: string }>('/pcf', {
    query: { dataOwnerId: auth.user?.userId, ...query.value }
  })

  return pcfs
}

const api = inject<MandeInstance>('api')!
const auth = useAuthenticator() as Authenticator

const pcfs = ref<PCF[]>([])

onMounted(async () => pcfs.value = await getData())

watch(search, async () => {
  pcfs.value = await getData()
})
</script>