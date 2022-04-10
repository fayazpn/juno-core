import axios, { AxiosResponse } from 'axios'
import Session from 'supertokens-auth-react/recipe/session'
import { BASE_API_URL, errorHandling } from './api'

Session.addAxiosInterceptors(axios)

const messageApi = () => ({
  getMessageDetail: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/message/${messageId}`
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },

  getAttachment: async ({
    messageId,
    attachmentId,
  }: {
    messageId: string
    attachmentId: string
  }) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${BASE_API_URL}/api/message/attachment/${messageId}/${attachmentId}`
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },

  sendMessage: async (data: any) => {
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/send-message`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  updateMessage: async (props: any) => {
    const { messageId, request } = props
    try {
      const res: AxiosResponse<any> = await axios.patch(
        `${BASE_API_URL}/api/message/${messageId}`,
        request
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  thrashMessage: async ({ messageId }: { messageId: string }) => {
    const data = {}
    try {
      const res: AxiosResponse<any> = await axios.post(
        `${BASE_API_URL}/api/message/thrash/${messageId}`,
        data
      )
      return res
    } catch (err) {
      return errorHandling(err)
    }
  },
  // unThrashMessage: (messageId) => {
  //   console.log('trashed')
  //   return axios
  //     .post(`/api/message/thrash/${messageId}`)
  //     .then((res) => res.data)
  //     .catch((err) => console.log(err))
  // },
  deleteMessage: async (messageId: string) => {
    try {
      const res: AxiosResponse<any> = await axios.delete(
        `${BASE_API_URL}/api/message/`,
        {
          data: { id: messageId },
        }
      )
      return res.data
    } catch (err) {
      return errorHandling(err)
    }
  },
})

export default messageApi
