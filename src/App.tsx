/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  LayoutDashboard, 
  BarChart3, 
  Activity, 
  Star, 
  Settings, 
  Send, 
  Search, 
  RefreshCw, 
  Plus,
  MessageSquare,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState('detail');

  const navItems = [
    { id: 'overview', icon: LayoutDashboard, label: '시장 개요' },
    { id: 'detail', icon: BarChart3, label: '종목 상세 분석' },
    { id: 'volume', icon: Activity, label: '거래량 급증 종목' },
    { id: 'watchlist', icon: Star, label: '관심 종목' },
  ];

  return (
    <aside className="w-72 flex-shrink-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark hidden lg:flex flex-col z-20 h-full">
      <div className="flex flex-col h-[40%] border-b border-slate-200 dark:border-slate-800">
        <div className="p-5 flex items-center gap-3">
          <div className="size-8 bg-primary rounded flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <TrendingUp size={20} />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight tracking-tight text-slate-900 dark:text-white">StockAlert KR</h1>
            <p className="text-[9px] text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1 uppercase">
              <span className="size-1 bg-green-500 rounded-full animate-pulse"></span> 실시간 스트리밍 중
            </p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto chat-scrollbar text-[12px]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary font-bold' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-1 flex flex-col bg-slate-50/50 dark:bg-slate-900/20 overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-primary" />
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">실시간 시장 채팅</h3>
          </div>
          <span className="text-[9px] font-bold bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 dark:text-slate-400">1.2k</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 chat-scrollbar">
          <ChatMessage user="Stock_King" time="14:45" message="오늘 삼성전자 외인 매수세 장난 아니네요." color="text-primary" />
          <ChatMessage user="ValueInvest" time="14:46" message="호가창 보니까 79,000원에 물량 많이 걸려있습니다." color="text-orange-500" />
          <ChatMessage user="ChartMaster" time="14:48" message="코스피 지지선 확인하고 들어가야 할 듯요." color="text-emerald-500" />
        </div>
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus-within:border-primary/50 px-2 py-1.5 transition-all">
            <input 
              className="flex-1 bg-transparent border-none text-[11px] focus:ring-0 p-0 dark:text-slate-200 placeholder:text-slate-500" 
              placeholder="메시지를 입력하세요..." 
              type="text" 
            />
            <button className="text-primary flex items-center">
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-2 py-2 bg-slate-100 dark:bg-slate-800/50 rounded-lg">
          <img 
            alt="User Avatar" 
            className="size-7 rounded-full object-cover ring-2 ring-primary/20" 
            src="https://picsum.photos/seed/user/100/100" 
            referrerPolicy="no-referrer"
          />
          <div className="flex-1 overflow-hidden">
            <p className="text-[10px] font-bold truncate">김지훈</p>
            <p className="text-[8px] text-slate-500 truncate">프리미엄 회원</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <Settings size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};

const ChatMessage = ({ user, time, message, color }: { user: string, time: string, message: string, color: string }) => (
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center justify-between">
      <span className={`text-[10px] font-bold ${color}`}>{user}</span>
      <span className="text-[9px] text-slate-400">{time}</span>
    </div>
    <p className="text-[11px] leading-relaxed text-slate-600 dark:text-slate-300">{message}</p>
  </div>
);

const MarketIndex = ({ label, value, change, percent, isUp }: { label: string, value: string, change: string, percent: string, isUp: boolean }) => (
  <div className="flex items-center gap-4 border-r border-slate-200 dark:border-slate-800 pr-8 last:border-0">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{label}</span>
      <div className="flex items-baseline gap-2">
        <span className="text-base font-black tracking-tight">{value}</span>
        <span className={`text-[10px] font-bold ${isUp ? 'text-stock-up' : 'text-stock-down'}`}>
          {isUp ? '▲' : '▼'} {change} ({percent}%)
        </span>
      </div>
    </div>
    <div className="flex items-end h-8 gap-[2px]">
      {[0.3, 0.5, 0.7, 0.4, 1.0].map((opacity, i) => (
        <div 
          key={i} 
          className={`w-[3px] rounded-full ${isUp ? 'bg-stock-up' : 'bg-stock-down'}`} 
          style={{ height: `${(i + 1) * 20}%`, opacity }}
        />
      ))}
    </div>
  </div>
);

