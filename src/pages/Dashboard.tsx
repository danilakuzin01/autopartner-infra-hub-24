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

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="w-8 h-8 mr-3 rounded-full bg-blue-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Статус систем
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Серверы</span>
                  <span className="text-sm text-green-600">100%</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Сеть</span>
                  <span className="text-sm text-green-600">98%</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Камеры</span>
                  <span className="text-sm text-yellow-600">94%</span>
                </div>
                <div className="h-2 bg-blue-100 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '94%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="w-8 h-8 mr-3 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              Активные задачи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-2xl font-bold">{tasks.filter(t => t.status !== 'completed').length}</p>
                  <p className="text-sm text-gray-500">Требуют внимания</p>
                </div>
                <div className="flex gap-2">
                  <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100">
                    {tasks.filter(t => t.priority === 'high').length} срочных
                  </Badge>
                </div>
              </div>
              <Button variant="outline" className="w-full">Просмотреть все</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <div className="w-8 h-8 mr-3 rounded-full bg-purple-500/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Сотрудники
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">47</p>
                  <p className="text-sm text-gray-500">Всего</p>
                </div>
                <div className="bg-white/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-500">Админы</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Управление</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Объявления</CardTitle>
              <CardDescription>Важная информация для сотрудников</CardDescription>
            </div>
            {isAdmin && (
              <Button variant="outline" size="sm" className="ml-auto">
                <Plus className="h-4 w-4 mr-1" />
                Добавить
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {announcements.map((announcement) => (
              <Card key={announcement.id} className="bg-white/50">
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-base">{announcement.title}</CardTitle>
                    <span className="text-xs text-gray-500">{announcement.date}</span>
                  </div>
                  <CardDescription>{announcement.content}</CardDescription>
                  <div className="text-xs text-gray-500 mt-2">Автор: {announcement.author}</div>
                </CardHeader>
              </Card>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Задачи</CardTitle>
              <CardDescription>Текущие задания для IT-отдела</CardDescription>
            </div>
            {isAdmin && (
              <Button variant="outline" size="sm" className="ml-auto">
                <Plus className="h-4 w-4 mr-1" />
                Добавить
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">Все</TabsTrigger>
                <TabsTrigger value="active">В работе</TabsTrigger>
                <TabsTrigger value="completed">Выполнено</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {tasks.map((task) => (
                  <Card key={task.id} className="bg-white/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <Badge className={
                          task.priority === "high" ? "bg-red-100 text-red-800" :
                          task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {task.priority === "high" ? "Срочно" :
                           task.priority === "medium" ? "Средний" :
                           "Низкий"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">Срок: {task.dueDate}</span>
                        <Badge variant="outline" className={
                          task.status === "completed" ? "border-green-500 text-green-700" :
                          task.status === "in-progress" ? "border-yellow-500 text-yellow-700" :
                          "border-gray-500 text-gray-700"
                        }>
                          {task.status === "completed" ? (
                            <span className="flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Выполнено
                            </span>
                          ) : task.status === "in-progress" ? "В процессе" : "Ожидает"}
                        </Badge>
                      </div>
                      {isAdmin && task.status !== "completed" && (
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          <Check className="h-4 w-4 mr-1" />
                          Отметить как выполненное
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="active" className="space-y-4">
                {tasks.filter(t => t.status !== "completed").map((task) => (
                  <Card key={task.id} className="bg-white/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <Badge className={
                          task.priority === "high" ? "bg-red-100 text-red-800" :
                          task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {task.priority === "high" ? "Срочно" :
                           task.priority === "medium" ? "Средний" :
                           "Низкий"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">Срок: {task.dueDate}</span>
                        <Badge variant="outline" className={
                          task.status === "completed" ? "border-green-500 text-green-700" :
                          task.status === "in-progress" ? "border-yellow-500 text-yellow-700" :
                          "border-gray-500 text-gray-700"
                        }>
                          {task.status === "completed" ? (
                            <span className="flex items-center">
                              <Check className="h-3 w-3 mr-1" />
                              Выполнено
                            </span>
                          ) : task.status === "in-progress" ? "В процессе" : "Ожидает"}
                        </Badge>
                      </div>
                      {isAdmin && task.status !== "completed" && (
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          <Check className="h-4 w-4 mr-1" />
                          Отметить как выполненное
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="completed" className="space-y-4">
                {tasks.filter(t => t.status === "completed").map((task) => (
                  <Card key={task.id} className="bg-white/50">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        </div>
                        <Badge className={
                          task.priority === "high" ? "bg-red-100 text-red-800" :
                          task.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                          "bg-blue-100 text-blue-800"
                        }>
                          {task.priority === "high" ? "Срочно" :
                           task.priority === "medium" ? "Средний" :
                           "Низкий"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500">Срок: {task.dueDate}</span>
                        <Badge variant="outline" className={
                          task.status === "completed" ? "border-green-500 text-green-700" :
                          task.status === "in-progress" ? "border-yellow-500 text-yellow-700" :
                          "border-gray-500 text-gray-700"
                        }>
                          <Check className="h-3 w-3 mr-1" />
                          Выполнено
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
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
