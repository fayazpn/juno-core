import type { ReactNode } from 'react'

import { useAppDispatch } from 'store/hooks'
import { setInSearch } from 'store/utilsSlice'

import * as S from './ListItemStyles'

export type TListItemType = 'Link' | 'Command'

const ListItemContent = ({
  children,
  itemType = 'Command',
  showType = true,
  icon = null,
}: {
  children: ReactNode
  showType?: boolean
  itemType?: TListItemType
  icon?: JSX.Element | null
}) => (
  <>
    <S.IconTitleContainer>
      {icon && <S.IconContainer>{icon}</S.IconContainer>}
      {typeof children === 'string' ? (
        // TODO: Apply max width and truncate
        <span>{children}</span>
      ) : (
        // <span className="max-w-md truncate">{children}</span>
        children
      )}
    </S.IconTitleContainer>
    {showType && <S.Label>{itemType}</S.Label>}
  </>
)

const ListItem = ({
  closeOnSelect = true,
  showType = true,
  itemType = 'Command',
  // keywords = [],
  item: { onClick, icon, children },
  focusedItemIndex,
  index,
}: {
  closeOnSelect?: boolean
  // keywords?: string[]
  showType?: boolean
  itemType?: TListItemType
  item: {
    onClick?: any
    icon?: JSX.Element | null | undefined
    children: ReactNode
  } // TODO: type this better
  focusedItemIndex: number
  index: number
}) => {
  const dispatch = useAppDispatch()

  const clickAndClose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(e)

      if (closeOnSelect) {
        dispatch(setInSearch(false))
      }
    }
  }

  return (
    <S.ListItemButton
      isFocused={index === focusedItemIndex}
      onClick={clickAndClose}
      // The className is used to target it.
      className="command-palette-list-item"
      data-cy="command-palette-list-item"
    >
      <ListItemContent showType={showType} itemType={itemType} icon={icon}>
        {children}
      </ListItemContent>
    </S.ListItemButton>
  )
}

export default ListItem
