"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function HomeMain() {
  return (
    <div className="p-6">
      {/* Recently viewed */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Recently viewed</h2>
          <Button variant="ghost">Filter</Button>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image
                  src="/assets/images/auth/dashboard.png"
                  alt="Project thumbnail"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-medium">Untitled</h3>
                <p className="text-sm text-muted-foreground">
                  Edited 13 hours ago
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Grid of projects */}
      <div className="grid grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Card key={item} className="overflow-hidden">
            <div className="aspect-video relative">
              <Image
                src="/assets/images/auth/dashboard.png"
                alt="Project thumbnail"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">Untitled</h3>
              <p className="text-sm text-muted-foreground">
                Edited 13 hours ago
              </p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
