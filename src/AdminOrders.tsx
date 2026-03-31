import React, { useState } from "react";
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Download, 
  ExternalLink, 
  Eye, 
  Truck, 
  CheckCircle2, 
  Clock, 
  XCircle,
  MoreVertical,
  Globe,
  ChevronRight,
  X,
  CreditCard,
  MapPin,
  User,
  Package,
  Calendar,
  AlertCircle,
  ChevronDown,
  Hash,
  Printer,
  FileText,
  Tag,
  Box,
  Zap,
  RefreshCw
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const COURIERS = [
  { id: 'gls', name: 'GLS Italy', logo: 'gls' },
  { id: 'dhl', name: 'DHL Express', logo: 'dhl' },
  { id: 'brt', name: 'BRT Corriere Espresso', logo: 'brt' },
  { id: 'poste', name: 'Poste Italiane', logo: 'poste' },
];

const INITIAL_ORDERS = [
  { id: "BP-2026-881", date: "30 Mar 2026", customer: "Marco Rossi", email: "marco.rossi@example.com", channel: "amazon", total: 124.50, status: "pending", itemsCount: 2, address: "Via Roma 12, 00100 Roma (RM)", payment: "Mastercard **** 4492", trackingId: "", items: [{ id: "1", name: "Faretto LED Incasso 10W", qty: 2, price: 12.90, image: "https://picsum.photos/seed/led1/100/100" }, { id: "7", name: "Striscia LED RGB 5mt", qty: 1, price: 19.90, image: "https://picsum.photos/seed/ledstrip1/100/100" }] },
  { id: "BP-2026-880", date: "30 Mar 2026", customer: "Giulia Bianchi", email: "giulia.b@email.it", channel: "website", total: 89.00, status: "shipped", itemsCount: 1, address: "Corso Milano 45, 20100 Milano (MI)", payment: "PayPal", trackingId: "CH123456789IT", items: [{ id: "3", name: "Trapano Avvitatore 18V", qty: 1, price: 89.90, image: "https://picsum.photos/seed/drill1/100/100" }] },
  { id: "BP-2026-879", date: "29 Mar 2026", customer: "eBay User_99", email: "ebay_user@test.com", channel: "ebay", total: 210.00, status: "delivered", itemsCount: 3, address: "Piazza Garibaldi 1, 80100 Napoli (NA)", payment: "Visa **** 1122", trackingId: "EB987654321IT", items: [] },
  { id: "BP-2026-878", date: "29 Mar 2026", customer: "Alessandro Verri", email: "averri@outlook.it", channel: "amazon", total: 45.90, status: "cancelled", itemsCount: 1, address: "Via Dante 8, 50100 Firenze (FI)", payment: "Amazon Pay", trackingId: "", items: [] },
  { id: "BP-2026-877", date: "28 Mar 2026", customer: "Elena Neri", email: "elena.neri@gmail.com", channel: "website", total: 320.00, status: "shipped", itemsCount: 4, address: "Via Mazzini 22, 10100 Torino (TO)", payment: "Bonifico", trackingId: "BW556677889IT", carrierId: "gls", items: [] },
  { id: "BP-2026-876", date: "28 Mar 2026", customer: "Luca Moretti", email: "l.moretti@email.com", channel: "amazon", total: 55.00, status: "pending", itemsCount: 1, address: "Via Veneto 10, Roma", payment: "Amex", trackingId: "", items: [] },
  { id: "BP-2026-875", date: "27 Mar 2026", customer: "Sara Esposito", email: "sara.e@gmail.com", channel: "ebay", total: 12.90, status: "delivered", itemsCount: 1, address: "Via Toledo 200, Napoli", payment: "Mastercard", trackingId: "IT123123123", items: [] },
  { id: "BP-2026-874", date: "27 Mar 2026", customer: "Pietro Galli", email: "p.galli@test.it", channel: "website", total: 450.00, status: "pending", itemsCount: 5, address: "Via Emilia 1, Parma", payment: "PayPal", trackingId: "", items: [] },
  { id: "BP-2026-873", date: "26 Mar 2026", customer: "Chiara Romano", email: "chiara.r@email.com", channel: "amazon", total: 33.40, status: "shipped", itemsCount: 2, address: "Viale Monza 120, Milano", payment: "Visa", trackingId: "GLS9898987", items: [] },
  { id: "BP-2026-872", date: "26 Mar 2026", customer: "Antonio Bruno", email: "antonio.b@gmail.com", channel: "ebay", total: 110.00, status: "delivered", itemsCount: 2, address: "Via dei Mille 5, Palermo", payment: "Mastercard", trackingId: "EB00012354", items: [] },
  { id: "BP-2026-871", date: "25 Mar 2026", customer: "Marta Greco", email: "marta.g@outlook.com", channel: "website", total: 78.50, status: "delivered", itemsCount: 1, address: "Via Appia 3, Latina", payment: "Visa", trackingId: "P12312399", items: [] },
  { id: "BP-2026-870", date: "25 Mar 2026", customer: "Fabio Colombo", email: "f.colombo@gmail.com", channel: "amazon", total: 19.90, status: "cancelled", itemsCount: 1, address: "Via Larga 2, Milano", payment: "PayPal", trackingId: "", items: [] },
  { id: "BP-2026-869", date: "24 Mar 2026", customer: "Sofia Costa", email: "sofia.costa@email.it", channel: "ebay", total: 245.00, status: "shipped", itemsCount: 3, address: "Via Garibaldi 10, Genova", payment: "Visa", trackingId: "BRT11223344", items: [] },
  { id: "BP-2026-868", date: "24 Mar 2026", customer: "Lorenzo Ricci", email: "lorenzo.r@gmail.com", channel: "website", total: 67.20, status: "pending", itemsCount: 1, address: "Via Roma 100, Firenze", payment: "Amazon Pay", trackingId: "", items: [] },
  { id: "BP-2026-867", date: "23 Mar 2026", customer: "Alice Fontana", email: "alice.f@email.com", channel: "amazon", total: 129.90, status: "delivered", itemsCount: 2, address: "Corso Italia 5, Bologna", payment: "Mastercard", trackingId: "DH00998877", items: [] },
  { id: "BP-2026-866", date: "23 Mar 2026", customer: "Davide Leone", email: "davide.l@gmail.com", channel: "ebay", total: 8.50, status: "delivered", itemsCount: 1, address: "Via San Marco 14, Venezia", payment: "PayPal", trackingId: "IT998877665", items: [] },
  { id: "BP-2026-865", date: "22 Mar 2026", customer: "Anna De Luca", email: "anna.dl@email.it", channel: "website", total: 540.00, status: "shipped", itemsCount: 6, address: "Via Libertà 20, Bari", payment: "Bonifico", trackingId: "PST33445566", carrierId: "poste", items: [] },
  { id: "BP-2026-864", date: "22 Mar 2026", customer: "Giorgio Manzi", email: "g.manzi@gmail.com", channel: "amazon", total: 99.00, status: "cancelled", itemsCount: 1, address: "Via del Corso 30, Roma", payment: "Visa", trackingId: "", items: [] },
  { id: "BP-2026-863", date: "21 Mar 2026", customer: "Paola Serra", email: "paola.s@outlook.it", channel: "ebay", total: 45.20, status: "delivered", itemsCount: 2, address: "Via Dante 12, Cagliari", payment: "Mastercard", trackingId: "EB554433221", items: [] },
  { id: "BP-2026-862", date: "21 Mar 2026", customer: "Ruggero Riva", email: "r.riva@email.com", channel: "website", total: 15.00, status: "delivered", itemsCount: 1, address: "Via Valtellina 8, Sondrio", payment: "Visa", trackingId: "IT887766554", items: [] },
  { id: "BP-2026-861", date: "20 Mar 2026", customer: "Silvia Galli", email: "silvia.g@gmail.com", channel: "amazon", total: 32.10, status: "pending", itemsCount: 1, address: "Via dei Laghi 4, Como", payment: "PayPal", trackingId: "", items: [] },
  { id: "BP-2026-860", date: "20 Mar 2026", customer: "Roberto Pozzi", email: "r.pozzi@email.it", channel: "ebay", total: 21.00, status: "delivered", itemsCount: 1, address: "Via Matteotti 3, Varese", payment: "Mastercard", trackingId: "IT111222333", items: [] },
];

