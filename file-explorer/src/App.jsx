import React from "react";
import { sampleData } from "./data/constant";
import FileExplorer from "./components/FileExplorer";
import "./App.css"

function App() {
  return (
    <div className="">
        <div className="bg-white rounded-lg shadow-lg border side-bar">
          <FileExplorer initialData={sampleData} />
        </div>
    </div>
  );
}

export default App;
