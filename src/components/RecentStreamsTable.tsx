import React, { useEffect, useState } from "react";
import apiService from "../services/apiService";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface StreamData {
  songName: string;
  artist: string;
  dateStreamed: string;
  streamCount: number;
  userId: string;
}

const RecentStreamsTable: React.FC = () => {
  const [data, setData] = useState<StreamData[]>([]);
  const [filteredData, setFilteredData] = useState<StreamData[]>([]);
  const [filter, setFilter] = useState<string>("");
  const [sortConfig, setSortConfig] = useState({
    key: "dateStreamed",
    direction: "desc" as "asc" | "desc",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getRecentStreams();
        setData(response);
        setFilteredData(response);
      } catch (err) {
        console.error("Failed to load recent streams.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item.songName.toLowerCase().includes(filter.toLowerCase()) ||
        item.artist.toLowerCase().includes(filter.toLowerCase())
    );
    setFilteredData(filtered);
  }, [filter, data]);

  const handleSort = (key: keyof StreamData) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (key === "dateStreamed") {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      if (key === "streamCount") {
        return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
      }

      // for the rest
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Streams</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter by song or artist"
            className="w-1/3"
          />
        </div>

        <Table>
          <TableCaption>Recent Streams Data</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>
                <button
                  onClick={() => handleSort("songName")}
                  className="text-left"
                >
                  Song Name
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("artist")}
                  className="text-left"
                >
                  Artist
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("dateStreamed")}
                  className="text-left"
                >
                  Date Streamed
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => handleSort("streamCount")}
                  className="text-left"
                >
                  Stream Count
                </button>
              </TableHead>
              <TableHead>User ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.map((stream, index) => (
              <TableRow key={index}>
                <TableCell>{stream.songName}</TableCell>
                <TableCell>{stream.artist}</TableCell>
                <TableCell>
                  {new Date(stream.dateStreamed).toLocaleDateString()}
                </TableCell>
                <TableCell>{stream.streamCount.toLocaleString()}</TableCell>
                <TableCell>{stream.userId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default RecentStreamsTable;
