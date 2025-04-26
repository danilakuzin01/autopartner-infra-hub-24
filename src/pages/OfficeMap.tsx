
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Network } from "lucide-react";

const OfficeMap = () => {
  const [activeFloor, setActiveFloor] = useState("1");
  
  const computerIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  
  const printerIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
    </svg>
  );
  
  const cameraIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  );
  
  const serverIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  );
  
  const networkIcon = (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );

  const firstFloorDevices = [
    { id: "c1", type: "computer", x: 120, y: 150, status: "working", room: "101", user: "Смирнов А.П." },
    { id: "c2", type: "computer", x: 120, y: 200, status: "working", room: "101", user: "Секретарь" },
    { id: "p1", type: "printer", x: 180, y: 170, status: "working", room: "101", user: "Общий" },
    { id: "cm1", type: "camera", x: 50, y: 50, status: "working", room: "Коридор", user: null },
    { id: "cm2", type: "camera", x: 250, y: 50, status: "broken", room: "Коридор", user: null },
    { id: "s1", type: "server", x: 60, y: 350, status: "working", room: "102", user: null },
    { id: "s2", type: "server", x: 100, y: 350, status: "working", room: "102", user: null },
    { id: "n1", type: "network", x: 250, y: 350, status: "working", room: "102", user: null },
  ];
  
  const secondFloorDevices = [
    { id: "c3", type: "computer", x: 150, y: 120, status: "working", room: "201", user: "Иванов П.С." },
    { id: "c4", type: "computer", x: 200, y: 120, status: "working", room: "201", user: "Петрова А.В." },
    { id: "c5", type: "computer", x: 250, y: 120, status: "maintenance", room: "201", user: "Сидоров И.М." },
    { id: "p2", type: "printer", x: 300, y: 120, status: "working", room: "201", user: "Общий" },
    { id: "cm3", type: "camera", x: 50, y: 50, status: "working", room: "Коридор", user: null },
    { id: "n2", type: "network", x: 250, y: 250, status: "working", room: "202", user: null },
  ];
  
  const thirdFloorDevices = [
    { id: "c6", type: "computer", x: 100, y: 100, status: "working", room: "301", user: "Козлова О.П." },
    { id: "c7", type: "computer", x: 150, y: 100, status: "working", room: "301", user: "Николаев А.А." },
    { id: "c8", type: "computer", x: 100, y: 150, status: "working", room: "301", user: "Михайлова Е.С." },
    { id: "p3", type: "printer", x: 180, y: 130, status: "broken", room: "301", user: "Общий" },
    { id: "cm4", type: "camera", x: 50, y: 50, status: "working", room: "Коридор", user: null },
    { id: "cm5", type: "camera", x: 250, y: 50, status: "working", room: "Коридор", user: null },
    { id: "n3", type: "network", x: 300, y: 200, status: "maintenance", room: "305", user: null },
  ];

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "computer": return computerIcon;
      case "printer": return printerIcon;
      case "camera": return cameraIcon;
      case "server": return serverIcon;
      case "network": return networkIcon;
      default: return null;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "working": return "bg-green-500";
      case "maintenance": return "bg-yellow-500";
      case "broken": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const renderMap = (devices: any[]) => {
    return (
      <div className="relative border border-gray-300 rounded-lg bg-white" style={{ height: "600px", width: "100%" }}>
        {/* This would be replaced with an actual floor map image in a real implementation */}
        <div className="absolute inset-0 bg-gray-50 p-4">
          <div className="border-4 border-gray-300 h-full w-full relative rounded-lg bg-white">
            {/* Room 101/201/301 */}
            <div className="absolute border-2 border-gray-400 rounded-md left-[10%] top-[10%] w-[40%] h-[25%]">
              <div className="absolute top-1 left-1 text-xs font-semibold text-gray-500">
                Кабинет {activeFloor}01
              </div>
            </div>
            
            {/* Room 102/202/302 */}
            <div className="absolute border-2 border-gray-400 rounded-md left-[10%] bottom-[10%] w-[40%] h-[25%]">
              <div className="absolute top-1 left-1 text-xs font-semibold text-gray-500">
                Кабинет {activeFloor}02
              </div>
            </div>
            
            {/* Room 103/203/303 */}
            <div className="absolute border-2 border-gray-400 rounded-md right-[10%] top-[10%] w-[30%] h-[25%]">
              <div className="absolute top-1 left-1 text-xs font-semibold text-gray-500">
                Кабинет {activeFloor}03
              </div>
            </div>
            
            {/* Room 105/205/305 */}
            <div className="absolute border-2 border-gray-400 rounded-md right-[10%] bottom-[10%] w-[30%] h-[25%]">
              <div className="absolute top-1 left-1 text-xs font-semibold text-gray-500">
                Кабинет {activeFloor}05
              </div>
            </div>
            
            {/* Corridor */}
            <div className="absolute border-2 border-gray-400 bg-gray-100 left-[10%] top-[39%] w-[80%] h-[22%]">
              <div className="absolute top-1 left-1 text-xs font-semibold text-gray-500">
                Коридор
              </div>
            </div>

            {/* Render devices */}
            <TooltipProvider>
              {devices.map((device) => (
                <Tooltip key={device.id}>
                  <TooltipTrigger asChild>
                    <div 
                      className="absolute cursor-pointer" 
                      style={{ 
                        left: `${device.x}px`, 
                        top: `${device.y}px`, 
                        transform: 'translate(-50%, -50%)' 
                      }}
                    >
                      <div className={cn("p-1 rounded-full", device.status === "working" ? "bg-green-100" : device.status === "maintenance" ? "bg-yellow-100" : "bg-red-100")}>
                        <div className={cn("flex items-center justify-center h-8 w-8 rounded-full", 
                          device.status === "working" ? "text-green-600" : 
                          device.status === "maintenance" ? "text-yellow-600" : "text-red-600"
                        )}>
                          {getDeviceIcon(device.type)}
                          <div className={cn("absolute bottom-0 right-0 h-2 w-2 rounded-full border border-white", getStatusColor(device.status))} />
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <div className="text-sm font-medium">
                      {device.type === "computer" && "Компьютер"}
                      {device.type === "printer" && "Принтер"}
                      {device.type === "camera" && "Камера"}
                      {device.type === "server" && "Сервер"}
                      {device.type === "network" && "Сетевое устройство"}
                    </div>
                    <div className="text-xs">Кабинет: {device.room}</div>
                    {device.user && <div className="text-xs">Сотрудник: {device.user}</div>}
                    <div className="text-xs flex items-center">
                      Статус: 
                      <span className={cn("ml-1 px-1 py-0.5 rounded text-xs", 
                        device.status === "working" ? "bg-green-100 text-green-800" : 
                        device.status === "maintenance" ? "bg-yellow-100 text-yellow-800" : 
                        "bg-red-100 text-red-800"
                      )}>
                        {device.status === "working" && "Рабочее"}
                        {device.status === "maintenance" && "Обслуживание"}
                        {device.status === "broken" && "Неисправное"}
                      </span>
                    </div>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-xl">Карта офиса</CardTitle>
            <p className="text-sm text-gray-500">Схема расположения оборудования</p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeFloor} onValueChange={setActiveFloor} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="1">1 этаж</TabsTrigger>
              <TabsTrigger value="2">2 этаж</TabsTrigger>
              <TabsTrigger value="3">3 этаж</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              {renderMap(firstFloorDevices)}
            </TabsContent>
            <TabsContent value="2">
              {renderMap(secondFloorDevices)}
            </TabsContent>
            <TabsContent value="3">
              {renderMap(thirdFloorDevices)}
            </TabsContent>
          </Tabs>
          
          <div className="mt-4 flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100">
                <div className="flex items-center justify-center h-6 w-6 text-green-600">
                  {computerIcon}
                </div>
              </div>
              <span className="text-sm">Компьютеры</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100">
                <div className="flex items-center justify-center h-6 w-6 text-green-600">
                  {printerIcon}
                </div>
              </div>
              <span className="text-sm">Принтеры</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100">
                <div className="flex items-center justify-center h-6 w-6 text-green-600">
                  {cameraIcon}
                </div>
              </div>
              <span className="text-sm">Камеры</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100">
                <div className="flex items-center justify-center h-6 w-6 text-green-600">
                  {serverIcon}
                </div>
              </div>
              <span className="text-sm">Серверы</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-full bg-green-100">
                <div className="flex items-center justify-center h-6 w-6 text-green-600">
                  {networkIcon}
                </div>
              </div>
              <span className="text-sm">Сетевое оборудование</span>
            </div>
            
            <div className="border-l border-gray-300 pl-4 ml-2 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="text-sm">Рабочее</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Обслуживание</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Неисправное</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Сетевая схема</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4 border rounded-lg bg-gray-50">
            <div className="text-center py-12 px-4">
              <Network className="mx-auto h-16 w-16 text-autopartner-primary" />
              <h3 className="mt-4 text-lg font-medium">Схема сетевой инфраструктуры</h3>
              <p className="mt-2 text-sm text-gray-500">
                В следующих версиях здесь будет интерактивная схема сетевой инфраструктуры компании.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfficeMap;
