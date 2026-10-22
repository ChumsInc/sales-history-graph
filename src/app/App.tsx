import GraphStatusBar from "@/components/GraphStatusBar.tsx";
import {ErrorBoundary} from "react-error-boundary";
import ErrorBoundaryFallbackAlert from "@/components/ErrorBoundaryFallbackAlert.tsx";
import DataProvider from "@/components/DataProvider.tsx";
import SalesGraph from "@/components/SalesGraph.tsx";

function App() {
    const inComponent = document.querySelector('body')?.classList.contains('chums-module') ?? false;
    return (
        <div>
            <ErrorBoundary FallbackComponent={ErrorBoundaryFallbackAlert}>
                <DataProvider>
                    <SalesGraph className="mb-3"/>
                    {!inComponent && (<GraphStatusBar/>)}
                </DataProvider>
            </ErrorBoundary>
        </div>
    );
}

export default App;
