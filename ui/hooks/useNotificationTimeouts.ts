import { useDispatch } from 'react-redux';
import { deleteNotificationsById } from '../store/actions';
import { NOTIFICATIONS_EXPIRATION_DELAY } from '../helpers/constants/notifications';

export const useSnapNotificationTimeouts = () => {
  const dispatch = useDispatch();

  const setNotificationTimeout = (id: string) => {
    setTimeout(() => dispatch(deleteNotificationsById([id])), NOTIFICATIONS_EXPIRATION_DELAY);
  };

  return { setNotificationTimeout };
};
