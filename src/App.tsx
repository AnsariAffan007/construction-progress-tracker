import './App.css'
import AppBreadcrumb from './components/layout/breadcrumb'
import FilterCard from './sections/filter-card'
import ProgressDetailHead from './sections/progress-detail-head'

function App() {
  return (
    <>
      <div className='breadcrumb'>
        <span>☰</span>
        <AppBreadcrumb />
      </div>

      <div className='header'>
        <h1>WORK-ORDER-Y-0016</h1>
      </div>

      <div className='tabs'>
        <FilterCard content='Typical Area' active />
        <FilterCard content='Other Areas with Quantity' />
        <FilterCard content='Other Areas without Quantity' />
      </div>

      <div className='filter-section'>
        <label>Filter Line Items:</label>
        <select id="lineItemFilter" className='filter-dropdown'>
          <option value="">Select an option</option>
          <option value="LIT-01">LIT-01 (lit)</option>
          <option value="LIT-02">LIT-02 (lit)</option>
          <option value="SG CHEMICAL NEW X">SG CHEMICAL NEW X (t)</option>
          <option value="PAINT-01">PAINT-01 (sqm)</option>
          <option value="TILE-01">TILE-01 (sqm)</option>
        </select>
      </div>

      <div id='layoutContainer'>

        <div className="floor-card">

          <ProgressDetailHead />

          <div className="floor-content">
            <div className="flat-card">



              <div className="flat-content">
                <div className="area-card">



                  <div className="area-content">
                    <table></table>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </>
  )
}

export default App