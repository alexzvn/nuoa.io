import awsconfig from '~/aws-exports'
import { Amplify } from 'aws-amplify'

import '@aws-amplify/ui-vue/styles.css'

export default defineNuxtPlugin(() => {
  Amplify.configure(awsconfig)
})