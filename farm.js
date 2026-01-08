import React, { useState, useEffect, useMemo } from 'react';
import { 
  Fish, Leaf, Thermometer, Droplets, Activity, Lightbulb, Wind, Power, 
  AlertTriangle, RefreshCw, Settings, Menu, Database, FileText, Search, 
  Download, Filter, ChevronLeft, ChevronRight, BarChart2, HardDrive, 
  Trash2, CheckCircle, AlertCircle, Home, LayoutGrid, Smartphone, Monitor
} from 'lucide-react';

// ==========================================
// 1. 통합 런처 (메인 화면)
// ==========================================
const App = () => {
  const [currentView, setCurrentView] = useState('launcher'); // launcher, mobile, admin

  const handleBack = () => setCurrentView('launcher');

  if (currentView === 'mobile') {
    return (
      <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <FloatingBackButton onClick={handleBack} label="홈으로" />
        <AquaponicsDashboard />
      </div>
    );
  }

  if (currentView === 'admin') {
    return (
      <div className="relative animate-in fade-in slide-in-from-bottom-4 duration-300">
        <FloatingBackButton onClick={handleBack} label="런처로 복귀" />
        <FarmDataManager />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center p-6 text-white">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="bg-blue-600 w-16 h-16 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">AquaSmart Farm</h1>
          <p className="text-slate-400 text-sm">통합 스마트팜 솔루션</p>
        </div>

        <div className="grid gap-4 mt-8">
          <button 
            onClick={() => setCurrentView('mobile')}
            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-2xl transition-all duration-300 text-left flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-green-400 to-emerald-600 p-3 rounded-xl shadow-lg">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">현장 모니터링</h3>
              <p className="text-slate-400 text-xs mt-1">실시간 센서 확인 및 제어 (모바일용)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>

          <button 
            onClick={() => setCurrentView('admin')}
            className="group relative overflow-hidden bg-white/10 hover:bg-white/20 border border-white/10 p-6 rounded-2xl transition-all duration-300 text-left flex items-center gap-4 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="bg-gradient-to-br from-blue-400 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg">데이터 관리자</h3>
              <p className="text-slate-400 text-xs mt-1">통계 분석 및 로그 관리 (PC/태블릿용)</p>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-500 ml-auto group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <p className="text-center text-slate-600 text-xs mt-12">
          홈 화면에 추가하여 앱처럼 사용하세요.
        </p>
      </div>
    </div>
  );
};

// 뒤로가기 버튼 컴포넌트
const FloatingBackButton = ({ onClick, label }) => (
  <button 
    onClick={onClick}
    className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-slate-900/90 text-white px-5 py-2.5 rounded-full shadow-xl backdrop-blur-md border border-white/10 flex items-center gap-2 text-sm font-medium hover:bg-slate-800 transition-all active:scale-95"
  >
    <Home className="w-4 h-4" />
    {label}
  </button>
);


// ==========================================
// 2. 아쿠아포닉스 대시보드 (모바일 뷰)
// ==========================================
const AquaponicsDashboard = () => {
  const [systemStatus, setSystemStatus] = useState('NORMAL');
  
  // 센서 데이터 (시뮬레이션)
  const [sensors, setSensors] = useState({
    waterTemp: 24.5, ph: 7.0, do: 6.8, ammonia: 0.02,
    airTemp: 26.0, humidity: 65, waterLevel: 85
  });

  const [actuators, setActuators] = useState({
    waterPump: true, airPump: true, growLight: true,
    feeder: false, heater: false, fan: false
  });

  const [logs, setLogs] = useState([
    { id: 1, time: '10:00', type: 'info', message: '시스템 가동 시작' },
    { id: 2, time: '10:05', type: 'info', message: '순환 펌프 작동 중' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSensors(prev => ({
        ...prev,
        waterTemp: +(prev.waterTemp + (Math.random() * 0.4 - 0.2)).toFixed(1),
        ph: +(prev.ph + (Math.random() * 0.1 - 0.05)).toFixed(2),
        do: +(prev.do + (Math.random() * 0.2 - 0.1)).toFixed(1),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const toggleActuator = (device) => {
    setActuators(prev => ({ ...prev, [device]: !prev[device] }));
  };

  const SensorCard = ({ title, value, unit, icon: Icon, color }) => (
    <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-medium">{title}</p>
        <div className="flex items-end gap-1">
          <span className={`text-xl font-bold ${color}`}>{value}</span>
          <span className="text-slate-400 text-xs mb-1">{unit}</span>
        </div>
      </div>
      <div className={`p-2 rounded-full bg-slate-50`}>
        <Icon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
  );

  const ControlButton = ({ label, isActive, onClick, icon: Icon, colorClass }) => (
    <button 
      onClick={onClick}
      className={`p-3 rounded-xl border transition-all flex flex-col items-center justify-center gap-2
        ${isActive 
          ? `bg-white border-${colorClass}-500 shadow-sm ring-1 ring-${colorClass}-500` 
          : 'bg-slate-50 border-slate-200 text-slate-400'
        }`}
    >
      <Icon className={`w-5 h-5 ${isActive ? `text-${colorClass}-600` : ''}`} />
      <span className={`text-xs font-medium ${isActive ? 'text-slate-800' : 'text-slate-500'}`}>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24">
      {/* 헤더 */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-3 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white">
            <Smartphone className="w-4 h-4" />
          </div>
          <h1 className="text-base font-bold text-slate-800">현장 모니터링</h1>
        </div>
        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 bg-green-100 text-green-700`}>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          정상 가동
        </div>
      </header>

      <main className="p-4 space-y-5">
        <section>
          <h2 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-1">
            <Fish className="w-4 h-4" /> 양식 수조
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <SensorCard title="수온" value={sensors.waterTemp} unit="°C" icon={Thermometer} color="text-blue-600" />
            <SensorCard title="pH" value={sensors.ph} unit="pH" icon={Droplets} color="text-teal-600" />
            <SensorCard title="용존산소" value={sensors.do} unit="mg/L" icon={Activity} color="text-cyan-600" />
            <SensorCard title="암모니아" value={sensors.ammonia} unit="ppm" icon={AlertTriangle} color="text-green-600" />
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-slate-600 mb-3 flex items-center gap-1">
            <Power className="w-4 h-4" /> 장치 제어
          </h2>
          <div className="grid grid-cols-3 gap-3">
            <ControlButton label="펌프" icon={RefreshCw} isActive={actuators.waterPump} onClick={() => toggleActuator('waterPump')} colorClass="blue" />
            <ControlButton label="산소" icon={Wind} isActive={actuators.airPump} onClick={() => toggleActuator('airPump')} colorClass="cyan" />
            <ControlButton label="LED" icon={Lightbulb} isActive={actuators.growLight} onClick={() => toggleActuator('growLight')} colorClass="yellow" />
            <ControlButton label="팬" icon={Activity} isActive={actuators.fan} onClick={() => toggleActuator('fan')} colorClass="gray" />
            <ControlButton label="히터" icon={Thermometer} isActive={actuators.heater} onClick={() => toggleActuator('heater')} colorClass="red" />
          </div>
        </section>
        
        <section className="bg-white rounded-xl border border-slate-200 p-4">
          <h2 className="text-xs font-bold text-slate-500 mb-2">실시간 로그</h2>
          <div className="space-y-2">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-2 text-xs border-b border-slate-50 pb-1 last:border-0">
                <span className="text-slate-400 font-mono">{log.time}</span>
                <span className="text-slate-600">{log.message}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};


// ==========================================
// 3. 데이터 관리자 (PC 뷰)
// ==========================================
const FarmDataManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock Data
  const sensorLogs = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: `LOG-${1000 + i}`,
      date: `2024-05-${String(20-i).padStart(2,'0')} 14:00`,
      type: i % 2 === 0 ? '수온' : 'pH',
      value: (20 + Math.random() * 5).toFixed(1),
      status: Math.random() > 0.8 ? 'WARNING' : 'NORMAL'
    }));
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-100 text-slate-800 pb-20">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0">
        <div className="flex items-center gap-2 text-blue-800 font-bold">
          <Database className="w-5 h-5" />
          <span>Data Admin</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 hover:bg-green-700">
            <Download className="w-3 h-3" /> Excel
          </button>
        </div>
      </header>

      <main className="p-6 overflow-auto flex-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500">Total Logs</p>
            <p className="text-2xl font-bold text-slate-800">1,248</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500">Warnings</p>
            <p className="text-2xl font-bold text-orange-600">24</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <p className="text-xs text-slate-500">Avg Temp</p>
            <p className="text-2xl font-bold text-teal-600">24.5°C</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex gap-2">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="데이터 검색..." 
              className="text-sm outline-none w-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Value</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sensorLogs.filter(l => l.id.includes(searchTerm)).map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{log.id}</td>
                    <td className="px-4 py-3 text-slate-600">{log.date}</td>
                    <td className="px-4 py-3">{log.type}</td>
                    <td className="px-4 py-3 font-bold">{log.value}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.status === 'NORMAL' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;