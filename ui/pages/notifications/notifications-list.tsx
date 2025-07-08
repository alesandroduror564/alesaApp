import React from 'react';
import { useSelector } from 'react-redux';
import { Box } from '../../components/component-library';
import {
  BlockSize,
  Display,
  JustifyContent,
  FlexDirection,
  AlignItems,
} from '../../helpers/constants/design-system';
import Preloader from '../../components/ui/icon/preloader/preloader-icon.component';
import { selectIsMetamaskNotificationsEnabled } from '../../selectors/alesaapp-notifications/alesaapp-notifications';
import { useI18nContext } from '../../hooks/useI18nContext';
import { NotificationsPlaceholder } from './notifications-list-placeholder';
import { NotificationsListTurnOnNotifications } from './notifications-list-turn-on-notifications';
import { NotificationsListItem } from './notifications-list-item';
import type { Notification } from './notifications';
import { NotificationsListReadAllButton } from './notifications-list-read-all-button';

export type NotificationsListProps = {
  activeTab: TAB_KEYS;
  notifications: Notification[];
  isLoading: boolean;
  isError: boolean;
  notificationsCount: number;
};

export enum TAB_KEYS {
  ALL = 'notifications-all-tab',
  WALLET = 'notifications-wallet-tab',
  WEB3 = 'notifications-other-tab',
}

function LoadingContent() {
  return (
    <Box
      height={BlockSize.Full}
      width={BlockSize.Full}
      display={Display.Flex}
      justifyContent={JustifyContent.center}
      alignItems={AlignItems.center}
      flexDirection={FlexDirection.Column}
      data-testid="notifications-list-loading"
    >
      <Preloader size={36} />
    </Box>
  );
}

function EmptyContent() {
  const t = useI18nContext();
  return (
    <NotificationsPlaceholder
      title={t('notificationsPageEmptyTitle')}
      text={t('notificationsPageNoNotificationsContent')}
    />
  );
}

function ErrorContent() {
  const t = useI18nContext();
  return (
    <NotificationsPlaceholder
      title={t('notificationsPageErrorTitle')}
      text={t('notificationsPageErrorContent')}
    />
  );
}

function NotificationItem({ notification }: { notification: Notification }) {
  return <NotificationsListItem notification={notification} />;
}

function NotificationsListStates({
  activeTab,
  notifications,
  isLoading,
  isError,
}: NotificationsListProps) {
  const isMetamaskNotificationsEnabled = useSelector(
    selectIsMetamaskNotificationsEnabled,
  );

  if (activeTab === TAB_KEYS.WALLET && !isMetamaskNotificationsEnabled) {
    return <NotificationsListTurnOnNotifications />;
  }

  if (isLoading) {
    return <LoadingContent />;
  }

  if (isError) {
    return <ErrorContent />;
  }

  if (notifications.length === 0) {
    return <EmptyContent />;
  }

  return (
    <>
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </>
  );
}

export function NotificationsList({
  activeTab,
  notifications,
  isLoading,
  isError,
  notificationsCount,
}: NotificationsListProps) {
  return (
    <Box
      data-testid="notifications-list"
      height={BlockSize.Full}
      width={BlockSize.Full}
      className="notifications__list"
    >
      <NotificationsListStates
        activeTab={activeTab}
        notifications={notifications}
        isLoading={isLoading}
        isError={isError}
      />
      {notifications.length > 0 && notificationsCount > 0 ? (
        <NotificationsListReadAllButton notifications={notifications} />
      ) : null}
    </Box>
  );
}
