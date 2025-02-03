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
https://github.com/user-attachments/assets/783669f7-7087-4c73-86f4-8623e6974f44

## License

MIT License
