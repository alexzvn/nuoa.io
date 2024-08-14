<template>
  <div class="min-h-screen">
    <div v-if="request" class="max-w-3xl mx-auto">
      <DataViewPaginate>
        <template #title>
          <h3 class="card-title font-bold">Request Detail:</h3>
          <hr>
        </template>

        <div class="space-y-3">
          <p><strong>From:</strong> {{ extra.requestorId }}</p>
          <p><strong>Seeking permission for PCF ID:</strong> {{ extra.pcfId }}</p>
          <p><strong>Message:</strong></p>
          <div class="form-control">
            <textarea rows="3" class="textarea textarea-bordered" readonly>{{ request.message }}</textarea>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-between py-3 px-4">
            <div class="grid place-content-center">
              <strong>Action to do:</strong>
            </div>

            <div class="flex space-x-3">
              <button class="btn btn-primary btn-sm" @click="action('approved')">Accept</button>
              <button class="btn btn-error btn-sm" @click="action('denied')">Deny</button>
            </div>
          </div>
        </template>

      </DataViewPaginate>

    </div>
  </div>
</template>

<script lang="ts" setup>
import type { MandeError, MandeInstance } from 'mande'
import DataViewPaginate from '~/components/DataViewPaginate.vue'

const id = decodeURIComponent(useRoute().params.id as string)
const router = useRouter()
const api = inject<MandeInstance>('api')!
const request = ref<RequestAccess>()

const extra = computed(() => {
  const [pcfId, requestorId] = request.value?.requestId.split(',') || []

  return { pcfId, requestorId }
})

const action = async (status: 'approved' | 'denied') => {
  return api.patch('/request/' + id, {
    requestStatus: status,
    requesterId: id,
    message: request.value?.message
  }).then(() => {
    alert('Request status updated')
  }).catch((error: MandeError) => {
    alert(error.body.message ?? 'Failed to update status for this request!')
  })
}

onMounted(async () => {
  const response = await api.get<{ requests: RequestAccess[] }>('/request/', {
    query: { requestId: id }
  })

  request.value = response.requests.find((it) => {
    return it.requestId === id
  })

  if (!request.value) {
    router.push('/me/incoming')
  }
})
</script>