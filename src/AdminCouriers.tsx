import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Trash2, 
  Globe, 
  ExternalLink, 
  Info,
  Check,
  X,
  Camera,
  Search,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Courier {
  id: string;
  name: string;
  logo: string;
  trackingUrl: string;
  contactEmail?: string;
  contactPhone?: string;
  isActive: boolean;
  notes?: string;
}

const INITIAL_COURIERS: Courier[] = [
  { 
    id: 'gls', 
    name: 'GLS Italy', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/GLS_Logo.svg',
    trackingUrl: 'https://www.gls-italy.com/it/servizi-per-destinatari/ricerca-spedizione?search={trackingId}',
    isActive: true,
    notes: 'Corriere predefinito per spedizioni nazionali.'
  },
  { 
    id: 'dhl', 
    name: 'DHL Express', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/DHL-Logo.svg',
    trackingUrl: 'https://www.dhl.com/it-it/home/tracking.html?tracking-id={trackingId}',
    isActive: true,
    notes: 'Utilizzato per spedizioni internazionali express.'
  },
  { 
    id: 'brt', 
    name: 'BRT Corriere Espresso', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/03/Logo_BRT.png',
    trackingUrl: 'https://www.brt.it/it/tracking?brtCode={trackingId}',
    isActive: true
  },
  { 
    id: 'poste', 
    name: 'Poste Italiane', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Poste_Italiane_Logo.svg',
    trackingUrl: 'https://www.poste.it/cerca/index.html#/risultati-spedizioni/{trackingId}',
    isActive: true
  },
];

export const AdminCouriers = () => {
  const [couriers, setCouriers] = useState<Courier[]>(INITIAL_COURIERS);
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [newCourier, setNewCourier] = useState<Partial<Courier>>({
    name: "",
    logo: "",
    trackingUrl: "",
    isActive: true
  });

  const filteredCouriers = couriers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const addCourier = () => {
    if (newCourier.name) {
      const id = newCourier.name.toLowerCase().replace(/\s+/g, '-');
      setCouriers([...couriers, { ...newCourier as Courier, id: id + Date.now() }]);
      setNewCourier({ name: "", logo: "", trackingUrl: "", isActive: true });
      setIsAdding(false);
    }
  };

  const deleteCourier = (id: string) => {
    setCouriers(couriers.filter(c => c.id !== id));
  };

  const toggleStatus = (id: string) => {
    setCouriers(couriers.map(c => c.id === id ? { ...c, isActive: !c.isActive } : c));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Gestione Corrieri</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Configura e gestisci i tuoi partner logistici</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-brand-yellow text-brand-dark px-6 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-brand-orange transition-all shadow-lg flex items-center gap-2 active:scale-95"
        >
          <Plus className="w-4 h-4" /> Aggiungi Corriere
        </button>
      </div>

      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 font-bold" />
          <input 
            type="text" 
            placeholder="Cerca corriere..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 focus:bg-white transition-all shadow-inner"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-gray-400">
          <Truck className="w-5 h-5" />
          <span>{filteredCouriers.length} Corrieri Registrati</span>
        </div>
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 p-8 rounded-[2.5rem] border-2 border-dashed border-gray-200 space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark">Nuovo Corriere</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 ml-1">Nome Corriere</span>
                  <input 
                    type="text" 
                    placeholder="E es: TNT Global"
                    value={newCourier.name}
                    onChange={(e) => setNewCourier({...newCourier, name: e.target.value})}
                    className="w-full px-4 py-3 bg-white border-gray-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 ml-1">URL Logo</span>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={newCourier.logo}
                    onChange={(e) => setNewCourier({...newCourier, logo: e.target.value})}
                    className="w-full px-4 py-3 bg-white border-gray-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-black uppercase text-gray-400 ml-1">URL Tracking (Template)</span>
                  <input 
                    type="text" 
                    placeholder="https://...{trackingId}"
                    value={newCourier.trackingUrl}
                    onChange={(e) => setNewCourier({...newCourier, trackingUrl: e.target.value})}
                    className="w-full px-4 py-3 bg-white border-gray-200 rounded-xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 transition-all"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl font-black uppercase text-[10px] tracking-widest text-gray-400 hover:bg-gray-100 transition-all"
                >
                  Annulla
                </button>
                <button 
                  onClick={addCourier}
                  className="px-8 py-3 bg-brand-dark text-brand-yellow rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-black transition-all shadow-lg shadow-black/10"
                >
                  Salva Corriere
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCouriers.map((courier) => (
          <motion.div 
            layout
            key={courier.id}
            className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center p-2 border border-gray-100 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-inner">
                  <img src={courier.logo} alt={courier.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => toggleStatus(courier.id)}
                    className={`p-2 rounded-xl transition-all ${courier.isActive ? 'bg-green-50 text-green-500' : 'bg-gray-50 text-gray-400'}`}
                    title={courier.isActive ? "Disattiva" : "Attiva"}
                  >
                    <RefreshCw className={`w-4 h-4 ${courier.isActive ? 'animate-none' : ''}`} />
                  </button>
                  <button 
                    onClick={() => deleteCourier(courier.id)}
                    className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tight">{courier.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${courier.isActive ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-gray-300'}`} />
                  <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">
                    {courier.isActive ? 'Attivo' : 'Disabilitato'}
                  </span>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-50">
                <div className="flex items-center justify-between text-[10px] font-bold text-gray-400">
                  <span className="uppercase tracking-widest">Tracking URL</span>
                  <Globe className="w-3 h-3" />
                </div>
                <p className="text-[11px] font-bold text-brand-dark bg-gray-50 p-3 rounded-xl break-all line-clamp-2">
                  {courier.trackingUrl}
                </p>
              </div>

              <button className="w-full py-4 bg-brand-yellow/10 text-brand-dark rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-brand-yellow transition-all group/btn">
                Configura Api
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCouriers.length === 0 && (
        <div className="py-32 text-center space-y-4">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto border-2 border-dashed border-gray-200">
            <Truck className="w-10 h-10 text-gray-200" />
          </div>
          <p className="text-gray-400 font-black uppercase tracking-widest text-xs">Nessun corriere trovato per questa ricerca</p>
        </div>
      )}
    </div>
  );
};
