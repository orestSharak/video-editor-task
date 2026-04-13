import { Header, Preview, Timeline, TooltipProvider } from './components';

function App() {
  return (
    <TooltipProvider>
      <div className="flex flex-col gap-6">
        <Header />
        <main className="flex flex-col gap-8 mx-8">
          <Preview />
          <Timeline />
        </main>
      </div>
    </TooltipProvider>
  );
}

export default App;
