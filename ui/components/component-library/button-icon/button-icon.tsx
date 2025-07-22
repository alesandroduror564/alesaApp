import React from 'react';
import classnames from 'classnames';

import {
  AlignItems,
  BackgroundColor,
  BorderRadius,
  Display,
  IconColor,
  JustifyContent,
} from '../../../helpers/constants/design-system';

import { Box, BoxProps, PolymorphicRef } from '../box';
import { Icon, IconSize } from '../icon';
import {
  ButtonIconSize,
  ButtonIconProps,
  ButtonIconComponent,
} from './button-icon.types';

const buttonIconSizeToIconSize: Record<ButtonIconSize, IconSize> = {
  [ButtonIconSize.Sm]: IconSize.Sm,
  [ButtonIconSize.Md]: IconSize.Md,
  [ButtonIconSize.Lg]: IconSize.Lg
};

export const ButtonIcon: ButtonIconComponent = React.forwardRef(
<C extends React.ElementType = 'button' | 'a'>(
{
ariaLabel, as, className = '', color = IconColor.iconDefault, href, size = ButtonIconSize.Lg, iconName, disabled=false , iconProps={}, ...props
}: ButtonIconProps<C>, ref?: PolymorphicRef<C>
) => {
const tag = href ? 'a' : as || 'button'; 
return (
<Box 
aria-label={ariaLabel}
as={tag}
className={classnames('mm-button-icon', `mm-button-icon--size-${String(size)}`, {'mm-button-icon--disabled': disabled}, className)}
color={color}
disabled={tag === 'button' && disabled}
display={Display.InlineFlex} justifyContent={JustifyContent.center} alignItems={AlignItems.center} borderRadius={BorderRadius.LG} backgroundColor={BackgroundColor.transparent}
href={!disabled && href ? { href } : {} }
ref={!disabled && ref }
{...props as BoxProps<C>}
>
<Icon name={iconName} size={button
