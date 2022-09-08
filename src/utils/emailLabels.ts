import * as global from '../constants/globalConstants'
import { IEmailListThreadItem } from '../store/storeTypes/emailListTypes'
import { LabelIdName } from '../store/storeTypes/labelsTypes'
import filterIllegalLabels from './filterIllegalLabels'

/**
 * @function emailLabels
 * @param emailListThreadItem - takes in a the thread item
 * @returns returns the legal email labels for the email thread. If an error occurs, send back the Archive label.
 */

const emailLabels = (
  emailListThreadItem: IEmailListThreadItem,
  storageLabels: LabelIdName[]
) => {
  if (emailListThreadItem?.messages) {
    const getAllLegalMessagesLabelIds = () => {
      const foundLabels: string[] = []
      emailListThreadItem.messages.forEach((message) =>
        message?.labelIds?.forEach((label) => foundLabels.push(label))
      )
      return [
        ...new Set(
          filterIllegalLabels(foundLabels, storageLabels).filter(
            (label) =>
              label !== global.SENT_LABEL && label !== global.DRAFT_LABEL
          )
        ),
      ]
    }
    return getAllLegalMessagesLabelIds() ?? [global.ARCHIVE_LABEL]
  }
  return [global.ARCHIVE_LABEL]
}

export default emailLabels
