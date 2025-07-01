import { AppSidebar } from "./components/sidebar/app-sidebar";
import { SidebarInset } from "./components/ui/sidebar";
import { Layout } from "./Layout";
import "./styles/App.css";

 function App() {
  return (
    <Layout>
      <div className="App">
        <AppSidebar />
        <SidebarInset></SidebarInset>
      </div>
    </Layout>
  );
}

export default App;
