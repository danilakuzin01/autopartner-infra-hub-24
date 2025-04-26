
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Filter, Plus, Search, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  position: string;
  department: string;
  location: {
    office: string;
    room: string;
  };
  contact: string;
  equipment: string[];
  accounts: {
    system: string;
    login: string;
  }[];
  status: "active" | "inactive";
}

const Users = () => {
  const { user: currentUser } = useAuth();
  const isAdmin = currentUser?.role === "admin";
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  
  const [users] = useState<UserData[]>([
    {
      id: "1",
      name: "Смирнов Андрей Петрович",
      email: "smirnov@autopartner.com",
      role: "admin",
      position: "Генеральный директор",
      department: "Руководство",
      location: {
        office: "Главный офис",
        room: "101"
      },
      contact: "+7 (999) 123-45-67",
      equipment: ["PC-2023-004", "MN-2022-001"],
      accounts: [
        { system: "1C", login: "smirnov" },
        { system: "CRM", login: "director" }
      ],
      status: "active"
    },
    {
      id: "2",
      name: "Иванова Мария Александровна",
      email: "ivanova@autopartner.com",
      role: "user",
      position: "Главный бухгалтер",
      department: "Бухгалтерия",
      location: {
        office: "Главный офис",
        room: "301"
      },
      contact: "+7 (999) 234-56-78",
      equipment: ["PC-2023-001"],
      accounts: [
        { system: "1C", login: "ivanova" },
        { system: "Банк-Клиент", login: "buh1" }
      ],
      status: "active"
    },
    {
      id: "3",
      name: "Петров Алексей Владимирович",
      email: "petrov@autopartner.com",
      role: "user",
      position: "Дизайнер",
      department: "Маркетинг",
      location: {
        office: "Главный офис",
        room: "305"
      },
      contact: "+7 (999) 345-67-89",
      equipment: ["PC-2023-002", "MN-2023-008"],
      accounts: [
        { system: "Adobe CC", login: "petrov" }
      ],
      status: "active"
    },
    {
      id: "4",
      name: "Сидоров Игорь Михайлович",
      email: "sidorov@autopartner.com",
      role: "user",
      position: "Менеджер по продажам",
      department: "Отдел продаж",
      location: {
        office: "Главный офис",
        room: "201"
      },
      contact: "+7 (999) 456-78-90",
      equipment: ["PC-2022-010"],
      accounts: [
        { system: "CRM", login: "sidorov" },
        { system: "1C", login: "sid" }
      ],
      status: "inactive"
    },
    {
      id: "5",
      name: "Козлова Ольга Павловна",
      email: "kozlova@autopartner.com",
      role: "user",
      position: "Бухгалтер",
      department: "Бухгалтерия",
      location: {
        office: "Главный офис",
        room: "301"
      },
      contact: "+7 (999) 567-89-01",
      equipment: ["PC-2022-015"],
      accounts: [
        { system: "1C", login: "kozlova" }
      ],
      status: "active"
    },
    {
      id: "6",
      name: "Николаев Артем Александрович",
      email: "nikolaev@autopartner.com",
      role: "admin",
      position: "Системный администратор",
      department: "IT-отдел",
      location: {
        office: "Главный офис",
        room: "102"
      },
      contact: "+7 (999) 678-90-12",
      equipment: ["PC-2023-005", "LT-2022-001"],
      accounts: [
        { system: "Серверы", login: "admin" },
        { system: "1C", login: "admin" },
        { system: "CRM", login: "admin" }
      ],
      status: "active"
    }
  ]);

  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.position.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role filter
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    
    // Department filter
    const matchesDepartment = departmentFilter === "all" || user.department === departmentFilter;
    
    return matchesSearch && matchesRole && matchesDepartment;
  });

  const departments = Array.from(new Set(users.map(user => user.department)));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Пользователи</CardTitle>
            <p className="text-sm text-gray-500">Управление сотрудниками и их доступами</p>
          </div>
          {isAdmin && (
            <Button className="bg-autopartner-primary hover:bg-autopartner-dark">
              <Plus className="h-4 w-4 mr-1" />
              Добавить сотрудника
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск по имени, email, должности..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все роли</SelectItem>
                    <SelectItem value="admin">Администраторы</SelectItem>
                    <SelectItem value="user">Пользователи</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Отдел" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все отделы</SelectItem>
                  {departments.map(department => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">Список</TabsTrigger>
              <TabsTrigger value="grid">Карточки</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="w-full">
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сотрудник</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Должность</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Отдел</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Местоположение</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                      {isAdmin && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Avatar>
                                <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                              </Avatar>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.position}</div>
                          <Badge variant="outline" className={user.role === "admin" ? "border-blue-500 text-blue-700" : "border-gray-500 text-gray-700"}>
                            {user.role === "admin" ? "Администратор" : "Пользователь"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{user.location.office}</div>
                          <div className="text-sm text-gray-500">Кабинет {user.location.room}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                            {user.status === "active" ? "Активен" : "Неактивен"}
                          </span>
                        </td>
                        {isAdmin && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                              Профиль
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Должность:</span>
                        <span className="text-sm font-medium">{user.position}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Отдел:</span>
                        <span className="text-sm font-medium">{user.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Размещение:</span>
                        <span className="text-sm font-medium">{user.location.office}, к.{user.location.room}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Контакт:</span>
                        <span className="text-sm font-medium">{user.contact}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Роль:</span>
                        <Badge variant="outline" className={user.role === "admin" ? "border-blue-500 text-blue-700" : "border-gray-500 text-gray-700"}>
                          {user.role === "admin" ? "Администратор" : "Пользователь"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Статус:</span>
                        <span className={`px-2 text-xs leading-5 font-semibold rounded-full
                          ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                          {user.status === "active" ? "Активен" : "Неактивен"}
                        </span>
                      </div>
                    </div>
                    {isAdmin && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Профиль
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
