"use client";

import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/pokemon/";

export const PokemonCard = () => {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getHeroById = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

      if (response.ok) {
        const data = await response.json();
        setHero(data);
      } else {
        setError("data oldsongu");
      }
    } catch (fetchError) {
      setError("netee shalga");
    }
    setIsLoading(false);
  };
  const showRandomHero = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    getHeroById(randomId);
  };

  useEffect(() => {
    getHeroById(25);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">⚡ Покемон карт</h1>
      <div className="flex h-[440px] w-80 flex-col items-center justify-center rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
        {isLoading && <p>unshij bn</p>}
        {!isLoading && error !== "" && <p>{error}</p>}
        {!isLoading && error === "" && hero !== null && (
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-[250px] h-[300px]"
              src={hero.sprites.other["official-artwork"].front_default}
            />
            <h1 className="font-bold text-[25px]">{hero.name}</h1>
          </div>
        )}
      </div>

      <button
        onClick={showRandomHero}
        className="rounded-xl bg-yellow-400 px-8 py-3 text-lg font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50"
      >
        🎲 Санамсаргүй
      </button>
    </main>
  );
};
