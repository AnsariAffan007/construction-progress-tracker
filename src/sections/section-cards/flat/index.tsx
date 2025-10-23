import ProgressDetailHead from "@/components/common/progress-detail-head"
import AreaCard from "../area"
import "./styles.css"

const FlatCard = ({ flatNumber, bhkCount, expanded, handleClick }: { flatNumber: number, bhkCount: number, expanded: boolean, handleClick: () => void }) => {
  return (
    <div className="flat-card">

      <ProgressDetailHead handleClick={() => handleClick()} background section='flat' itemName={`${flatNumber} [${bhkCount}-BHK]`} />

      <div className={`flat-content ${expanded ? "block" : "hidden"}`}>
        <AreaCard />
        <AreaCard />
      </div>

    </div>
  )
}

export default FlatCard