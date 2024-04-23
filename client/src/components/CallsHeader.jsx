//Here you can build app component. For instance a header that will be used in every page can be created as a component
//and then import it in every page.
//use tsx for typescript and js or jsx for javascript files
import "../css/CallsHeader.css";
import waterImage from "../images/water.png"
export default function Header(){
return (
  <div className="header">
    <img src={waterImage} alt="water" width={'50px'}/>
    <p className="text-gray-600">Home</p>
    <p className="text-gray-600">Reserved</p>
    <p className="text-gray-600">Schedules</p>
    <p className="text-gray-600">Statistics</p>
    <p className="text-gray-600">Ref</p>
    <p className="text-gray-600">Red List</p>
    <p className="text-gray-600">Buyers & Ref</p>
  </div>
)
}