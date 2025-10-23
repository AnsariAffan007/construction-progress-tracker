import ProgressDetailHead from "@/components/common/progress-detail-head"
import "./styles.css"

const AreaCard = ({ name, status, expanded, handleClick }: { name: string, status: boolean, expanded: boolean, handleClick: () => void }) => {
  return (
    <div className="area-card">
      <ProgressDetailHead handleClick={() => handleClick()} section='area' itemName={name} itemStatus={status} />
      <div className={`area-content ${expanded ? "block" : "hidden"}`}>
        <table>
          <thead>
            <tr>
              <th className="checkbox-col">Completed</th>
              <th>Line Item</th>
              <th>Planned Qty</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>

            <tr className="completed">
              <td className="checkbox-col">
                <span className="checkmark">✓</span>
              </td>
              <td><span className="checkmark">✓</span>LIT-02 (lit)</td>
              <td>2</td>
              <td>-</td>
              <td><span className="eye-icon">👁</span></td>
            </tr>

            <tr className="">
              <td className="checkbox-col">
                <input type="checkbox" className="checkbox line-item-checkbox" data-id="li12" data-area-id="kitchen103" />
              </td>
              <td>SG CHEMICAL NEW X (t)</td>
              <td>1</td>
              <td>-</td>
              <td><span className="eye-icon">👁</span></td>
            </tr>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AreaCard