export const AdminOrders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [carrierSelectorId, setCarrierSelectorId] = useState<string | null>(null);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    setTimeout(() => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      setIsUpdatingStatus(false);
    }, 800);
  };

  const updateTrackingId = (orderId: string, trackingId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, trackingId } : o));
  };

  const updateOrderCarrier = (orderId: string, carrierId: string) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, carrierId } : o));
    setCarrierSelectorId(null);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return "bg-orange-100 text-orange-600 border-orange-200";
      case 'shipped': return "bg-blue-100 text-blue-600 border-blue-200";
      case 'delivered': return "bg-green-100 text-green-600 border-green-200";
      case 'cancelled': return "bg-red-100 text-red-600 border-red-200";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch(channel) {
      case 'amazon': return <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Amazon_icon.svg" className="w-4 h-4" alt="Amazon" />;
      case 'ebay': return <img src="https://upload.wikimedia.org/wikipedia/commons/1/1b/EBay_logo.svg" className="w-4 h-4" alt="eBay" />;
      case 'website': return <Globe className="w-4 h-4 text-brand-dark" />;
      default: return <ShoppingBag className="w-4 h-4" />;
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesFilter = filter === 'all' || o.status === filter;
    const matchesSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || 
                          o.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCourierIcon = (logo: string, className: string = "w-10 h-10") => {
    switch (logo) {
      case 'gls': return <Truck className={`${className} text-blue-600`} />;
      case 'dhl': return <Zap className={`${className} text-yellow-600`} />;
      case 'brt': return <Box className={`${className} text-red-600`} />;
      case 'poste': return <Globe className={`${className} text-yellow-600`} />;
      default: return <Truck className={`${className} text-gray-400`} />;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Page Title */}
      <div className="mb-2">
        <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter">Gestione Ordini</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Monitora e gestisci le spedizioni del tuo store</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Ordini Totali", val: orders.length.toString(), sub: "+12% vs ieri", icon: ShoppingBag, color: "text-brand-dark" },
          { label: "In Attesa", val: orders.filter(o => o.status === 'pending').length.toString(), sub: "Da spedire oggi", icon: Clock, color: "text-orange-500" },
          { label: "In Consegna", val: orders.filter(o => o.status === 'shipped').length.toString(), sub: "In transito", icon: Truck, color: "text-blue-500" },
          { label: "Completati", val: orders.filter(o => o.status === 'delivered').length.toString(), sub: "Mese Corrente", icon: CheckCircle2, color: "text-green-500" },
        ].map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 transition-all group overflow-hidden relative">
            <div className={`absolute top-0 right-0 w-24 h-24 ${s.color.replace('text-', 'bg-')}/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:scale-150 transition-transform`}></div>
            <div className="flex justify-between items-start mb-4">
               <div className={`p-3 rounded-2xl ${s.color.replace('text-', 'bg-')}/10 ${s.color}`}>
                 <s.icon className="w-6 h-6" />
               </div>
               <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{s.label}</span>
            </div>
            <h3 className="text-3xl font-black text-brand-dark tracking-tighter">{s.val}</h3>
            <p className="text-[10px] font-black uppercase tracking-widest text-green-500 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 w-5 h-5 font-bold" />
          <input 
            type="text" 
            placeholder="Cerca ordine, cliente o SKU..." 
            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 focus:bg-white transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            {['all', 'pending', 'shipped', 'cancelled'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-brand-dark text-brand-yellow' : 'text-gray-400 hover:text-brand-dark'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button 
            onClick={() => window.print()}
            className="px-6 py-4 bg-brand-dark text-brand-yellow rounded-2xl hover:bg-brand-yellow hover:text-brand-dark transition-all flex items-center gap-2"
            title="Esporta PDF"
          >
            <Printer className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">PDF</span>
          </button>
          <button 
            onClick={() => {
              const headers = ["ID", "Data", "Cliente", "Piattaforma", "Totale", "Stato"];
              const rows = orders.map(o => [o.id, o.date, o.customer, o.channel, o.total, o.status]);
              const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.setAttribute('hidden', '');
              a.setAttribute('href', url);
              a.setAttribute('download', 'ordini_bespoint.csv');
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="px-6 py-4 bg-brand-yellow text-brand-dark rounded-2xl hover:bg-brand-dark hover:text-brand-yellow transition-all flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            <span className="text-[10px] font-black uppercase tracking-widest">CSV</span>
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[3rem] border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-700">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-dark text-brand-yellow">
              <th className="p-5 text-[10px] font-black uppercase tracking-widest pl-10 border-r border-white/5">ID Ordine / Data</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Canale</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5">Cliente</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-right">Totale</th>
              <th className="p-5 text-[10px] font-black uppercase tracking-widest border-r border-white/5 text-center">Stato</th>
              <th className="p-5"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="p-5 pl-10">
                   <div>
                     <p className="font-black text-brand-dark text-lg tracking-tighter">{order.id}</p>
                     <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{order.date}</p>
                   </div>
                </td>
                <td className="p-5">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                       {getChannelIcon(order.channel)}
                     </div>
                     <span className="text-xs font-black text-brand-dark uppercase tracking-tight">{order.channel}</span>
                   </div>
                </td>
                <td className="p-5">
                   <div>
                     <p className="font-black text-brand-dark text-sm">{order.customer}</p>
                     <p className="text-xs font-bold text-gray-400">{order.itemsCount} {order.itemsCount > 1 ? 'Articoli' : 'Articolo'}</p>
                   </div>
                </td>
                <td className="p-5 text-right">
                   <p className="text-lg font-black text-brand-dark">€{order.total.toFixed(2)}</p>
                </td>
                <td className="p-5">
                   <div className="flex justify-center">
                     <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                       {order.status}
                     </span>
                   </div>
                </td>
                <td className="p-5 text-right">
                   <div className="flex justify-end gap-3 transition-all">
                     <button 
                       onClick={() => setSelectedOrderId(order.id)}
                       className="p-3 bg-brand-yellow text-brand-dark rounded-xl hover:scale-110 active:scale-95 transition-all text-[10px] font-black uppercase tracking-widest flex items-center gap-2"
                       title="Vedi Dettagli"
                     >
                        <Eye className="w-5 h-5" />
                     </button>
                     <div className="relative">
                       <button 
                         onClick={() => setCarrierSelectorId(order.id === carrierSelectorId ? null : order.id)}
                         className={`p-3 rounded-xl hover:scale-110 active:scale-95 transition-all flex items-center gap-2 border border-transparent ${order.carrierId ? 'bg-brand-yellow text-brand-dark' : 'bg-gray-100 text-gray-400 border-gray-200'}`}
                         title={order.carrierId ? `Corriere: ${COURIERS.find(c => c.id === order.carrierId)?.name}` : "Seleziona Corriere"}
                       >
                          <Truck className="w-5 h-5" />
                       </button>
                       
                       <AnimatePresence>
                         {carrierSelectorId === order.id && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9, y: 10 }}
                             animate={{ opacity: 1, scale: 1, y: 0 }}
                             exit={{ opacity: 0, scale: 0.9, y: 10 }}
                             className="absolute bottom-full mb-4 right-0 w-[450px] bg-white rounded-3xl border border-gray-100 p-6 z-50 overflow-hidden"
                           >
                             <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark mb-4 px-2">Scegli Corriere</p>
                             <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                               {COURIERS.map(c => (
                                 <button 
                                   key={c.id}
                                   onClick={() => updateOrderCarrier(order.id, c.id)}
                                   className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all ${order.carrierId === c.id ? 'bg-brand-yellow text-brand-dark' : 'hover:bg-gray-50'}`}
                                 >
                                   <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center p-1 border border-gray-100">
                                     {getCourierIcon(c.logo, "w-5 h-5")}
                                   </div>
                                   <span className="text-[10px] font-black uppercase tracking-tight truncate">{c.name}</span>
                                 </button>
                               ))}
                             </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     </div>
                   </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Pagination placeholder */}
        <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
           <p className="text-xs font-bold text-gray-400 uppercase">Mostrando {filteredOrders.length} di 1.284 ordini</p>
           <div className="flex gap-2">
              <button disabled className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase text-gray-300">Prec</button>
              <button className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-[10px] font-black uppercase text-brand-dark hover:border-brand-yellow transition-colors">Succ</button>
           </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrderId(null)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-md z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-2xl bg-white z-[110] border-l border-gray-100 flex flex-col"
            >
              {/* Header */}
              <div className="p-8 bg-brand-dark text-brand-yellow flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-3xl font-black tracking-tighter uppercase">{selectedOrder.id}</h2>
                    <div className="relative group/status">
                      <button className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 ${getStatusStyle(selectedOrder.status)}`}>
                        {isUpdatingStatus ? <RefreshCw className="w-3 h-3 animate-spin" /> : selectedOrder.status}
                        <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute top-full mt-2 left-0 w-48 bg-white rounded-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover/status:opacity-100 group-hover/status:visible transition-all z-20">
                         {['pending', 'shipped', 'delivered', 'cancelled'].map(s => (
                           <button 
                             key={s}
                             onClick={() => updateOrderStatus(selectedOrder.id, s)}
                             className="w-full px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-brand-dark hover:bg-brand-yellow transition-colors"
                           >
                             {s}
                           </button>
                         ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs font-bold opacity-60 uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Effettuato il {selectedOrder.date} via {selectedOrder.channel}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedOrderId(null)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4 pt-1 border-t-2 border-gray-50">
                    <div className="flex items-center gap-2 text-brand-dark">
                      <User className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Informazioni Cliente</h3>
                    </div>
                    <div>
                      <p className="font-black text-lg text-brand-dark leading-tight">{selectedOrder.customer}</p>
                      <p className="text-sm font-bold text-gray-400">{selectedOrder.email}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-1 border-t-2 border-gray-50">
                    <div className="flex items-center gap-2 text-brand-dark">
                      <MapPin className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Indirizzo Spedizione</h3>
                    </div>
                    <p className="text-sm font-bold text-brand-dark leading-relaxed">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                {/* Logistics & Carriers */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-1 border-t-2 border-gray-50">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-brand-dark">
                      <Hash className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Tracking Info</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="relative flex-1">
                        <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                        <input 
                          type="text" 
                          placeholder="Tracking ID..."
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-bold focus:ring-4 focus:ring-brand-yellow/20 focus:bg-white transition-all"
                          value={selectedOrder.trackingId}
                          onChange={(e) => updateTrackingId(selectedOrder.id, e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-brand-dark">
                      <Truck className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Corriere</h3>
                    </div>
                    <div className="relative group/carrier-modal">
                      <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:bg-white transition-all text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 border border-gray-100">
                            {selectedOrder.carrierId ? (
                              getCourierIcon(COURIERS.find(c => c.id === selectedOrder.carrierId)?.logo || "default", "w-6 h-6")
                            ) : (
                              <Truck className="w-5 h-5 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">
                              {COURIERS.find(c => c.id === selectedOrder.carrierId)?.name || 'NON ASSEGNATO'}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-300" />
                      </button>
                      
                      <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover/carrier-modal:opacity-100 group-hover/carrier-modal:visible transition-all z-20 p-2">
                        {COURIERS.map(c => (
                          <button 
                            key={c.id}
                            onClick={() => updateOrderCarrier(selectedOrder.id, c.id)}
                            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${selectedOrder.carrierId === c.id ? 'bg-brand-yellow text-brand-dark' : 'hover:bg-gray-50'}`}
                          >
                          <div className="w-6 h-6 bg-white rounded-lg flex items-center justify-center p-1 border border-gray-100">
                            {getCourierIcon(c.logo, "w-4 h-4")}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-tight">{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="space-y-4 pt-1 border-t-2 border-gray-50">
                  <div className="flex items-center gap-2 text-brand-dark">
                    <CreditCard className="w-4 h-4" />
                    <h3 className="text-xs font-black uppercase tracking-widest">Pagamento</h3>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                      <CreditCard className="w-5 h-5 text-brand-dark" />
                    </div>
                    <span className="font-black text-[10px] text-brand-dark uppercase tracking-tight">{selectedOrder.payment}</span>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-6 pt-1 border-t-2 border-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-brand-dark">
                      <Package className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Articoli ({selectedOrder.itemsCount})</h3>
                    </div>
                    <span className="text-xs font-black text-brand-dark uppercase tracking-widest p-2 bg-brand-yellow rounded-lg">Tot: €{selectedOrder.total.toFixed(2)}</span>
                  </div>
                  
                  <div className="space-y-4">
                    {selectedOrder.items.length > 0 ? selectedOrder.items.map((item: any) => (
                      <div key={item.id} className="flex gap-4 p-4 rounded-3xl border border-gray-100 hover:border-brand-yellow/30 transition-all group bg-white">
                        <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0 group-hover:scale-105 transition-transform">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-center">
                          <h4 className="font-black text-brand-dark text-sm leading-tight mb-1">{item.name}</h4>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-2">SKU: BP-{item.id.padStart(4, '0')}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-gray-400">{item.qty} x €{item.price.toFixed(2)}</span>
                            <span className="font-black text-brand-dark">€{(item.qty * item.price).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                        <AlertCircle className="w-10 h-10 text-gray-300 mb-2" />
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Dettaglio prodotti non disponibile</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Placeholder */}
                <div className="space-y-6 pt-1 border-t-2 border-gray-50">
                   <div className="flex items-center gap-2 text-brand-dark">
                      <Clock className="w-4 h-4" />
                      <h3 className="text-xs font-black uppercase tracking-widest">Cronologia Stato</h3>
                    </div>
                    <div className="space-y-6 pl-2">
                       {[
                         { status: 'Pagamento Ricevuto', time: '30 Mar 2026 - 10:42', completed: true },
                         { status: 'In Lavorazione', time: '30 Mar 2026 - 11:15', completed: true },
                         { status: 'Spedito', time: selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' ? '30 Mar 2026 - 14:30' : '-', completed: selectedOrder.status === 'shipped' || selectedOrder.status === 'delivered' },
                       ].map((step, idx) => (
                         <div key={idx} className="flex gap-4 relative">
                           {idx < 2 && <div className="absolute left-[11px] top-6 w-[2px] h-10 bg-gray-100"></div>}
                           <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 ${step.completed ? 'bg-brand-yellow border-brand-yellow' : 'bg-white border-gray-100'}`}>
                              {step.completed && <CheckCircle2 className="w-3 h-3 text-brand-dark" />}
                           </div>
                           <div>
                             <p className={`text-xs font-black uppercase tracking-tight ${step.completed ? 'text-brand-dark' : 'text-gray-300'}`}>{step.status}</p>
                             <p className="text-[10px] font-bold text-gray-400 tracking-wider">{step.time}</p>
                           </div>
                         </div>
                       ))}
                    </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-8 bg-gray-50 border-t border-gray-100 grid grid-cols-2 gap-4">
                <button className="py-4 bg-white border-2 border-brand-dark rounded-2xl font-black uppercase text-xs tracking-widest text-brand-dark hover:bg-brand-dark hover:text-brand-yellow transition-all flex items-center justify-center gap-2 active:scale-95">
                  <Download className="w-4 h-4" />
                  Stampa Fattura
                </button>
                <button 
                  onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                  disabled={selectedOrder.status === 'delivered' || selectedOrder.status === 'cancelled' || isUpdatingStatus}
                  className="py-4 bg-brand-yellow text-brand-dark rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-brand-orange transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:grayscale"
                >
                  {isUpdatingStatus ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Truck className="w-4 h-4" />}
                  Segna come Spedito
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Print View (Only visible when printing) */}
      <div className="hidden print:block print:fixed print:inset-0 print:bg-white print:z-[9999] p-10">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-brand-dark tracking-tighter uppercase italic">BESPOINT</h1>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-2">Export Ordini - {new Date().toLocaleDateString('it-IT')}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-dark">Totale Ordini</p>
            <p className="text-2xl font-black text-brand-dark">€{orders.reduce((acc, o) => acc + o.total, 0).toFixed(2)}</p>
          </div>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-brand-dark">
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight">Immagine</th>
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight">ID / Data</th>
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight">Cliente</th>
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight">Canale</th>
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight">Corriere</th>
              <th className="py-4 text-left text-[10px] font-black uppercase tracking-tight text-right">Totale</th>
              <th className="py-4 text-center text-[10px] font-black uppercase tracking-tight">Stato</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.map(o => (
              <tr key={o.id} className="page-break-inside-avoid">
                <td className="py-6 pr-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center p-1">
                    {o.items[0]?.image ? (
                      <img src={o.items[0].image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <Package className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                </td>
                <td className="py-6">
                  <p className="font-black text-xs text-brand-dark">{o.id}</p>
                  <p className="text-[8px] font-bold text-gray-400">{o.date}</p>
                </td>
                <td className="py-6">
                  <p className="font-black text-xs text-brand-dark leading-tight">{o.customer}</p>
                  <p className="text-[8px] font-bold text-gray-400">{o.email}</p>
                </td>
                <td className="py-6">
                  <p className="text-[8px] font-black uppercase tracking-widest text-brand-dark">{o.channel}</p>
                </td>
                <td className="py-6">
                  <p className="text-[8px] font-black uppercase tracking-widest text-brand-dark">
                    {COURIERS.find(c => c.id === o.carrierId)?.name || 'DA DEFINIRE'}
                  </p>
                </td>
                <td className="py-6 text-right">
                  <p className="font-black text-xs text-brand-dark">€{o.total.toFixed(2)}</p>
                </td>
                <td className="py-6 text-center">
                  <span className="text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full border border-gray-100">
                    {o.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div className="mt-10 pt-10 border-t border-gray-100 flex justify-between items-end">
          <div className="flex gap-10">
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase text-gray-300">Generato il</p>
              <p className="text-[10px] font-black text-brand-dark">{new Date().toLocaleString('it-IT')}</p>
            </div>
            <div className="space-y-1">
              <p className="text-[8px] font-black uppercase text-gray-300">Pagine</p>
              <p className="text-[10px] font-black text-brand-dark">1 di 1</p>
            </div>
          </div>
          <div className="text-right italic">
            <p className="text-xs font-black text-brand-dark tracking-tighter">Powered by BesPoint Admin</p>
          </div>
        </div>
      </div>

    </div>
  );
};
