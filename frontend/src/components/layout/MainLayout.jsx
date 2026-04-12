// Frontend layout component - Main layout wrapper
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'
import Footer from './Footer/Footer'
import '../styles/layout.css'

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="main-content">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
