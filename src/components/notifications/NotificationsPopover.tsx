
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Обновление системы',
    message: 'Запланировано техническое обслуживание серверов в 22:00',
    timestamp: '2024-04-26 15:30',
    read: false,
  },
  {
    id: '2',
    title: 'Новое оборудование',
    message: 'Поступила новая партия мониторов Dell',
    timestamp: '2024-04-26 14:15',
    read: false,
  },
];

const NotificationsPopover = () => {
  const [notifications, setNotifications] = React.useState(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-2">
          <h4 className="font-medium leading-none mb-3">Уведомления</h4>
          {notifications.length === 0 ? (
            <p className="text-sm text-muted-foreground">Нет новых уведомлений</p>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 rounded-lg ${
                    notification.read ? 'bg-muted/50' : 'bg-muted'
                  }`}
                >
                  <h5 className="font-medium text-sm">{notification.title}</h5>
                  <p className="text-sm text-muted-foreground">
                    {notification.message}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    {notification.timestamp}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
