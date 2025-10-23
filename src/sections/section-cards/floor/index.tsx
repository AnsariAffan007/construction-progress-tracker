import ProgressDetailHead from '@/components/common/progress-detail-head'
import FlatCard from '../flat'
import "./styles.css"

const FloorCard = () => {
  return (
    <div className="floor-card">

      <ProgressDetailHead handleClick={() => { }} background section='floor' />

      <div className={`floor-content`}>
        <FlatCard />
      </div>

    </div>
  )
}

export default FloorCard