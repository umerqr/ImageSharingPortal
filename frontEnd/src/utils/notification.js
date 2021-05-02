import { notification } from 'antd';

export const notificationWithIcon = (type, title, message) => {
  notification[type]({
    message: title,
    description: message,
    duration: 2,
  });
};
