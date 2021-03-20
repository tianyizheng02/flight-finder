import Header from './components/Header';
import Search from './components/Search';
import Results from "./components/Results";
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header title="Flight Finder"/>
      <Search/>
      <Results/>
      <Footer copyright="© 2021 Tianyi Zheng"/>
    </div>
  );
}

export default App;
