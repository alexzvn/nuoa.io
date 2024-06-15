import awsconfig from '~/aws-exports'
import { Amplify } from 'aws-amplify'

import '@aws-amplify/ui-vue/styles.css'

export default defineNuxtPlugin(() => {

  const aws_cloud_logic_custom: any = [
    {
      name: 'api',
      endpoint: 'https://02ogagzgth.execute-api.ap-southeast-1.amazonaws.com',
      region: 'ap-southeast-1'
    }
  ]

  Amplify.configure({
    ...awsconfig,

    // @ts-ignore
    aws_cloud_logic_custom
  })
})