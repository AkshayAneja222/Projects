import Calculator from "./components/calculator/Calculator";
import FunApp from "./components/FunApp";
import BorderWrapper from 'react-border-wrapper';

function App(){
  return (<>
    <BorderWrapper rightGap="1px" borderWidth="1px">
      <FunApp/>
    </BorderWrapper>
    <BorderWrapper>
      <Calculator/>
    </BorderWrapper>
  </>
  );
}

export default App;