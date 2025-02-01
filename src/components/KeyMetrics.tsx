import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

interface Metrics {
  totalUsers: number;
  activeUsers: number;
  totalStreams: number;
  revenue: number;
  topArtist: string;
}

const KeyMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await apiService.getKeyMetrics();
        setMetrics(data);
      } catch (err) {
        setError("Failed to load key metrics.");
      }
    };

    fetchMetrics();
  }, []);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (!metrics) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.totalUsers}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Users</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.activeUsers}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Total Streams</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.totalStreams}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenue</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          ${metrics.revenue.toFixed(2)}
        </CardContent>
      </Card>

      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Top Artist</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {metrics.topArtist}
        </CardContent>
      </Card>
    </div>
  );
};

export default KeyMetrics;
