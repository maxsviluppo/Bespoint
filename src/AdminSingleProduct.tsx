import React, { useState } from "react";
import { Package, X, Trash2, Layers, Globe, ExternalLink, Camera, Plus, Check, RefreshCw } from "lucide-react";
import { CATEGORIES, SUBCATEGORIES } from "./data";

export const AdminSingleProduct = ({ onBack }: { onBack: () => void }) => {
  const [baseCost, setBaseCost] = useState<number>(10);
  const [b2cMarkup, setB2cMarkup] = useState<number>(30);
  const [b2bMarkup, setB2bMarkup] = useState<number>(10);
  
  const [manualB2c, setManualB2c] = useState<string>("");
  const [manualB2b, setManualB2b] = useState<string>("");

  const b2cPrice = manualB2c ? parseFloat(manualB2c) : baseCost * (1 + b2cMarkup / 100);
  const b2bPrice = manualB2b ? parseFloat(manualB2b) : baseCost * (1 + b2bMarkup / 100);

  const [gallery, setGallery] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{key: string, value: string}[]>([{key: "", value: ""}]);
  const [variants, setVariants] = useState<{type: 'Colore' | 'Taglia', value: string}[]>([{type: 'Colore', value: ""}]);

  const handleManualPrice = (val: string, type: 'b2c' | 'b2b') => {
    if (type === 'b2c') setManualB2c(val);
    if (type === 'b2b') setManualB2b(val);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 border border-gray-100 shadow-xl space-y-10 animate-in slide-in-from-bottom-8 duration-500 relative">
      <button onClick={onBack} className="absolute top-8 right-8 p-3 bg-gray-50 text-gray-500 hover:bg-brand-yellow hover:text-brand-dark rounded-xl transition-all">
        <X className="w-6 h-6" />
      </button>
      
      <div>
        <h2 className="text-3xl font-black text-brand-dark uppercase tracking-tighter mb-2">Creazione Prodotto Master</h2>
        <p className="text-sm font-bold text-gray-400">Dati completi per il sito eCommerce e sincronizzazione avanzata canali (B2C, B2B, Marketplace).</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Colonna Centrale: Dati Principali */}
        <div className="lg:col-span-8 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-dark border-b border-gray-100 pb-3 flex items-center gap-2"><Package className="w-5 h-5 text-gray-400"/> Identificativi & Core</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1 block">Codice SKU Master *</span>
                <input type="text" placeholder="Es. TSHIRT-01" className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-brand-blue focus:border-brand-blue" />
              </label>
              <label className="block">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1 block">Codice EAN Primario</span>
                <input type="text" placeholder="80123456789" className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-brand-blue focus:border-brand-blue" />
              </label>
            </div>
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1 block">Titolo Prodotto (DB Interno & Sito) *</span>
              <input type="text" placeholder="Titolo gestionale per sito web..." className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-brand-blue focus:border-brand-blue" />
            </label>
            <label className="block">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1 block">Descrizione Prodotto</span>
              <textarea rows={4} placeholder="Decrizione per il sito ecommerce..." className="w-full bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-brand-blue focus:border-brand-blue resize-none"></textarea>
            </label>
            
            {/* Frontend Specs: 3D, Video, Specifiche */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
               <label className="block">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1 block">URL Video Youtube (Opzionale)</span>
                 <input type="text" placeholder="https://youtube.com/..." className="w-full bg-white border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-brand-yellow focus:border-brand-yellow" />
               </label>
               <div className="flex items-center gap-3 pt-6">
                 <label className="inline-flex items-center cursor-pointer">
                   <input type="checkbox" className="sr-only peer" />
                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500 relative"></div>
                 </label>
                 <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Modello Vista 3D / AR</span>
               </div>
            </div>
            
            <div className="space-y-3 pt-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-blue block">Specifiche Tecniche per Tabella (Sito)</span>
              {specs.map((s, i) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={s.key} onChange={e => {
                    const newSpecs = [...specs]; newSpecs[i].key = e.target.value; setSpecs(newSpecs);
                  }} placeholder="Proprietà (es. Peso)" className="flex-1 bg-white border-gray-200 rounded-lg px-3 py-2 text-sm font-bold" />
                  <input type="text" value={s.value} onChange={e => {
                    const newSpecs = [...specs]; newSpecs[i].value = e.target.value; setSpecs(newSpecs);
                  }} placeholder="Valore (es. 2Kg)" className="flex-1 bg-white border-gray-200 rounded-lg px-3 py-2 text-sm font-bold" />
                  <button onClick={() => setSpecs(specs.filter((_, idx) => idx !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                </div>
              ))}
              <button onClick={() => setSpecs([...specs, {key:"", value:""}])} className="text-[10px] font-black uppercase text-brand-blue hover:text-brand-yellow transition-colors bg-brand-blue/5 px-3 py-2 rounded-lg">+ Aggiungi Riga Specifica</button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-dark border-b border-gray-100 pb-3 flex items-center gap-2"><Layers className="w-5 h-5 text-gray-400"/> Tassonomia Avanzata</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Livello 1 (Root)</span>
                <select className="w-full bg-gray-50 border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-brand-blue focus:border-brand-blue">
                  {CATEGORIES.filter(c => c !== "Tutti").map(c => <option key={c}>{c}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Livello 2 (Sub)</span>
                <select className="w-full bg-gray-50 border-gray-200 rounded-xl px-3 py-2 text-xs font-bold focus:ring-brand-blue focus:border-brand-blue">
                  {SUBCATEGORIES["Illuminazione"]?.map((s: string) => <option key={s}>{s}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Livello 3 (Optional)</span>
                <input type="text" placeholder="es. Led Integrato" className="w-full bg-white border-gray-200 rounded-xl px-3 py-2 text-xs font-bold placeholder:text-gray-300" />
              </label>
              <label className="block">
                 <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1 block">Livello 4 (Deep)</span>
                 <input type="text" placeholder="N/A" className="w-full bg-white border-gray-200 rounded-xl px-3 py-2 text-xs font-bold placeholder:text-gray-300" />
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-black uppercase tracking-widest text-brand-dark border-b border-gray-100 pb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-gray-400"/> Sincronizzazione Marketplace (Overrides)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amazon Block */}
              <div className="bg-gradient-to-br from-white to-orange-50 rounded-2xl p-6 border border-orange-100 shadow-sm relative overflow-hidden group hover:border-orange-300 transition-all flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 text-orange-500 shadow flex items-center justify-center rounded-xl"><Globe className="w-5 h-5" /></div>
                    <span className="font-black text-brand-dark uppercase tracking-tight">Amazon.it</span>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500 relative shadow-inner"></div>
                  </label>
                </div>
                <div className="space-y-4 relative z-10">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1 block">Titolo Ottimizzato SEO</span>
                    <input type="text" placeholder="Override per Amazon..." className="w-full bg-white border-orange-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-orange-500 focus:border-orange-500" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1 block">Aggiunta Spese Comm. (%)</span>
                    <input type="number" defaultValue="15" className="w-full bg-white border-orange-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-orange-500 focus:border-orange-500" />
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1 block">Esenzione GTIN</span>
                    <select className="w-full bg-white border-orange-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-orange-500 focus:border-orange-500">
                      <option>Nessuna (EAN Base)</option>
                      <option>Sì, approvata su Brand</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 mb-1 block">Descrizione Ottimizzata Amazon</span>
                    <textarea rows={3} placeholder="Descrizione specifica per Amazon (Bullet points ecc)..." className="w-full bg-white border-orange-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-orange-500 focus:border-orange-500 resize-none"></textarea>
                  </label>
                </div>
              </div>

              {/* eBay Block */}
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-all flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 text-blue-500 shadow flex items-center justify-center rounded-xl"><ExternalLink className="w-5 h-5" /></div>
                    <span className="font-black text-brand-dark uppercase tracking-tight">eBay</span>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 relative shadow-inner"></div>
                  </label>
                </div>
                <div className="space-y-4 relative z-10">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">Titolo + Sottotitolo Store</span>
                    <input type="text" placeholder="Titolo per inserzione eBay..." className="w-full bg-white border-blue-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-blue-500 focus:border-blue-500" />
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">Comm. (%)</span>
                      <input type="number" defaultValue="11" className="w-full bg-white border-blue-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-blue-500 focus:border-blue-500" />
                    </label>
                    <label className="block">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">Condizioni</span>
                      <select className="w-full bg-white border-blue-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-blue-500 focus:border-blue-500">
                        <option>Nuovo</option>
                        <option>Usato</option>
                      </select>
                    </label>
                  </div>
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-1 block">Descrizione Ottimizzata eBay</span>
                    <textarea rows={3} placeholder="HTML/Descrizione specifica per eBay..." className="w-full bg-white border-blue-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        {/* Colonna DX: Media & Pricing Engine */}
        <div className="lg:col-span-4 space-y-6 flex flex-col">
          <div className="sticky top-28 space-y-8">
            
            {/* Galleria Media */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-sm font-black uppercase tracking-widest text-brand-dark mb-4 flex items-center justify-between">
                Galleria Media 
                <span className="text-[10px] font-bold text-gray-400">{gallery.length}/6 Max</span>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                 {gallery.map((img, i) => (
                    <div key={i} className={`aspect-square bg-gray-200 rounded-xl relative group overflow-hidden border-2 ${i===0 ? 'border-brand-yellow':'border-transparent'}`}>
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      {i === 0 && <div className="absolute bottom-0 inset-x-0 bg-brand-yellow text-brand-dark text-[8px] font-black uppercase text-center py-0.5">Focus</div>}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button onClick={() => setGallery(g => g.filter((_, idx) => idx !== i))} className="p-1.5 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"><Trash2 className="w-3 h-3" /></button>
                      </div>
                    </div>
                 ))}
                 {gallery.length < 6 && (
                   <button 
                     onClick={() => setGallery([...gallery, `https://picsum.photos/seed/${Math.round(Math.random()*1000)}/500/500`])}
                     className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl hover:border-brand-blue hover:bg-brand-blue/5 transition-all text-gray-400 hover:text-brand-blue group cursor-pointer"
                   >
                     <Plus className="w-6 h-6 group-hover:scale-110 transition-transform mb-1" />
                     <span className="text-[8px] font-black uppercase text-center">Aggiungi</span>
                   </button>
                 )}
              </div>
            </div>

            {/* Pricing Engine */}
            <div className="bg-brand-dark rounded-2xl p-6 shadow-2xl relative overflow-hidden ring-4 ring-brand-yellow/20">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow rounded-full blur-3xl opacity-10"></div>
               <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2 relative z-10"><RefreshCw className="w-4 h-4 text-brand-yellow"/> Motore Prezzi Dinamico</h3>
               
               <div className="space-y-6 relative z-10">
                  <label className="block">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300 mb-1 block">Costo Base d'Acquisto</span>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-gray-400">€</span>
                      <input type="number" value={baseCost} onChange={e => setBaseCost(Number(e.target.value))} className="w-full bg-black/40 border border-gray-700 text-white rounded-xl pl-8 pr-4 py-3 text-lg font-black focus:ring-brand-yellow focus:border-brand-yellow transition-all" />
                    </div>
                  </label>
                  
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
                     <div>
                       <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-brand-yellow">Ricarico B2C Sito (%)</label>
                          <label className="text-[10px] font-black uppercase tracking-widest text-white">Prezzo Pubblico (Override)</label>
                       </div>
                       <div className="flex gap-2">
                          <div className="relative w-1/3">
                             <input type="number" value={b2cMarkup} onChange={e => setB2cMarkup(Number(e.target.value))} className="w-full bg-black text-white border border-gray-700 rounded-lg px-2 py-2 text-sm font-bold text-center focus:border-brand-yellow focus:ring-brand-yellow" />
                          </div>
                          <div className="relative w-2/3">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-brand-dark/50">€</span>
                            <input type="number" value={manualB2c || b2cPrice.toFixed(2)} onChange={e => handleManualPrice(e.target.value, 'b2c')} placeholder={b2cPrice.toFixed(2)} className={`w-full bg-brand-yellow text-brand-dark border-none rounded-lg pl-8 pr-2 py-2 text-base font-black text-right shadow-inner focus:ring-2 focus:ring-white transition-all ${manualB2c ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-dark' : ''}`} />
                            {manualB2c && <button onClick={() => setManualB2c("")} className="absolute right-0 -bottom-5 text-[8px] text-gray-400 hover:text-white uppercase font-black tracking-wider transition-colors">Reset Calcolatore</button>}
                          </div>
                       </div>
                     </div>

                     <div className="pt-2 border-t border-white/10 mt-4">
                       <div className="flex justify-between items-center mb-1">
                          <label className="text-[10px] font-black uppercase tracking-widest text-blue-400 mt-2">Ricarico VIP B2B (%)</label>
                          <label className="text-[10px] font-black uppercase tracking-widest text-white mt-2">Prezzo Rivenditori (Override)</label>
                       </div>
                       <div className="flex gap-2">
                          <div className="relative w-1/3">
                             <input type="number" value={b2bMarkup} onChange={e => setB2bMarkup(Number(e.target.value))} className="w-full bg-black text-white border border-gray-700 rounded-lg px-2 py-2 text-sm font-bold text-center focus:border-blue-500 focus:ring-blue-500" />
                          </div>
                          <div className="relative w-2/3">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-white/50">€</span>
                            <input type="number" value={manualB2b || b2bPrice.toFixed(2)} onChange={e => handleManualPrice(e.target.value, 'b2b')} placeholder={b2bPrice.toFixed(2)} className={`w-full bg-blue-500 text-white border-none rounded-lg pl-8 pr-2 py-2 text-base font-black text-right shadow-inner focus:ring-2 focus:ring-white transition-all ${manualB2b ? 'ring-2 ring-white ring-offset-2 ring-offset-brand-dark' : ''}`} />
                            {manualB2b && <button onClick={() => setManualB2b("")} className="absolute right-0 -bottom-5 text-[8px] text-gray-400 hover:text-white uppercase font-black tracking-wider transition-colors">Reset Calcolatore</button>}
                          </div>
                       </div>
                     </div>
                  </div>
               </div>
            </div>

            <button className="w-full bg-brand-yellow text-brand-dark px-8 py-5 rounded-2xl font-black uppercase text-sm tracking-widest hover:bg-yellow-400 hover:scale-[1.02] shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95">
              <Check className="w-6 h-6" />
              Salva e Pubblica
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};
