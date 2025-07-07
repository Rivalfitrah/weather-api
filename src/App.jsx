import { useState } from 'react';
import './App.css';
import { getcuaca } from './lib/api';

function App() {
  const [cuaca, setCuaca] = useState(null);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);

  // Fungsi fetch data cuaca
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

  // Tentukan background berdasarkan waktu lokal kota
  const getBackgroundStyle = () => {
    if (!cuaca) return { background: '#1e293b' }; // default bg saat belum ada data

    const jam = new Date(cuaca.location.localtime).getHours();

    if (jam >= 5 && jam < 11)
      return { background: 'linear-gradient(#89f7fe, #66a6ff)' }; // pagi
    else if (jam >= 11 && jam < 15)
      return { background: 'linear-gradient(#56ccf2, #2f80ed)' }; // siang
    else if (jam >= 15 && jam < 18)
      return { background: 'linear-gradient(#f7971e, #ffd200)' }; // sore
    else
      return { background: 'linear-gradient(#0f2027, #203a43, #2c5364)' }; // malam
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center justify-center px-4 transition-all duration-300"
      style={{
        ...getBackgroundStyle(),
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Cuacanya</h1>
      <p className="text-center max-w-lg text-sm md:text-base mb-8">
        Cuacanya adalah aplikasi ringan untuk ngecek cuaca kota favorit lo secara cepat dan simpel. Gak perlu ribet, tinggal cari nama kota dan lihat kondisi cuacanya sekarang.
      </p>

      <form
        onSubmit={handlecuaca}
        className="flex w-full max-w-md bg-white rounded-full overflow-hidden shadow-md"
      >
        <input
          type="text"
          placeholder="Contoh: Jakarta"
          className="flex-grow px-4 py-2 text-black outline-none"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit" className="bg-black text-white px-4">
          ➤
        </button>
      </form>

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
