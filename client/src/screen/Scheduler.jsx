import {Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda, EventSettingsModel} from "@syncfusion/ej2-react-schedule";

export default function Scheduler(){
  let localData = {
    dataSource:[{
      EndTime: new Date(2024,3,24,6,30),
      StartTime:new Date(2024,3,24,4,0)
    }]
  }
  return (
    <ScheduleComponent currentView="Week" eventSettings={localData}>
      <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
      
    </ScheduleComponent>
  )
}