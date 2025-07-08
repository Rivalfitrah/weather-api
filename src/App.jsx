import { use, useState } from 'react';
import './App.css';
import { getcuaca } from './lib/api';
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";
import { useNavigate } from 'react-router-dom';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const placeholders = [
    "Cek cuaca di Jakarta...",
    "Hari ini mendung nggak ya?",
    "Masukkan nama kota kamu di sini...",
    "Kota tujuan liburan lo?",
    "Cari suhu udara sekarang..."
  ];


  const handlecuaca = (e) => {
    e.preventDefault()
    if (!city.trim()) return
    navigate(`/${city.trim()}`)
  }

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 transition-all duration-300 relative"
      style={{
        backgroundColor: '#70C9D5',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <img
        src="/img/awan_kecil.png"
        alt="awan kecil"
        className="absolute top-10 left-[-200px] w-40 sm:w-60 animate-cloud pointer-events-none opacity-80"
      />

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Cuacanya</h1>
      <p className="text-center max-w-lg text-sm md:text-base mb-8">
        Cuacanya adalah aplikasi ringan untuk ngecek cuaca kota favorit lo secara cepat dan simpel. Gak perlu ribet, tinggal cari nama kota dan lihat kondisi cuacanya sekarang.
      </p>

      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={(e) => setCity(e.target.value)}
        onSubmit={handlecuaca}
      />


      {loading && <p className="mt-6 text-sm">Loading cuaca...</p>}

      <div className="absolute bottom-4 left-6 text-xs">zollahrp.my.id</div>
      <div className="absolute bottom-4 right-6 text-xs">rivalfitrah.my.id</div>

      <img
        src="/img/awan.png"
        alt="awan"
        className="absolute bottom-0 w-full pointer-events-none"
      />
    </div>
  );
}

export default App;
