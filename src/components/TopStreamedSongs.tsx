import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { ChartContainer, ChartConfig } from "@/components/ui/chart";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface SongData {
  songName: string;
  artist: string;
  streamCount: number;
}

const chartConfig = {
  streamCount: {
    label: "Stream Count",
    color: "#4f46e5",
  },
} satisfies ChartConfig;

const COLORS = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"];

const TopStreamedSongs: React.FC = () => {
  const [data, setData] = useState<SongData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getTop5StreamedSongs();
        setData(response);
      } catch (err) {
        setError("Failed to load top-streamed songs.");
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
        <CardTitle>Top 5 Streamed Songs (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="vertical" margin={{ left: 50 }}>
              <XAxis type="number" />
              <YAxis dataKey="songName" type="category" />
              <Tooltip />
              <Bar
                dataKey="streamCount"
                fill="var(--color-streamCount)"
                radius={4}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default TopStreamedSongs;
