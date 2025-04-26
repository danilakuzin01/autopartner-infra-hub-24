
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  status: "pending" | "in-progress" | "completed";
  assignedTo: string;
  dueDate: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [announcements] = useState<Announcement[]>([
    {
      id: "1",
      title: "Плановые работы на сервере",
      content: "Уважаемые коллеги! 28 апреля с 22:00 до 23:00 будут проводиться плановые технические работы на сервере. Возможны кратковременные перебои в работе корпоративных приложений.",
      date: "2025-04-25",
      author: "Системный администратор",
    },
    {
      id: "2",
      title: "Обновление антивирусного ПО",
      content: "29 апреля будет произведено автоматическое обновление антивирусного ПО на всех рабочих станциях. Перезагрузка компьютеров потребуется.",
      date: "2025-04-26",
      author: "Системный администратор",
    },
  ]);

  const [tasks] = useState<Task[]>([
    {
      id: "1",
      title: "Настройка сетевого принтера",
      description: "Настроить сетевой принтер в отделе бухгалтерии, комната 305",
      priority: "medium",
      status: "in-progress",
      assignedTo: "Системный администратор",
      dueDate: "2025-04-27",
    },
    {
      id: "2",
      title: "Обновление ПО на серверах",
      description: "Выполнить плановое обновление ПО на всех серверах",
      priority: "high",
      status: "pending",
      assignedTo: "Системный администратор",
      dueDate: "2025-04-28",
    },
    {
      id: "3",
      title: "Проверка работоспособности камер",
      description: "Проверить работоспособность всех камер видеонаблюдения",
      priority: "low",
      status: "completed",
      assignedTo: "Системный администратор",
      dueDate: "2025-04-25",
    },
  ]);

  const priorityColors = {
    low: "bg-blue-100 text-blue-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    pending: "bg-gray-100 text-gray-800",
    "in-progress": "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Оборудование</CardTitle>
            <CardDescription>Общая статистика</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Всего устройств:</span>
                <span className="font-medium">127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Рабочих:</span>
                <span className="font-medium text-green-600">120</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Неисправных:</span>
                <span className="font-medium text-red-600">7</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Подробнее</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Пользователи</CardTitle>
            <CardDescription>Статистика по сотрудникам</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Всего сотрудников:</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Администраторов:</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Пользователей:</span>
                <span className="font-medium">44</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Подробнее</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Безопасность</CardTitle>
            <CardDescription>Статус системы наблюдения</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Всего камер:</span>
                <span className="font-medium">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Онлайн:</span>
                <span className="font-medium text-green-600">30</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Офлайн:</span>
                <span className="font-medium text-red-600">2</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">Подробнее</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Объявления</CardTitle>
              <CardDescription>Важная информация для всех сотрудников</CardDescription>
            </div>
            {isAdmin && (
              <Button size="sm" variant="outline" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Новое
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-lg">{announcement.title}</h3>
                  <span className="text-xs text-gray-500">{announcement.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{announcement.content}</p>
                <div className="text-xs text-gray-500">Автор: {announcement.author}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-xl">Задачи</CardTitle>
              <CardDescription>Текущие задания для IT-отдела</CardDescription>
            </div>
            {isAdmin && (
              <Button size="sm" variant="outline" className="h-8">
                <Plus className="h-4 w-4 mr-1" />
                Добавить
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="pending">В работе</TabsTrigger>
                <TabsTrigger value="completed">Выполнено</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4 mt-4">
                {tasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-3 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <p className="text-sm text-gray-600">{task.description}</p>
                      </div>
                      <Badge className={priorityColors[task.priority]}>
                        {task.priority === "low" && "Низкий"}
                        {task.priority === "medium" && "Средний"}
                        {task.priority === "high" && "Высокий"}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Срок: {task.dueDate}</span>
                      <Badge className={statusColors[task.status]}>
                        {task.status === "pending" && "Ожидает"}
                        {task.status === "in-progress" && "В процессе"}
                        {task.status === "completed" && (
                          <span className="flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Выполнено
                          </span>
                        )}
                      </Badge>
                    </div>
                    {isAdmin && task.status !== "completed" && (
                      <Button size="sm" variant="outline" className="w-full mt-1">
                        <Check className="h-4 w-4 mr-1" />
                        Отметить как выполненное
                      </Button>
                    )}
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="pending" className="space-y-4 mt-4">
                {tasks
                  .filter((task) => task.status !== "completed")
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <Badge className={priorityColors[task.priority]}>
                          {task.priority === "low" && "Низкий"}
                          {task.priority === "medium" && "Средний"}
                          {task.priority === "high" && "Высокий"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Срок: {task.dueDate}</span>
                        <Badge className={statusColors[task.status]}>
                          {task.status === "pending" && "Ожидает"}
                          {task.status === "in-progress" && "В процессе"}
                        </Badge>
                      </div>
                      {isAdmin && (
                        <Button size="sm" variant="outline" className="w-full mt-1">
                          <Check className="h-4 w-4 mr-1" />
                          Отметить как выполненное
                        </Button>
                      )}
                    </div>
                  ))}
              </TabsContent>
              <TabsContent value="completed" className="space-y-4 mt-4">
                {tasks
                  .filter((task) => task.status === "completed")
                  .map((task) => (
                    <div key={task.id} className="border rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <h3 className="font-medium">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.description}</p>
                        </div>
                        <Badge className={priorityColors[task.priority]}>
                          {task.priority === "low" && "Низкий"}
                          {task.priority === "medium" && "Средний"}
                          {task.priority === "high" && "Высокий"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Срок: {task.dueDate}</span>
                        <Badge className={statusColors[task.status]}>
                          <Check className="h-3 w-3 mr-1" />
                          Выполнено
                        </Badge>
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
