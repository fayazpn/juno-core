import { useAppSelector } from 'store/hooks'
import { selectIsAvatarVisible } from 'store/utilsSlice'
import * as GS from 'styles/globalStyles'
import getRandomColor from 'utils/getRandomColor'
import getUserInitials from 'utils/getUserInitials'

import * as S from './EmailAvatarStyles'

/**
 * @component EmailAvatar
 * @param avatarURL - the string representing the email of the user
 * @returns an avatar or empty div depending on the outcome of the initialCreator function
 */

export const EmailAvatarComponent = ({ userEmail }: { userEmail: string }) => {
  const staticInitials = getUserInitials(userEmail)
  return (
    <S.EmailAvatarContainer
      data-testid="avatar"
      randomColor={getRandomColor(staticInitials)}
    >
      <GS.Span small>{staticInitials}</GS.Span>
    </S.EmailAvatarContainer>
  )
}

const EmailAvatar = ({ userEmail }: { userEmail: string }) => {
  const isAvatarVisible = useAppSelector(selectIsAvatarVisible)

  return isAvatarVisible ? (
    <EmailAvatarComponent userEmail={userEmail} />
  ) : (
    <div data-testid="avatar" />
  )
}

export default EmailAvatar
