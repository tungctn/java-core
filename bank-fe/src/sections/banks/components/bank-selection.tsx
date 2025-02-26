"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import Image from "next/image";
import { useBank } from "../hooks/use-bank";

interface BankSelectionProps {
  onBankSelect: (bank: any) => void;
}

export function BankSelection({ onBankSelect }: BankSelectionProps) {
  const { t } = useTranslation();
  const { filterBanks, searchTerm, setSearchTerm } = useBank();
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          type="text"
          placeholder={t("Search bank...")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 max-h-[400px] overflow-y-auto pr-2">
        {filterBanks?.map((bank) => (
          <button
            key={bank?.id}
            className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            onClick={() => onBankSelect(bank)}
          >
            <div className="h-10 w-10 relative flex-shrink-0">
              <Image
                src={bank?.logo}
                alt={bank?.shortName}
                className="rounded object-contain"
                fill
                sizes="40px"
              />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-sm">{bank?.shortName}</span>
              <span className="text-xs text-slate-500 line-clamp-1">
                {bank?.name}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
