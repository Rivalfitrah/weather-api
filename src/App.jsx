import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
import { getcuaca } from "./lib/api";
import { PlaceholdersAndVanishInput } from "./components/ui/placeholders-and-vanish-input";

function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [cuaca, setCuaca] = useState(null);
  const [error, setError] = useState(null);
  const [clouds, setClouds] = useState([]);
  const translateCondition = {
    "Clear": "Cerah",
    "Partly cloudy": "Cerah Berawan",
    "Cloudy": "Berawan",
    "Overcast": "Mendung",
    "Mist": "Kabut",
    "Fog": "Berkabut",
    "Patchy rain possible": "Hujan ringan mungkin",
    "Light rain": "Hujan ringan",
    "Heavy rain": "Hujan deras",
    "Sunny": "Cerah",
    "Thundery outbreaks possible": "Kemungkinan badai petir",
    // Tambahkan lainnya sesuai kebutuhan
  };


  const isResultShown = !!cuaca;

  useEffect(() => {
    const generatedClouds = Array.from({ length: 35 }).map((_, i) => {
      const isLeft = i % 2 === 0;
      const top = Math.floor(Math.random() * 80);
      const delayClasses = ["animate-cloud", "animate-cloud-delay", "animate-cloud-slow", "animate-cloud-fast"];
      const delay = delayClasses[i % delayClasses.length];
      const size = 80 + Math.floor(Math.random() * 120);
      const opacity = 0.5 + Math.random() * 0.4;

      return {
        key: i,
        top,
        isLeft,
        delay,
        size,
        opacity,
        offset: Math.floor(Math.random() * 200),
      };
    });
    setClouds(generatedClouds);
  }, []);

  const placeholders = [
    "Cek cuaca di Jakarta...",
    "Hari ini mendung nggak ya?",
    "Masukkan nama kota kamu di sini...",
    "Kota tujuan liburan lo?",
    "Cari suhu udara sekarang...",
  ];

  const handlecuaca = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setLoading(true);
    try {
      const data = await getcuaca(city);
      setCuaca(data);
      setError(null);
    } catch (err) {
      setError("Cuaca tidak ditemukan atau terjadi kesalahan.");
      setCuaca(null);
    }
    setLoading(false);
  };

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center px-4 relative overflow-hidden font-baloo"
      style={{ backgroundColor: "#70B3D5" }}
    >
      {/* Logo */}
      <img
        src="/img/ZR_logo_awan.png"
        alt="Logo Cuacanya"
        className="absolute top-4 left-4 w-12 h-12 sm:w-14 sm:h-14 drop-shadow-md"
      />
      {/* Awan animasi */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {clouds.map((cloud) => (
          <img
            key={cloud.key}
            src="/img/awan_kecil.png"
            alt={`awan-${cloud.key}`}
            className={`absolute ${cloud.delay} animate-cloud-center blur-sm`}
            style={{
              width: `${cloud.size}px`,
              top: `${cloud.top}%`,
              [cloud.isLeft ? "left" : "right"]: `-${cloud.offset}px`,
              opacity: cloud.opacity,
            }}
          />
        ))}
      </div>
      {/* Judul, Deskripsi, Footer */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: isResultShown ? 0 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`flex flex-col items-center text-center space-y-4 transition-all duration-500 ${isResultShown
          ? "mt-10"
          : "justify-center min-h-[calc(100vh-100px)]"
          }`}
      >
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg tracking-wide">
          Cuacanya App ☁️
        </h1>
        <p className="max-w-xl text-base md:text-lg leading-relaxed tracking-wide">
          Aplikasi cuaca simpel buat lo yang mager ribet. Ketik nama kota, dan liat
          kondisi cuaca sekarang. Gampang banget, kan?
        </p>
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={(e) => setCity(e.target.value)}
          onSubmit={handlecuaca}
        />
        <div className="text-sm text-white/70 italic">
          Project by{" "}
          <a
            href="https://rivalfitrah.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            rivalfitrah.my.id
          </a>{" "}
          and{" "}
          <a
            href="https://zollahrp.my.id"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white transition-colors"
          >
            zollahrp.my.id
          </a>
        </div>
      </motion.div>
      {/* Loading dan Error */}
      {loading && <p className="mt-6 text-sm animate-pulse">Loading cuaca...</p>}
      {error && (
        <p className="mt-6 text-sm text-red-200 italic">{error}</p>
      )}
      {/* Hasil Cuaca */}
      <AnimatePresence>
        {cuaca && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl bg-white rounded-t-[60px] mt-10 pt-10 pb-20 px-6 sm:px-10 text-center text-[#70B3D5]"
          >
            <p className="text-left text-sm font-semibold mb-1">Today</p>
            <p className="text-left text-xs text-gray-400 mb-4">
              {new Date().toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <h2 className="text-6xl font-bold mb-2">
              {cuaca.current.temp_c}°
            </h2>
            <img
              src={cuaca.current.condition.icon}
              alt={cuaca.current.condition.text}
              className="mx-auto w-20 h-20"
            />
            <p className="text-lg font-semibold mt-2">
              {translateCondition[cuaca.current.condition.text] || cuaca.current.condition.text}
            </p>
            {/* Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 text-xs">
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.location.country}</p>
                <p className="text-gray-500">Negara</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.location.region}</p>
                <p className="text-gray-500">Wilayah</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.current.wind_kph} kph</p>
                <p className="text-gray-500">Angin</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.current.feelslike_c}°C</p>
                <p className="text-gray-500">	Terasa Seperti</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.current.humidity}%</p>
                <p className="text-gray-500">Kelembapan</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2">
                <p className="font-bold text-lg">{cuaca.current.uv}</p>
                <p className="text-gray-500">	Indeks UV</p>
              </div>
              <div className="bg-blue-100 rounded-xl py-4 px-2 col-span-2">
                <p className="font-bold text-sm">
                  {cuaca.current.last_updated}
                </p>
                <p className="text-gray-500">Terakhir Diperbarui</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Awan besar bawah */}
      <motion.img
        src="/img/awan.png"
        alt="awan"
        initial={{ y: 0 }}
        animate={{ y: isResultShown ? 80 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute bottom-0 w-full pointer-events-none"
      />
    </div>
  );
}

export default App;
