import "./styles.css"

const ProgressDetailHead = ({
  itemName,
  itemStatus,
  handleClick,
  section,
  background,
}: { itemName?: string, itemStatus?: boolean, handleClick: () => void, section: "floor" | "flat" | "area", background?: boolean }) => {

  return (

    <div className={`progress-detail ${section} ${background && "bg-[#fafafa]"} hover:bg-[#f5f5f5]`} onClick={handleClick}>

      <div className="progress-detail-left">

        <span className="progress-checkbox-container">
          <input type="checkbox"
            className="progress-checkbox"
            data-floor-id="floor1"
            onClick={e => e.stopPropagation()}
          />
        </span>
        <div className="progress-expand-trigger">
          <span>{itemName}</span>
        </div>

      </div>

      <div className='progress-info' style={{ cursor: "pointer" }}>
        <span className="progress-number">
          [10 / 19]
        </span>
        <span className="progress-status-badge">
          {itemStatus ? "Completed" : "Pending"}
        </span>
        <span className='chevron'>
          ▼
        </span>
      </div>

    </div>

  )
}

export default ProgressDetailHead