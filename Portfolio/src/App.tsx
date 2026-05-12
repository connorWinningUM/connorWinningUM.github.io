import './App.css'
import SketchComp from './p5_sketches/background'
import Title from './components/Title'


function App() {

  return (
    <>
      <SketchComp />
      <div className='main_content'>
        <Title />
      </div>
    </>
  )
}

export default App
