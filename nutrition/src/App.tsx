import NavigationBar from "./components/navigationBar";
import AppRoutes from "./routes/AppRoutes";
function App() {
  return (
    <div className="App">
      <AppRoutes/>
      <NavigationBar />
    </div>
  )
}

export default App