# Streamify : A music streaming analytics platform

## Local Installation

1. Clone the repository
2. Install the required packages using `npm install`
3. Run the server using `npm run dev`
4. Open the browser and go to `localhost:5173`

## Features

- Error Boundary
- Lazy loading of components
- 12 month User Growth Analysis
- Revenue distribution Analysis
- Key metrics Analysis(Users, Revenue, Streams)
- Top 5 songs Analysis
- Recent streamed songs Analysis

## File Structure

```bash
├── App.css
├── App.tsx
├── assets
│ └── react.svg
├── components
│ ├── ErrorBoundary.tsx
│ ├── KeyMetrics.tsx
│ ├── RecentStreamsTable.tsx
│ ├── RevenueDistribution.tsx
│ ├── TopStreamedSongs.tsx
│ ├── ui
│ └── UserGrowthChart.tsx
├── index.css
├── lib
│ └── utils.ts
├── main.tsx
├── services
│ ├── apiService.ts
│ └── mockData.ts
└── vite-env.d.ts
```

## Technologies Used

- React
- TypeScript
- Vite
- Shadcn UI
- recharts

## Demo

<div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/e48c3e6d99d246c98a19ff4415361fe8?sid=6fd4e2ca-318d-4222-9965-595184e6c457" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>

## License

MIT License
