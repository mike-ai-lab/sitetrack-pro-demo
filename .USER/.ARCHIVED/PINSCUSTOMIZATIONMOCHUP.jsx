import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Star, Square, Triangle, Circle, MapPin, 
  User, Phone, FileText, Camera, AlertCircle, Trash2, Edit2, Info
} from 'lucide-react';

/**
 * PROJECT INTELLIGENCE MAP (V3)
 * Logic:
 * 1. Color = Priority
 * 2. Shape = Role
 * 3. Label = Phase
 * 4. Style = Status (Closed: 50% opacity, On Hold: dashed)
 * 5. Sequence: Pins numbered #1, #2, etc.
 * 6. Features: Edit, Delete, Tooltip, Phone Validation, Mock Photo Upload
 */

const App = () => {
  const [pins, setPins] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [hoveredPinId, setHoveredPinId] = useState(null);
  
  const [formData, setFormData] = useState({
    priority: 'Normal',
    status: 'Active',
    personnelName: '',
    role: 'Owner',
    phone: '',
    phase: 'ST',
    notes: '',
    photo: null,
  });

  // Constants
  const priorities = [
    { label: 'Critical', color: '#ef4444' },
    { label: 'High', color: '#f97316' },
    { label: 'Normal', color: '#3b82f6' },
    { label: 'Low', color: '#94a3b8' },
  ];

  const roles = [
    { label: 'Owner', icon: Star },
    { label: 'Client', icon: Star },
    { label: 'Consultant', icon: Square },
    { label: 'Contractor', icon: Triangle },
    { label: 'Foreman', icon: Circle },
  ];

  const phases = ['ST', 'INT', 'FD', 'EX', 'CL'];
  const statuses = ['New', 'Active', 'On Hold', 'Closed'];

  // Phone Validation Logic (Saudi Format: 05XXXXXXXX)
  const isPhoneInvalid = formData.phone.length > 0 && !/^05\d{8}$/.test(formData.phone);

  const handleMapClick = (e) => {
    if (e.target.closest('.pin-container')) return; // Don't trigger new pin on existing pin click
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setSelectedLocation({ x, y });
    setEditingId(null);
    setFormData({
      priority: 'Normal',
      status: 'Active',
      personnelName: '',
      role: 'Owner',
      phone: '',
      phase: 'ST',
      notes: '',
      photo: null,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (pin) => {
    setEditingId(pin.id);
    setSelectedLocation({ x: pin.x, y: pin.y });
    setFormData({ ...pin });
    setIsModalOpen(true);
  };

  const deletePin = (id) => {
    setPins(pins.filter(p => p.id !== id));
    setIsModalOpen(false);
  };

  const savePin = () => {
    if (editingId) {
      setPins(pins.map(p => p.id === editingId ? { ...formData, id: editingId, x: selectedLocation.x, y: selectedLocation.y } : p));
    } else {
      setPins([...pins, { ...formData, id: Date.now(), x: selectedLocation.x, y: selectedLocation.y, index: pins.length + 1 }]);
    }
    setIsModalOpen(false);
  };

  const handlePhotoUpload = () => {
    // Simulating camera/gallery access
    const mockUrl = `https://picsum.photos/seed/${Math.random()}/400/300`;
    setFormData({ ...formData, photo: mockUrl });
  };

  // Components
  const PinIcon = ({ role, priority, phase, status, index, id, size = 32, showLabel = true }) => {
    const roleObj = roles.find(r => r.label === role) || roles[0];
    const prioObj = priorities.find(p => p.label === priority) || priorities[2];
    const Icon = roleObj.icon;
    const isClosed = status === 'Closed';
    const isOnHold = status === 'On Hold';

    return (
      <div 
        className="pin-container relative flex items-center justify-center transition-all hover:z-50"
        onMouseEnter={() => setHoveredPinId(id)}
        onMouseLeave={() => setHoveredPinId(null)}
        onClick={() => {
            const pin = pins.find(p => p.id === id);
            if(pin) openEditModal(pin);
        }}
      >
        {/* Tooltip */}
        {hoveredPinId === id && showLabel && (
          <div className="absolute bottom-full mb-3 w-48 bg-slate-900 text-white p-3 rounded-lg shadow-xl text-[11px] leading-tight pointer-events-none z-[60]">
            <div className="flex items-center gap-2 mb-1 border-b border-slate-700 pb-1">
                <span style={{color: prioObj.color}}>●</span>
                <span className="font-bold uppercase tracking-wider">{priority}</span>
            </div>
            <p className="opacity-80 font-medium">{role} • {phase}</p>
            <p className="mt-1 font-bold">{status}</p>
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
          </div>
        )}

        {/* Pin Number - #1, #2... */}
        <div className="absolute -left-6 bg-white border border-slate-200 text-slate-900 font-black text-[10px] px-1 rounded shadow-sm">
          #{index}
        </div>

        <div 
          className={`p-2 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-125 ${isOnHold ? 'border-2 border-dashed border-white' : 'border-2 border-transparent'}`}
          style={{ 
            backgroundColor: prioObj.color, 
            color: 'white',
            opacity: isClosed ? 0.5 : 1,
          }}
        >
          <Icon size={size * 0.6} fill="currentColor" strokeWidth={2.5} />
        </div>

        <div className="absolute -top-1 -right-4 bg-slate-900 text-white text-[10px] font-black px-1 rounded border border-white shadow-sm">
          {phase}
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen bg-slate-100 overflow-hidden font-sans">
      
      {/* Simulation Map */}
      <div 
        className="relative w-full h-full bg-slate-200 cursor-crosshair overflow-hidden"
        onClick={handleMapClick}
        style={{ 
          backgroundImage: 'radial-gradient(#cbd5e1 1.5px, transparent 1.5px)', 
          backgroundSize: '40px 40px' 
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <h1 className="text-8xl font-black uppercase tracking-tighter text-slate-500">Site Workspace</h1>
        </div>

        {pins.map(pin => (
          <div 
            key={pin.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
          >
            <PinIcon {...pin} />
          </div>
        ))}
      </div>

      {/* FORM MODAL (No Blur for Performance) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            <div className="p-6 bg-slate-50 border-b flex items-center justify-between">
              <div className="flex items-center gap-4">
                <PinIcon 
                  role={formData.role} 
                  priority={formData.priority} 
                  phase={formData.phase} 
                  status={formData.status}
                  index={editingId ? pins.find(p => p.id === editingId).index : pins.length + 1}
                  showLabel={false}
                  size={40}
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{editingId ? 'Edit Pin Details' : 'Specify Lead Pin'}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pin #{editingId ? pins.find(p => p.id === editingId).index : pins.length + 1}</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X /></button>
            </div>

            <div className="p-6 space-y-5 overflow-y-auto flex-1">
              {/* Priority Selection */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Urgency (Pin Color)</label>
                <div className="grid grid-cols-4 gap-2">
                  {priorities.map(p => (
                    <button
                      key={p.label}
                      onClick={() => setFormData({...formData, priority: p.label})}
                      className={`py-2 rounded-lg text-[10px] font-black transition-all border-2 ${
                        formData.priority === p.label ? 'border-slate-900 ring-2 ring-slate-100 scale-105' : 'border-transparent opacity-60'
                      }`}
                      style={{ backgroundColor: p.color, color: 'white' }}
                    >
                      {p.label.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status Workflow */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Workflow Style</label>
                <div className="flex gap-2">
                  {statuses.map(s => (
                    <button
                      key={s}
                      onClick={() => setFormData({...formData, status: s})}
                      className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                        formData.status === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Personnel, Phone & Phase */}
              <div className="p-4 bg-slate-50 rounded-2xl space-y-4 border border-slate-100">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Role (Icon)</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                    >
                      {roles.map(r => <option key={r.label} value={r.label}>{r.label}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Phase (Label)</label>
                    <select 
                      value={formData.phase}
                      onChange={(e) => setFormData({...formData, phase: e.target.value})}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-sm font-bold outline-none"
                    >
                      {phases.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-slate-400 uppercase">Assignee</label>
                    <input 
                        type="text"
                        value={formData.personnelName}
                        onChange={(e) => setFormData({...formData, personnelName: e.target.value})}
                        placeholder="Muhamad..."
                        className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm outline-none"
                    />
                </div>

                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black text-slate-400 uppercase">Saudi Phone</label>
                        {isPhoneInvalid && <span className="text-[10px] text-red-500 font-bold">INVALID FORMAT</span>}
                    </div>
                    <div className={`flex items-center bg-white border rounded-lg px-3 transition-colors ${isPhoneInvalid ? 'border-red-400 bg-red-50' : 'border-slate-200'}`}>
                        <Phone size={14} className={isPhoneInvalid ? 'text-red-500' : 'text-slate-400'} />
                        <input 
                            type="text"
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            placeholder="05XXXXXXXX"
                            className="w-full p-2.5 bg-transparent text-sm outline-none font-mono"
                        />
                    </div>
                </div>
              </div>

              {/* Photo Upload Simulation */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Site Photo</label>
                {formData.photo ? (
                  <div className="relative rounded-xl overflow-hidden group">
                    <img src={formData.photo} alt="Site" className="w-full h-40 object-cover" />
                    <button 
                      onClick={() => setFormData({...formData, photo: null})}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button 
                    onClick={handlePhotoUpload}
                    className="w-full py-8 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <Camera size={32} strokeWidth={1.5} />
                    <span className="text-[10px] font-black uppercase mt-2">Capture or Upload</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Notes</label>
                <textarea 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none h-24 resize-none focus:bg-white transition-colors"
                  placeholder="Additional site intelligence..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="p-4 bg-slate-50 border-t flex items-center gap-3">
              {editingId && (
                <button 
                  onClick={() => deletePin(editingId)}
                  className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
                  title="Delete Pin"
                >
                  <Trash2 size={20} />
                </button>
              )}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 text-xs font-black uppercase text-slate-400"
              >
                Cancel
              </button>
              <button 
                onClick={savePin}
                className="flex-[2] py-4 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] shadow-xl hover:bg-slate-800 active:scale-95 transition-all"
              >
                {editingId ? 'Save Changes' : 'Place Pin'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;