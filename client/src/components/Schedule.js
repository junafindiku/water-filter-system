

// import Scheduler from "devextreme-react/scheduler";
// import ResourceCell from "./ResourceCell.tsx";
// import DataCell from "./DataCell.tsx";
import {appointments} from "./data.js";
import { Scheduler, View, Editing } from 'devextreme-react/scheduler';
import React,{ useCallback, useState } from 'react';
// const groups = ['employeeID'];

// const currentDate = new Date(2024,22,4);
// const views: SchedulerTypes.ViewType[] = ['month'];

export default function Schedule(){
  const [currentDate, setCurrentDate] = useState(new Date(2021, 4, 25));
  const handlePropertyChange = useCallback((e) => {
    if(e.name === 'currentDate') {
      setCurrentDate(e.value);
    }
  }, [])
  return (
  <div className="App">
  <Scheduler id="scheduler"
    dataSource={appointments}
    textExpr="title"
    allDayExpr="dayLong"
    recurrenceRuleExpr="recurrence"
    currentDate={currentDate}
    onOptionChanged={handlePropertyChange}
    defaultCurrentView="week"
    timeZone="Europe/Berlin"
    adaptivityEnabled={true}>
    <View
      type="day"
      startDayHour={10}
      endDayHour={22}
    />
    <View
      type="week"
      startDayHour={10}
      endDayHour={22}
    />
    <View type="month" />
    <Editing
      allowTimeZoneEditing={true}
      allowDragging={false}
    />
  </Scheduler>
</div>
  );
}

