"use client";

import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";
import StatsCard from "../components/stats-card";
import FiltersSection from "../components/filters-section";
import TransactionList from "../components/transaction-list";

export default function TransactionView() {
  const { t } = useTranslation();
  return (
    <MainLayout>
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">{t("Transaction History")}</h1>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {t("Filter")}
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {t("Export")}
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCard />
        {/* Filters Section */}
        <FiltersSection />

        {/* Transactions List */}
        <TransactionList />
      </div>
    </MainLayout>
  );
}
