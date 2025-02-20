"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/button";
import { Calendar, Search } from "lucide-react";

export default function FiltersSection() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("all");
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder={t("Search transactions...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder={t("All Transactions")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("All Transactions")}</SelectItem>
              <SelectItem value="incoming">{t("Money In")}</SelectItem>
              <SelectItem value="outgoing">{t("Money Out")}</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            {t("Date Range")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
