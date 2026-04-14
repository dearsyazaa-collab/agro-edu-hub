"use client";

import { useState } from "react";
import { getCalculatorPresets } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calculator,
  FlaskConical,
  Grid3x3,
  Droplets,
  Ruler,
  Info,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

// metadata must be in a server component, so we handle it via layout or export from page
// For client component pages, we'll set metadata in a wrapper

const presets = getCalculatorPresets();

export default function KalkulatorPage() {
  const [activeTab, setActiveTab] = useState<"abmix" | "spacing">("abmix");

  return (
    <div className="islamic-pattern min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
            <Calculator className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">
              Kalkulator Pintar
            </h1>
            <p className="text-sm text-emerald-600">
              Alat bantu perhitungan pertanian
            </p>
          </div>
        </div>
        <p className="text-emerald-600 mb-8 max-w-2xl">
          Hitung kebutuhan nutrisi AB Mix dan jarak tanam optimal secara otomatis.
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("abmix")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "abmix"
                ? "bg-emerald-700 text-white shadow-md shadow-emerald-200"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <FlaskConical className="h-4 w-4" />
            Nutrisi AB Mix
          </button>
          <button
            onClick={() => setActiveTab("spacing")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              activeTab === "spacing"
                ? "bg-emerald-700 text-white shadow-md shadow-emerald-200"
                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            }`}
          >
            <Grid3x3 className="h-4 w-4" />
            Jarak Tanam
          </button>
        </div>

        {activeTab === "abmix" ? <ABMixCalculator /> : <SpacingCalculator />}
      </div>
    </div>
  );
}

function ABMixCalculator() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [waterVolume, setWaterVolume] = useState("");
  const [result, setResult] = useState<{
    stockA: number;
    stockB: number;
    targetPPM: [number, number];
    targetPH: [number, number];
  } | null>(null);

  const calculate = () => {
    const crop = presets.abMix.crops.find((c) => c.name === selectedCrop);
    if (!crop || !waterVolume) return;

    const vol = parseFloat(waterVolume);
    if (isNaN(vol) || vol <= 0) return;

    // Standard AB Mix calculation:
    // Stock concentration = 250x (standard), so ml per liter = PPM_target / 250
    // Then multiply by volume
    const avgPPM = (crop.ppmRange[0] + crop.ppmRange[1]) / 2;
    const mlPerLiter = avgPPM / 250;
    const totalMl = mlPerLiter * vol;

    setResult({
      stockA: Math.round(totalMl * (crop.ratioA / 10) * 100) / 100,
      stockB: Math.round(totalMl * (crop.ratioB / 10) * 100) / 100,
      targetPPM: crop.ppmRange,
      targetPH: crop.phRange,
    });
  };

  const reset = () => {
    setSelectedCrop("");
    setWaterVolume("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200/50 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-emerald-600" />
            Kalkulator Nutrisi AB Mix
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Crop selection */}
            <div className="space-y-2">
              <Label className="text-emerald-800 text-sm font-medium">Jenis Tanaman</Label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full h-10 rounded-lg border border-emerald-200 bg-white px-3 text-sm text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Pilih tanaman...</option>
                {presets.abMix.crops.map((crop) => (
                  <option key={crop.name} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Water volume */}
            <div className="space-y-2">
              <Label className="text-emerald-800 text-sm font-medium">Volume Air (Liter)</Label>
              <div className="relative">
                <Droplets className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <Input
                  type="number"
                  placeholder="Contoh: 50"
                  value={waterVolume}
                  onChange={(e) => setWaterVolume(e.target.value)}
                  min={1}
                  className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={calculate}
              disabled={!selectedCrop || !waterVolume}
              className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Hitung
            </Button>
            <Button onClick={reset} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <Card className="border-emerald-300 shadow-md shadow-emerald-100/50 animate-fade-in-up">
          <div className="h-1 gradient-emerald" />
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Hasil Perhitungan — {selectedCrop}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <ResultCard label="Stok A" value={`${result.stockA} ml`} icon={<span className="text-lg font-bold text-emerald-700">A</span>} />
              <ResultCard label="Stok B" value={`${result.stockB} ml`} icon={<span className="text-lg font-bold text-teal-700">B</span>} />
              <ResultCard label="Target PPM" value={`${result.targetPPM[0]}-${result.targetPPM[1]}`} icon={<Droplets className="h-5 w-5 text-blue-600" />} />
              <ResultCard label="Target pH" value={`${result.targetPH[0]}-${result.targetPH[1]}`} icon={<Info className="h-5 w-5 text-amber-600" />} />
            </div>

            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs text-emerald-700 leading-relaxed">
                <strong>📝 Catatan:</strong> Larutkan Stok A terlebih dahulu ke dalam air, aduk rata, baru masukkan Stok B.
                Jangan pernah mencampur Stok A dan B dalam bentuk pekat. Ukur PPM dan pH setelah pencampuran
                dan sesuaikan jika diperlukan.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function SpacingCalculator() {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [result, setResult] = useState<{
    totalPlants: number;
    rows: number;
    plantsPerRow: number;
    rowSpacing: number;
    plantSpacing: number;
    area: number;
  } | null>(null);

  const calculate = () => {
    const crop = presets.spacing.crops.find((c) => c.name === selectedCrop);
    if (!crop || !length || !width) return;

    const l = parseFloat(length);
    const w = parseFloat(width);
    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return;

    // Convert spacing from cm to m
    const rowSpacingM = crop.rowSpacing / 100;
    const plantSpacingM = crop.plantSpacing / 100;

    const rows = Math.floor(w / rowSpacingM) + 1;
    const plantsPerRow = Math.floor(l / plantSpacingM) + 1;
    const totalPlants = rows * plantsPerRow;

    setResult({
      totalPlants,
      rows,
      plantsPerRow,
      rowSpacing: crop.rowSpacing,
      plantSpacing: crop.plantSpacing,
      area: l * w,
    });
  };

  const reset = () => {
    setSelectedCrop("");
    setLength("");
    setWidth("");
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200/50 shadow-sm">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
            <Grid3x3 className="h-5 w-5 text-emerald-600" />
            Kalkulator Jarak Tanam
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            {/* Crop selection */}
            <div className="space-y-2">
              <Label className="text-emerald-800 text-sm font-medium">Jenis Tanaman</Label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full h-10 rounded-lg border border-emerald-200 bg-white px-3 text-sm text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="">Pilih tanaman...</option>
                {presets.spacing.crops.map((crop) => (
                  <option key={crop.name} value={crop.name}>
                    {crop.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Field length */}
            <div className="space-y-2">
              <Label className="text-emerald-800 text-sm font-medium">Panjang Lahan (m)</Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <Input
                  type="number"
                  placeholder="Contoh: 10"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  min={1}
                  className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>

            {/* Field width */}
            <div className="space-y-2">
              <Label className="text-emerald-800 text-sm font-medium">Lebar Lahan (m)</Label>
              <div className="relative">
                <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                <Input
                  type="number"
                  placeholder="Contoh: 5"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  min={1}
                  className="pl-10 border-emerald-200 focus-visible:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={calculate}
              disabled={!selectedCrop || !length || !width}
              className="bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm"
            >
              <Calculator className="mr-2 h-4 w-4" />
              Hitung
            </Button>
            <Button onClick={reset} variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <Card className="border-emerald-300 shadow-md shadow-emerald-100/50 animate-fade-in-up">
          <div className="h-1 gradient-emerald" />
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-emerald-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Hasil Perhitungan — {selectedCrop}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              <ResultCard label="Total Tanaman" value={result.totalPlants.toLocaleString("id-ID")} icon={<span className="text-lg">🌱</span>} />
              <ResultCard label="Jumlah Baris" value={result.rows.toString()} icon={<span className="text-lg">📏</span>} />
              <ResultCard label="Tanaman/Baris" value={result.plantsPerRow.toString()} icon={<span className="text-lg">🌿</span>} />
              <ResultCard label="Jarak Baris" value={`${result.rowSpacing} cm`} icon={<Ruler className="h-5 w-5 text-emerald-600" />} />
              <ResultCard label="Jarak Tanaman" value={`${result.plantSpacing} cm`} icon={<Ruler className="h-5 w-5 text-teal-600" />} />
              <ResultCard label="Luas Lahan" value={`${result.area} m²`} icon={<Grid3x3 className="h-5 w-5 text-blue-600" />} />
            </div>

            {/* Visual grid preview */}
            <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-100">
              <p className="text-xs font-medium text-emerald-800 mb-3">Visualisasi Penanaman (diperkecil):</p>
              <div className="overflow-x-auto">
                <div className="inline-grid gap-1" style={{
                  gridTemplateColumns: `repeat(${Math.min(result.plantsPerRow, 20)}, 1fr)`,
                }}>
                  {Array.from({ length: Math.min(result.rows, 8) * Math.min(result.plantsPerRow, 20) }).map((_, i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-emerald-500/60" />
                  ))}
                </div>
                {(result.rows > 8 || result.plantsPerRow > 20) && (
                  <p className="text-[10px] text-emerald-500 mt-2">
                    * Menampilkan sebagian ({Math.min(result.rows, 8)}×{Math.min(result.plantsPerRow, 20)} dari {result.rows}×{result.plantsPerRow})
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ResultCard({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl border border-emerald-100 p-4 text-center shadow-sm">
      <div className="flex justify-center mb-2">{icon}</div>
      <p className="text-lg font-bold text-emerald-900">{value}</p>
      <p className="text-xs text-emerald-600">{label}</p>
    </div>
  );
}
