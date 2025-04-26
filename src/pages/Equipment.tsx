
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, Filter, Plus, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface EquipmentItem {
  id: string;
  type: "computer" | "monitor" | "printer" | "server" | "network";
  name: string;
  model: string;
  inventoryNumber: string;
  status: "working" | "maintenance" | "broken";
  location: {
    office: string;
    room: string;
  };
  assignedTo: string | null;
  purchaseDate: string;
  lastService: string | null;
}

const Equipment = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  
  const [equipment] = useState<EquipmentItem[]>([
    {
      id: "1",
      type: "computer",
      name: "ПК Бухгалтерия",
      model: "HP EliteDesk 800 G6",
      inventoryNumber: "PC-2023-001",
      status: "working",
      location: {
        office: "Главный офис",
        room: "301"
      },
      assignedTo: "Иванова Мария",
      purchaseDate: "2023-06-15",
      lastService: "2024-03-10"
    },
    {
      id: "2",
      type: "printer",
      name: "Принтер Отдел продаж",
      model: "HP LaserJet Pro M404dn",
      inventoryNumber: "PR-2022-015",
      status: "maintenance",
      location: {
        office: "Главный офис",
        room: "204"
      },
      assignedTo: null,
      purchaseDate: "2022-12-10",
      lastService: "2024-02-20"
    },
    {
      id: "3",
      type: "server",
      name: "Сервер баз данных",
      model: "Dell PowerEdge R740",
      inventoryNumber: "SV-2022-002",
      status: "working",
      location: {
        office: "Главный офис",
        room: "102"
      },
      assignedTo: null,
      purchaseDate: "2022-05-18",
      lastService: "2024-01-15"
    },
    {
      id: "4",
      type: "monitor",
      name: "Монитор Дизайнера",
      model: "Dell UltraSharp U2720Q",
      inventoryNumber: "MN-2023-008",
      status: "working",
      location: {
        office: "Главный офис",
        room: "305"
      },
      assignedTo: "Петров Алексей",
      purchaseDate: "2023-02-22",
      lastService: null
    },
    {
      id: "5",
      type: "network",
      name: "Коммутатор этаж 2",
      model: "Cisco Catalyst 2960",
      inventoryNumber: "NW-2021-003",
      status: "broken",
      location: {
        office: "Главный офис",
        room: "202"
      },
      assignedTo: null,
      purchaseDate: "2021-11-05",
      lastService: "2023-10-17"
    },
    {
      id: "6",
      type: "computer",
      name: "ПК Директора",
      model: "Dell OptiPlex 7090",
      inventoryNumber: "PC-2023-004",
      status: "working",
      location: {
        office: "Главный офис",
        room: "101"
      },
      assignedTo: "Смирнов Андрей",
      purchaseDate: "2023-07-20",
      lastService: "2024-02-05"
    }
  ]);

  const statusBadgeColors = {
    working: "bg-green-100 text-green-800",
    maintenance: "bg-yellow-100 text-yellow-800",
    broken: "bg-red-100 text-red-800"
  };

  const statusLabels = {
    working: "Рабочее",
    maintenance: "На обслуживании",
    broken: "Неисправно"
  };

  const typeIcons = {
    computer: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    monitor: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    printer: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>,
    server: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>,
    network: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
  };

  const typeLabels = {
    computer: "Компьютер",
    monitor: "Монитор",
    printer: "Принтер",
    server: "Сервер",
    network: "Сетевое оборудование"
  };

  const filteredEquipment = equipment.filter(item => {
    // Search filter
    const matchesSearch = searchQuery === "" || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inventoryNumber.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === "all" || item.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Оборудование</CardTitle>
            <p className="text-sm text-gray-500">Управление всем оборудованием компании</p>
          </div>
          {isAdmin && (
            <Button className="bg-autopartner-primary hover:bg-autopartner-dark">
              <Plus className="h-4 w-4 mr-1" />
              Добавить оборудование
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Поиск по названию, модели, инвентарному номеру..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Статус" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="working">Рабочее</SelectItem>
                    <SelectItem value="maintenance">На обслуживании</SelectItem>
                    <SelectItem value="broken">Неисправно</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="computer">Компьютер</SelectItem>
                  <SelectItem value="monitor">Монитор</SelectItem>
                  <SelectItem value="printer">Принтер</SelectItem>
                  <SelectItem value="server">Сервер</SelectItem>
                  <SelectItem value="network">Сетевое оборудование</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="list" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="list">Список</TabsTrigger>
              <TabsTrigger value="grid">Плитка</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="w-full">
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название/Модель</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Инв. номер</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Местоположение</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Сотрудник</th>
                      {isAdmin && <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEquipment.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                              {typeIcons[item.type]}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {typeLabels[item.type]}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.model}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.inventoryNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={statusBadgeColors[item.status]}>
                            {statusLabels[item.status]}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.location.office}</div>
                          <div className="text-sm text-gray-500">Комната {item.location.room}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.assignedTo || "—"}
                        </td>
                        {isAdmin && (
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-900">
                              Изменить
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEquipment.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center mb-3">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {typeIcons[item.type]}
                      </div>
                      <div className="ml-3">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{typeLabels[item.type]}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Модель:</span>
                        <span className="font-medium">{item.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Инв. номер:</span>
                        <span className="font-medium">{item.inventoryNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Статус:</span>
                        <Badge className={statusBadgeColors[item.status]}>
                          {statusLabels[item.status]}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Местоположение:</span>
                        <span className="font-medium">{item.location.office}, к.{item.location.room}</span>
                      </div>
                      {item.assignedTo && (
                        <div className="flex justify-between">
                          <span className="text-gray-500">Сотрудник:</span>
                          <span className="font-medium">{item.assignedTo}</span>
                        </div>
                      )}
                    </div>
                    {isAdmin && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Подробнее
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

export default Equipment;
