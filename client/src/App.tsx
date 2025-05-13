import { BrowserRouter as Router, Route } from "react-router-dom"
import { Main } from "@/pages"
import { Layout } from "@/layout"

function App() {
  return (
    <Router>
      <Layout>
        <Route path="/" element={<Main />} />
      </Layout>
    </Router>
  )
}

export default App
