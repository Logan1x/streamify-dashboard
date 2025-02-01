import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GrowthData {
  month: string;
  totalUsers: number;
  activeUsers: number;
}

const chartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "#2563eb",
  },
  activeUsers: {
    label: "Active Users",
    color: "#f97316",
  },
} satisfies ChartConfig;

const UserGrowthChart: React.FC = () => {
  const [data, setData] = useState<GrowthData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getUserGrowthData();
        setData(response);
      } catch (err) {
        setError("Failed to load user growth data.");
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
    <Card>
      <CardHeader>
        <CardTitle>User Growth (Last 12 Months)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalUsers"
                stroke="var(--color-totalUsers)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="activeUsers"
                stroke="var(--color-activeUsers)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
