import { useState } from 'react';
import './App.css';
import { getcuaca } from './lib/api';
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";

function App() {
  const [cuaca, setCuaca] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  const placeholders = [
    "Cek cuaca di Jakarta...",
    "Hari ini mendung nggak ya?",
    "Masukkan nama kota kamu di sini...",
    "Kota tujuan liburan lo?",
    "Cari suhu udara sekarang..."
  ];

  const handleChange = (e) => setCity(e.target.value);


  const handlecuaca = async (e) => {
    e.preventDefault();
    if (!city) return;

    setLoading(true);
    try {
      const data = await getcuaca(city);
      setCuaca(data);
    } catch (error) {
      console.error("Gagal ambil data cuaca:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 transition-all duration-300 relative"
      style={{
        backgroundColor: '#70C9D5',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
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

      {cuaca && !loading && (
        <div className="mt-10 bg-white bg-opacity-10 p-6 rounded-lg backdrop-blur-md w-full max-w-md text-left text-white shadow-lg">
          <h2 className="text-xl font-semibold mb-2">
            {cuaca.location.name}, {cuaca.location.country}
          </h2>
          <p>{cuaca.location.localtime}</p>
          <div className="flex items-center gap-4 mt-2">
            <img
              src={cuaca.current.condition.icon}
              alt={cuaca.current.condition.text}
              className="w-12 h-12"
            />
            <div>
              <p className="text-3xl font-bold">{cuaca.current.temp_c}°C</p>
              <p className="capitalize">{cuaca.current.condition.text}</p>
            </div>
          </div>
          <div className="mt-4 text-sm space-y-1">
            <p>💧 Kelembapan: {cuaca.current.humidity}%</p>
            <p>💨 Angin: {cuaca.current.wind_kph} kph ({cuaca.current.wind_dir})</p>
            <p>🌡️ Terasa seperti: {cuaca.current.feelslike_c}°C</p>
          </div>
        </div>
      )}

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
