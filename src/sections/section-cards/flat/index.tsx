import ProgressDetailHead from "@/components/common/progress-detail-head"
import AreaCard from "../area"
import "./styles.css"

const FlatCard = () => {
  return (
    <div className="flat-card">

      <ProgressDetailHead handleClick={() => { }} background section='flat' />

      <div className="flat-content">
        <AreaCard />
        <AreaCard />
      </div>

    </div>
  )
}

export default FlatCard