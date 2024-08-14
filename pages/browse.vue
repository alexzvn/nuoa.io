
<template>
  <transition name="fade" appear>
    <div v-if="status?.success" role="alert" class="alert bg-green-200 shadow my-3">
      <Icon name="fa:paper-plane" class="text-success size-7" @click="status = undefined" />

      <span>{{ status.message }}</span>

      <button class="btn btn-sm btn-ghost btn-circle">
        <Icon name="ic:close" class="size-6" />
      </button>
    </div>

    <div v-else-if="status?.success === false" role="alert" class="alert bg-red-200 shadow my-3" >
      <Icon name="fa:paper-plane" class="text-error size-7" @click="status = undefined" />

      <span>{{ status.message }}</span>

      <button class="btn btn-sm btn-ghost btn-circle">
        <Icon name="ic:close" class="size-6" />
      </button>
    </div>
  </transition>

  <DataViewPaginate class="min-h-[60vh]" v-model:page="search.page" v-model:limit="search.limit">
    <template #title>
      <div class="flex space-x-3">
        <h3 class="card-title">Available PCFs</h3>
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
    </template>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Data Owner</th>
          <th>Version</th>
          <th>Published</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in pcfs" class="hover">
          <th>{{ item.pcfId }}</th>
          <td>{{ item.productId }}</td>
          <td>{{ item.productName }}</td>
          <td>{{ item.dataOwnerId ?? '---' }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.datePublished.split('-').reverse().map(it => +it).join('/') }}</td>
          <td v-if="user?.userId !== item.dataOwnerId">
            <a class="link text-blue-600" @click="requester!.open(item)">Request Access</a >
            <!-- <span class="text-yellow-500">Pending</span> -->
          </td>
          <td v-else>---</td>
        </tr>
      </tbody>
    </table>
  </DataViewPaginate>

  <Teleport to="body">
    <RequestDialog ref="requester" @status="event => status = event"/>
  </Teleport>
  
</template>

<script lang="ts" setup>
import DataViewPaginate from '~/components/DataViewPaginate.vue'
import RequestDialog, { type SubmitResponse } from './browse/RequestDialog.vue'
import { useMande, type PCF } from '~/composables/useMande'
import { useAuthenticator } from '@aws-amplify/ui-vue'
import type { Authenticator } from '~/global'

const searchTypes = {
  productName: 'Name',
  pcfId: 'ID',
  productId: 'Product ID',
  dataOwnerId: 'Data Owner ID'
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
    query: { dataOwnerId: '', approvedRecipients: '', ...query.value }
  })

  return pcfs
}

const requester = ref<InstanceType<typeof RequestDialog>>()
const status = ref<SubmitResponse>()
const api = await useMande()
const { user } = useAuthenticator() as Authenticator
const pcfs = ref(new Array<PCF>())

useBreadcrumb('Browse PCFs Page')

onMounted(async () => {
  pcfs.value = await getData()
})

watch(search, async () => {
  pcfs.value = await getData().catch(() => [])
})
</script>
