import Header from "../components/CallsHeader";
import ReservedCallsTable from "../components/ReservedCallsTable";
import "../css/ReservedCalls.css";
export default function ReservedCalls(){
  return (
    <div className="reserved-calls-container">
      <div className="reserved-calls">
        <div className="reserved-calls-header">
          <Header />
        </div>
      </div>
      <div className="reserved-phone-calls">
        <div className="flex jusitfy-center flex-col p-5">
        <p className="font-bold text-xl">Reserved Phone Calls</p>
        <p>Add Call</p>
        </div>

        <div className="flex justify-between">
        <ReservedCallsTable />
        
        <div className="phone-form">
          <p className="font-light">Insert</p>
          <p>Phone Number</p>

          <div className="form-elements flex flex-col gap-y-3">
          <input type="text" placeholder="Phone Number"/>
          <input type="date" placeholder="Date & Time"/>
          <input type="text" placeholder="Phone Agent"/>
          </div>

          <div className="btns flex flex-col mt-6 gap-y-3">
            <button className="sbm-btn">Submit</button>
            <button className="bg-white text-black">Clear Fields</button>
          </div>
        </div>
        </div>
      </div>
  </div>
  );
  
}