const StatCard = ({ label, value, subValue, subColor = 'text-slate-400' }: { label: string, value: string, subValue: string, subColor?: string }) => (
  <div className="bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
    <div className={`text-lg font-black ${label === '현재가' ? 'text-stock-up text-2xl' : ''}`}>{value}</div>
    <div className={`text-[10px] mt-1 font-bold ${subColor}`}>{subValue}</div>
  </div>
);

const TickerItem = ({ name, price, percent, isUp }: { name: string, price: string, percent: string, isUp: boolean }) => (
  <div className="inline-flex items-center gap-6 px-8 border-r border-slate-100 dark:border-slate-800/50 py-2">
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">{name}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm font-extrabold">{price}</span>
        <span className={`text-[10px] font-bold ${isUp ? 'text-stock-up' : 'text-stock-down'}`}>
          {isUp ? '+' : ''}{percent}%
        </span>
      </div>
    </div>
  </div>
);

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ko-KR', { hour12: false });
  };

  return (
    <div className="flex h-screen overflow-hidden pb-14 font-sans">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-y-auto bg-background-light dark:bg-background-dark relative">
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold flex items-center gap-2">
                삼성전자 <span className="text-xs font-normal text-slate-400">005930 · KOSPI</span>
              </h2>
              <div className="flex items-center gap-2">
                <span className="flex items-center text-[10px] font-bold text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                  <span className="size-1.5 bg-green-500 rounded-full animate-pulse mr-1"></span> 실시간 연결됨
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-tight">
                  마지막 갱신: {formatTime(currentTime)} KST
                </span>
              </div>
            </div>
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary transition-all" 
                placeholder="다른 종목 검색..." 
                type="text" 
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <Star size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
              <RefreshCw size={20} />
            </button>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
              매수하기
            </button>
          </div>
        </header>

        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-3 flex items-center gap-8 flex-shrink-0 overflow-x-auto no-scrollbar sticky top-16 z-20">
          <MarketIndex label="코스피 KOSPI" value="2,752.12" change="15.42" percent="0.56" isUp={true} />
          <MarketIndex label="코스닥 KOSDAQ" value="910.25" change="2.10" percent="0.23" isUp={false} />
          <MarketIndex label="원/달러 환율 USD/KRW" value="1,342.50" change="4.50" percent="0.34" isUp={true} />
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard label="현재가" value="78,900" subValue="▲ 1,400 (+1.81%)" subColor="text-stock-up" />
            <div className="bg-white dark:bg-slate-800/40 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">시가 / 고가 / 저가</p>
              <div className="text-sm font-bold">77,500 / <span className="text-stock-up">79,200</span> / <span className="text-stock-down">77,100</span></div>
              <div className="w-full h-1 bg-slate-100 dark:bg-slate-700 rounded-full mt-3 overflow-hidden relative">
                <div className="absolute h-full bg-primary" style={{ left: '20%', width: '60%' }}></div>
              </div>
            </div>
            <StatCard label="거래량" value="14,258,930" subValue="전일대비 115%" />
            <StatCard label="시가총액" value="471조 153억" subValue="KOSPI 1위" />
            <StatCard label="외국인 소진율" value="54.82%" subValue="+0.05%p (5일간)" subColor="text-green-500" />
          </div>

          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-12 xl:col-span-8 flex flex-col gap-6">
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[500px]">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="text-sm font-bold flex items-center gap-2">차트 (실시간)</h3>
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="text-yellow-500">MA5: 78,120</span>
                      <span className="text-pink-500">MA20: 77,540</span>
                      <span className="text-blue-400">MA60: 76,200</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-md">
                    <button className="px-2 py-0.5 text-[10px] font-bold bg-white dark:bg-slate-700 shadow-sm rounded">1분</button>
                    <button className="px-2 py-0.5 text-[10px] font-bold text-slate-500">일봉</button>
                    <button className="px-2 py-0.5 text-[10px] font-bold text-slate-500">주봉</button>
                    <button className="px-2 py-0.5 text-[10px] font-bold text-slate-500">월봉</button>
                  </div>
                </div>
                <div className="flex-1 relative p-6 flex items-end gap-[6px]">
                  <div className="flex-1 flex flex-col h-full justify-between pb-12">
                    {['79,500', '78,500', '77,500', '76,500'].map(price => (
                      <div key={price} className="w-full flex justify-between text-[10px] text-slate-400 border-b border-dashed border-slate-200 dark:border-slate-800 pb-1">
                        <span>{price}</span>
                      </div>
                    ))}
                  </div>
                  <div className="absolute inset-x-6 inset-y-12 flex items-end gap-2 pb-14 px-8">
                    {[
                      { h: 24, bh: 16, up: true },
                      { h: 32, bh: 20, up: true },
                      { h: 20, bh: 12, up: false },
                      { h: 40, bh: 28, up: true },
                      { h: 44, bh: 36, up: true },
                      { h: 36, bh: 18, up: false },
                      { h: 48, bh: 40, up: true },
                      { h: 56, bh: 44, up: true },
                    ].map((candle, i) => (
                      <div key={i} className={`flex-1 relative rounded-t-sm ${candle.up ? 'bg-stock-up/20' : 'bg-stock-down/20'}`} style={{ height: `${candle.h}%` }}>
                        <div className={`absolute left-1/2 w-[1px] -translate-x-1/2 ${candle.up ? 'bg-stock-up' : 'bg-stock-down'}`} style={{ height: '80%', top: '-10%' }}></div>
                        <div className={`absolute bottom-0 w-full rounded-sm ${candle.up ? 'bg-stock-up' : 'bg-stock-down'}`} style={{ height: `${candle.bh}%` }}></div>
                      </div>
                    ))}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 h-12 flex items-end gap-2 px-8">
                    {[4, 8, 5, 10, 12, 9, 11, 14].map((h, i) => (
                      <div key={i} className={`flex-1 rounded-t-sm ${i === 2 || i === 5 ? 'bg-stock-down/40' : 'bg-stock-up/40'} ${i === 7 ? 'bg-stock-up/60' : ''}`} style={{ height: `${h * 4}px` }}></div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold">외인/기관 매매동향</h3>
                  <span className="text-[10px] text-slate-400">단위: 주</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-[11px]">
                    <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800">
                      <tr className="text-slate-400 font-bold">
                        <th className="px-4 py-2 text-left">일자</th>
                        <th className="px-4 py-2 text-right">종가</th>
                        <th className="px-4 py-2 text-right">전일비</th>
                        <th className="px-4 py-2 text-right">외국인</th>
                        <th className="px-4 py-2 text-right">기관</th>
                        <th className="px-4 py-2 text-right">개인</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      <TradeRow date="03.26" price="78,900" diff="+1,400" foreign="+2,451,202" institution="+845,100" individual="-3,296,302" isUp={true} />
                      <TradeRow date="03.25" price="77,500" diff="-400" foreign="+125,400" institution="-420,100" individual="+294,700" isUp={false} />
                      <TradeRow date="03.24" price="77,900" diff="+1,200" foreign="+1,840,200" institution="+1,102,400" individual="-2,942,600" isUp={true} />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-span-12 xl:col-span-4 space-y-4">
              <div className="bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <h3 className="text-sm font-bold">호가창</h3>
                  <span className="text-[10px] font-bold text-slate-400">0.05% 단위</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col-reverse divide-y divide-slate-100 dark:divide-slate-800 border-b-2 border-slate-200 dark:border-slate-800">
                    <OrderRow price="79,400" volume="21,452" percent="+2.45%" isSell={true} width="45%" />
                    <OrderRow price="79,300" volume="45,100" percent="+2.32%" isSell={true} width="60%" />
                    <OrderRow price="79,200" volume="102,450" percent="+2.19%" isSell={true} width="85%" />
                    <OrderRow price="79,100" volume="15,620" percent="+2.06%" isSell={true} width="30%" />
                    <OrderRow price="79,000" volume="84,500" percent="+1.93%" isSell={true} width="70%" />
                  </div>
                  <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
                    <OrderRow price="78,900" volume="34,102" percent="+1.81%" isSell={false} width="55%" />
                    <OrderRow price="78,800" volume="21,400" percent="+1.68%" isSell={false} width="40%" />
                    <OrderRow price="78,700" volume="12,500" percent="+1.55%" isSell={false} width="25%" />
                    <OrderRow price="78,600" volume="8,402" percent="+1.42%" isSell={false} width="15%" />
                    <OrderRow price="78,500" volume="145,100" percent="+1.29%" isSell={false} width="90%" />
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/80 p-3 flex justify-between border-t border-slate-200 dark:border-slate-800">
                  <div className="text-[10px] font-bold">매도잔량: 524,103</div>
                  <div className="text-[10px] font-bold">매수잔량: 412,505</div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/40 p-5 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm font-bold text-slate-500">종목 토론장 심리</span>
                </div>
                <div className="text-2xl font-extrabold tracking-tight text-orange-400 flex items-baseline gap-2">
                  62 <span className="text-xs font-bold uppercase opacity-80">탐욕</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-orange-400 relative" style={{ width: '62%' }}>
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <footer className="pt-8 pb-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-500 gap-4 border-t border-slate-200 dark:border-slate-800">
            <div className="flex gap-6 items-center">
              <span className="flex items-center gap-1.5 font-bold uppercase tracking-widest text-green-500 bg-green-500/5 px-2 py-1 rounded">
                <span className="size-1.5 bg-green-500 rounded-full"></span> 
                국내 시장 개장 중
              </span>
              <span className="font-medium">장 마감까지: 15:30 KST (남은 시간 00:37:50)</span>
            </div>
            <div className="flex gap-4 font-bold uppercase tracking-wider">
              <a className="hover:text-primary transition-colors" href="#">데이터 고지사항</a>
              <a className="hover:text-primary transition-colors" href="#">API 상태</a>
            </div>
          </footer>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-14 bg-white dark:bg-background-dark border-t border-slate-200 dark:border-slate-800 z-50 flex items-center overflow-hidden">
        <div className="flex-shrink-0 bg-white dark:bg-background-dark border-r border-slate-200 dark:border-slate-800 h-full flex items-center px-4 z-10 shadow-[4px_0_10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-2 text-primary">
            <Star size={16} />
            <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">관심 종목 실시간</span>
          </div>
        </div>
        <div className="flex-1 overflow-hidden relative ticker-container">
          <div className="flex whitespace-nowrap ticker-scroll animate-ticker w-max">
            <TickerItem name="삼성전자" price="78,900" percent="1.81" isUp={true} />
            <TickerItem name="SK하이닉스" price="182,400" percent="5.42" isUp={true} />
            <TickerItem name="NAVER" price="192,100" percent="0.45" isUp={false} />
            <TickerItem name="에코프로" price="642,000" percent="2.14" isUp={true} />
            <TickerItem name="현대차" price="245,000" percent="1.20" isUp={true} />
            <TickerItem name="카카오" price="52,400" percent="0.85" isUp={false} />
            {/* Duplicate for seamless loop */}
            <TickerItem name="삼성전자" price="78,900" percent="1.81" isUp={true} />
            <TickerItem name="SK하이닉스" price="182,400" percent="5.42" isUp={true} />
            <TickerItem name="NAVER" price="192,100" percent="0.45" isUp={false} />
            <TickerItem name="에코프로" price="642,000" percent="2.14" isUp={true} />
          </div>
        </div>
        <div className="flex-shrink-0 bg-white dark:bg-background-dark border-l border-slate-200 dark:border-slate-800 h-full flex items-center px-4 z-10">
          <button className="size-8 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white transition-all flex items-center justify-center group shadow-sm">
            <Plus size={18} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

const TradeRow = ({ date, price, diff, foreign, institution, individual, isUp }: any) => (
  <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
    <td className="px-4 py-2 text-slate-500">{date}</td>
    <td className="px-4 py-2 text-right font-bold">{price}</td>
    <td className={`px-4 py-2 text-right font-bold ${isUp ? 'text-stock-up' : 'text-stock-down'}`}>{diff}</td>
    <td className={`px-4 py-2 text-right ${foreign.startsWith('+') ? 'text-stock-up' : 'text-stock-down'}`}>{foreign}</td>
    <td className={`px-4 py-2 text-right ${institution.startsWith('+') ? 'text-stock-up' : 'text-stock-down'}`}>{institution}</td>
    <td className={`px-4 py-2 text-right ${individual.startsWith('+') ? 'text-stock-up' : 'text-stock-down'}`}>{individual}</td>
  </tr>
);

const OrderRow = ({ price, volume, percent, isSell, width }: any) => (
  <div className={`flex relative h-9 items-center group ${isSell ? 'bg-stock-down/5' : 'bg-stock-up/5'}`}>
    <div 
      className={`absolute top-0 bottom-0 ${isSell ? 'right-0 bg-stock-down/10' : 'left-0 bg-stock-up/10'}`} 
      style={{ width }}
    />
    <div className={`w-24 px-4 text-[10px] font-bold z-10 ${isSell ? 'text-stock-down text-right' : 'text-stock-up text-left'}`}>
      {volume}
    </div>
    <div className={`flex-1 text-center font-bold text-xs z-10 ${isSell ? 'text-stock-down' : 'text-stock-up'}`}>
      {price}
    </div>
    <div className={`w-24 px-4 text-[9px] text-slate-400 z-10 ${isSell ? 'text-right' : 'text-left'}`}>
      {percent}
    </div>
  </div>
);
