import { Leaf, Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const footerLinks = [
  { href: "/katalog", label: "Katalog Materi" },
  { href: "/kalkulator", label: "Kalkulator Pertanian" },
  { href: "/checklist", label: "Panduan Bertani" },
  { href: "/quiz", label: "Kuis Interaktif" },
  { href: "/glosarium", label: "Glosarium" },
];

export default function Footer() {
  return (
    <footer className="border-t border-emerald-200/50 bg-emerald-950 text-emerald-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 shadow-md">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Agro-Edu Hub</p>
                <p className="text-[10px] text-emerald-400">Al-Fauzan</p>
              </div>
            </div>
            <p className="text-sm text-emerald-300 leading-relaxed max-w-xs">
              Platform edukasi pertanian digital untuk siswa MA Pesantren Terpadu
              Al-Fauzan. Belajar bertani secara modern, ilmiah,
              dan sesuai nilai-nilai Islam.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Navigasi</h3>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-emerald-300 hover:text-emerald-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Informasi</h3>
            <div className="space-y-3 text-sm text-emerald-300">
              <p>📍 MA Pesantren Terpadu Al-Fauzan</p>
              <p>📚 Proyek Karya Tulis Ilmiah (KTI)</p>
              <p>🌱 Edukasi Pertanian Digital</p>
              <p className="text-xs text-emerald-500 pt-2 italic">
                &ldquo;Tidaklah seorang muslim menanam tanaman, lalu dimakan
                darinya, melainkan menjadi sedekah baginya.&rdquo;
                <br />— HR. Bukhari
              </p>
            </div>
          </div>
        </div>

        <Separator className="bg-emerald-800/50" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-6">
          <p className="text-xs text-emerald-500">
            © {new Date().getFullYear()} Agro-Edu Hub Al-Fauzan. Proyek KTI
            Pertanian.
          </p>
          <p className="text-xs text-emerald-500 flex items-center gap-1">
            Dibuat dengan <Heart className="h-3 w-3 text-emerald-400 fill-emerald-400" /> untuk pendidikan
          </p>
        </div>
      </div>
    </footer>
  );
}
