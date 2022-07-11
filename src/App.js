import Form from "./components/form/form.component";
import { useEffect } from "react";

function App() {
  // useEffect(() => {
  //   window.process = {
  //     ...window.process,
  //     versions: {
  //       node: 14
  //     },
  // }
  // }, []);

  return (
    <div className="App">
     <Form />
    </div>
  );
}

export default App;


// resonse_object.header("Access-Control-Allow-Origin", "*");
// resonse_object.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");