import "./styles.css"

const ProgressDetailHead = () => {
  
  return (

    <div className="progress-detail">
      
      <div className="progress-detail-left">
        
        <span className="progress-checkbox-container">
          <input type="checkbox"
            className="progress-checkbox"
            data-floor-id="floor1"
            onClick={e => e.stopPropagation()}
          />
        </span>
        <div className="progress-expand-trigger">
          <span>Floor 1</span>
        </div>

      </div>

      <div className='progress-info' style={{ cursor: "pointer" }}>
        <span className="progress-number">
          [10 / 19]
        </span>
        <span className="progress-status-badge">
          Pending
        </span>
        <span className='chevron'>
          ▼
        </span>
      </div>

    </div>

  )
}

export default ProgressDetailHead