import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface RevenueSource {
  source: string;
  amount: number;
}

const chartConfig = {
  Subscriptions: {
    label: "Subscriptions",
    color: "#34d399",
  },
  Ads: {
    label: "Ads",
    color: "#f87171",
  },
  Merchandise: {
    label: "Merchandise Sales",
    color: "#60a5fa",
  },
  ExclusiveContent: {
    label: "Exclusive Content",
    color: "#fbbf24",
  },
  EventPartnerships: {
    label: "Event Partnerships",
    color: "#a78bfa",
  },
} satisfies ChartConfig;

const COLORS = [
  "var(--color-Subscriptions)",
  "var(--color-Ads)",
  "var(--color-Merchandise)",
  "var(--color-ExclusiveContent)",
  "var(--color-EventPartnerships)",
];

const RevenueDistribution: React.FC = () => {
  const [data, setData] = useState<RevenueSource[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await apiService.getRevenueDistribution()) as {
          revenueSources: RevenueSource[];
        };
        setData(response.revenueSources);
      } catch {
        setError("Failed to load revenue distribution data.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!data.length) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Revenue Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] min-h-[200px] w-full"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="source"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueDistribution;
